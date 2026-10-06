import { ArrowLeftRight, Droplets, HandCoins, LineChart } from "lucide-react";
import { BRAND } from "@/config/brand";
import { WALLET_CATALOG } from "@/config/wallets";
import { pageMeta, faqLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Glyph } from "@/components/glyph";
import { LiveFigures } from "@/components/live/LiveFigures";
import { JumpTo } from "@/components/content/JumpTo";
import { ScenarioCover } from "@/components/content/ScenarioCover";
import { ButtonLink, Faq, InfoCards, LinkTiles, PageHero, Section, SectionHead, Split, Tag, TextLink } from "@/components/ui";

export const metadata = pageMeta({
  path: "/use-cases/defi",
  title: "DeFi for Tokenized Stocks and USDG on Robinhood Chain",
  description:
    "DeFi for tokenized stocks and USDG on Robinhood Chain: lending, pools and swaps with rules written in open contracts. Practice every position free today.",
  keywords: ["DeFi for tokenized stocks", "borrow against stocks", "USDG lending", "liquidity pools", "Robinhood Chain DeFi"],
});

const CONNECT = [
  { title: "Markets", body: "Uniswap pools already trade stock tokens and WETH against USDG on Robinhood Chain, and the Pons launchpad lists new tokens." },
  { title: "Wallets", body: `${WALLET_CATALOG.slice(0, 5).map((w) => w.name).join(", ")} and other EVM wallets that can add a network.` },
  { title: "Bridges", body: "Robinhood Chain is an EVM network; assets arrive through its official bridge and third-party routes." },
  { title: "Price feeds", body: "Chainlink publishes feeds for ETH and major stocks on the chain." },
  { title: "Tokenized assets", body: "Verified stock tokens and USDG, listed with live supply in the Gleo asset explorer." },
  { title: "RPC access", body: "A public endpoint, a second public fallback, and private providers for production apps." },
];

const FAQ = [
  {
    q: "Can I lend or borrow on Gleo today?",
    a: "Not on mainnet. The Gleo lending market and pools are designed but not deployed or audited. The Lend and Pools pages let you rehearse positions with signed practice receipts; no transaction is sent.",
  },
  {
    q: "Which assets will Gleo DeFi markets accept?",
    a: "The plan starts with USDG, WETH and stock tokens verified on Robinhood Chain. Each market will state its collateral, loan-to-value, price source and liquidation penalty in code anyone can read.",
  },
  {
    q: "What happens to tokenized stocks outside market hours?",
    a: "Tokens trade on-chain around the clock while the underlying exchange closes, so prices can gap at the open. Conservative loan-to-value limits and stale-price checks are part of the market design for that reason.",
  },
  {
    q: "Can I swap $GLEO already?",
    a: "Swaps route through the Pons launchpad and switch on automatically once the token contract is published on this site.",
  },
];

const JUMP = [
  { id: "live", label: "Live chain readings" },
  { id: "contracts", label: "Rules in contracts" },
  { id: "markets", label: "Three markets" },
  { id: "plug-in", label: "What already exists" },
  { id: "scenario", label: "Borrowing scenario" },
  { id: "faq", label: "FAQ" },
];

