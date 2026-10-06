import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/config/brand";
import { WALLET_CATALOG } from "@/config/wallets";
import { LiveFigures } from "@/components/live/LiveFigures";
import { ButtonLink, CtaBand, LinkTiles, PageHero, Section, SectionHead, Split, Steps, Tag } from "@/components/ui";

export const metadata: Metadata = {
  title: "DeFi",
  description: "Lending, borrowing, automated market makers and a built-in exchange for Gleo tokens and tokenized assets on Robinhood Chain.",
};

const CONNECT = [
  { title: "Protocols", body: "Uniswap pools already trade stock tokens and WETH against USDG on Robinhood Chain; Pons launches new tokens." },
  { title: "Wallets", body: `${WALLET_CATALOG.slice(0, 5).map((w) => w.name).join(", ")} and other EVM wallets that can add a network.` },
  { title: "Bridges", body: "Robinhood Chain is an EVM network; assets arrive through its official bridge and third-party routes." },
  { title: "Oracles", body: "Chainlink price feeds for major stocks and ETH are published on the chain." },
  { title: "Tokenization", body: "Verified stock tokens and USDG, listed with live supply in the asset explorer." },
  { title: "RPC providers", body: "The public endpoint, a second public fallback, and private providers for production apps." },
];

export default function DeFi() {
  return (
    <>
      <PageHero
        title="Open markets for assets that exist off-chain too"
        lead="Lend, borrow and trade against tokenized shares, dollars and Gleo tokens in markets anyone can audit. The rules sit in smart contracts; nobody holds your funds for you."
        art="pool"
        meta={<Tag tone="practice">Lending and pools in practice mode</Tag>}
        actions={
          <>
            <ButtonLink href="/lend" variant="accent">
              Try lending
            </ButtonLink>
            <ButtonLink href="/pools" variant="line">
              Try a pool
            </ButtonLink>
          </>
        }
      />

      <Section>
        <SectionHead title="What the chain looks like right now" lead="DeFi is only as good as the network under it. These readings come straight from Robinhood Chain." />
        <div className="mt-10">
          <LiveFigures />
        </div>
      </Section>

      <Section tone="card">
        <Split title="Smarter contracts, plainer rules" art="code">
          <p>
            Gleo&apos;s markets are written as Gleo Contracts in Solidity for Robinhood Chain. Each market states its collateral, its
            loan-to-value, its price source and its liquidation penalty in code that anyone can read on the explorer.
          </p>
          <p>
            Tokenized assets keep their issuer controls inside DeFi too: a frozen holder cannot post that asset as collateral, and a market
            can refuse assets whose issuer can claw back without notice.
          </p>
          <Link href="/smart-contracts" className="font-semibold text-sea-deep underline underline-offset-4">
            About Gleo Contracts
          </Link>
        </Split>
      </Section>

      <Section>
        <SectionHead title="Plug into what already exists" lead="Gleo is not starting from an empty chain. These pieces are live on Robinhood Chain today." />
        <dl className="mt-10 grid grid-cols-1 gap-x-12 md:grid-cols-2 lg:grid-cols-3">
          {CONNECT.map((c) => (
            <div key={c.title} className="min-w-0 border-t border-line-2 py-6">
              <dt className="font-display text-xl font-semibold">{c.title}</dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-ink-2">{c.body}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-6">
          <ButtonLink href="/ecosystem" variant="line">
            Full ecosystem list
          </ButtonLink>
        </div>
      </Section>

      <Section tone="night">
        <SectionHead dark title="Three markets, in order" lead="What Gleo plans to ship, and what you can rehearse today." />
        <div className="mt-12">
          <Steps
            dark
            steps={[
              { title: "Exchange", body: "A built-in exchange for Gleo tokens and tokenized assets. $GLEO itself swaps through Pons from launch." },
              { title: "Pools", body: "Constant-product pools where liquidity providers earn the trading fee. Practice mode today." },
              { title: "Lending", body: "Supply USDG to earn interest, or borrow it against tokenized shares. Practice mode today." },
            ]}
          />
        </div>
      </Section>

      <Section tone="card">
        <SectionHead
          title="Building a DeFi product?"
          lead="Builder grants open with the first round. Until then, the developer hub has the network details and the read-only endpoints this site uses."
          action={
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/grants" variant="ink">
                Grants
              </ButtonLink>
              <ButtonLink href="/developers" variant="line">
                Developer hub
              </ButtonLink>
            </div>
          }
        />
      </Section>

      <Section>
        <Split title="Add markets to your own product" art="wallet" reverse>
          <p>
            Wallets and fintech apps can offer yield on dollar balances or credit against a portfolio without running a lending desk. The
            contracts handle the book; your app handles the customer.
          </p>
          <Link href="/fintechs" className="font-semibold text-sea-deep underline underline-offset-4">
            For fintechs and wallets
          </Link>
        </Split>
      </Section>

      <Section tone="card" tight>
        <SectionHead title="More to explore" />
        <div className="mt-8">
          <LinkTiles
            items={[
              { href: "/grants/bug-bounty", title: "Securing the contracts", body: "Scope, severity levels and how to report a bug." },
              { href: "/case-studies/inventory-credit-line", title: "Borrowing against shares", body: "A retailer funds its busy season without selling.", tag: "example" },
              { href: "/anchors", title: "Ramps", body: "Bring dollars in from a bank before you put them to work.", tag: "practice" },
            ]}
          />
        </div>
      </Section>

      <CtaBand
        title="Rehearse a position before the markets open"
        body="Practice mode records each action as a signed receipt in your browser. No transaction, no risk, real wallet."
        actions={
          <>
            <ButtonLink href="/lend" variant="fog">
              Lend and borrow
            </ButtonLink>
            <ButtonLink href={BRAND.x} variant="line" className="border-fog/30 text-fog hover:border-fog">
              Follow launches
            </ButtonLink>
          </>
        }
      />
    </>
  );
}
