import { NextResponse } from "next/server";
import { CHAIN, serverRpc } from "@/config/brand";
import { allow, badBody, clientIp, readJson, tooMany } from "@/lib/guard";

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
const MAX_LOG_SPAN = 20_000;

const hexBlock = (v: unknown) => (typeof v === "string" && /^0x[0-9a-fA-F]{1,16}$/.test(v) ? Number(BigInt(v)) : null);

type Call = { jsonrpc?: string; id?: number | string; method?: unknown; params?: unknown };

function check(c: Call): string | null {
  if (typeof c.method !== "string" || !ALLOWED.has(c.method)) return `Method not allowed: ${String(c.method).slice(0, 40)}`;
  if (c.params !== undefined && !Array.isArray(c.params)) return "params must be an array.";
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
  if (!allow("rpc", clientIp(request), 240)) return tooMany();
  const body = await readJson<Call | Call[]>(request, 32_768);
  if (!body || typeof body !== "object") return badBody();
  const calls = Array.isArray(body) ? body : [body];
  if (calls.length === 0 || calls.length > MAX_CALLS) return NextResponse.json({ error: "1 to 20 calls per request." }, { status: 400 });
  for (const c of calls) {
    const problem = check(c);
    if (problem) return NextResponse.json({ error: problem }, { status: 400 });
  }
  const clean = calls.map((c, i) => ({ jsonrpc: "2.0", id: typeof c.id === "number" ? c.id : i, method: c.method, params: c.params ?? [] }));
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
