import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BRAND, CHAIN } from "@/config/brand";
import { APP_LINKS } from "@/config/nav";
import { WALLET_CATALOG } from "@/config/wallets";
import { pageMeta } from "@/lib/seo";
import { Art, type ArtName } from "@/components/art";
import { JumpTo } from "@/components/content/JumpTo";
import { ButtonLink, CtaBand, LinkTiles, PageHero, Section, SectionHead, Tag } from "@/components/ui";

export const metadata = pageMeta({
  path: "/products",
  title: "Stablecoin Payment Tools and Apps for Robinhood Chain",
  description:
    "Every Gleo stablecoin payment tool in one place: send USDG, read the live network, explore tokenized assets, swap $GLEO and practice DeFi. Open the app.",
  keywords: ["stablecoin payment tools", "USDG wallet tools", "tokenized asset explorer", "Robinhood Chain apps", "practice mode"],
});

const ART: Record<string, ArtName> = {
  "/send": "globe",
  "/network": "compass",
  "/assets": "token",
  "/swap": "wallet",
  "/tokenize": "ledger",
  "/anchors": "anchor",
  "/lend": "lend",
  "/pools": "pool",
};

const JUMP = [
  { id: "tools", label: "Tools and products" },
  { id: "network", label: "Network views" },
  { id: "interact", label: "Interact with the network" },
  { id: "wallets", label: "Store and send assets" },
];

export default function Products() {
  return (
    <>
      <PageHero
        tone="night"
        eyebrow="Products and tools"
        title="Stablecoin payment tools, each labelled live or practice"
        lead="Here is every Gleo stablecoin payment tool in one place. Live tools move real tokens from your own wallet on Robinhood Chain today. Practice tools need Gleo contracts that are not deployed yet, so they record signed receipts instead of transactions. Each card says which kind it is."
        art="wallet"
        crumbs={[{ name: "Products and tools", path: "/products" }]}
        actions={
          <>
            <ButtonLink href="/app" variant="fog">
              Open the Gleo app
            </ButtonLink>
            <ButtonLink href="/faq" variant="fog">
              Live or practice?
            </ButtonLink>
          </>
        }
      />

      <Section id="tools">
        <SectionHead
          eyebrow="Products and tools"
          title="Tools you can open right now"
          lead="Four tools run on Robinhood Chain mainnet; four rehearse what the Gleo contracts will do."
        />
        <ul className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {APP_LINKS.map((tool) => (
            <li key={tool.href} className="min-w-0">
              <Link href={tool.href} className="group block">
                <div className="aspect-[3/2] w-full overflow-hidden bg-paper-2">
                  <Art name={ART[tool.href] ?? "compass"} className="size-full" />
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <h3 className="t-h3 group-hover:underline">{tool.label}</h3>
                  <Tag tone={tool.status} />
                </div>
                <p className="mt-2 text-[16px] leading-relaxed text-ink-2">{tool.note}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="gray" id="network">
        <SectionHead eyebrow="Read the chain" title="Ways to watch Robinhood Chain" lead="Explorers, live panels and price feeds for checking what is on the chain right now." />
        <div className="mt-10">
          <LinkTiles
            cols={4}
            items={[
              { href: "/network", title: "Network panel", body: "Block height, block time, gas and the price of a transfer, refreshed every few seconds.", tag: "live", label: "Open the network panel" },
              { href: "/assets", title: "Asset explorer", body: "Tokenized assets already on the chain, verified on-chain, with live supply.", tag: "live", label: "Browse tokenized assets" },
              { href: "/anchors", title: "Anchor directory", body: "Cash-in and cash-out gateways by region.", tag: "practice", label: "Open the directory" },
              { href: CHAIN.explorer, title: "Block explorer", body: "Every transaction, address and contract on Robinhood Chain, run on Blockscout.", label: "Open the explorer" },
            ]}
          />
        </div>
      </Section>

      <Section id="interact">
        <SectionHead eyebrow="Interact" title="Two ways to act on the network" />
        <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {[
            { href: "/send", title: "Send USDG or ETH", body: "Move ETH or USDG to any address. Address check, balance check, fee estimate and a summary before you sign.", cta: "Open Send" },
            { href: "/swap", title: `Swap ${BRAND.symbol}`, body: `Trade ETH for ${BRAND.symbol} through Pons. The screen switches on by itself once the contract address is published.`, cta: "Open Swap" },
          ].map((c) => (
            <li key={c.href} className="min-w-0 border border-line p-8 lg:p-10">
              <Tag tone="live" />
              <h3 className="mt-6 font-display text-[clamp(1.6rem,1.4rem+0.6vw,1.8rem)] leading-[1.2]">{c.title}</h3>
              <p className="t-lead mt-4 text-ink-2">{c.body}</p>
              <div className="mt-8">
                <ButtonLink href={c.href}>{c.cta}</ButtonLink>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="gray" id="wallets">
        <SectionHead
          eyebrow="Wallets"
          title="Store and send assets"
          lead={`Any EVM wallet that can add a custom network reaches ${CHAIN.name}. These are the wallets the Gleo connect dialog knows by name.`}
        />
        <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WALLET_CATALOG.map((w) => (
            <li key={w.id} className="min-w-0">
              <a href={w.install} target="_blank" rel="noreferrer" className="flex items-center gap-4 border border-line bg-paper p-6 transition-colors hover:border-ink">
                <img src={`/wallets/${w.id}.webp`} alt={`${w.name} logo`} width={40} height={40} className="size-10 shrink-0" />
                <span className="min-w-0 flex-1 text-[18px] font-semibold">{w.name}</span>
                <ArrowUpRight className="size-4 shrink-0" />
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-[14px] text-ink-3">Phantom is detected in the dialog but cannot add Robinhood Chain, so it is shown as not supported.</p>
      </Section>

      <CtaBand
        eyebrow="Roadmap"
        title="Missing a tool you need?"
        body="Tell us which tool would make Gleo useful to you and we will say where it sits on the roadmap."
        actions={
          <>
            <ButtonLink href="/about/roadmap">Read the roadmap</ButtonLink>
            <ButtonLink href={BRAND.x} variant="line">
              Message {BRAND.xHandle}
            </ButtonLink>
          </>
        }
      />
      <JumpTo items={JUMP} />
    </>
  );
}
