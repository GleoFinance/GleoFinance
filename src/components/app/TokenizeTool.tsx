"use client";

import { useMemo, useState } from "react";
import { shortAddress } from "@/config/brand";
import { checkAddress } from "@/lib/address";
import type { Receipt } from "@/lib/practice";
import { Gate } from "@/components/app/Gate";
import { PracticeNote } from "@/components/app/AppFrame";
import { ReceiptLog } from "@/components/app/ReceiptLog";
import { usePractice } from "@/components/app/usePractice";
import { Feedback, cleanDecimal, num, useAction } from "@/components/app/useAction";
import { fmt } from "@/components/live/NetworkProvider";

const CLASSES = ["Gold", "Equity", "Bond", "Security", "Property", "Invoice", "Fund unit"];
const ACTIONS = ["Approve holder", "Transfer", "Freeze holder", "Unfreeze holder", "Clawback", "Mint"] as const;
type ActionName = (typeof ACTIONS)[number];

type Asset = {
  id: string;
  name: string;
  symbol: string;
  cls: string;
  supply: number;
  approval: boolean;
  freeze: boolean;
  clawback: boolean;
  approved: Set<string>;
  frozen: Set<string>;
  balances: Map<string, number>;
};

/** Replays the signed receipts into the current state of each practice asset. */
function replay(receipts: Receipt[], issuer: string) {
  const assets = new Map<string, Asset>();
  const me = issuer.toLowerCase();
  for (const r of receipts) {
    const d = r.details;
    if (d.Action === "Issue asset") {
      const supply = num(d.Supply);
      assets.set(d["Asset id"], {
        id: d["Asset id"],
        name: d.Name,
        symbol: d.Symbol,
        cls: d.Class,
        supply,
        approval: d["Holder approval"] === "on",
        freeze: d.Freeze === "on",
        clawback: d.Clawback === "on",
        approved: new Set([me]),
        frozen: new Set(),
        balances: new Map([[me, supply]]),
      });
      continue;
    }
    const a = assets.get(d["Asset id"]);
    if (!a) continue;
    const holder = (d.Holder ?? "").toLowerCase();
    const amount = num(d.Amount ?? "0");
    if (d.Action === "Approve holder") a.approved.add(holder);
    if (d.Action === "Freeze holder") a.frozen.add(holder);
    if (d.Action === "Unfreeze holder") a.frozen.delete(holder);
    if (d.Action === "Mint") {
      a.supply += amount;
      a.balances.set(me, (a.balances.get(me) ?? 0) + amount);
    }
    if (d.Action === "Transfer") {
      a.balances.set(me, (a.balances.get(me) ?? 0) - amount);
      a.balances.set(holder, (a.balances.get(holder) ?? 0) + amount);
    }
    if (d.Action === "Clawback") {
      a.balances.set(holder, (a.balances.get(holder) ?? 0) - amount);
      a.balances.set(me, (a.balances.get(me) ?? 0) + amount);
    }
  }
  return [...assets.values()];
}

/** Why an action would be refused by the asset's rules, or null if allowed. */
function refuse(a: Asset, action: ActionName, holder: string, amount: number, issuer: string) {
  const h = holder.toLowerCase();
  if (action !== "Mint" && h === issuer.toLowerCase()) return "Pick a holder other than the issuer account.";
  if (["Transfer", "Clawback", "Mint"].includes(action) && !(amount > 0)) return "Enter an amount above zero.";
  if (action === "Approve holder" && !a.approval) return "This asset was issued without holder approval; anyone may hold it.";
  if (action === "Approve holder" && a.approved.has(h)) return "That holder is already approved.";
  if ((action === "Freeze holder" || action === "Unfreeze holder") && !a.freeze) return "This asset was issued without the freeze control.";
  if (action === "Freeze holder" && a.frozen.has(h)) return "That holder is already frozen.";
  if (action === "Unfreeze holder" && !a.frozen.has(h)) return "That holder is not frozen.";
  if (action === "Clawback" && !a.clawback) return "This asset was issued without clawback.";
  if (action === "Clawback" && amount > (a.balances.get(h) ?? 0)) return "The holder does not have that much.";
  if (action === "Transfer") {
    if (a.approval && !a.approved.has(h)) return "Approve this holder first: the asset requires holder approval.";
    if (a.frozen.has(h)) return "This holder is frozen and cannot receive.";
    if (amount > (a.balances.get(issuer.toLowerCase()) ?? 0)) return "The issuer account does not hold that much.";
  }
  return null;
}

export function TokenizeTool() {
  return (
    <div className="space-y-8">
      <PracticeNote>
        Gleo&apos;s issuance contract is not deployed yet. Issuing here signs a receipt with your wallet (free, no transaction) and keeps it in this browser. The rules
        you choose are enforced exactly as the contract will enforce them.
      </PracticeNote>
      <Gate what="issue a practice asset" needsChain={false}>
        <Console />
      </Gate>
    </div>
  );
}

