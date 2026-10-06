"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Tag } from "@/components/ui";
import { fmt, fmtUsdSmall, useAgo, useNetwork } from "@/components/live/NetworkProvider";

/**
 * A transfer slip filled with live readings: what moving 250 USDG on
 * Robinhood Chain costs and how long a block takes, right now.
 */
export function HeroSlip() {
  const { snap } = useNetwork();
  const ago = useAgo(snap?.readAt);
  const rows: [string, string][] = [
    ["Amount", "250.00 USDG"],
    ["Network fee", fmtUsdSmall(snap?.feeUsdgTransferUsd)],
    ["Block time", snap?.blockTime ? `${fmt(snap.blockTime, 2)} s` : "—"],
    ["Latest block", snap?.block ? `#${fmt(snap.block)}` : "—"],
  ];
  return (
    <div className="w-full max-w-[380px] rounded-2xl border border-line-2 bg-card p-5 shadow-[0_30px_60px_-36px_rgba(10,28,36,0.5)]">
      <div className="flex items-center justify-between gap-3">
        <p className="font-display text-lg font-semibold">Transfer slip</p>
        <Tag tone="live" />
      </div>
      <p className="mt-1 text-[13px] text-ink-3">A USDG payment on Robinhood Chain, priced {ago}.</p>
      <dl className="mt-4 divide-y divide-dashed divide-line-2 border-y border-dashed border-line-2">
        {rows.map(([k, v]) => (
          <div key={k} className="flex items-baseline justify-between gap-4 py-2.5">
            <dt className="text-sm text-ink-2">{k}</dt>
            <dd className="font-mono text-[14px] font-medium tabular-nums">{v}</dd>
          </div>
        ))}
      </dl>
      <Link href="/send" className="btn btn-ink mt-4 h-10 w-full text-sm">
        Send one yourself <ArrowRight className="size-4" />
      </Link>
    </div>
  );
}
