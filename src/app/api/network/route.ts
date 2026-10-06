import { NextResponse } from "next/server";
import { networkSnapshot } from "@/lib/feeds/network";

export const dynamic = "force-dynamic";

/** Live Robinhood Chain figures for the network panel and the live tiles. */
export async function GET() {
  const snap = await networkSnapshot();
  return NextResponse.json(snap, { headers: { "cache-control": "no-store" }, status: snap.ok ? 200 : 503 });
}
