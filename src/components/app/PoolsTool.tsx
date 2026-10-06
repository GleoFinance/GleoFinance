"use client";

import { useMemo, useState } from "react";
import { ArrowDownUp } from "lucide-react";
import type { Receipt } from "@/lib/practice";
import { Gate } from "@/components/app/Gate";
import { PracticeNote } from "@/components/app/AppFrame";
import { ReceiptLog } from "@/components/app/ReceiptLog";
import { usePractice } from "@/components/app/usePractice";
import { usePrices } from "@/components/app/useLiveData";
import { Feedback, cleanDecimal, num, useAction } from "@/components/app/useAction";
import { fmt } from "@/components/live/NetworkProvider";

const POOLS = ["WETH", "SPY", "NVDA", "TSLA"];
const FEE = 0.003;
const SEED_USDG = 1_000_000;
const SEED_SHARES = 1_000_000;

type Pool = { usdg: number; asset: number; shares: number; mine: number };

/** Pool state per pair: the reserves written in the latest receipt, else a seed at the live price. */
function replay(receipts: Receipt[], prices: Record<string, number>) {
  const pools: Record<string, Pool | null> = {};
  for (const sym of POOLS) pools[sym] = prices[sym] ? { usdg: SEED_USDG, asset: SEED_USDG / prices[sym], shares: SEED_SHARES, mine: 0 } : null;
  for (const r of receipts) {
    const sym = r.details.Pool?.replace("USDG/", "");
    if (!sym || !(sym in pools)) continue;
    pools[sym] = {
      usdg: num(r.details["USDG reserve after"]),
      asset: num(r.details[`${sym} reserve after`]),
      shares: num(r.details["Total shares after"]),
      mine: num(r.details["Your shares after"]),
    };
  }
  return pools;
}

const out = (amountIn: number, rin: number, rout: number) => {
  const inFee = amountIn * (1 - FEE);
  return (inFee * rout) / (rin + inFee);
};

export function PoolsTool() {
  return (
    <div className="space-y-8">
      <PracticeNote>
        Gleo&apos;s pools are not deployed. Each practice pool starts with $1,000,000 of USDG against the asset at its live price, then follows the constant-product
        rule (x · y = k, 0.30% fee) through your signed receipts. Amounts are not taken from your wallet.
      </PracticeNote>
      <Gate what="use a practice pool" needsChain={false}>
        <Pools />
      </Gate>
    </div>
  );
}

