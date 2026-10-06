import { NextResponse } from "next/server";
import { ethUsd } from "@/lib/feeds/price";

export const dynamic = "force-dynamic";

/** ETH/USD for fee estimates. Returns 503 rather than a guessed number. */
export async function GET() {
  const quote = await ethUsd();
  if (!quote) return NextResponse.json({ error: "price unavailable" }, { status: 503 });
  return NextResponse.json({ usd: quote.usd, change24h: quote.change24h, source: quote.source });
}