export default function DeFi() {
  return (
    <>
      <PageHero
        eyebrow="DeFi"
        title="DeFi for tokenized stocks and digital dollars"
        lead="Gleo brings DeFi for tokenized stocks to Robinhood Chain: lend USDG, borrow against verified share tokens and provide liquidity in markets whose rules sit in open contracts. Nobody holds your funds for you, and every position can be rehearsed for free before the contracts go live."
        art="pool"
        meta={<Tag tone="practice">Lending and pools in practice mode</Tag>}
        crumbs={[
          { name: "Use cases", path: "/use-cases" },
          { name: "DeFi", path: "/use-cases/defi" },
        ]}
        actions={
          <>
            <ButtonLink href="/lend">Practice lending</ButtonLink>
            <ButtonLink href="/pools" variant="line">
              Practice a pool
            </ButtonLink>
          </>
        }
      />

      <Section tone="night" tight>
        <SectionHead
          dark
          split
          eyebrow="How it works"
          title="Markets anyone can audit, assets that keep their rules"
          lead="Each Gleo market states its collateral, loan-to-value, price source and liquidation penalty in code on the explorer. Tokenized assets keep their issuer controls inside DeFi too: a frozen holder cannot post that asset as collateral."
        />
      </Section>

      <Section tone="gray" id="live">
        <SectionHead eyebrow="Live readings" title="The chain under every position" lead="DeFi is only as dependable as its network. These readings come straight from Robinhood Chain." />
        <div className="mt-10">
          <LiveFigures />
        </div>
      </Section>

      <Section id="contracts">
        <Split eyebrow="Gleo Contracts" title="Plain rules, written in Solidity" art="code">
          <p>
            Gleo markets are Solidity contracts for Robinhood Chain. A market can refuse assets whose issuer is able to claw back without
            notice, and every parameter is readable before you commit a single token.
          </p>
          <TextLink href="/smart-contracts">How Gleo smart contracts are built</TextLink>
        </Split>
      </Section>

      <Section tone="night" id="markets">
        <SectionHead dark eyebrow="Roadmap" title="Three DeFi markets, in the order they ship" />
        <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            { icon: ArrowLeftRight, title: "Exchange", tag: "live" as const, tagText: "$GLEO via Pons", body: "Swap Gleo tokens and tokenized assets. $GLEO itself swaps through Pons from launch." },
            { icon: Droplets, title: "Pools", tag: "practice" as const, tagText: undefined, body: "Constant-product pools where liquidity providers earn the trading fee." },
            { icon: HandCoins, title: "Lending", tag: "practice" as const, tagText: undefined, body: "Supply USDG to earn interest, or borrow USDG against tokenized shares." },
          ].map((m) => (
            <li key={m.title} className="flex min-w-0 flex-col border border-fog/25 bg-night-2 px-6 py-8">
              <Glyph icon={m.icon} dark />
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <h3 className="t-h3">{m.title}</h3>
                <Tag tone={m.tag}>{m.tagText}</Tag>
              </div>
              <p className="mt-3 text-[16px] leading-relaxed text-fog/70">{m.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="gray" id="plug-in">
        <SectionHead eyebrow="Ecosystem" title="Pieces already live on Robinhood Chain" lead="Gleo is not starting from an empty chain. These are in production today and run by others." />
        <div className="mt-10">
          <InfoCards cols={3} items={CONNECT} />
        </div>
        <TextLink href="/ecosystem" className="mt-8">
          Browse the full Robinhood Chain ecosystem list
        </TextLink>
      </Section>

      <Section id="scenario">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-24">
          <div className="min-w-0">
            <ScenarioCover area="DeFi" icon={LineChart} label="Illustration for the inventory credit line scenario" />
          </div>
          <div className="min-w-0">
            <p className="t-eyebrow mb-4">Field scenario</p>
            <h2 className="t-h2 text-balance">A retailer borrows against tokenized shares for its busy season</h2>
            <p className="t-lead mt-6 text-ink-2">
              Six weeks of USDG credit backed by index share tokens instead of selling them, with the liquidation risk spelled out. An
              illustrative plan you can rehearse on the Lend page.
            </p>
            <div className="mt-8">
              <ButtonLink href="/case-studies/inventory-credit-line">Read the borrowing scenario</ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="gray" id="faq">
        <JsonLd data={faqLd(FAQ)} />
        <SectionHead eyebrow="FAQ" title="Questions about DeFi on Gleo" />
        <div className="mt-10">
          <Faq items={FAQ} />
        </div>
      </Section>

      <Section tight>
        <SectionHead eyebrow="Keep exploring" title="More for DeFi builders and users" />
        <div className="mt-10">
          <LinkTiles
            items={[
              { href: "/grants/bug-bounty", title: "Bug bounty", body: "Scope, severity levels and how to report a contract bug.", label: "Read the bug bounty" },
              { href: "/fintechs", title: "Add markets to your app", body: "Offer yield on dollar balances or credit against a portfolio without running a lending desk.", label: "See the fintech page" },
              { href: "/grants", title: "Builder grants", body: "Funding for DeFi tools and integrations on Gleo.", label: "Apply for a grant" },
            ]}
          />
        </div>
      </Section>

      <Section tone="gray">
        <SectionHead
          split
          eyebrow="Stay close"
          title="Rehearse a position before the markets open"
          lead="Practice mode records each action as a signed receipt in your browser: a real wallet, no transaction and no risk. Launch news lands on X first."
          action={
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/lend">Open lend and borrow</ButtonLink>
              <ButtonLink href={BRAND.x} variant="line">
                Follow {BRAND.xHandle}
              </ButtonLink>
            </div>
          }
        />
      </Section>
      <JumpTo items={JUMP} />
    </>
  );
}