function Pools() {
  const { receipts, record, clear } = usePractice("pools");
  const { prices, ready } = usePrices();
  const pools = useMemo(() => replay(receipts, prices), [receipts, prices]);
  const [sym, setSym] = useState("WETH");
  const [mode, setMode] = useState<"Swap" | "Add" | "Remove">("Swap");
  const [sellUsdg, setSellUsdg] = useState(true);
  const [amount, setAmount] = useState("");
  const act = useAction();
  const pool = pools[sym];
  const a = num(amount);

  const preview = useMemo(() => {
    if (!pool || !(a > 0)) return null;
    if (mode === "Swap") {
      const o = sellUsdg ? out(a, pool.usdg, pool.asset) : out(a, pool.asset, pool.usdg);
      const spot = pool.usdg / pool.asset;
      const exec = sellUsdg ? a / o : o / a;
      return { text: `${fmt(o, sellUsdg ? 6 : 2)} ${sellUsdg ? sym : "USDG"}`, impact: Math.abs(exec / spot - 1) * 100 };
    }
    if (mode === "Add") return { text: `${fmt((a / pool.usdg) * pool.asset, 6)} ${sym} paired, ${fmt((a / pool.usdg) * pool.shares, 2)} shares`, impact: 0 };
    const pct = Math.min(100, a) / 100;
    return { text: `${fmt(pool.mine * pct * (pool.usdg / pool.shares), 2)} USDG + ${fmt(pool.mine * pct * (pool.asset / pool.shares), 6)} ${sym}`, impact: 0 };
  }, [pool, a, mode, sellUsdg, sym]);

  const submit = () =>
    act.run(async () => {
      if (!pool) throw new Error("Waiting for a live price to seed this pool.");
      if (!(a > 0)) throw new Error("Enter an amount above zero.");
      const next = { ...pool };
      let line: Record<string, string> = {};
      if (mode === "Swap") {
        if (sellUsdg) {
          const o = out(a, next.usdg, next.asset);
          next.usdg += a;
          next.asset -= o;
          line = { "You pay": `${a} USDG`, "You receive": `${o.toFixed(8)} ${sym}` };
        } else {
          const o = out(a, next.asset, next.usdg);
          next.asset += a;
          next.usdg -= o;
          line = { "You pay": `${a} ${sym}`, "You receive": `${o.toFixed(4)} USDG` };
        }
      } else if (mode === "Add") {
        const minted = (a / next.usdg) * next.shares;
        const paired = (a / next.usdg) * next.asset;
        next.usdg += a;
        next.asset += paired;
        next.shares += minted;
        next.mine += minted;
        line = { "You add": `${a} USDG + ${paired.toFixed(8)} ${sym}`, "Shares minted": minted.toFixed(4) };
      } else {
        if (next.mine <= 0) throw new Error("You have no shares in this pool.");
        const pct = Math.min(100, a) / 100;
        const burn = next.mine * pct;
        const u = burn * (next.usdg / next.shares);
        const s = burn * (next.asset / next.shares);
        next.usdg -= u;
        next.asset -= s;
        next.shares -= burn;
        next.mine -= burn;
        line = { "You remove": `${(pct * 100).toFixed(0)}% of your shares`, "You receive": `${u.toFixed(4)} USDG + ${s.toFixed(8)} ${sym}` };
      }
      await record({
        Action: mode === "Swap" ? "Swap" : mode === "Add" ? "Add liquidity" : "Remove liquidity",
        Pool: `USDG/${sym}`,
        ...line,
        "USDG reserve after": next.usdg.toFixed(6),
        [`${sym} reserve after`]: next.asset.toFixed(10),
        "Total shares after": next.shares.toFixed(6),
        "Your shares after": next.mine.toFixed(6),
      });
      setAmount("");
      return `${mode} recorded.`;
    });

  return (
    <div className="space-y-12">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-[14px]">
          <thead className="label">
            <tr className="border-b border-line-2">
              <th className="py-2 font-normal">Pool</th>
              <th className="py-2 text-right font-normal">Live market price</th>
              <th className="py-2 text-right font-normal">Pool price</th>
              <th className="py-2 text-right font-normal">Reserves</th>
              <th className="py-2 text-right font-normal">Your share</th>
            </tr>
          </thead>
          <tbody>
            {POOLS.map((s) => {
              const p = pools[s];
              return (
                <tr key={s} className={`cursor-pointer border-b border-line ${s === sym ? "bg-card" : ""}`} onClick={() => setSym(s)}>
                  <td className="py-2.5 font-mono font-semibold">USDG/{s}</td>
                  <td className="py-2.5 text-right font-mono">{prices[s] ? `$${fmt(prices[s], 2)}` : ready ? "no price" : "…"}</td>
                  <td className="py-2.5 text-right font-mono">{p ? `$${fmt(p.usdg / p.asset, 2)}` : "—"}</td>
                  <td className="py-2.5 text-right font-mono">{p ? `${fmt(p.usdg / 1000, 0)}k USDG · ${fmt(p.asset, 2)} ${s}` : "—"}</td>
                  <td className="py-2.5 text-right font-mono">{p && p.mine > 0 ? `${fmt((p.mine / p.shares) * 100, 4)}%` : "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
        <form
          className="min-w-0 space-y-4 rounded-2xl border border-line-2 bg-card p-5"
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <div className="flex items-center justify-between gap-3">
            <select aria-label="Pool" className="field max-w-[180px]" value={sym} onChange={(e) => setSym(e.target.value)}>
              {POOLS.map((s) => (
                <option key={s} value={s}>
                  USDG/{s}
                </option>
              ))}
            </select>
            <div className="flex gap-1 rounded-full bg-paper p-1">
              {(["Swap", "Add", "Remove"] as const).map((m) => (
                <button key={m} type="button" aria-pressed={mode === m} onClick={() => setMode(m)} className={`cursor-pointer rounded-full px-3 py-1.5 text-[13px] font-semibold ${mode === m ? "bg-ink text-fog" : "text-ink-2"}`}>
                  {m}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label className="label" htmlFor="pool-amount">
                {mode === "Swap" ? `You pay (${sellUsdg ? "USDG" : sym})` : mode === "Add" ? "USDG to add" : "Percent of your shares"}
              </label>
              {mode === "Swap" ? (
                <button type="button" onClick={() => setSellUsdg((v) => !v)} className="inline-flex cursor-pointer items-center gap-1 text-[12.5px] font-semibold text-sea-deep">
                  <ArrowDownUp className="size-3.5" /> Flip
                </button>
              ) : null}
            </div>
            <input id="pool-amount" inputMode="decimal" className="field mt-1.5 font-mono text-lg" value={amount} onChange={(e) => setAmount(cleanDecimal(e.target.value))} placeholder={mode === "Remove" ? "50" : "1000"} />
          </div>
          <div className="rounded-xl bg-paper px-4 py-3 text-[14px]">
            <p className="text-ink-2">{mode === "Swap" ? "You receive" : mode === "Add" ? "Result" : "You receive"}</p>
            <p className="mt-0.5 font-mono font-semibold break-all">{preview?.text ?? "—"}</p>
            {preview && mode === "Swap" ? <p className={`mt-1 text-[12.5px] ${preview.impact > 2 ? "text-down" : "text-ink-3"}`}>Price impact {fmt(preview.impact, 2)}% · fee 0.30%</p> : null}
          </div>
          <button type="submit" disabled={act.busy} className="btn btn-ink h-11 w-full">
            {act.busy ? "Sign in your wallet…" : `Sign practice ${mode.toLowerCase()}`}
          </button>
          <Feedback error={act.error} done={act.done} />
        </form>
        <div className="min-w-0 text-[14.5px] leading-relaxed text-ink-2">
          <h3 className="font-display text-xl font-semibold text-ink">How the pool prices a trade</h3>
          <p className="mt-2">
            A pool holds two reserves and keeps their product constant. Buying the asset adds USDG and removes the asset, so each extra unit costs a little
            more. That is price impact, and it is why deep pools matter for tokenized stocks.
          </p>
          <p className="mt-2">
            Liquidity providers own a share of both reserves and earn the 0.30% fee on every trade. Remove liquidity and you get your share of whatever the
            reserves hold at that moment.
          </p>
        </div>
      </div>
      <div>
        <h2 className="font-display text-2xl font-semibold">Signed receipts</h2>
        <div className="mt-4">
          <ReceiptLog receipts={receipts} onClear={clear} describe={(r) => `${r.details.Action} · ${r.details.Pool}${r.details["You pay"] ? ` · ${r.details["You pay"]}` : ""}`} />
        </div>
      </div>
    </div>
  );
}
