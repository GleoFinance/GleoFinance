"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { CHAIN } from "@/config/brand";
import { LiveFigures } from "@/components/live/LiveFigures";
import { fmt, fmtUsdSmall, useNetwork } from "@/components/live/NetworkProvider";
import { Figures } from "@/components/ui";

export function NetworkPanel() {
  const { snap } = useNetwork();
  const [payments, setPayments] = useState("1000");
  const n = Math.max(0, Math.min(10_000_000, Number(payments.replace(/[^0-9]/g, "")) || 0));
  return (
    <div className="space-y-14">
      <LiveFigures withLink={false} />

      <Figures
        items={[
          { label: "Gas price", value: snap ? `${fmt(snap.gasPriceGwei, 4)}` : "—", note: "gwei, from eth_gasPrice" },
          { label: "ETH transfer", value: fmtUsdSmall(snap?.feeEthTransferUsd), note: "21,000 gas at the current price" },
          { label: "Transactions per second", value: snap?.txPerSecond ? fmt(snap.txPerSecond, 1) : "—", note: "Last 8 blocks over the average block time; approximate" },
          { label: "ETH price", value: snap?.ethUsd ? `$${fmt(snap.ethUsd, 2)}` : "—", note: snap?.priceSource ? `${snap.priceSource}, used to price fees` : "OKX, used to price fees" },
        ]}
      />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="min-w-0">
          <h2 className="font-display text-2xl font-semibold">Latest blocks</h2>
          <table className="mt-4 w-full text-left text-[14px]">
            <thead className="label">
              <tr className="border-b border-line-2">
                <th className="py-2 font-normal">Block</th>
                <th className="py-2 font-normal">Txs</th>
                <th className="py-2 text-right font-normal">Gas used</th>
              </tr>
            </thead>
            <tbody>
              {(snap?.recent ?? []).map((b) => (
                <tr key={b.number} className="border-b border-line">
                  <td className="py-2 font-mono">
                    <a href={`${CHAIN.explorer}/block/${b.number}`} target="_blank" rel="noreferrer" className="underline-offset-2 hover:underline">
                      #{fmt(b.number)}
                    </a>
                  </td>
                  <td className="py-2 font-mono">{b.txs}</td>
                  <td className="py-2 text-right font-mono">{fmt(b.gasUsed)}</td>
                </tr>
              ))}
              {!snap ? (
                <tr>
                  <td colSpan={3} className="py-4 text-ink-3">
                    Reading the chain…
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
        <div className="min-w-0">
          <h2 className="font-display text-2xl font-semibold">What would a payroll cost?</h2>
          <p className="mt-2 text-[15px] text-ink-2">Network fees for sending USDG to many people, priced at this moment. Fees move with gas and ETH prices.</p>
          <label htmlFor="payroll" className="label mt-5 block">
            Number of USDG payments
          </label>
          <input id="payroll" value={payments} onChange={(e) => setPayments(e.target.value)} inputMode="numeric" className="field mt-2 font-mono text-lg" />
          <dl className="mt-4 divide-y divide-line-2 border-y border-line-2">
            <div className="flex justify-between gap-4 py-3">
              <dt className="text-ink-2">Fee per payment</dt>
              <dd className="font-mono">{fmtUsdSmall(snap?.feeUsdgTransferUsd)}</dd>
            </div>
            <div className="flex justify-between gap-4 py-3">
              <dt className="text-ink-2">Total for {fmt(n)} payments</dt>
              <dd className="font-mono font-semibold">{snap?.feeUsdgTransferUsd ? fmtUsdSmall(snap.feeUsdgTransferUsd * n) : "—"}</dd>
            </div>
          </dl>
        </div>
      </div>

      <NetworkDetails />
    </div>
  );
}

function NetworkDetails() {
  const [copied, setCopied] = useState<string | null>(null);
  const rows: [string, string][] = [
    ["Network name", CHAIN.name],
    ["Chain id", `${CHAIN.id} (${CHAIN.hex})`],
    ["RPC", CHAIN.publicRpc],
    ["Currency", CHAIN.nativeSymbol],
    ["Explorer", CHAIN.explorer],
  ];
  return (
    <div>
      <h2 className="font-display text-2xl font-semibold">Add the network by hand</h2>
      <p className="mt-2 max-w-2xl text-[15px] text-ink-2">Connecting through Gleo adds it for you. If your wallet asks for the details instead, these are the values.</p>
      <dl className="mt-4 divide-y divide-line-2 rounded-2xl border border-line-2 bg-card">
        {rows.map(([k, v]) => (
          <div key={k} className="grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-[160px_minmax(0,1fr)_auto] sm:items-center sm:gap-4">
            <dt className="text-sm text-ink-3">{k}</dt>
            <dd className="min-w-0 font-mono text-[13.5px] break-all">{v}</dd>
            <dd>
              <button
                type="button"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(v);
                    setCopied(k);
                    setTimeout(() => setCopied(null), 1200);
                  } catch {
                    // value stays visible to copy by hand
                  }
                }}
                className="inline-flex cursor-pointer items-center gap-1 text-[13px] font-semibold text-sea-deep"
              >
                {copied === k ? <Check className="size-3.5" /> : <Copy className="size-3.5" />} {copied === k ? "Copied" : "Copy"}
              </button>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
