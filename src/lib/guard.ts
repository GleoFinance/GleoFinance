import "server-only";
import { NextResponse } from "next/server";
import { aggregateKey, networkKey } from "@/lib/netkey";

/*
 * Request guards for the API routes: a hard cap on body size, the caller's
 * IP, and a fixed-window rate limit kept in this server's memory. Nothing
 * here needs a database; on a serverless host each instance counts on its
 * own, which is enough to blunt a single noisy caller.
 */

export const MAX_BODY = 8192;

/** Parses a small JSON body; null when it is missing, malformed or too large. */
export async function readJson<T>(request: Request, max = MAX_BODY): Promise<T | null> {
  const declared = Number(request.headers.get("content-length") ?? 0);
  if (declared > max) return null;
  try {
    const text = await request.text();
    if (text.length > max) return null;
    return text ? (JSON.parse(text) as T) : null;
  } catch {
    return null;
  }
}

/**
 * Forwarded headers are trusted only where a proxy we control writes them:
 * on Vercel (x-vercel-forwarded-for, then x-forwarded-for), or when the
 * operator sets TRUST_PROXY_HEADERS=1 behind their own proxy. In that case
 * the address is the TRUSTED_PROXY_HOPS-th entry from the RIGHT of
 * x-forwarded-for (default 1): a client can prepend anything, but cannot
 * change what the proxy appended. CLIENT_IP_HEADER names a header to read
 * instead, only for proxies that overwrite it. Anywhere else all traffic
 * shares the explicit "direct" key.
 */
const onVercel = Boolean(process.env.VERCEL);
const trustProxy = onVercel || process.env.TRUST_PROXY_HEADERS === "1";
const hops = Math.max(1, Math.min(10, Number.parseInt(process.env.TRUSTED_PROXY_HOPS ?? "1", 10) || 1));
const ipHeader = (process.env.CLIENT_IP_HEADER ?? "").trim().toLowerCase();

export type ClientNet = {
  /** "n4:…", "n6:…/64", "unparsed" (header present but not an address), or "direct" (headers not trusted). */
  net: string;
  /** "a4:…/24", "a6:…/48" or "ax:…"; null only for "direct". */
  aggregate: string | null;
};

function pickAddress(request: Request) {
  if (onVercel) {
    // Vercel overwrites these with the connecting client's address.
    const v = request.headers.get("x-vercel-forwarded-for") ?? request.headers.get("x-forwarded-for") ?? "";
    return v.split(",")[0].trim();
  }
  if (ipHeader) return (request.headers.get(ipHeader) ?? "").trim();
  const parts = (request.headers.get("x-forwarded-for") ?? "").split(",").map((p) => p.trim()).filter(Boolean);
  return parts.length >= hops ? parts[parts.length - hops] : "";
}

export function clientNet(request: Request): ClientNet {
  if (!trustProxy) return { net: "direct", aggregate: null };
  // Anything that does not parse gets the normal budget under its own aggregate, never the larger direct one.
  const net = networkKey(pickAddress(request).slice(0, 64)) ?? "unparsed";
  return { net, aggregate: aggregateKey(net) };
}

/*
 * Fixed-window counters in this server's memory, hard-capped at MAX_KEYS.
 * Two kinds of entry:
 *   leaf    per-network keys. When the map is full, a random sample of
 *           leaves is taken: stale ones (older window) go first, otherwise
 *           the lightest few. A flood of one-shot keys evicts itself while
 *           heavy keys keep their counts. If no room can be made, only that
 *           one new key is refused.
 *   pinned  aggregates and "direct". Never evicted inside their window, so
 *           an eviction cannot reset an aggregate cap, but they may use at
 *           most PINNED_MAX slots. When that quota is full a NEW aggregate is
 *           simply not tracked this window (its check is skipped; the leaf
 *           limit still applies), so nobody is locked out.
 * Every operation touches at most SAMPLE entries; nothing scans the map.
 */
const MAX_KEYS = 10_000;
const PINNED_MAX = MAX_KEYS / 5;
const SAMPLE = 64;
const EVICT = 8;

type Entry = { slot: number; count: number; pinned: boolean; idx: number };
const windows = new Map<string, Entry>();
const leafList: string[] = [];
const pinList: string[] = [];

/** Exposed for tests: current number of tracked keys. */
export const trackedKeys = () => windows.size;

const isPinned = (key: string) => key.startsWith("a4:") || key.startsWith("a6:") || key.startsWith("ax:") || key === "direct";

function remove(id: string) {
  const e = windows.get(id);
  if (!e) return;
  const list = e.pinned ? pinList : leafList;
  const last = list.pop()!;
  if (last !== id) {
    list[e.idx] = last;
    windows.get(last)!.idx = e.idx;
  }
  windows.delete(id);
}

