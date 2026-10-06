"use client";

import { useState } from "react";
import Link from "next/link";
import { Pause, Play } from "lucide-react";
import { STOCK_TOKENS, USDG, WETH } from "@/config/assets.generated";

const WORDS = ["stablecoins", "tokenized stocks", "open DeFi", "everyday money"];

/** Assets the ticker shows: every token the site verified on Robinhood Chain. */
const ASSETS = [USDG, WETH, ...STOCK_TOKENS].map((t) => ({
  symbol: t.symbol,
  name: t.symbol === "WETH" ? "Wrapped Ether" : t.name.replace(/\s*•\s*Robinhood Token$/, ""),
}));

/**
 * Home opener: halftone field, a headline whose last line rotates, the lead,
 * a pause control for all motion, and a ticker of assets already live on the
 * chain (assets, not partners: nothing here implies an endorsement).
 */
export function HomeHero() {
  const [paused, setPaused] = useState(false);
  return (
    <section className="relative isolate overflow-hidden bg-paper" data-paused={paused ? "true" : "false"}>
      <div className="halftone -z-10" aria-hidden="true" style={paused ? { animationPlayState: "paused" } : undefined} />
      <div className="mx-auto max-w-[1440px] px-[var(--gutter)] pt-16 pb-10 lg:pt-36">
        <div className="max-w-[1100px] lg:mx-auto lg:text-center">
          <h1 className="t-hero text-balance text-[#212121]">
            <span className="block">Cross-border payments meet</span>
            <span className="sr-only">stablecoins, tokenized stocks and open DeFi</span>
            <span className="rotator" aria-hidden="true">
              {WORDS.map((w) => (
                <span key={w}>{w}</span>
              ))}
            </span>
          </h1>
          <p className="t-lead mx-auto mt-10 max-w-[560px] text-ink/70 lg:mt-6">
            Gleo is a cross-border stablecoin payments network on Robinhood Chain. Send USDG between wallets in about a block, hold
            tokenized stocks you can verify on-chain, and use open DeFi tools on the same rails.
          </p>
          <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[15px] lg:justify-center">
            <Link href="/send" className="underline underline-offset-4 hover:no-underline">
              Send a USDG payment
            </Link>
            <Link href="/learn/intro" className="underline underline-offset-4 hover:no-underline">
              What is Gleo?
            </Link>
          </p>
        </div>
        <div className="mt-12 flex justify-end lg:mt-16">
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? "Play animations" : "Pause animations"}
            aria-pressed={paused}
            className="flex size-8 cursor-pointer items-center justify-center rounded-full border border-ink bg-paper/60 text-ink"
          >
            {paused ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}
          </button>
        </div>
      </div>
      <div className="pb-12">
        <p className="sr-only">Tokenized assets already live on Robinhood Chain</p>
        <div className="overflow-hidden" aria-hidden="true">
          <div className="ticker" data-paused={paused ? "true" : "false"}>
            {[0, 1].map((set) => (
              <ul key={set} className="flex shrink-0 items-center">
                {ASSETS.map((a) => (
                  <li key={a.symbol} className="flex items-center gap-3 px-8 whitespace-nowrap">
                    <span className="flex size-9 items-center justify-center rounded-full bg-ink text-[10px] font-semibold text-fog">{a.symbol.slice(0, 4)}</span>
                    <span className="leading-tight">
                      <span className="block text-[18px] font-semibold tracking-tight text-ink">{a.symbol}</span>
                      <span className="block text-[12px] text-ink/60">{a.name}</span>
                    </span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
