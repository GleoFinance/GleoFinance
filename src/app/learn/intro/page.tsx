import Link from "next/link";
import { ArrowRight, Code2, Coins, Layers, Send } from "lucide-react";
import { BRAND, CHAIN } from "@/config/brand";
import { ARTICLES, ARTICLE_SEO } from "@/lib/content/learn";
import { pageMeta } from "@/lib/seo";
import { Glyph } from "@/components/glyph";
import { StatGrid } from "@/components/live/StatGrid";
import { ButtonLink, Container, CtaBand, Eyebrow, LinkTiles, PageHero, Section, SectionHead, Split, Tag, TextLink } from "@/components/ui";

export const metadata = pageMeta({
  path: "/learn/intro",
  title: "What Is Gleo? Payments and Assets on Robinhood Chain",
  description:
    "What is Gleo? A payments, tokenized asset and DeFi network on Robinhood Chain. See what is live today, what runs in practice mode, and how to try it.",
  keywords: ["what is Gleo", "Robinhood Chain", "stablecoin payments", "tokenized assets", "DeFi"],
});

const PILLARS = [
  {
    icon: Send,
    title: "Built for payments",
    tag: "live" as const,
    body: "Send ETH or USDG to any Robinhood Chain address from your own wallet, with the address checked and the fee shown in dollars first.",
    href: "/use-cases/payments",
    cta: "How Gleo payments work",
  },
  {
    icon: Coins,
    title: "Built for asset tokenization",
    tag: "practice" as const,
    body: "Design a token for a fund share, a bond or an invoice, with freeze, clawback and holder approval fixed at creation.",
    href: "/use-cases/tokenization",
    cta: "How Gleo tokenization works",
  },
  {
    icon: Layers,
    title: "Built for open finance",
    tag: "practice" as const,
    body: "Lend, borrow and pool tokenized assets through contracts anyone can read. Practise the full flow today without a transaction.",
    href: "/use-cases/defi",
    cta: "How DeFi on Gleo works",
  },
  {
    icon: Code2,
    title: "Built for developers",
    tag: undefined,
    body: "Chain details, RPC endpoints and contract notes in one place, so you can wire a payment flow into your own app.",
    href: "/developers",
    cta: "Open the developer hub",
  },
];

