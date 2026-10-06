"use client";

import { useState } from "react";
import { Check, ShieldCheck } from "lucide-react";
import type { Receipt } from "@/lib/practice";

/** The signed practice receipts behind a tool, newest first, each verifiable. */
export function ReceiptLog({ receipts, onClear, describe }: { receipts: Receipt[]; onClear: () => void; describe: (r: Receipt) => string }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [checked, setChecked] = useState<Record<string, boolean | null>>({});
  const verify = async (r: Receipt) => {
    setChecked((c) => ({ ...c, [r.id]: null }));
    try {
      const res = await fetch("/api/practice/verify", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message: r.message, signature: r.signature }),
      });
      const body = (await res.json()) as { valid?: boolean };
      setChecked((c) => ({ ...c, [r.id]: Boolean(body.valid) }));
    } catch {
      setChecked((c) => ({ ...c, [r.id]: false }));
    }
  };
  if (!receipts.length) return <p className="text-sm text-ink-3">No signed receipts yet. Each practice action you take appears here.</p>;
  return (
    <div>
      <ul className="divide-y divide-line border-y border-line">
        {[...receipts].reverse().map((r) => (
          <li key={r.id} className="py-3">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <span className="font-mono text-[12px] text-ink-3">{new Date(r.at).toLocaleString()}</span>
              <span className="min-w-0 flex-1 text-[14.5px]">{describe(r)}</span>
              <button type="button" onClick={() => setOpenId(openId === r.id ? null : r.id)} className="cursor-pointer text-[13px] font-semibold text-sea-deep">
                {openId === r.id ? "Hide" : "Message"}
              </button>
              <button type="button" onClick={() => verify(r)} className="inline-flex cursor-pointer items-center gap-1 text-[13px] font-semibold text-ink-2">
                {checked[r.id] === true ? <Check className="size-3.5 text-sea" /> : <ShieldCheck className="size-3.5" />}
                {checked[r.id] === undefined ? "Verify" : checked[r.id] === null ? "Checking…" : checked[r.id] ? "Signature valid" : "Not valid here"}
              </button>
            </div>
            {openId === r.id ? (
              <pre className="mt-2 overflow-x-auto rounded-lg bg-paper-2 p-3 font-mono text-[11.5px] leading-relaxed whitespace-pre-wrap break-all">
                {r.message}
                {"\n\nSignature: "}
                {r.signature}
              </pre>
            ) : null}
          </li>
        ))}
      </ul>
      <button type="button" onClick={onClear} className="mt-3 cursor-pointer text-[13px] text-ink-3 underline">
        Clear these receipts from this browser
      </button>
    </div>
  );
}