function Console() {
  const { receipts, record, clear, address } = usePractice("tokenize");
  const assets = useMemo(() => replay(receipts, address ?? ""), [receipts, address]);
  const issue = useAction();
  const [form, setForm] = useState({ name: "", symbol: "", cls: "Gold", supply: "", approval: true, freeze: true, clawback: true, disclosure: "" });

  const submitIssue = () =>
    issue.run(async () => {
      const symbol = form.symbol.trim().toUpperCase();
      if (form.name.trim().length < 2) throw new Error("Give the asset a name.");
      if (!/^[A-Z0-9]{2,8}$/.test(symbol)) throw new Error("Symbol: 2 to 8 letters or digits.");
      if (!(num(form.supply) > 0)) throw new Error("Enter a supply above zero.");
      const id = `${symbol}-${Math.random().toString(36).slice(2, 7)}`;
      await record({
        Action: "Issue asset",
        "Asset id": id,
        Name: form.name.trim().slice(0, 60),
        Symbol: symbol,
        Class: form.cls,
        Supply: String(num(form.supply)),
        "Holder approval": form.approval ? "on" : "off",
        Freeze: form.freeze ? "on" : "off",
        Clawback: form.clawback ? "on" : "off",
        ...(form.disclosure.trim() ? { Disclosure: form.disclosure.trim().slice(0, 120) } : {}),
      });
      setForm((f) => ({ ...f, name: "", symbol: "", supply: "", disclosure: "" }));
      return `${symbol} issued in practice mode.`;
    });

  const toggle = (key: "approval" | "freeze" | "clawback", label: string, note: string) => (
    <label className="flex cursor-pointer items-start gap-3 border border-line-2 px-3 py-2.5">
      <input type="checkbox" checked={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.checked })} className="mt-1 accent-[var(--color-sea)]" />
      <span>
        <span className="block text-[14.5px] font-semibold">{label}</span>
        <span className="block text-[12.5px] text-ink-3">{note}</span>
      </span>
    </label>
  );

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
        <form
          className="min-w-0 space-y-4 border border-line bg-paper p-5"
          onSubmit={(e) => {
            e.preventDefault();
            submitIssue();
          }}
        >
          <p className="font-display text-[24px] leading-[1.2] tracking-[-0.02em]">Issue an asset</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_120px]">
            <div className="min-w-0">
              <label className="label" htmlFor="tk-name">
                Name
              </label>
              <input id="tk-name" className="field mt-1.5" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Vaulted Gold, 1 g" />
            </div>
            <div className="min-w-0">
              <label className="label" htmlFor="tk-symbol">
                Symbol
              </label>
              <input id="tk-symbol" className="field mt-1.5 font-semibold uppercase" value={form.symbol} onChange={(e) => setForm({ ...form, symbol: e.target.value })} placeholder="GLDG" />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="min-w-0">
              <label className="label" htmlFor="tk-class">
                Asset class
              </label>
              <select id="tk-class" className="field mt-1.5" value={form.cls} onChange={(e) => setForm({ ...form, cls: e.target.value })}>
                {CLASSES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="min-w-0">
              <label className="label" htmlFor="tk-supply">
                Supply
              </label>
              <input id="tk-supply" inputMode="decimal" className="field mt-1.5 font-mono" value={form.supply} onChange={(e) => setForm({ ...form, supply: cleanDecimal(e.target.value) })} placeholder="10000" />
            </div>
          </div>
          <div className="space-y-2">
            {toggle("approval", "Holder approval", "Only addresses you approve (after KYC) can hold it")}
            {toggle("freeze", "Freeze", "Pause a single holder, for example under a court order")}
            {toggle("clawback", "Clawback", "Pull units back from a holder to correct errors or fraud")}
          </div>
          <div>
            <label className="label" htmlFor="tk-disc">
              Disclosure link (optional)
            </label>
            <input id="tk-disc" className="field mt-1.5" value={form.disclosure} onChange={(e) => setForm({ ...form, disclosure: e.target.value })} placeholder="https://… custody or audit report" />
          </div>
          <button type="submit" disabled={issue.busy} className="btn btn-ink h-11 w-full" data-testid="tk-issue">
            {issue.busy ? "Sign in your wallet…" : "Sign and issue (practice)"}
          </button>
          <Feedback error={issue.error} done={issue.done} />
        </form>

        <div className="min-w-0 space-y-6">
          {assets.length === 0 ? (
            <div className="border border-dashed border-line-2 p-6 text-[15px] text-ink-2">
              Your practice assets appear here, with holders, frozen accounts and every control you exercise.
            </div>
          ) : (
            assets.map((a) => <AssetCard key={a.id} asset={a} issuer={address!} record={record} />)
          )}
        </div>
      </div>
      <div>
        <h2 className="font-display text-[28px] leading-[1.2] tracking-[-0.02em]">Signed receipts</h2>
        <div className="mt-4">
          <ReceiptLog receipts={receipts} onClear={clear} describe={(r) => `${r.details.Action} · ${r.details.Symbol ?? r.details["Asset id"]?.split("-")[0]}${r.details.Amount ? ` · ${r.details.Amount}` : ""}`} />
        </div>
      </div>
    </div>
  );
}

