import Link from "next/link";
import { ArrowRight, Building2, Code2, Landmark, Megaphone, Network, Smartphone, Users, Wrench } from "lucide-react";
import { BRAND } from "@/config/brand";
import { postsByDate, formatDate } from "@/lib/content/blog";
import { pageMeta } from "@/lib/seo";
import { Art } from "@/components/art";
import { Glyph } from "@/components/glyph";
import { HomeHero } from "@/components/home/HomeHero";
import { PostRail } from "@/components/home/PostRail";
import { PostCover } from "@/components/content/PostCover";
import { StatGrid } from "@/components/live/StatGrid";
import { ButtonLink, Container, Eyebrow, SectionHead, TextLink } from "@/components/ui";

export const metadata = pageMeta({
  path: "/",
  title: "Cross-Border Stablecoin Payments on Robinhood Chain",
  description:
    "Send USDG across borders in about a block, hold tokenized stocks verified on-chain and try open DeFi tools. Gleo runs on Robinhood Chain. Start a payment.",
  keywords: ["cross-border stablecoin payments", "Robinhood Chain", "USDG transfer", "tokenized stocks", "DeFi"],
});

const AUDIENCES = [
  {
    icon: Wrench,
    title: "For builders and developers",
    body: "Contract notes, RPC details, a docs map and live chain readings in one place. Prototype a USDG payment flow on Robinhood Chain in an afternoon, then grow it into a product.",
    href: "/developers",
    cta: "Open the developer hub",
  },
  {
    icon: Landmark,
    title: "For banks and asset issuers",
    body: "Issue funds, deposits or securities as tokens with freeze, clawback and holder approval written into the asset itself, then settle with counterparties at any hour.",
    href: "/institutions",
    cta: "See issuance and settlement",
  },
  {
    icon: Smartphone,
    title: "For fintech apps and wallets",
    body: "Give your users dollar transfers that land in about a block, local cash access through anchors and a shelf of verified stock tokens, all under your own brand.",
    href: "/fintechs",
    cta: "See payment rails for apps",
  },
];

const JOBS = [
  {
    art: "globe" as const,
    title: "Gleo for payments",
    body: "Send USDG across borders from your own wallet, with the address checked and the network fee shown before you sign.",
    href: "/use-cases/payments",
    cta: "Explore cross-border payments",
  },
  {
    art: "token" as const,
    title: "Gleo for tokenization",
    body: "Bring funds, bonds or invoices on-chain as tokens that carry their own holder rules wherever they travel.",
    href: "/use-cases/tokenization",
    cta: "Explore asset tokenization",
  },
  {
    art: "pool" as const,
    title: "Gleo for DeFi",
    body: "Lend, borrow and pool tokenized assets in markets anyone can inspect. Practice every flow today, free and without a transaction.",
    href: "/use-cases/defi",
    cta: "Explore DeFi on Gleo",
  },
];

const GROW = [
  { icon: Code2, title: "Builder grants", href: "/grants", cta: "Apply for a builder grant" },
  { icon: Building2, title: "Enterprise fund", href: "/enterprise-fund", cta: "Read about the enterprise fund" },
  { icon: Users, title: "Ecosystem map", href: "/ecosystem", cta: "Browse the Gleo ecosystem" },
];