export default function IntroPage() {
  const next = ["blockchain-basics", "stablecoins", "smart-contract-basics", "gas-and-fees"]
    .map((s) => ARTICLES.find((a) => a.slug === s))
    .filter((a) => a !== undefined);
  return (
    <>
      <PageHero
        eyebrow="Intro to Gleo"
        title="What is Gleo? Payments and real assets on Robinhood Chain"
        lead={`What is Gleo? It is a set of financial rails on ${CHAIN.name}: dollar payments that settle within a block, real-world assets issued with their rules attached, and open markets where both can be put to work.`}
        art="ledger"
        crumbs={[
          { name: "Learn", path: "/learn" },
          { name: "What is Gleo", path: "/learn/intro" },
        ]}
        actions={
          <>
            <ButtonLink href="/send">Try a USDG payment</ButtonLink>
            <ButtonLink href="/learn" variant="line">
              Browse all guides
            </ButtonLink>
          </>
        }
      />

      <Section tone="night">
        <SectionHead
          dark
          split
          eyebrow="Why Gleo exists"
          title="A network judged by use, not by promises"
          lead={
            <>
              <p>
                The test for Gleo is simple: can someone in one country pay someone in another before they finish reading this sentence, for less
                than a cent? Everything else follows from that.
              </p>
              <p className="mt-4">
                So we chose a fast, widely supported chain instead of starting a new one, and spend our effort where people actually touch money:
                address checks, fee previews, asset verification and clear receipts.
              </p>
            </>
          }
        />
      </Section>

      <Section>
        <SectionHead
          eyebrow="Building on Gleo"
          title="Four things Gleo is built to do"
          lead="Each one has a part you can use today and, where a contract is needed, a practice version that runs on free signed receipts until audited contracts ship."
        />
        <ul className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {PILLARS.map((p) => (
            <li key={p.title} className="flex min-w-0 flex-col">
              <Glyph icon={p.icon} />
              <div className="mt-8 flex flex-wrap items-center gap-2">
                <h3 className="t-h3">{p.title}</h3>
                {p.tag ? <Tag tone={p.tag} /> : null}
              </div>
              <p className="mt-3 flex-1 text-[16px] leading-relaxed text-ink-2">{p.body}</p>
              <TextLink href={p.href} className="mt-6">
                {p.cta}
              </TextLink>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="gray">
        <Split eyebrow="The ecosystem" title="Open to wallets, anchors, issuers and builders" art="people">
          <p>
            Wallets, cash-in and cash-out businesses, asset issuers and developers all connect to the same ledger. Nobody needs our permission to
            read it or to build on it, and every live figure on this site can be checked on the public explorer.
          </p>
          <p>
            Any EVM wallet that can add a custom network works with Gleo. Add {CHAIN.name} (chain id {CHAIN.id}) once and every live tool is
            available.
          </p>
          <div className="pt-2">
            <ButtonLink href="/ecosystem" variant="ink">
              Explore the Gleo ecosystem
            </ButtonLink>
          </div>
        </Split>
      </Section>

      <Section>
        <SectionHead
          eyebrow="Real work"
          title="Made for jobs that already exist"
          lead="Remittances, aid payouts, fund shares and cash access are not new ideas. The rails underneath them are what Gleo changes."
        />
        <div className="mt-12">
          <LinkTiles
            cols={4}
            items={[
              { href: "/use-cases/payments", title: "Remittances", body: "Money sent home lands within a block, not in three working days.", label: "Cross-border payments" },
              { href: "/use-cases/aid", title: "Aid payouts", body: "One signed batch can reach many recipients at once.", label: "Aid disbursements" },
              { href: "/use-cases/tokenization", title: "Fund shares", body: "Issued, transferred and redeemed on a shared ledger.", label: "Asset tokenization" },
              { href: "/use-cases/ramps", title: "Cash access", body: "Anchors convert local money at both ends of a transfer.", label: "On and off-ramps" },
            ]}
          />
        </div>
      </Section>

      <section className="bg-paper pb-16 lg:pb-20">
        <Container>
          <div className="max-w-[612px]">
            <Eyebrow>Network</Eyebrow>
            <h2 className="t-h2">Robinhood Chain right now</h2>
            <p className="t-lead mt-6 text-ink-2">
              These are the chain&apos;s own figures, read every few seconds through the Gleo server. They describe Robinhood Chain as a whole, not
              Gleo&apos;s traffic.
            </p>
          </div>
          <div className="mt-9">
            <StatGrid />
          </div>
          <TextLink href="/network" className="mt-6">
            Open the full Gleo network panel
          </TextLink>
        </Container>
      </section>

      <Section tone="gray">
        <SectionHead eyebrow="Keep learning" title="Guides to read after this overview" />
        <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {next.map((a) => (
            <li key={a.slug} className="min-w-0">
              <Link href={`/learn/${a.slug}`} className="group flex h-full flex-col border border-line bg-paper p-8 transition-colors hover:border-ink">
                <span className="text-[12px] text-ink-3">{a.minutes} min read</span>
                <h3 className="mt-3 text-[17px] leading-snug font-semibold">{ARTICLE_SEO[a.slug]?.title ?? a.title}</h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink-2">{a.summary}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-[15px]">
                  <ArrowRight className="size-4" /> Read the guide
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand
        eyebrow="Updates"
        title="Get Gleo news the moment it ships"
        body="Contract addresses, releases and grant rounds are posted on X before anywhere else."
        actions={
          <>
            <ButtonLink href={BRAND.x}>Follow {BRAND.xHandle} on X</ButtonLink>
            <ButtonLink href="/blog" variant="line">
              Read the Gleo blog
            </ButtonLink>
          </>
        }
      />
    </>
  );
}
