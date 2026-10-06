"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

/** A labelled block of plain text with a copy button. */
export function CopyBlock({ label, text }: { label: string; text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard refused; the text stays selectable.
    }
  };
  return (
    <div className="min-w-0 overflow-hidden border border-ink bg-night text-fog">
      <div className="flex items-center justify-between gap-3 border-b border-fog/15 px-4 py-2.5">
        <span className="text-[12px] font-semibold text-fog">{label}</span>
        <button type="button" onClick={copy} className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-sea px-3 py-1 text-[13px] font-semibold text-ink">
          {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-4 font-mono text-[13px] leading-relaxed break-all whitespace-pre-wrap">{text}</pre>
    </div>
  );
}
