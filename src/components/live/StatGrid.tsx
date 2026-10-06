"use client";

import { fmt, fmtUsdSmall, useAgo, useNetwork } from "@/components/live/NetworkProvider";

const compact0 = (n: number) => n.toLocaleString("en-US", { notation: "compact", maximumFractionDigits: 0 });

/**
 * Four live readings in the reference's stat-grid shape: two grey cells, one
 * black, one white. Every value comes from Robinhood Chain via /api/network.
 */
export function StatGrid() {
  const { snap, error } = useNetwork();
  const ago = useAgo(snap?.readAt);
  const status = error && !snap ? "Chain unreachable, retrying" : `Live, read ${ago}`;
  return (
    <div className="grid grid-cols-1 border border-rule sm:grid-cols-2 xl:grid-cols-[1.6fr_1.5fr_0.8fr_1.45fr]">
      <div className="flex min-h-[220px] min-w-0 flex-col border-b border-rule bg-paper-2 p-4 sm:border-r xl:min-h-[248px] xl:border-b-0">
        <p className="text-[16px] font-medium">USDG in circulation</p>
        <p className="mt-4 font-display text-[clamp(3.4rem,2.6rem+3vw,6.4rem)] leading-none tracking-[-0.03em] whitespace-nowrap tabular-nums">
          {snap?.usdgSupply ? `$${compact0(snap.usdgSupply)}` : "—"}
        </p>
        <p className="mt-auto max-w-[200px] pt-4 text-[12px] leading-snug">totalSupply() of the USDG contract on Robinhood Chain</p>
      </div>
      <div className="flex min-h-[220px] min-w-0 flex-col border-b border-rule bg-paper-2 p-4 xl:min-h-[248px] xl:border-r xl:border-b-0">
        <p className="text-[16px] font-medium">Latest block</p>
        <p className="mt-4 font-display text-[clamp(2.4rem,1.9rem+1.5vw,3.3rem)] leading-none tracking-[-0.03em] whitespace-nowrap tabular-nums">
          {snap?.block ? fmt(snap.block) : "—"}
        </p>
        <p className="mt-auto self-end pt-4 text-[12px]">chain id 4663</p>
      </div>
      <div className="flex min-h-[220px] min-w-0 flex-col border-b border-rule bg-night p-4 text-fog sm:border-r sm:border-b-0 xl:min-h-[248px]">
        <p className="text-[16px] font-medium">Block time</p>
        <p className="mt-4 text-center font-display text-[clamp(3rem,2.4rem+2.4vw,4.8rem)] leading-none tracking-[-0.03em] text-[#d6d3c4] tabular-nums">
          {snap?.blockTime ? fmt(snap.blockTime, 2) : "—"}
        </p>
        <p className="mt-auto self-end pt-4 text-[12px]">Seconds, 120-block average</p>
      </div>
      <div className="flex min-h-[220px] min-w-0 flex-col bg-paper p-4 xl:min-h-[248px]">
        <p className="text-[9px] leading-snug">{status}</p>
        <p className="mt-6 font-display text-[clamp(2.2rem,1.8rem+1.4vw,3.2rem)] leading-none tracking-[-0.02em] whitespace-nowrap tabular-nums">
          {fmtUsdSmall(snap?.feeUsdgTransferUsd)}
        </p>
        <p className="mt-auto max-w-[220px] pt-4 text-[16px] leading-tight font-medium">Cost of a USDG transfer right now</p>
      </div>
    </div>
  );
}