function insert(id: string, pinned: boolean, slot: number, count: number) {
  const list = pinned ? pinList : leafList;
  windows.set(id, { slot, count, pinned, idx: list.length });
  list.push(id);
}

/** Samples a list and evicts stale entries, or (for leaves) the lightest few. */
function evictFrom(list: string[], slot: number, allowLive: boolean) {
  if (!list.length) return;
  const sample = new Set<string>();
  for (let n = 0; n < SAMPLE; n++) sample.add(list[Math.floor(Math.random() * list.length)]);
  const picked = [...sample].map((id) => [id, windows.get(id)!] as const);
  const stale = picked.filter(([, e]) => e.slot !== slot);
  if (stale.length) {
    for (const [id] of stale) remove(id);
    return;
  }
  if (!allowLive) return;
  picked.sort((a, b) => a[1].count - b[1].count);
  for (const [id] of picked.slice(0, EVICT)) remove(id);
}

/** Room for one new leaf; false refuses only that key. */
function roomForLeaf(slot: number) {
  if (windows.size < MAX_KEYS) return true;
  evictFrom(leafList, slot, true);
  if (windows.size < MAX_KEYS) return true;
  evictFrom(pinList, slot, false); // stale pinned entries only
  return windows.size < MAX_KEYS;
}

/** Room for one new pinned key; false means "do not track it this window". */
function roomForPinned(slot: number) {
  if (pinList.length >= PINNED_MAX) evictFrom(pinList, slot, false);
  if (pinList.length >= PINNED_MAX) return false;
  return roomForLeaf(slot);
}

/**
 * Charges `cost` to every key in `limits` (each with its own max) for the
 * current window. Passes only if every tracked key has budget left; nothing
 * is charged when one of them is over or a new leaf key finds no room.
 */
export function spendAll(bucket: string, limits: { key: string; max: number }[], cost: number, windowSec: number) {
  const slot = Math.floor(Date.now() / 1000 / windowSec);
  const ids = limits.map((l) => ({ id: `${bucket}|${l.key}`, max: l.max, pinned: isPinned(l.key) }));
  for (const { id, max } of ids) {
    const e = windows.get(id);
    const used = e && e.slot === slot ? e.count : 0;
    if (used + cost > max) return false;
  }
  // A new key is inserted (at zero) as soon as room is found, so the next
  // key's room check sees the slot as taken; nothing is charged until every
  // key has a place, and a leaf without room refuses the request.
  const track: string[] = [];
  // Pinned keys first: making room for a leaf may evict light leaves, so the
  // request's own new leaf is placed last and cannot be evicted by its aggregate.
  for (const k of [...ids].sort((x, y) => Number(y.pinned) - Number(x.pinned))) {
    if (windows.has(k.id)) track.push(k.id);
    else if (k.pinned) {
      if (roomForPinned(slot)) {
        insert(k.id, true, slot, 0);
        track.push(k.id);
      }
    } else if (roomForLeaf(slot)) {
      insert(k.id, false, slot, 0);
      track.push(k.id);
    } else return false;
  }
  for (const id of track) {
    const e = windows.get(id);
    if (!e) return false; // evicted while making room for a later key: refuse, never pass untracked
    if (e.slot === slot) e.count += cost;
    else {
      e.slot = slot;
      e.count = cost;
    }
  }
  return true;
}

/** Weighted budget for one key. */
export function spend(bucket: string, key: string, cost: number, max: number, windowSec: number) {
  return spendAll(bucket, [{ key, max }], cost, windowSec);
}

/** Aggregates (IPv4 /24, IPv6 /48) get this many times the per-network budget. */
export const AGGREGATE_FACTOR = 16;

/**
 * Budget for the caller: their network gets `max`, its aggregate gets
 * `max * AGGREGATE_FACTOR`, and untrusted direct traffic shares `directMax`.
 */
export function spendClient(bucket: string, who: ClientNet, cost: number, max: number, windowSec: number, directMax = max * 10) {
  if (who.net === "direct") return spend(bucket, "direct", cost, directMax, windowSec);
  return spendAll(
    bucket,
    [
      { key: who.net, max },
      { key: who.aggregate ?? aggregateKey(who.net), max: max * AGGREGATE_FACTOR },
    ],
    cost,
    windowSec,
  );
}

/** True while the caller has made at most `max` requests in the window. */
export function allow(bucket: string, who: ClientNet, max: number, windowSec = 60) {
  return spendClient(bucket, who, 1, max, windowSec);
}

export const tooMany = () => NextResponse.json({ error: "Too many requests. Slow down a little." }, { status: 429 });
export const badBody = () => NextResponse.json({ error: "Invalid or oversized request body." }, { status: 400 });
