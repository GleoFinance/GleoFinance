import { CHAIN } from "@/config/brand";

// The site's own read-only relay comes first: some networks intercept the
// chain's public RPC host, and the relay also carries the operator's private
// endpoint when one is configured. The public endpoints are the fallback.
const RELAY = "/api/rpc";
const PUBLIC = [CHAIN.rpc, CHAIN.publicRpc, CHAIN.fallbackRpc].filter((url, i, all) => all.indexOf(url) === i);
// When the relay is rate-limited or failing, the browser reads the public
// endpoints directly for a minute, then tries the relay again.
const RELAY_PAUSE_MS = 60_000;
let relayPausedUntil = 0;
// Index of the public endpoint that last answered.
let preferredPublic = 0;

function endpoints() {
  const pub = PUBLIC.map((_, n) => PUBLIC[(preferredPublic + n) % PUBLIC.length]);
  return Date.now() < relayPausedUntil ? pub : [RELAY, ...pub];
}

function noteResult(url: string, ok: boolean, status?: number) {
  if (url === RELAY) {
    if (!ok && (status === undefined || status === 429 || status >= 500)) relayPausedUntil = Date.now() + RELAY_PAUSE_MS;
  } else if (ok) {
    preferredPublic = PUBLIC.indexOf(url);
  }
}

class HttpError extends Error {
  constructor(readonly status: number) {
    super(`RPC ${status}`);
  }
}

/**
 * Minimal JSON-RPC read against Robinhood Chain from the browser. Tries the
 * site relay first, then the public endpoints if it cannot be reached.
 */
export async function rpc<T>(method: string, params: unknown[] = []): Promise<T> {
  let lastError: unknown;
  for (const url of endpoints()) {
    try {
      const result = await call<T>(url, method, params);
      noteResult(url, true);
      return result;
    } catch (error) {
      noteResult(url, false, error instanceof HttpError ? error.status : error instanceof RpcAnswer ? 200 : undefined);
      // A JSON-RPC error (a revert, a bad estimate) is the chain's answer, not an outage.
      if (error instanceof RpcAnswer) throw error;
      lastError = error;
    }
  }
  throw lastError;
}

async function call<T>(url: string, method: string, params: unknown[]): Promise<T> {
  const response = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
    cache: "no-store",
  });
  if (!response.ok) throw new HttpError(response.status);
  const body = (await response.json()) as { result?: T; error?: { message: string } };
  if (body.error) throw new RpcAnswer(body.error.message);
  return body.result as T;
}

/** An error returned by the chain itself (for example a revert). */
export class RpcAnswer extends Error {}

/** Formats a hex wei amount as ETH with a few significant decimals. */
export function formatEth(hexWei: string, digits = 4) {
  const wei = BigInt(hexWei);
  const whole = wei / 10n ** 18n;
  const fraction = (wei % 10n ** 18n).toString().padStart(18, "0").slice(0, digits);
  const trimmed = fraction.replace(/0+$/, "");
  return trimmed ? `${whole}.${trimmed}` : whole.toString();
}

/** Several reads in one JSON-RPC batch, with the same endpoint fallback. */
export async function rpcBatch<T>(calls: { method: string; params: unknown[] }[]): Promise<T[]> {
  let lastError: unknown;
  for (const url of endpoints()) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(calls.map((c, id) => ({ jsonrpc: "2.0", id, ...c }))),
        cache: "no-store",
      });
      if (!response.ok) throw new HttpError(response.status);
      const body = (await response.json()) as { id: number; result?: T; error?: { message: string } }[];
      if (!Array.isArray(body)) throw new Error("Batch not supported");
      const sorted = [...body].sort((a, b) => a.id - b.id);
      if (sorted.some((entry) => entry.error)) throw new RpcAnswer("Batch entry failed");
      noteResult(url, true);
      return sorted.map((entry) => entry.result as T);
    } catch (error) {
      noteResult(url, false, error instanceof HttpError ? error.status : error instanceof RpcAnswer ? 200 : undefined);
      lastError = error;
    }
  }
  throw lastError;
}
