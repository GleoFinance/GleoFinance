"use client";

import { useMemo, useState } from "react";
import type { Receipt } from "@/lib/practice";
import { Gate } from "@/components/app/Gate";
import { PracticeNote } from "@/components/app/AppFrame";
import { ReceiptLog } from "@/components/app/ReceiptLog";
import { usePractice } from "@/components/app/usePractice";
import { usePrices } from "@/components/app/useLiveData";
import { Feedback, cleanDecimal, num, useAction } from "@/components/app/useAction";
import { fmt } from "@/components/live/NetworkProvider";

// Practice market parameters. They show how the money market will be set up;
// the numbers are proposals, not live rates.
const MARKETS = [
  { symbol: "USDG", factor: 0.85, base: 0.02, slope: 0.18, depth: 5_000_000, borrowed: 3_100_000 },
  { symbol: "WETH", factor: 0.8, base: 0.01, slope: 0.12, depth: 1_200, borrowed: 420 },
  { symbol: "SPY", factor: 0.65, base: 0.015, slope: 0.15, depth: 2_000, borrowed: 500 },
  { symbol: "NVDA", factor: 0.6, base: 0.02, slope: 0.2, depth: 6_000, borrowed: 1_900 },
  { symbol: "AAPL", factor: 0.6, base: 0.02, slope: 0.2, depth: 4_000, borrowed: 1_100 },
];
const ACTIONS = ["Supply", "Withdraw", "Borrow", "Repay"] as const;
type Act = (typeof ACTIONS)[number];
type Position = Record<string, { supplied: number; borrowed: number }>;

function replay(receipts: Receipt[]): Position {
  const pos: Position = Object.fromEntries(MARKETS.map((m) => [m.symbol, { supplied: 0, borrowed: 0 }]));
  for (const r of receipts) {
    const p = pos[r.details.Market];
    const a = num(r.details.Amount);
    if (!p || !(a > 0)) continue;
    if (r.details.Action === "Supply") p.supplied += a;
    if (r.details.Action === "Withdraw") p.supplied -= a;
    if (r.details.Action === "Borrow") p.borrowed += a;
    if (r.details.Action === "Repay") p.borrowed -= a;
  }
  return pos;
}

function health(pos: Position, prices: Record<string, number>) {
  let limit = 0;
  let debt = 0;
  for (const m of MARKETS) {
    const price = prices[m.symbol];
    if (!price) continue;
    limit += pos[m.symbol].supplied * price * m.factor;
    debt += pos[m.symbol].borrowed * price;
  }
  return { limit, debt, factor: debt > 0 ? limit / debt : Infinity };
}

const apr = (m: (typeof MARKETS)[number]) => {
  const u = m.borrowed / m.depth;
  const borrow = m.base + m.slope * u;
  return { u, borrow, supply: borrow * u * 0.9 };
};

export function LendTool() {
  return (
    <div className="space-y-8">
      <PracticeNote>
        Gleo&apos;s money market is not deployed. Rates and collateral factors are proposed parameters, prices are live, and every supply or borrow is a
        signed receipt. Interest does not accrue in practice mode, and amounts are not taken from your wallet.
      </PracticeNote>
      <Gate what="open a practice position" needsChain={false}>
        <Market />
      </Gate>
    </div>
  );
}

