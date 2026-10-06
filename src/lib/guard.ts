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
 * First hop of x-forwarded-for, else x-real-ip, as a rate-limit key (IPv6
 * cut to its /64). On Vercel the edge overwrites these headers, so the value
 * is the caller's real address.
 */
export function clientNet(request: Request) {
  const fwd = request.headers.get("x-forwarded-for");
  const ip = (fwd ? fwd.split(",")[0] : (request.headers.get("x-real-ip") ?? "local")).trim();
  return networkKey(ip.slice(0, 64).replace(/[^0-9a-fA-F:.]/g, "")) || "local";
}

const windows = new Map<string, { slot: number; count: number }>();

/** True while `key` has made at most `max` requests in the current window. */
export function allow(bucket: string, key: string, max: number, windowSec = 60) {
  const slot = Math.floor(Date.now() / 1000 / windowSec);
  const id = `${bucket}:${key}`;
  const entry = windows.get(id);
  if (!entry || entry.slot !== slot) {
    windows.set(id, { slot, count: 1 });
    if (windows.size > 5000) {
      for (const [k, v] of windows) if (v.slot !== slot) windows.delete(k);
    }
    return true;
  }
  entry.count += 1;
  return entry.count <= max;
}

/**
 * Weighted budget: `cost` units against `max` per window. Unlike `allow`,
 * one request can spend several units, so heavy reads use up a caller's
 * share faster. In memory only; a full map never fails open (oldest windows
 * are dropped, the current one is kept).
 */
export function spend(bucket: string, key: string, cost: number, max: number, windowSec: number) {
  const slot = Math.floor(Date.now() / 1000 / windowSec);
  const id = `${bucket}:${key}`;
  const entry = windows.get(id);
  if (!entry || entry.slot !== slot) {
    if (windows.size > 5000) for (const [k, v] of windows) if (v.slot !== slot) windows.delete(k);
    windows.set(id, { slot, count: cost });
    return cost <= max;
  }
  if (entry.count + cost > max) return false;
  entry.count += cost;
  return true;
}

export const tooMany = () => NextResponse.json({ error: "Too many requests. Slow down a little." }, { status: 429 });
export const badBody = () => NextResponse.json({ error: "Invalid or oversized request body." }, { status: 400 });
