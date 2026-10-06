import "server-only";
import { NextResponse } from "next/server";
import { networkKey } from "@/lib/netkey";

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
 * Forwarded headers are trusted only where a proxy we control rewrites them:
 * on Vercel (the edge overwrites x-forwarded-for and sets
 * x-vercel-forwarded-for), or when the operator sets TRUST_PROXY_HEADERS=1
 * behind their own proxy. Anywhere else a client could pick a fresh value per
 * request, so all direct traffic shares one key instead.
 */
const onVercel = Boolean(process.env.VERCEL);
const trustProxy = onVercel || process.env.TRUST_PROXY_HEADERS === "1";

/** Rate-limit key for the caller's network: IPv4 address or IPv6 /64, or "direct". */
export function clientNet(request: Request) {
  if (!trustProxy) return "direct";
  const raw = onVercel
    ? (request.headers.get("x-vercel-forwarded-for") ?? request.headers.get("x-forwarded-for"))
    : (request.headers.get("x-forwarded-for") ?? request.headers.get("x-real-ip"));
  const ip = (raw ?? "").split(",")[0].trim();
  return networkKey(ip.slice(0, 64).replace(/[^0-9a-fA-F:.]/g, "")) || "direct";
}

/*
 * Fixed-window counters in this server's memory. The map is hard-capped:
 * when it is full (after dropping stale windows), a NEW key is not inserted
 * but charged to one shared "overflow" bucket with a small budget. Newcomers
 * fail closed during a flood; keys already counted are unaffected.
 */
const MAX_KEYS = 10_000;
// Room kept for the per-bucket overflow keys, so the map never exceeds MAX_KEYS.
const RESERVED = 16;
const OVERFLOW_SHARE = 0.1;
const windows = new Map<string, { slot: number; count: number }>();

/** Exposed for tests: current number of tracked keys. */
export const trackedKeys = () => windows.size;

function bucketFor(id: string, slot: number): string | null {
  const entry = windows.get(id);
  if (entry) return id;
  if (windows.size >= MAX_KEYS) {
    for (const [k, v] of windows) if (v.slot !== slot) windows.delete(k);
  }
  return windows.size < MAX_KEYS - RESERVED ? id : null;
}

/** Weighted budget: `cost` units against `max` per window; false when over. */
export function spend(bucket: string, key: string, cost: number, max: number, windowSec: number) {
  const slot = Math.floor(Date.now() / 1000 / windowSec);
  let id = bucketFor(`${bucket}:${key}`, slot);
  let limit = max;
  if (id === null) {
    id = `${bucket}:__overflow`;
    limit = Math.max(1, Math.floor(max * OVERFLOW_SHARE));
  }
  const entry = windows.get(id);
  if (!entry || entry.slot !== slot) {
    windows.set(id, { slot, count: cost });
    return cost <= limit;
  }
  if (entry.count + cost > limit) return false;
  entry.count += cost;
  return true;
}

/** True while `key` has made at most `max` requests in the current window. */
export function allow(bucket: string, key: string, max: number, windowSec = 60) {
  return spend(bucket, key, 1, max, windowSec);
}

export const tooMany = () => NextResponse.json({ error: "Too many requests. Slow down a little." }, { status: 429 });
export const badBody = () => NextResponse.json({ error: "Invalid or oversized request body." }, { status: 400 });
