import { NextResponse } from "next/server";
import { assetsSnapshot } from "@/lib/feeds/assets";

export const dynamic = "force-dynamic";

/** Tokenized assets on Robinhood Chain with live supply and last DEX price. */
export async function GET() {
  return NextResponse.json(await assetsSnapshot(), { headers: { "cache-control": "no-store" } });
}
