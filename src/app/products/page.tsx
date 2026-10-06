import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { BRAND, CHAIN } from "@/config/brand";
import { APP_LINKS } from "@/config/nav";
import { WALLET_CATALOG } from "@/config/wallets";
import { ButtonLink, CtaBand, LinkTiles, PageHero, Section, SectionHead, Tag } from "@/components/ui";

export const metadata: Metadata = {
  title: "Products and tools",
  description: "Everything Gleo ships in one list: live tools that move real tokens, practice tools for features awaiting contracts, and the network tools around them.",
};

export default function Products() {
  const live = APP_LINKS.filter((a) => a.status === "live");
  const practice = APP_LINKS.filter((a) => a.status === "practice");
  return (
    <>
      <PageHero
        title="The whole toolbox, labelled honestly"
        lead="Some Gleo tools move real tokens from your wallet today. Others need Gleo contracts that are not deployed yet, so they run as practice with signed receipts. Every tool below says which it is."
        art="wallet"
        actions={
          <>
            <ButtonLink href="/app" variant="accent">
              Open the app
            </ButtonLink>
            <ButtonLink href="/faq" variant="line">
              Live or practice?
            </ButtonLink>
          </>
        }
      />

      <Section>
        <SectionHead title="Products" lead="Four tools that work on Robinhood Chain mainnet now, and four that rehearse what comes next." />
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
          {[
            { title: "Live", tone: "live" as const, list: live, note: "Real transactions from your own wallet." },
            { title: "Practice", tone: "practice" as const, list: practice, note: "Signed receipts only. Nothing is sent on-chain." },
          ].map((group) => (
            <div key={group.title} className="min-w-0">
              <div className="flex items-center gap-3 border-b-2 border-ink pb-3">
                <h3 className="font-display text-2xl font-bold">{group.title}</h3>
                <Tag tone={group.tone} />
              </div>
              <p className="mt-3 text-sm text-ink-3">{group.note}</p>
              <ul className="mt-2">
                {group.list.map((tool) => (
                  <li key={tool.href} className="border-b border-line-2">
                    <Link href={tool.href} className="group flex items-center justify-between gap-4 py-4">
                      <span className="min-w-0">
                        <span className="block text-[17px] font-semibold group-hover:underline">{tool.label}</span>
                        <span className="block text-[14.5px] text-ink-2">{tool.note}</span>
                      </span>
                      <ArrowRight className="size-4 shrink-0 text-ink-3" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="card">
        <SectionHead title="See the shape of the network" lead="Ways to look at Robinhood Chain and what lives on it." />
        <div className="mt-10">
          <LinkTiles
            cols={4}
            items={[
              { href: "/network", title: "Network panel", body: "Block height, block time, gas and the price of a transfer, refreshed every few seconds.", tag: "live" },
              { href: "/assets", title: "Asset explorer", body: "Tokenized assets already on the chain, verified on-chain, with live supply.", tag: "live" },
              { href: "/anchors", title: "Anchor directory", body: "Cash-in and cash-out gateways by region.", tag: "practice" },
              { href: CHAIN.explorer, title: "Block explorer", body: "Every transaction, address and contract on Robinhood Chain, run by Blockscout." },
            ]}
          />
        </div>
      </Section>

      <Section>
        <SectionHead title="Interact with the network" lead="Two direct ways to make something happen on-chain." />
        <div className="mt-10">
          <LinkTiles
            cols={2}
            items={[
              { href: "/send", title: "Send", body: "Move ETH or USDG to any address. Address check, balance check, fee estimate and a summary before you sign.", tag: "live" },
              { href: "/swap", title: `Swap ${BRAND.symbol}`, body: "Trade ETH for $GLEO through Pons. Switches on by itself when the contract is published.", tag: "live" },
            ]}
          />
        </div>
      </Section>

      <Section tone="night">
        <SectionHead dark title="Store and send assets" lead={`Any EVM wallet that can add a custom network reaches ${CHAIN.name}. These are the ones the connect dialog knows by name.`} />
        <ul className="mt-10 grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
          {WALLET_CATALOG.map((w) => (
            <li key={w.id} className="min-w-0 border-t border-fog/15">
              <a href={w.install} target="_blank" rel="noreferrer" className="flex items-center gap-3 py-4 hover:opacity-80">
                <img src={`/wallets/${w.id}.webp`} alt="" width={28} height={28} className="size-7 shrink-0 rounded-lg" />
                <span className="min-w-0 flex-1 font-semibold">{w.name}</span>
                <ArrowUpRight className="size-4 shrink-0 text-fog-2" />
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-fog-2">Phantom is detected but cannot add Robinhood Chain, so it is shown as unsupported.</p>
      </Section>

      <CtaBand
        title="Something missing from the list?"
        body="Tell us which tool would make Gleo useful to you, and we will tell you where it sits on the roadmap."
        actions={
          <>
            <ButtonLink href="/about/roadmap" variant="fog">
              Roadmap
            </ButtonLink>
            <ButtonLink href={BRAND.x} variant="line" className="border-fog/30 text-fog hover:border-fog">
              {BRAND.xHandle}
            </ButtonLink>
          </>
        }
      />
    </>
  );
}
