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
      className={`flex h-10 shrink-0 cursor-pointer items-center gap-2 rounded-full border border-transparent bg-[#f9f9f9] px-1.5 font-mono text-[12px] text-ink transition-colors enabled:hover:border-ink disabled:cursor-default sm:pr-4 lg:h-11 ${className}`}
    >
      <span className="rounded-full bg-sea px-2.5 py-[5px] font-sans text-[11px] leading-none font-semibold text-ink">
        <span className="sm:hidden">CA</span>
        <span className="hidden sm:inline">{BRAND.symbol}</span>
      </span>
      <span className="hidden sm:inline">{!live ? "At launch" : copied ? "Copied" : shortAddress(BRAND.ca, 4, 4)}</span>
      {!live ? null : copied ? <Check className="size-3.5 text-up" strokeWidth={3} /> : <Copy className="size-3.5 text-ink-3" />}
    </button>
  );
}

/** Footer block: chain, the whole address and a copy button. */
export function CopyCaBlock({ className = "" }: { className?: string }) {
  const { copied, copy, live } = useCopyCa();
  return (
    <div className={`border border-fog/25 p-5 text-fog ${className}`}>
      <p className="text-[12px] font-semibold tracking-[0.02em] text-fog uppercase">
        {BRAND.symbol} contract · {CHAIN.name}
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        {live ? (
          <code className="min-w-0 flex-1 basis-56 font-mono text-[13px] leading-snug break-all" data-testid="ca-full">
            {BRAND.ca}
          </code>
        ) : (
          <p className="min-w-0 flex-1 basis-56 text-[14px] leading-snug text-fog/70" data-testid="ca-full">
            Published at launch. Trust only the address shown here and on our X account.
          </p>
        )}
        <button type="button" onClick={copy} disabled={!live} className="btn btn-accent h-10 px-4 text-sm" data-testid="ca-copy">
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
