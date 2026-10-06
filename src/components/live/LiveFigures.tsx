"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Figures, Tag } from "@/components/ui";
import { fmt, fmtCompact, fmtUsdSmall, useAgo, useNetwork } from "@/components/live/NetworkProvider";

/** Four live readings from Robinhood Chain, each with where it came from. */
export function LiveFigures({ dark = false, withLink = true }: { dark?: boolean; withLink?: boolean }) {
  const { snap, error } = useNetwork();
  const ago = useAgo(snap?.readAt);
  return (
    <div>
      <div className={`mb-4 flex flex-wrap items-center gap-3 text-sm ${dark ? "text-fog-2" : "text-ink-3"}`}>
        <Tag tone="live" />
        <span>
          {error && !snap ? "Chain unreachable right now. Retrying." : `Read from Robinhood Chain ${ago}`}
        </span>
        {withLink ? (
          <Link href="/network" className={`ml-auto inline-flex items-center gap-1 font-semibold ${dark ? "text-fog" : "text-sea-deep"}`}>
            Full network panel <ArrowRight className="size-3.5" />
          </Link>
        ) : null}
      </div>
      <Figures
        dark={dark}
        items={[
          {
            label: "Average block time",
            value: snap?.blockTime ? `${fmt(snap.blockTime, 2)}s` : "—",
            note: "Over the last 120 blocks",
          },
          {
            label: "Cost of a USDG transfer",
            value: fmtUsdSmall(snap?.feeUsdgTransferUsd),
            note: snap?.gasUsdgTransfer ? `${fmt(snap.gasUsdgTransfer)} gas at ${fmt(snap.gasPriceGwei, 4)} gwei, ETH from ${snap.priceSource ?? "—"}` : "Gas estimate × gas price × ETH price",
          },
          {
            label: "Latest block",
            value: snap?.block ? `#${fmt(snap.block)}` : "—",
            note: "Robinhood Chain mainnet, chain id 4663",
          },
          {
            label: "USDG in circulation",
            value: snap?.usdgSupply ? `$${fmtCompact(snap.usdgSupply)}` : "—",
            note: "totalSupply() of the USDG contract",
          },
        ]}
      />
    </div>
  );
}