export default function Home() {
  const posts = postsByDate();
  return (
    <>
      <HomeHero />

      {/* Three ways in */}
      <section className="bg-night py-16 text-fog">
        <Container>
          <h2 className="sr-only">Who Gleo is built for</h2>
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {AUDIENCES.map((a) => (
              <li key={a.title} className="flex min-w-0 flex-col border border-fog/25 bg-night-2 px-6 py-8">
                <Glyph icon={a.icon} dark />
                <h3 className="t-h3 mt-12">{a.title}</h3>
                <p className="mt-3 flex-1 text-[16px] leading-relaxed text-fog/70">{a.body}</p>
                <TextLink href={a.href} dark className="mt-8">
                  {a.cta}
                </TextLink>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Journal rail */}
      <section className="bg-paper py-16">
        <Container>
          <SectionHead
            eyebrow="From the journal"
            title="Gleo news and network notes"
            lead="Release notes, design decisions and the reasoning behind them, written by the people building Gleo on Robinhood Chain."
          />
          <div className="mt-2">
            <PostRail>
              {posts.map((post) => (
                <li key={post.slug} className="w-[78%] shrink-0 snap-start sm:w-[calc((100%-48px)/2.4)] lg:w-[calc((100%-72px)/4)]">
                  <Link href={`/blog/${post.slug}`} className="group block">
                    <PostCover title={post.title} category={post.category} />
                    <p className="mt-4 text-[12px] leading-relaxed text-ink-3">
                      {formatDate(post.date)} • {post.category}
                    </p>
                    <h3 className="mt-2 text-[16px] leading-[1.6] font-semibold group-hover:underline">{post.title}</h3>
                  </Link>
                </li>
              ))}
            </PostRail>
          </div>
          <TextLink href="/blog" className="mt-8">
            Read every Gleo journal post
          </TextLink>
        </Container>
      </section>

      {/* Network performance */}
      <section className="bg-paper pt-8 pb-16">
        <Container>
          <div className="max-w-[612px]">
            <Eyebrow>Network</Eyebrow>
            <h2 className="t-h2">Fast, cheap and measurable</h2>
            <p className="t-lead mt-6 text-ink-2">
              Robinhood Chain gives Gleo sub-second blocks and transfer fees in fractions of a cent. The panel below is read from the chain
              every few seconds, so each figure can be checked on the public block explorer.
            </p>
          </div>
          <div className="mt-9">
            <StatGrid />
          </div>
          <p className="mt-4 text-[13px] text-ink-3">
            Gleo&apos;s own payment targets are published separately and labelled as targets.{" "}
            <Link href="/network" className="text-ink underline underline-offset-4">
              Open the live network panel
            </Link>
          </p>
        </Container>
      </section>

      {/* Use cases */}
      <section className="bg-night py-16 text-fog lg:py-20">
        <Container>
          <SectionHead
            dark
            eyebrow="Gleo in practice"
            title="Three jobs Gleo does on Robinhood Chain"
            lead="Remittances, asset issuance and lending are old jobs. Here is how Gleo handles each one on-chain, and what you can try right now."
          />
          <ul className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-6">
            {JOBS.map((j) => (
              <li key={j.title} className="flex min-w-0 flex-col">
                <div className="aspect-[3/2] w-full overflow-hidden">
                  <Art name={j.art} night className="size-full" />
                </div>
                <h3 className="t-h3 mt-6">{j.title}</h3>
                <p className="mt-3 flex-1 text-[16px] leading-relaxed text-fog/70">{j.body}</p>
                <TextLink href={j.href} dark className="mt-8">
                  {j.cta}
                </TextLink>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Grants */}
      <section className="bg-sand py-16">
        <Container>
          <Eyebrow>Grow with Gleo</Eyebrow>
          <h2 className="t-h2">Grants and funding for builders</h2>
          <ul className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-6">
            {GROW.map((g) => (
              <li key={g.title} className="min-w-0">
                <Glyph icon={g.icon} />
                <h3 className="t-h3 mt-8">{g.title}</h3>
                <TextLink href={g.href} className="mt-4">
                  {g.cta}
                </TextLink>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Updates */}
      <section className="relative isolate overflow-hidden bg-paper">
        <div className="glow-field -z-10" aria-hidden="true" />
        <Container className="py-16 lg:py-20">
          <div className="mx-auto max-w-[612px] text-center">
            <Eyebrow>Updates</Eyebrow>
            <h2 className="t-h2 text-balance">Hear about every Gleo release first</h2>
            <p className="t-lead mt-6 text-ink-2">
              There is no mailing list yet. Releases, the {BRAND.symbol} contract address and grant rounds are posted on X before anywhere
              else.
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-[612px]">
            <ul className="space-y-6 text-left">
              <li className="flex gap-4">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-[4px] border border-ink bg-paper">
                  <Network className="size-3.5" />
                </span>
                <span>
                  <span className="block font-semibold">Network notes</span>
                  <span className="mt-1 block leading-relaxed text-ink-2">Releases, contract addresses, incidents and what changed on the live panels.</span>
                </span>
              </li>
              <li className="flex gap-4">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-[4px] border border-ink bg-paper">
                  <Megaphone className="size-3.5" />
                </span>
                <span>
                  <span className="block font-semibold">Builder notes</span>
                  <span className="mt-1 block leading-relaxed text-ink-2">Grant rounds, office hours and changes that affect your integration.</span>
                </span>
              </li>
            </ul>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <ButtonLink href={BRAND.x}>Follow {BRAND.xHandle} on X</ButtonLink>
              <ButtonLink href="/community" variant="line">
                Join the community
              </ButtonLink>
            </div>
            <p className="mt-8 text-center text-[12px] text-ink-3">
              Only trust contract addresses shown on {BRAND.domain} and on our X account.{" "}
              <Link href="/faq" className="underline underline-offset-4">
                Read the Gleo FAQ <ArrowRight className="inline size-3" />
              </Link>
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