function AssetCard({ asset: a, issuer, record }: { asset: Asset; issuer: string; record: (d: Record<string, string>) => Promise<Receipt> }) {
  const act = useAction();
  const [action, setAction] = useState<ActionName>(a.approval ? "Approve holder" : "Transfer");
  const [holder, setHolder] = useState("");
  const [amount, setAmount] = useState("");
  const needsAmount = action === "Transfer" || action === "Clawback" || action === "Mint";
  const holders = [...a.balances.entries()].filter(([, v]) => v > 0);

  const submit = () =>
    act.run(async () => {
      const target = action === "Mint" ? { ok: true as const, address: issuer as `0x${string}` } : checkAddress(holder);
      if (!target.ok) throw new Error(target.reason);
      const amt = needsAmount ? num(amount) : 0;
      const why = action === "Mint" ? (amt > 0 ? null : "Enter an amount above zero.") : refuse(a, action, target.address, amt, issuer);
      if (why) throw new Error(why);
      await record({ Action: action, "Asset id": a.id, Symbol: a.symbol, ...(action !== "Mint" ? { Holder: target.address } : {}), ...(needsAmount ? { Amount: String(amt) } : {}) });
      setAmount("");
      return `${action} recorded.`;
    });

  return (
    <article className="border border-line bg-paper p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-mono text-lg font-semibold">{a.symbol}</p>
          <p className="text-[14px] text-ink-2">
            {a.name} · {a.cls}
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5 text-[10.5px] font-semibold uppercase">
          {[
            ["approval", a.approval],
            ["freeze", a.freeze],
            ["clawback", a.clawback],
          ].map(([k, on]) => (
            <span key={k as string} className={`rounded-full px-2 py-0.5 ${on ? "bg-sea-soft text-sea-deep" : "bg-paper-2 text-ink-3 line-through"}`}>
              {k as string}
            </span>
          ))}
        </div>
      </div>
      <dl className="mt-4 grid grid-cols-2 gap-3 text-[13.5px] sm:grid-cols-4">
        <div>
          <dt className="text-ink-3">Supply</dt>
          <dd className="font-mono">{fmt(a.supply, 2)}</dd>
        </div>
        <div>
          <dt className="text-ink-3">Holders</dt>
          <dd className="font-mono">{holders.length}</dd>
        </div>
        <div>
          <dt className="text-ink-3">Approved</dt>
          <dd className="font-mono">{a.approval ? a.approved.size : "anyone"}</dd>
        </div>
        <div>
          <dt className="text-ink-3">Frozen</dt>
          <dd className="font-mono">{a.frozen.size}</dd>
        </div>
      </dl>
      {holders.length ? (
        <ul className="mt-3 divide-y divide-line border-y border-line text-[13px]">
          {holders.map(([h, v]) => (
            <li key={h} className="flex justify-between gap-3 py-1.5 font-mono">
              <span>
                {h === issuer.toLowerCase() ? "issuer" : shortAddress(h)}
                {a.frozen.has(h) ? <span className="ml-2 text-down">frozen</span> : null}
              </span>
              <span>{fmt(v, 2)}</span>
            </li>
          ))}
        </ul>
      ) : null}
      <form
        className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-[150px_minmax(0,1fr)_110px_auto]"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <select aria-label="Action" className="field" value={action} onChange={(e) => setAction(e.target.value as ActionName)}>
          {ACTIONS.map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
        <input aria-label="Holder address" className="field font-mono text-[13px]" placeholder={action === "Mint" ? "to the issuer" : "Holder 0x…"} value={holder} disabled={action === "Mint"} onChange={(e) => setHolder(e.target.value)} />
        <input aria-label="Amount" className="field font-mono" placeholder="Amount" inputMode="decimal" value={amount} disabled={!needsAmount} onChange={(e) => setAmount(cleanDecimal(e.target.value))} />
        <button type="submit" disabled={act.busy} className="btn btn-accent h-11 px-4 text-sm">
          {act.busy ? "Signing…" : "Sign"}
        </button>
      </form>
      <Feedback error={act.error} done={act.done} />
    </article>
  );
}
