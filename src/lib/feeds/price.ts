import "server-only";

/*
 * ETH/USD from free public sources (no key): OKX first, CoinGecko second.
 * A hit is kept for a minute, a miss for 20 seconds, so a brief outage does
 * not blank the price for long. Returns null rather than a guessed number.
 */

export type EthQuote = { usd: number; change24h: number | null; source: string; at: number };

let cached: EthQuote | null = null;
let missAt = 0;
let inflight: Promise<EthQuote | null> | null = null;

async function fromOkx(): Promise<EthQuote> {
  const res = await fetch("https://www.okx.com/api/v5/market/ticker?instId=ETH-USDT", { cache: "no-store", signal: AbortSignal.timeout(5000) });
  const body = (await res.json()) as { data?: { last: string; open24h: string }[] };
  const row = body.data?.[0];
  const last = Number(row?.last);
  const open = Number(row?.open24h);
  if (!Number.isFinite(last) || last <= 0) throw new Error("bad price");
  return { usd: last, change24h: open > 0 ? ((last - open) / open) * 100 : null, source: "OKX", at: Date.now() };
}

async function fromCoinGecko(): Promise<EthQuote> {
  const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&include_24hr_change=true", {
    cache: "no-store",
    signal: AbortSignal.timeout(5000),
  });
  const body = (await res.json()) as { ethereum?: { usd: number; usd_24h_change?: number } };
  if (!body.ethereum?.usd) throw new Error("no price");
  return { usd: body.ethereum.usd, change24h: body.ethereum.usd_24h_change ?? null, source: "CoinGecko", at: Date.now() };
}

export async function ethUsd(): Promise<EthQuote | null> {
  const now = Date.now();
  if (cached && now - cached.at < 60_000) return cached;
  if (!cached && now - missAt < 20_000) return null;
  if (inflight) return inflight;
  inflight = (async () => {
    // The network here drops some connections to OKX, so each source gets a retry.
    for (const source of [fromOkx, fromOkx, fromCoinGecko]) {
      try {
        cached = await source();
        return cached;
      } catch {
        // next source
      }
    }
    missAt = Date.now();
    return cached; // an older price beats none; the caller shows its age
  })().finally(() => {
    inflight = null;
  });
  return inflight;
}
