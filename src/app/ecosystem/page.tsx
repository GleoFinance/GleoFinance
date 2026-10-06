import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { BRAND, CHAIN, explorerToken } from "@/config/brand";
import { STOCK_TOKENS, USDG, WETH } from "@/config/assets.generated";
import { WALLET_CATALOG } from "@/config/wallets";
import { ButtonLink, CtaBand, PageHero, Section, SectionHead, Tag } from "@/components/ui";

export const metadata: Metadata = {
  title: "Ecosystem",
  description: "The assets, markets, explorers, oracles and wallets on Robinhood Chain that Gleo works with today.",
};

type Entry = { name: string; body: string; href: string; mono?: boolean };

const GROUPS: { id: string; title: string; lead: string; entries: Entry[] }[] = [
  {
    id: "assets",
    title: "Assets",
    lead: "Tokens on Robinhood Chain, each checked on-chain before it was listed.",
    entries: [
      { name: USDG.symbol, body: `${USDG.name}, a dollar token with ${USDG.decimals} decimals. The currency of Gleo payments.`, href: explorerToken(USDG.address) },
      { name: WETH.symbol, body: "Wrapped ETH, the chain's native coin as a token. Used for pricing and pools.", href: explorerToken(WETH.address) },
      ...STOCK_TOKENS.map((t) => ({
        name: t.symbol,
        body: t.name.replace(/\s*•\s*Robinhood Token\s*$/, "") + ", a verified stock token.",
        href: explorerToken(t.address),
        mono: true,
      })),
    ],
  },
  {
    id: "markets",
    title: "Markets and launchpads",
    lead: "Where tokens trade today.",
    entries: [
      { name: "Uniswap pools", body: "Concentrated-liquidity pools pairing stock tokens and WETH with USDG.", href: "https://app.uniswap.org" },
      { name: "Pons", body: `Token launchpad with bonding curves that graduate to Uniswap v4 pools. ${BRAND.symbol} swaps route through it.`, href: "https://www.ponsfamily.com" },
      { name: "Dexscreener", body: "Public pair data for Robinhood Chain. The asset explorer reads last prices from it.", href: "https://dexscreener.com/robinhood" },
    ],
  },
  {
    id: "infrastructure",
    title: "Explorers, oracles and RPC",
    lead: "The plumbing Gleo reads from.",
    entries: [
      { name: "Blockscout", body: "The block explorer for Robinhood Chain. Every transaction link on this site points here.", href: CHAIN.explorer },
      { name: "Chainlink", body: "Price feeds for ETH and major stocks published on the chain, for markets that need a trusted price.", href: "https://data.chain.link" },
      { name: "Public RPC", body: `${CHAIN.publicRpc}, with a second public endpoint as fallback.`, href: CHAIN.publicRpc },
    ],
  },
  {
    id: "wallets",
    title: "Wallets",
    lead: "EVM wallets that can add Robinhood Chain as a network.",
    entries: WALLET_CATALOG.map((w) => ({ name: w.name, body: "Adds Robinhood Chain on connect.", href: w.install })),
  },
];

export default function Ecosystem() {
  return (
    <>
      <PageHero
        title="What Gleo plugs into"
        lead="Gleo is built on a chain that already has a dollar token, tokenized shares, markets and an explorer. This directory lists the real pieces we use. Nothing here is a paid placement, and nothing is a partnership unless it says so."
        art="people"
        actions={
          <div className="flex flex-wrap gap-2">
            {GROUPS.map((g) => (
              <a key={g.id} href={`#${g.id}`} className="rounded-full border border-line-2 bg-card px-3.5 py-1.5 text-sm font-medium hover:border-ink">
                {g.title}
              </a>
            ))}
          </div>
        }
      />

      <Section>
        <SectionHead title="Explore the directory" lead="Grouped by what each piece does. Links open the project's own site or its explorer page." />
        <div className="mt-12 space-y-16">
          {GROUPS.map((g) => (
            <div key={g.id} id={g.id} className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
              <div className="min-w-0">
                <h3 className="font-display text-2xl font-bold">{g.title}</h3>
                <p className="mt-2 text-[15px] text-ink-2">{g.lead}</p>
                <p className="mt-2 font-mono text-[12px] text-ink-3">{g.entries.length} listed</p>
              </div>
              <ul className="grid min-w-0 grid-cols-1 gap-x-8 sm:grid-cols-2">
                {g.entries.map((e) => (
                  <li key={e.name} className="min-w-0 border-t border-line-2">
                    <a href={e.href} target="_blank" rel="noreferrer" className="group flex items-start gap-3 py-4">
                      <span className="min-w-0 flex-1">
                        <span className={`block font-semibold group-hover:underline ${e.mono ? "font-mono" : ""}`}>{e.name}</span>
                        <span className="mt-0.5 block text-[14px] leading-snug break-words text-ink-2">{e.body}</span>
                      </span>
                      <ArrowUpRight className="mt-1 size-4 shrink-0 text-ink-3" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="card">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-end">
          <div className="min-w-0">
            <Tag tone="plan">Listings open</Tag>
            <h2 className="mt-4 font-display text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.05] font-bold tracking-[-0.02em]">Want to be included?</h2>
          </div>
          <div className="min-w-0">
            <p className="text-[17px] leading-relaxed text-ink-2">
              If you run a wallet, market, anchor or tool on Robinhood Chain that works with Gleo, send us the contract or site. We check
              it ourselves before listing it.
            </p>
            <div className="mt-5">
              <ButtonLink href={BRAND.x} variant="ink">
                Message {BRAND.xHandle}
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      <CtaBand
        title="Need help building on it?"
        body="Service providers for integration, infrastructure, analytics, tokenization and audits."
        actions={
          <ButtonLink href="/ecosystem/service-providers" variant="fog">
            Service providers
          </ButtonLink>
        }
      />
    </>
  );
}
