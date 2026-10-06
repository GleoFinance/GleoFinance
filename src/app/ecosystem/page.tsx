import { ArrowUpRight } from "lucide-react";
import { BRAND, CHAIN, explorerToken } from "@/config/brand";
import { STOCK_TOKENS, USDG, WETH } from "@/config/assets.generated";
import { WALLET_CATALOG } from "@/config/wallets";
import { pageMeta } from "@/lib/seo";
import { FilterGrid } from "@/components/content/FilterGrid";
import { ButtonLink, Container, Eyebrow, PageHero, Section, Tag, TextLink } from "@/components/ui";

export const metadata = pageMeta({
  path: "/ecosystem",
  title: "Robinhood Chain Ecosystem: Assets, Wallets, Markets",
  description:
    "The Robinhood Chain ecosystem Gleo uses today: verified stock tokens, USDG, markets, explorers, price feeds and wallets, each checked before listing. Browse.",
  keywords: ["Robinhood Chain ecosystem", "Robinhood Chain wallets", "tokenized stocks list", "Robinhood Chain DEX", "Blockscout"],
});

type Entry = { name: string; category: string; tag: string; body: string; href: string };

const ENTRIES: Entry[] = [
  { name: USDG.symbol, category: "Tokenized assets", tag: "Dollar token", body: `${USDG.name}, a dollar token with ${USDG.decimals} decimals and the currency of Gleo payments.`, href: explorerToken(USDG.address) },
  { name: WETH.symbol, category: "Tokenized assets", tag: "Wrapped ETH", body: "The chain's native coin as a token, used for pricing and pools.", href: explorerToken(WETH.address) },
  ...STOCK_TOKENS.map((t) => ({
    name: t.symbol,
    category: "Tokenized assets",
    tag: "Stock token",
    body: `${t.name.replace(/\s*•\s*Robinhood Token\s*$/, "")}, verified against the chain's stock-token beacon.`,
    href: explorerToken(t.address),
  })),
  { name: "Uniswap pools", category: "Markets", tag: "Exchange", body: "Concentrated-liquidity pools pairing stock tokens and WETH with USDG.", href: "https://app.uniswap.org" },
  { name: "Pons", category: "Markets", tag: "Launchpad", body: `Token launchpad with bonding curves that graduate to Uniswap v4 pools. ${BRAND.symbol} swaps route through it.`, href: "https://www.ponsfamily.com" },
  { name: "Dexscreener", category: "Markets", tag: "Market data", body: "Public pair data for Robinhood Chain; the Gleo asset explorer reads last prices from it.", href: "https://dexscreener.com/robinhood" },
  { name: "Blockscout", category: "Infrastructure", tag: "Explorer", body: "The block explorer for Robinhood Chain. Every transaction link on this site points here.", href: CHAIN.explorer },
  { name: "Chainlink", category: "Infrastructure", tag: "Price feeds", body: "Feeds for ETH and major stocks published on the chain, for markets that need a trusted price.", href: "https://data.chain.link" },
  { name: "Public RPC", category: "Infrastructure", tag: "RPC", body: `${CHAIN.publicRpc}, with a second public endpoint as fallback.`, href: CHAIN.publicRpc },
  ...WALLET_CATALOG.map((w) => ({ name: w.name, category: "Wallets", tag: "EVM wallet", body: "Adds Robinhood Chain as a network when you connect.", href: w.install })),
];

const FEATURED = [ENTRIES[0], ENTRIES.find((e) => e.name === "Uniswap pools")!, ENTRIES.find((e) => e.name === "Blockscout")!];

function EntryCard({ e }: { e: Entry }) {
  return (
    <a href={e.href} target="_blank" rel="noreferrer" className="group flex h-full flex-col border border-line bg-paper transition-colors hover:border-ink">
      <div className="relative flex h-40 items-center justify-center px-6">
        <span className="absolute top-4 left-4 rounded-full bg-sea px-2.5 py-0.5 text-[12px]">{e.category}</span>
        <span className="text-center font-display text-[clamp(1.8rem,1.5rem+1vw,2.4rem)] leading-tight break-words">{e.name}</span>
      </div>
      <div className="flex flex-1 flex-col bg-paper-2 px-6 py-5">
        <span className="self-start border border-line bg-paper px-2 py-0.5 text-[12px]">{e.tag}</span>
        <h3 className="mt-4 flex items-center gap-2 text-[16px] font-semibold group-hover:underline">
          {e.name} <ArrowUpRight className="size-4 shrink-0" />
        </h3>
        <p className="mt-2 text-[14px] leading-relaxed text-ink-2">{e.body}</p>
      </div>
    </a>
  );
}

export default function Ecosystem() {
  return (
    <>
      <PageHero
        tone="gray"
        eyebrow="Ecosystem"
        title="The Robinhood Chain ecosystem Gleo plugs into"
        lead="Gleo is built on a chain that already has a dollar token, tokenized shares, markets and an explorer. This page maps the Robinhood Chain ecosystem pieces we actually use. Nothing here is a paid placement, and nothing is a partnership unless it says so."
        crumbs={[{ name: "Ecosystem", path: "/ecosystem" }]}
        actions={<ButtonLink href="#included">Want to be listed?</ButtonLink>}
      />

      <section className="bg-paper-2 pb-16">
        <Container>
          <h2 className="sr-only">Featured ecosystem entries</h2>
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {FEATURED.map((e) => (
              <li key={e.name} className="min-w-0">
                <EntryCard e={e} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-night text-fog">
        <Container className="py-12 lg:py-14">
          <Eyebrow>The directory</Eyebrow>
          <h2 className="t-h2">Explore the Robinhood Chain directory</h2>
        </Container>
      </section>

      <Section>
        <FilterGrid
          label="Category"
          searchable
          searchLabel="Search assets, markets and wallets"
          items={ENTRIES.map((e) => ({ key: e.name, category: e.category, text: `${e.name} ${e.tag} ${e.body}`, node: <EntryCard e={e} /> }))}
        />
      </Section>

      <Section tone="gray" id="included">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="min-w-0">
            <Tag tone="plan">Listings open</Tag>
            <p className="t-eyebrow mt-6 mb-4">Get listed</p>
            <h2 className="t-h2">Want to be included?</h2>
          </div>
          <div className="min-w-0 lg:pt-16">
            <p className="t-lead text-ink-2">
              If you run a wallet, market, anchor or tool on Robinhood Chain that works with Gleo, send us the contract address or site. We
              check every entry ourselves before it appears here.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <ButtonLink href={BRAND.x}>Message {BRAND.xHandle}</ButtonLink>
              <TextLink href="/ecosystem/service-providers">See service providers</TextLink>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
