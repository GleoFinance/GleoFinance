import "server-only";
import { USDG } from "@/config/assets.generated";
import { rpc, rpcBatch } from "@/lib/feeds/rpc";
import { ethUsd } from "@/lib/feeds/price";

/*
 * One snapshot of Robinhood Chain for every "live" figure on the site. All
 * values are read from the chain (or OKX for the ETH price) at request time
 * and cached for a few seconds; nothing here is estimated by hand.
 */

type RawBlock = { number: string; timestamp: string; gasUsed: string; gasLimit: string; transactions: string[]; baseFeePerGas?: string };

export type BlockRow = { number: number; timestamp: number; txs: number; gasUsed: number };

export type NetworkSnapshot = {
  ok: boolean;
  chainId: number | null;
  block: number | null;
  blockTimestamp: number | null;
  /** Average seconds per block over the last SPAN blocks. */
  blockTime: number | null;
  /** Transactions in the RECENT blocks. */
  windowTxs: number | null;
  /** windowTxs spread over RECENT × blockTime: a live, approximate rate. */
  txPerSecond: number | null;
  gasPriceGwei: number | null;
  ethUsd: number | null;
  ethChange24h: number | null;
  priceSource: string | null;
  /** Gas a plain ETH transfer and a USDG transfer need, from eth_estimateGas. */
  gasEthTransfer: number;
  gasUsdgTransfer: number | null;
  feeEthTransferUsd: number | null;
  feeUsdgTransferUsd: number | null;
  usdgSupply: number | null;
  recent: BlockRow[];
  readAt: number;
};

const SPAN = 120;
const RECENT = 8;
const TTL = 6_000;
const hex = (n: number) => `0x${n.toString(16)}`;
const PROBE_FROM = "0x000000000000000000000000000000000000dEaD";
const PROBE_TO = "0x1111111111111111111111111111111111111111";

let cache: NetworkSnapshot | null = null;
let inflight: Promise<NetworkSnapshot> | null = null;

async function read(): Promise<NetworkSnapshot> {
  const empty: NetworkSnapshot = {
    ok: false,
    chainId: null,
    block: null,
    blockTimestamp: null,
    blockTime: null,
    windowTxs: null,
    txPerSecond: null,
    gasPriceGwei: null,
    ethUsd: null,
    ethChange24h: null,
    priceSource: null,
    gasEthTransfer: 21000,
    gasUsdgTransfer: null,
    feeEthTransferUsd: null,
    feeUsdgTransferUsd: null,
    usdgSupply: null,
    recent: [],
    readAt: Date.now(),
  };
  const pricePromise = ethUsd().catch(() => null);
  try {
    const [latest, gas, chainId] = await Promise.all([
      rpc<RawBlock>("eth_getBlockByNumber", ["latest", false]),
      rpc<string>("eth_gasPrice", []),
      rpc<string>("eth_chainId", []),
    ]);
    const n = Number.parseInt(latest.number, 16);
    const transferData = `0xa9059cbb${PROBE_TO.slice(2).padStart(64, "0")}${"0".repeat(64)}`;
    const extra = await rpcBatch<unknown>([
      { method: "eth_getBlockByNumber", params: [hex(n - SPAN), false] },
      { method: "eth_call", params: [{ to: USDG.address, data: "0x18160ddd" }, "latest"] },
      { method: "eth_estimateGas", params: [{ from: PROBE_FROM, to: USDG.address, data: transferData }] },
      ...Array.from({ length: RECENT - 1 }, (_, i) => ({ method: "eth_getBlockByNumber", params: [hex(n - 1 - i), false] })),
    ]).catch(() => [] as unknown[]);
    const far = extra[0] as RawBlock | null | undefined;
    const supplyHex = extra[1] as string | null | undefined;
    const usdgGasHex = extra[2] as string | null | undefined;
    const older = extra.slice(3) as (RawBlock | null)[];

    const ts = Number.parseInt(latest.timestamp, 16);
    const gasWei = Number(BigInt(gas));
    const price = await pricePromise;
    const recentBlocks = [latest, ...older.filter((b): b is RawBlock => Boolean(b))];
    const usdgGas = usdgGasHex ? Number(BigInt(usdgGasHex)) : null;
    const feeUsd = (units: number | null) => (units && price ? (units * gasWei * price.usd) / 1e18 : null);

    // Several blocks share one timestamp on this chain (sub-second blocks),
    // so the rate uses the averaged block time, not the recent timestamps.
    const windowTxs = recentBlocks.reduce((sum, b) => sum + b.transactions.length, 0);
    const blockTime = far ? (ts - Number.parseInt(far.timestamp, 16)) / SPAN : null;

    return {
      ...empty,
      ok: true,
      chainId: Number.parseInt(chainId, 16),
      block: n,
      blockTimestamp: ts,
      blockTime,
      windowTxs,
      txPerSecond: blockTime && blockTime > 0 ? windowTxs / (recentBlocks.length * blockTime) : null,
      gasPriceGwei: gasWei / 1e9,
      ethUsd: price?.usd ?? null,
      ethChange24h: price?.change24h ?? null,
      priceSource: price?.source ?? null,
      gasUsdgTransfer: usdgGas,
      feeEthTransferUsd: feeUsd(21000),
      feeUsdgTransferUsd: feeUsd(usdgGas),
      usdgSupply: supplyHex && supplyHex !== "0x" ? Number(BigInt(supplyHex)) / 10 ** USDG.decimals : null,
      recent: recentBlocks.map((b) => ({
        number: Number.parseInt(b.number, 16),
        timestamp: Number.parseInt(b.timestamp, 16),
        txs: b.transactions.length,
        gasUsed: Number.parseInt(b.gasUsed, 16),
      })),
      readAt: Date.now(),
    };
  } catch {
    const price = await pricePromise;
    return { ...empty, ethUsd: price?.usd ?? null, ethChange24h: price?.change24h ?? null, priceSource: price?.source ?? null };
  }
}

export async function networkSnapshot(): Promise<NetworkSnapshot> {
  if (cache && Date.now() - cache.readAt < TTL) return cache;
  if (inflight) return inflight;
  inflight = read()
    .then((snap) => {
      if (snap.ok || !cache) cache = snap;
      return snap.ok ? snap : (cache ?? snap);
    })
    .finally(() => {
      inflight = null;
    });
  return inflight;
}
