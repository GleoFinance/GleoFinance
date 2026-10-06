"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { BRAND, CHAIN, TOKEN, explorerToken, shortAddress } from "@/config/brand";

export function useCopyCa() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  // Until the contract is published there is nothing worth copying.
  const live = TOKEN.isLive;
  const copy = async () => {
    if (!live) return;
    try {
      await navigator.clipboard.writeText(BRAND.ca);
    } catch {
      // Older browsers and some in-wallet browsers refuse the async clipboard.
      const area = document.createElement("textarea");
      area.value = BRAND.ca;
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      document.body.removeChild(area);
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1600);
  };
  return { copied, copy, live };
}

/**
 * Navbar pill: "$GLEO 0x12…abcd" with a copy icon; on phones only "CA".
 * One tap copies the full address. Disabled ("At launch") until a real CA is set.
 */
export function CopyCaTag({ className = "" }: { className?: string }) {
  const { copied, copy, live } = useCopyCa();
  return (
    <button
      type="button"
      onClick={copy}
      disabled={!live}
      title={live ? `Copy ${BRAND.ca}` : "The contract address is published at launch"}
      aria-label={live ? `Copy ${BRAND.symbol} contract address` : "Contract address not published yet"}
      data-testid="ca-tag"
      className={`flex h-9 shrink-0 cursor-pointer items-center gap-2 rounded-full border border-line-2 bg-card pr-1 pl-1 font-mono sm:pr-3 text-[12px] text-ink transition-colors enabled:hover:border-ink disabled:cursor-default ${className}`}
    >
      <span className="rounded-full bg-ink px-2 py-[3px] text-[10.5px] leading-none font-semibold text-fog">
        <span className="sm:hidden">CA</span>
        <span className="hidden sm:inline">{BRAND.symbol}</span>
      </span>
      <span className="hidden sm:inline">{!live ? "At launch" : copied ? "Copied" : shortAddress(BRAND.ca, 4, 4)}</span>
      {!live ? null : copied ? <Check className="size-3.5 text-sea" strokeWidth={3} /> : <Copy className="size-3.5 text-ink-3" />}
    </button>
  );
}

/** Footer block: chain, the whole address and a copy button. */
export function CopyCaBlock({ className = "" }: { className?: string }) {
  const { copied, copy, live } = useCopyCa();
  return (
    <div className={`rounded-2xl border border-fog/15 bg-night-2 p-5 text-fog ${className}`}>
      <p className="font-mono text-[11px] tracking-[0.08em] text-fog-2 uppercase">
        {BRAND.symbol} contract · {CHAIN.name}
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <code className="min-w-0 flex-1 basis-56 font-mono text-[13px] leading-snug break-all" data-testid="ca-full">
          {live ? BRAND.ca : "Published at launch. Trust only the address shown here and on our X account."}
        </code>
        <button type="button" onClick={copy} disabled={!live} className="btn btn-fog h-10 px-4 text-sm" data-testid="ca-copy">
          {copied ? <Check className="size-4" strokeWidth={3} /> : <Copy className="size-4" />}
          {!live ? "At launch" : copied ? "Copied" : "Copy CA"}
        </button>
      </div>
      {live ? (
        <a href={explorerToken(BRAND.ca)} target="_blank" rel="noreferrer" className="mt-3 inline-block font-mono text-[11px] text-fog-2 underline underline-offset-4 hover:text-fog">
          View on the explorer
        </a>
      ) : null}
    </div>
  );
}