function Market() {
  const { receipts, record, clear } = usePractice("lend");
  const { prices, ready } = usePrices();
  const pos = useMemo(() => replay(receipts), [receipts]);
  const h = health(pos, prices);
  const act = useAction();
  const [symbol, setSymbol] = useState("USDG");
  const [action, setAction] = useState<Act>("Supply");
  const [amount, setAmount] = useState("");

  const submit = () =>
    act.run(async () => {
      const a = num(amount);
      if (!(a > 0)) throw new Error("Enter an amount above zero.");
      if (!prices[symbol]) throw new Error("Waiting for a live price for this market.");
      const next: Position = JSON.parse(JSON.stringify(pos));
      const p = next[symbol];
      if (action === "Supply") p.supplied += a;
      if (action === "Withdraw") {
        if (a > p.supplied + 1e-9) throw new Error(`You have ${fmt(p.supplied, 4)} ${symbol} supplied.`);
        p.supplied -= a;
      }
      if (action === "Borrow") p.borrowed += a;
      if (action === "Repay") {
        if (a > p.borrowed + 1e-9) throw new Error(`You owe ${fmt(p.borrowed, 4)} ${symbol}.`);
        p.borrowed -= a;
      }
      const after = health(next, prices);
      if ((action === "Borrow" || action === "Withdraw") && after.factor < 1) throw new Error(`That would leave a health factor of ${fmt(after.factor, 2)}. It must stay above 1.`);
      await record({
        Action: action,
        Market: symbol,
        Amount: String(a),
        "Price used": `$${prices[symbol].toFixed(symbol === "USDG" ? 2 : 4)}`,
        "Health after": Number.isFinite(after.factor) ? after.factor.toFixed(2) : "no debt",
      });
      setAmount("");
      return `${action} ${a} ${symbol} recorded.`;
    });

  return (
    <div className="space-y-12">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-[14px]">
          <thead className="label">
            <tr className="border-b border-line-2">
              <th className="py-2 font-normal">Market</th>
              <th className="py-2 text-right font-normal">Live price</th>
              <th className="py-2 text-right font-normal">Collateral factor</th>
              <th className="py-2 text-right font-normal">Supply APR</th>
              <th className="py-2 text-right font-normal">Borrow APR</th>
              <th className="py-2 text-right font-normal">Your supply</th>
              <th className="py-2 text-right font-normal">Your debt</th>
            </tr>
          </thead>
          <tbody>
            {MARKETS.map((m) => {
              const r = apr(m);
              return (
                <tr key={m.symbol} className="border-b border-line">
                  <td className="py-2.5 font-mono font-semibold">{m.symbol}</td>
                  <td className="py-2.5 text-right font-mono">{prices[m.symbol] ? `$${fmt(prices[m.symbol], 2)}` : ready ? "no price" : "…"}</td>
                  <td className="py-2.5 text-right font-mono">{Math.round(m.factor * 100)}%</td>
                  <td className="py-2.5 text-right font-mono">{(r.supply * 100).toFixed(2)}%</td>
                  <td className="py-2.5 text-right font-mono">{(r.borrow * 100).toFixed(2)}%</td>
                  <td className="py-2.5 text-right font-mono">{fmt(pos[m.symbol].supplied, 4)}</td>
                  <td className="py-2.5 text-right font-mono">{fmt(pos[m.symbol].borrowed, 4)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p className="mt-2 text-[12.5px] text-ink-3">APRs use a proposed kinked rate model on illustrative pool depth. Prices are live from Robinhood Chain pools.</p>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
        <form
          className="min-w-0 space-y-4 border border-line bg-paper p-5"
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <div className="grid grid-cols-4 gap-1 rounded-full bg-paper-2 p-1">
            {ACTIONS.map((a) => (
              <button key={a} type="button" aria-pressed={action === a} onClick={() => setAction(a)} className={`cursor-pointer rounded-full py-1.5 text-[13px] font-semibold ${action === a ? "bg-ink text-fog" : "text-ink-2"}`}>
                {a}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-[minmax(0,1fr)_120px] gap-2">
            <input aria-label="Amount" inputMode="decimal" className="field font-mono text-lg" placeholder="0.00" value={amount} onChange={(e) => setAmount(cleanDecimal(e.target.value))} />
            <select aria-label="Market" className="field" value={symbol} onChange={(e) => setSymbol(e.target.value)}>
              {MARKETS.map((m) => (
                <option key={m.symbol}>{m.symbol}</option>
              ))}
            </select>
          </div>
          <p className="text-[13px] text-ink-3">{amount && prices[symbol] ? `About $${fmt(num(amount) * prices[symbol], 2)} at the live price.` : "Amounts are practice amounts."}</p>
          <button type="submit" disabled={act.busy} className="btn btn-ink h-11 w-full">
            {act.busy ? "Sign in your wallet…" : `Sign practice ${action.toLowerCase()}`}
          </button>
          <Feedback error={act.error} done={act.done} />
        </form>
        <div className="min-w-0">
          <dl className="grid grid-cols-1 gap-px overflow-hidden border border-line-2 bg-line-2 sm:grid-cols-3">
            {[
              ["Borrow limit", `$${fmt(h.limit, 2)}`],
              ["Debt", `$${fmt(h.debt, 2)}`],
              ["Health factor", Number.isFinite(h.factor) ? fmt(h.factor, 2) : "no debt"],
            ].map(([k, v]) => (
              <div key={k} className="bg-paper p-4">
                <dt className="text-sm text-ink-3">{k}</dt>
                <dd className={`mt-1 font-display text-[28px] leading-[1.2] tracking-[-0.02em] ${k === "Health factor" && h.factor < 1.2 ? "text-down" : ""}`}>{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-[13px] leading-relaxed text-ink-3">
            The health factor is your borrow limit divided by your debt, both at live prices. Below 1 the position could be liquidated in the real market; here
            it simply turns red when prices move against you.
          </p>
        </div>
      </div>
      <div>
        <h2 className="font-display text-[28px] leading-[1.2] tracking-[-0.02em]">Signed receipts</h2>
        <div className="mt-4">
          <ReceiptLog receipts={receipts} onClear={clear} describe={(r) => `${r.details.Action} ${r.details.Amount} ${r.details.Market} · health ${r.details["Health after"]}`} />
        </div>
      </div>
    </div>
  );
}
