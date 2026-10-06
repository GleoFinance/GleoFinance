"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { explorerToken, shortAddress } from "@/config/brand";
import type { AssetKind, AssetsSnapshot } from "@/lib/feeds/assets";
import { fmt, fmtCompact, useAgo } from "@/components/live/NetworkProvider";
import { Tag } from "@/components/ui";

const FILTERS: { id: "all" | AssetKind; label: string }[] = [
  { id: "all", label: "All" },
  { id: "stock", label: "Stocks" },
  { id: "etf", label: "Funds" },
  { id: "cash", label: "Dollars" },
  { id: "crypto", label: "Crypto" },
];

const price = (n: number | null) => (n === null ? "—" : n >= 1 ? `$${fmt(n, 2)}` : `$${n.toPrecision(3)}`);

export function AssetTable() {
  const [data, setData] = useState<AssetsSnapshot | null>(null);
  const [failed, setFailed] = useState(false);
  const [filter, setFilter] = useState<"all" | AssetKind>("all");
  const [query, setQuery] = useState("");
  const ago = useAgo(data?.readAt);

  useEffect(() => {
    let cancelled = false;
    const load = () =>
      fetch("/api/assets", { cache: "no-store" })
        .then((r) => r.json())
        .then((d: AssetsSnapshot) => !cancelled && (setData(d), setFailed(false)))
        .catch(() => !cancelled && setFailed(true));
    load();
    const t = window.setInterval(load, 60_000);
    return () => {
      cancelled = true;
      window.clearInterval(t);
    };
  }, []);

  const q = query.trim().toLowerCase();
  const rows = (data?.rows ?? []).filter(
    (r) => (filter === "all" || r.kind === filter) && (!q || r.symbol.toLowerCase().includes(q) || r.name.toLowerCase().includes(q) || r.address.toLowerCase().includes(q)),
  );

  return (
    <div>
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-1.5" role="tablist">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-sm font-semibold ${filter === f.id ? "border-ink bg-ink text-fog" : "border-line-2 text-ink-2 hover:border-ink"}`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search ticker, name or address" className="field md:max-w-xs" aria-label="Search assets" />
      </div>
      <p className="mt-4 text-[13px] text-ink-3">
        {failed && !data ? "Could not reach the asset feed. Retrying every minute." : data ? `Supply read on-chain, prices from ${data.priceSource}, ${ago}.` : "Reading the chain…"}
      </p>

      <ul className="mt-4 grid grid-cols-1 gap-3 md:hidden">
        {rows.map((r) => (
          <li key={r.address} className="rounded-2xl border border-line-2 bg-card p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-mono text-[15px] font-semibold">{r.symbol}</p>
                <p className="text-[13px] text-ink-3">{r.name}</p>
              </div>
              <p className="font-mono">{price(r.priceUsd)}</p>
            </div>
            <dl className="mt-3 grid grid-cols-2 gap-2 text-[13px]">
              <div>
                <dt className="text-ink-3">Supply</dt>
                <dd className="font-mono">{fmtCompact(r.supply)}</dd>
              </div>
              <div>
                <dt className="text-ink-3">On-chain value</dt>
                <dd className="font-mono">{r.supply !== null && r.priceUsd !== null ? `$${fmtCompact(r.supply * r.priceUsd)}` : "—"}</dd>
              </div>
            </dl>
            <a href={explorerToken(r.address)} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 font-mono text-[12px] text-sea-deep underline">
              {shortAddress(r.address)} <ArrowUpRight className="size-3" />
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-4 hidden overflow-x-auto md:block">
        <table className="w-full min-w-[760px] text-left text-[14px]">
          <thead className="label">
            <tr className="border-b border-line-2">
              <th className="py-2.5 font-normal">Asset</th>
              <th className="py-2.5 font-normal">Contract</th>
              <th className="py-2.5 text-right font-normal">Last price</th>
              <th className="py-2.5 text-right font-normal">Supply</th>
              <th className="py-2.5 text-right font-normal">On-chain value</th>
              <th className="py-2.5 text-right font-normal">Pool depth</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.address} className="border-b border-line align-top">
                <td className="py-3 pr-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono font-semibold">{r.symbol}</span>
                    {r.kind === "stock" || r.kind === "etf" ? <Tag tone="live">Beacon verified</Tag> : null}
                  </div>
                  <span className="text-[13px] text-ink-3">{r.name}</span>
                </td>
                <td className="py-3 pr-4">
                  <a href={explorerToken(r.address)} target="_blank" rel="noreferrer" className="font-mono text-[13px] text-sea-deep hover:underline">
                    {shortAddress(r.address)}
                  </a>
                </td>
                <td className="py-3 text-right font-mono">
                  {r.pair ? (
                    <a href={r.pair} target="_blank" rel="noreferrer" className="hover:underline">
                      {price(r.priceUsd)}
                    </a>
                  ) : (
                    <span title={r.kind === "cash" ? "Dollar token, priced at $1 by design" : undefined}>{price(r.priceUsd)}</span>
                  )}
                </td>
                <td className="py-3 text-right font-mono">{fmtCompact(r.supply)}</td>
                <td className="py-3 text-right font-mono">{r.supply !== null && r.priceUsd !== null ? `$${fmtCompact(r.supply * r.priceUsd)}` : "—"}</td>
                <td className="py-3 text-right font-mono">{r.liquidityUsd ? `$${fmtCompact(r.liquidityUsd)}` : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {data && !rows.length ? <p className="mt-6 text-sm text-ink-3">Nothing matches that search.</p> : null}
      <p className="mt-6 max-w-3xl text-[13px] leading-relaxed text-ink-3">
        Stock and fund tokens are listed only when their contract proxies the chain&apos;s stock-token beacon, their symbol matches and their name ends in
        &ldquo;Robinhood Token&rdquo;; tokens that borrow a ticker are left out. USDG is shown at $1 because it is a dollar token, not because of a trade.
        Last price is the most recent trade in the deepest pool and can lag the market when the stock exchange is closed. Want to move USDG?{" "}
        <Link href="/send" className="underline">
          Send it
        </Link>
        .
      </p>
    </div>
  );
}
