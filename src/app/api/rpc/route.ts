import { NextResponse } from "next/server";
import { CHAIN, serverRpc } from "@/config/brand";
import { badBody, clientNet, readJson, spend, tooMany } from "@/lib/guard";

export const dynamic = "force-dynamic";

/*
 * Read-only JSON-RPC relay for the browser. Some networks intercept the
 * chain's public RPC host, and the operator's private endpoint (when set)
 * must never reach the browser, so reads go through here. Only the methods
 * below pass; transactions are always signed and sent by the user's wallet.
 */
const ALLOWED = new Set([
  "eth_chainId",
  "eth_blockNumber",
  "eth_getBlockByNumber",
  "eth_gasPrice",
  "eth_maxPriorityFeePerGas",
  "eth_feeHistory",
  "eth_getBalance",
  "eth_getCode",
  "eth_getTransactionCount",
  "eth_getTransactionReceipt",
  "eth_getTransactionByHash",
  "eth_call",
  "eth_estimateGas",
  "eth_getLogs",
]);
const MAX_CALLS = 20;
const MAX_BODY = 32_768;
/** Total block span of all eth_getLogs calls in one request. */
const MAX_LOG_SPAN = 20_000;
const MAX_LOG_CALLS = 3;
// Cost units per method; a caller's network (IPv4 address or IPv6 /64) gets
// BUDGET units per WINDOW seconds. Normal page loads use a few dozen.
const COST: Record<string, number> = { eth_getLogs: 10, eth_call: 2, eth_estimateGas: 2 };
const BUDGET = 600;
const WINDOW = 600;
// Without a trusted edge (self-hosted), forwarded headers can be forged, so a
// site-wide ceiling applies too. On Vercel the per-network limit is enough.
const SITE_BUDGET = 20_000;
const trustedEdge = Boolean(process.env.VERCEL);

const hexBlock = (v: unknown) => (typeof v === "string" && /^0x[0-9a-fA-F]{1,16}$/.test(v) ? Number(BigInt(v)) : null);

type Call = { jsonrpc?: string; id?: number | string; method?: unknown; params?: unknown };

function check(c: Call): string | null {
  if (typeof c.method !== "string" || !ALLOWED.has(c.method)) return `Method not allowed: ${String(c.method).slice(0, 40)}`;
  if (c.params !== undefined && !Array.isArray(c.params)) return "params must be an array.";
  if (c.method === "eth_call" || c.method === "eth_estimateGas") {
    const params = (c.params ?? []) as unknown[];
    // A third parameter is a state override: arbitrary code execution on our RPC.
    if (params.length > 2) return `${c.method} takes at most two parameters.`;
    const call = params[0] as { to?: unknown; gas?: unknown } | undefined;
    if (!call || typeof call !== "object") return `${c.method} needs a call object.`;
    if (typeof call.to !== "string" || !/^0x[0-9a-fA-F]{40}$/.test(call.to)) return `${c.method} needs a "to" address.`;
    if (params[1] !== undefined && params[1] !== "latest" && params[1] !== "pending") return `${c.method} reads the latest block only.`;
  }
  if (c.method === "eth_getLogs") {
    // Both ends must be hex block numbers: "latest", a tag or a missing
    // toBlock would let one request scan the whole chain on our RPC.
    const filter = ((c.params as unknown[] | undefined)?.[0] ?? {}) as { fromBlock?: unknown; toBlock?: unknown; blockHash?: unknown };
    if (filter.blockHash !== undefined) return "eth_getLogs by blockHash is not relayed.";
    const from = hexBlock(filter.fromBlock);
    const to = hexBlock(filter.toBlock);
    if (from === null || to === null) return "eth_getLogs needs numeric hex fromBlock and toBlock.";
    if (to < from || to - from > MAX_LOG_SPAN) return `Log range must be 0 to ${MAX_LOG_SPAN} blocks.`;
  }
  return null;
}

export async function POST(request: Request) {
  if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY) return NextResponse.json({ error: "Body too large." }, { status: 413 });
  const body = await readJson<Call | Call[]>(request, MAX_BODY);
  if (!body || typeof body !== "object") return badBody();
  const calls = Array.isArray(body) ? body : [body];
  if (calls.length === 0 || calls.length > MAX_CALLS) return NextResponse.json({ error: "1 to 20 calls per request." }, { status: 400 });
  let logCalls = 0;
  let logSpan = 0;
  let cost = 0;
  for (const c of calls) {
    const problem = check(c);
    if (problem) return NextResponse.json({ error: problem }, { status: 400 });
    cost += COST[c.method as string] ?? 1;
    if (c.method === "eth_getLogs") {
      const f = (c.params as { fromBlock: string; toBlock: string }[])[0];
      logCalls += 1;
      logSpan += Number(BigInt(f.toBlock)) - Number(BigInt(f.fromBlock));
    }
  }
  if (logCalls > MAX_LOG_CALLS) return NextResponse.json({ error: `At most ${MAX_LOG_CALLS} eth_getLogs per request.` }, { status: 400 });
  if (logSpan > MAX_LOG_SPAN) return NextResponse.json({ error: `eth_getLogs spans add up to more than ${MAX_LOG_SPAN} blocks.` }, { status: 400 });
  if (!spend("rpc", clientNet(request), cost, BUDGET, WINDOW)) return tooMany();
  if (!trustedEdge && !spend("rpc-site", "all", cost, SITE_BUDGET, WINDOW)) return tooMany();

  const clean = calls.map((c, i) => {
    let params = (c.params ?? []) as unknown[];
    if (c.method === "eth_call" || c.method === "eth_estimateGas") {
      // Drop any caller-chosen gas cap; the node's own limit applies.
      const { gas: _gas, ...call } = params[0] as Record<string, unknown>;
      void _gas;
      params = params.length > 1 ? [call, params[1]] : [call];
    }
    return { jsonrpc: "2.0", id: typeof c.id === "number" ? c.id : i, method: c.method, params };
  });
  const payload = Array.isArray(body) ? clean : clean[0];
  const endpoints = [serverRpc(), CHAIN.fallbackRpc].filter((u, i, all) => all.indexOf(u) === i);
  for (const url of endpoints) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
        cache: "no-store",
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) continue;
      const out = await res.json();
      return NextResponse.json(out, { headers: { "cache-control": "no-store" } });
    } catch {
      // try the next endpoint
    }
  }
  return NextResponse.json({ error: "The chain could not be reached." }, { status: 502 });
}
