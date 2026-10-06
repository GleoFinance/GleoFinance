import "server-only";
import { STOCK_TOKENS, USDG, WETH, type ResolvedToken } from "@/config/assets.generated";
import { rpcBatch } from "@/lib/feeds/rpc";

/*
 * Live view of tokenized assets that already exist on Robinhood Chain.
 * Identity comes from src/config/assets.generated.ts (verified on-chain by
 * scripts/resolve-assets.mjs). Supply is read from each contract; the price
 * is the last trade on the deepest DEX pool where the token is the BASE side
 * (Dexscreener), so a pool quoted the other way round cannot mislabel it.
 */

export type AssetKind = "stock" | "etf" | "cash" | "crypto";

export type AssetRow = ResolvedToken & {
  kind: AssetKind;
  supply: number | null;
  priceUsd: number | null;
  liquidityUsd: number | null;
  pair: string | null;
};

export type AssetsSnapshot = { rows: AssetRow[]; readAt: number; priceSource: string };

const ETFS = new Set(["SPY", "QQQ"]);
const TTL = 60_000;
let cache: AssetsSnapshot | null = null;
let inflight: Promise<AssetsSnapshot> | null = null;

type Pair = { baseToken: { address: string }; priceUsd?: string; liquidity?: { usd?: number }; url?: string };

async function prices(addresses: string[]) {
  const out = new Map<string, { price: number; liquidity: number; url: string | null }>();
  for (let i = 0; i < addresses.length; i += 30) {
    const chunk = addresses.slice(i, i + 30);
    try {
      const res = await fetch(`https://api.dexscreener.com/tokens/v1/robinhood/${chunk.join(",")}`, {
        cache: "no-store",
        signal: AbortSignal.timeout(7000),
      });
      if (!res.ok) continue;
      const pairs = (await res.json()) as Pair[];
      for (const p of pairs) {
        const key = p.baseToken.address.toLowerCase();
        const price = Number(p.priceUsd);
        const liquidity = p.liquidity?.usd ?? 0;
        if (!Number.isFinite(price) || price <= 0) continue;
        const prev = out.get(key);
        if (!prev || prev.liquidity < liquidity) out.set(key, { price, liquidity, url: p.url ?? null });
      }
    } catch {
      // prices stay empty for this chunk
    }
  }
  return out;
}

async function read(): Promise<AssetsSnapshot> {
  const list: { token: ResolvedToken; kind: AssetKind }[] = [
    { token: USDG, kind: "cash" },
    { token: WETH, kind: "crypto" },
    ...STOCK_TOKENS.map((t) => ({ token: t, kind: (ETFS.has(t.symbol) ? "etf" : "stock") as AssetKind })),
  ];
  const [supplies, priceMap] = await Promise.all([
    rpcBatch<string>(list.map(({ token }) => ({ method: "eth_call", params: [{ to: token.address, data: "0x18160ddd" }, "latest"] }))).catch(
      () => list.map(() => null),
    ),
    prices(list.filter((l) => l.kind !== "cash").map((l) => l.token.address)),
  ]);
  const rows = list.map(({ token, kind }, i) => {
    const raw = supplies[i];
    const p = priceMap.get(token.address.toLowerCase());
    return {
      ...token,
      kind,
      supply: raw && raw !== "0x" ? Number(BigInt(raw)) / 10 ** token.decimals : null,
      // USDG is a dollar token; its pools are quoted against it, so its price is $1 by design.
      priceUsd: kind === "cash" ? 1 : (p?.price ?? null),
      liquidityUsd: p?.liquidity ?? null,
      pair: p?.url ?? null,
    };
  });
  return { rows, readAt: Date.now(), priceSource: "Dexscreener" };
}

export async function assetsSnapshot() {
  if (cache && Date.now() - cache.readAt < TTL) return cache;
  if (inflight) return inflight;
  inflight = read()
    .then((s) => (cache = s))
    .finally(() => {
      inflight = null;
    });
  return inflight;
}
