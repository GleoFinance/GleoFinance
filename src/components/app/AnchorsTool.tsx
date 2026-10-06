"use client";

import { useMemo, useState } from "react";
import { Gate } from "@/components/app/Gate";
import { PracticeNote } from "@/components/app/AppFrame";
import { ReceiptLog } from "@/components/app/ReceiptLog";
import { usePractice } from "@/components/app/usePractice";
import { usePolled } from "@/components/app/useLiveData";
import { Feedback, cleanDecimal, num, useAction } from "@/components/app/useAction";
import { fmt } from "@/components/live/NetworkProvider";
import { Tag } from "@/components/ui";

type Corridor = { code: string; country: string; rail: string; minutes: string; feePct: number; flat: number };

// Illustrative corridor terms. No anchor is connected to Gleo yet; these show
// how a corridor will be presented, and the page labels them as examples.
export const CORRIDORS: Corridor[] = [
  { code: "USD", country: "United States", rail: "ACH or wire", minutes: "same day", feePct: 0.25, flat: 1 },
  { code: "EUR", country: "Euro area", rail: "SEPA Instant", minutes: "minutes", feePct: 0.3, flat: 0.5 },
  { code: "GBP", country: "United Kingdom", rail: "Faster Payments", minutes: "minutes", feePct: 0.3, flat: 0.5 },
  { code: "MXN", country: "Mexico", rail: "SPEI", minutes: "minutes", feePct: 0.6, flat: 10 },
  { code: "BRL", country: "Brazil", rail: "Pix", minutes: "minutes", feePct: 0.6, flat: 2 },
  { code: "PHP", country: "Philippines", rail: "Cash pickup or e-wallet", minutes: "hours", feePct: 1, flat: 30 },
  { code: "NGN", country: "Nigeria", rail: "Bank transfer", minutes: "hours", feePct: 1, flat: 500 },
  { code: "KES", country: "Kenya", rail: "Mobile money", minutes: "minutes", feePct: 1, flat: 50 },
  { code: "INR", country: "India", rail: "UPI", minutes: "minutes", feePct: 0.8, flat: 20 },
  { code: "IDR", country: "Indonesia", rail: "Bank transfer", minutes: "hours", feePct: 0.8, flat: 5000 },
];

type Fx = { rates: Record<string, number>; updated: string; source: string };

