import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/*
 * Reference FX rates (USD base) for the anchors page, from the free open
 * endpoint of ExchangeRate-API (updated daily, attribution required). Kept
 * for an hour; the page says the rates are reference rates, not quotes.
 */
const CODES = ["EUR", "GBP", "MXN", "BRL", "PHP", "NGN", "INR", "KES", "IDR"];
let cache: { rates: Record<string, number>; updated: string; at: number } | null = null;

export async function GET() {
  if (!cache || Date.now() - cache.at > 3_600_000) {
    try {
      const res = await fetch("https://open.er-api.com/v6/latest/USD", { cache: "no-store", signal: AbortSignal.timeout(6000) });
      const body = (await res.json()) as { result?: string; rates?: Record<string, number>; time_last_update_utc?: string };
      if (body.result === "success" && body.rates) {
        cache = {
          rates: Object.fromEntries(CODES.filter((c) => body.rates![c]).map((c) => [c, body.rates![c]])),
          updated: body.time_last_update_utc ?? "",
          at: Date.now(),
        };
      }
    } catch {
      // keep the previous rates, if any
    }
  }
  if (!cache) return NextResponse.json({ error: "rates unavailable" }, { status: 503 });
  return NextResponse.json({ base: "USD", rates: { USD: 1, ...cache.rates }, updated: cache.updated, source: "ExchangeRate-API" });
}