export function AnchorsTool() {
  const { data: fx, failed } = usePolled<Fx>("/api/fx", 3_600_000);
  return (
    <div className="space-y-10">
      <PracticeNote>
        No anchor is connected to Gleo yet. Corridors and fees below are examples of how terms will be shown; FX uses daily reference rates. Deposits and
        withdrawals are signed receipts, and no money or tokens move.
      </PracticeNote>
      <div>
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="font-display text-[28px] leading-[1.2] tracking-[-0.02em]">Anchor directory</h2>
          <p className="text-[13px] text-ink-3">
            {fx ? (
              <>
                Reference rates by{" "}
                <a href="https://www.exchangerate-api.com" target="_blank" rel="noreferrer" className="underline">
                  ExchangeRate-API
                </a>
                , {fx.updated.replace(/ \+0000$/, " UTC")}
              </>
            ) : failed ? (
              "Reference rates unavailable right now"
            ) : (
              "Loading reference rates…"
            )}
          </p>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-[14px]">
            <thead className="label">
              <tr className="border-b border-line-2">
                <th className="py-2 font-normal">Currency</th>
                <th className="py-2 font-normal">Rail</th>
                <th className="py-2 font-normal">Speed</th>
                <th className="py-2 text-right font-normal">1 USDG =</th>
                <th className="py-2 text-right font-normal">Example fee</th>
                <th className="py-2 text-right font-normal">Status</th>
              </tr>
            </thead>
            <tbody>
              {CORRIDORS.map((c) => (
                <tr key={c.code} className="border-b border-line">
                  <td className="py-2.5">
                    <span className="font-mono font-semibold">{c.code}</span> <span className="text-ink-3">{c.country}</span>
                  </td>
                  <td className="py-2.5">{c.rail}</td>
                  <td className="py-2.5">{c.minutes}</td>
                  <td className="py-2.5 text-right font-mono">{fx?.rates[c.code] ? fmt(fx.rates[c.code], c.code === "IDR" ? 0 : 3) : "—"}</td>
                  <td className="py-2.5 text-right font-mono">
                    {c.feePct}% + {fmt(c.flat)} {c.code}
                  </td>
                  <td className="py-2.5 text-right">
                    <Tag tone="practice">Seeking anchor</Tag>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Gate what="try a deposit or withdrawal" needsChain={false}>
        <Desk fx={fx} />
      </Gate>
    </div>
  );
}

function Desk({ fx }: { fx: Fx | null }) {
  const { receipts, record, clear } = usePractice("anchors");
  const act = useAction();
  const [dir, setDir] = useState<"Deposit" | "Withdraw">("Deposit");
  const [code, setCode] = useState("EUR");
  const [amount, setAmount] = useState("");
  const [kyc, setKyc] = useState(false);
  const c = CORRIDORS.find((x) => x.code === code)!;
  const rate = fx?.rates[code] ?? null;

  const quote = useMemo(() => {
    const a = num(amount);
    if (!(a > 0) || !rate) return null;
    if (dir === "Deposit") {
      // fiat in → USDG out
      const fee = a * (c.feePct / 100) + c.flat;
      const net = a - fee;
      return { fee, out: net > 0 ? net / rate : 0, outUnit: "USDG", feeUnit: code };
    }
    // USDG in → fiat out
    const gross = a * rate;
    const fee = gross * (c.feePct / 100) + c.flat;
    return { fee, out: Math.max(0, gross - fee), outUnit: code, feeUnit: code };
  }, [amount, rate, dir, c, code]);

  const submit = () =>
    act.run(async () => {
      if (!quote || quote.out <= 0) throw new Error("Enter an amount larger than the fee.");
      if (!kyc) throw new Error("Confirm the identity check step first.");
      const ref = `GA-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
      await record({
        Action: dir,
        Corridor: `${code} via ${c.rail}`,
        "You send": `${num(amount)} ${dir === "Deposit" ? code : "USDG"}`,
        "You receive": `${quote.out.toFixed(2)} ${quote.outUnit}`,
        "Example fee": `${quote.fee.toFixed(2)} ${quote.feeUnit}`,
        Reference: ref,
      });
      setAmount("");
      return `Practice ${dir.toLowerCase()} ${ref} recorded.`;
    });

  return (
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
      <form
        className="min-w-0 space-y-4 border border-line bg-paper p-5"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <div className="grid grid-cols-2 gap-2">
          {(["Deposit", "Withdraw"] as const).map((d) => (
            <button key={d} type="button" aria-pressed={dir === d} onClick={() => setDir(d)} className={`cursor-pointer border px-3 py-2.5 text-left ${dir === d ? "border-ink bg-sea-soft" : "border-line-2 hover:border-ink"}`}>
              <span className="block font-semibold">{d}</span>
              <span className="block text-[12.5px] text-ink-3">{d === "Deposit" ? "Cash in, USDG out" : "USDG in, cash out"}</span>
            </button>
          ))}
        </div>
        <div>
          <label className="label" htmlFor="an-code">
            Currency
          </label>
          <select id="an-code" className="field mt-1.5" value={code} onChange={(e) => setCode(e.target.value)}>
            {CORRIDORS.map((x) => (
              <option key={x.code} value={x.code}>
                {x.code} · {x.country}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="label" htmlFor="an-amount">
            Amount in {dir === "Deposit" ? code : "USDG"}
          </label>
          <input id="an-amount" inputMode="decimal" className="field mt-1.5 font-mono text-lg" value={amount} onChange={(e) => setAmount(cleanDecimal(e.target.value))} placeholder="100" />
        </div>
        <dl className="divide-y divide-dashed divide-line-2 bg-paper-2 px-4 text-[14px]">
          <div className="flex justify-between gap-3 py-2.5">
            <dt className="text-ink-2">Example fee</dt>
            <dd className="font-mono">{quote ? `${fmt(quote.fee, 2)} ${quote.feeUnit}` : "—"}</dd>
          </div>
          <div className="flex justify-between gap-3 py-2.5">
            <dt className="text-ink-2">You would receive</dt>
            <dd className="font-mono font-semibold">{quote ? `${fmt(quote.out, 2)} ${quote.outUnit}` : "—"}</dd>
          </div>
        </dl>
        <label className="flex cursor-pointer items-start gap-3 text-[13.5px] text-ink-2">
          <input type="checkbox" checked={kyc} onChange={(e) => setKyc(e.target.checked)} className="mt-1 accent-[var(--color-sea)]" />
          <span>Skip the identity check for practice. A real anchor verifies who you are before the first deposit or withdrawal.</span>
        </label>
        <button type="submit" disabled={act.busy} className="btn btn-ink h-11 w-full">
          {act.busy ? "Sign in your wallet…" : `Sign practice ${dir.toLowerCase()}`}
        </button>
        <Feedback error={act.error} done={act.done} />
      </form>
      <div className="min-w-0">
        <h3 className="font-display text-[24px] leading-[1.2] tracking-[-0.02em]">Your practice transfers</h3>
        <div className="mt-3">
          <ReceiptLog receipts={receipts} onClear={clear} describe={(r) => `${r.details.Action} ${r.details["You send"]} → ${r.details["You receive"]} · ${r.details.Reference}`} />
        </div>
      </div>
    </div>
  );
}
