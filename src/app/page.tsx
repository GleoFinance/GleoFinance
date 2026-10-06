import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BRAND } from "@/config/brand";
import { STOCK_TOKENS } from "@/config/assets.generated";
import { postsByDate, formatDate } from "@/lib/content/blog";
import { Art } from "@/components/art";
import { HeroSlip } from "@/components/home/HeroSlip";
import { LiveFigures } from "@/components/live/LiveFigures";
import { ButtonLink, Container, CtaBand, Figures, Rows, Section, SectionHead, Split, Tag } from "@/components/ui";

const AUDIENCES = [
  {
    title: "Builders",
    body: "Contracts, RPC endpoints, chain details and a docs map that starts where you are. Ship a payment flow in an afternoon and grow it from there.",
    href: "/developers",
    cta: "Open the developer hub",
  },
  {
    title: "Institutions",
    body: "Issue funds, deposits and securities as tokens with freeze, clawback and holder approval built into the asset, and settle around the clock.",
    href: "/institutions",
    cta: "See issuance and settlement",
  },
  {
    title: "Fintechs and wallets",
    body: "Give your users dollar payments that clear in seconds, cash access through anchors and a shelf of tokenized assets, behind your own interface.",
    href: "/fintechs",
    cta: "See payment rails",
  },
];

export default function Home() {
  const latest = postsByDate().slice(0, 4);
  return (
    <>
      {/* Hero */}
      <section className="meridians border-b border-line bg-paper">
        <Container className="grid grid-cols-1 items-center gap-12 py-14 sm:py-20 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:py-24">
          <div className="min-w-0">
            <p className="mb-6 inline-flex flex-wrap items-center gap-2 rounded-full border border-line-2 bg-card py-1 pr-3 pl-1 text-[13px] text-ink-2">
              <span className="rounded-full bg-ink px-2 py-0.5 font-mono text-[11px] text-fog">{BRAND.symbol}</span>
              <span className="sm:hidden">Live on Robinhood Chain</span>
              <span className="hidden sm:inline">Payments, tokenized assets and DeFi on Robinhood Chain</span>
            </p>
            <h1 className="font-display text-[clamp(2.8rem,7vw,6rem)] leading-[0.92] font-bold tracking-[-0.04em]">
              Global Finance.
              <br />
              <span className="text-sea">No Borders.</span>
            </h1>
            <p className="mt-7 max-w-xl text-[19px] leading-relaxed text-ink-2">
              {BRAND.tagline} Gleo turns a dollar token, a shelf of real-world assets and open markets into one set of rails anyone can
              build on.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/send" variant="accent">
                Send a payment
              </ButtonLink>
              <ButtonLink href="/learn/intro" variant="line">
                How Gleo works
              </ButtonLink>
            </div>
          </div>
          <div className="relative min-w-0">
            <Art name="globe" className="opacity-90" />
            <div className="mt-[-12%] flex justify-center lg:absolute lg:-bottom-6 lg:-left-10 lg:mt-0 lg:block">
              <HeroSlip />
            </div>
          </div>
        </Container>
      </section>

      {/* Already on the chain */}
      <section className="border-b border-line bg-card">
        <Container className="flex flex-col gap-4 py-6 md:flex-row md:items-center">
          <p className="shrink-0 text-sm font-semibold text-ink-2 md:w-56">Already on Robinhood Chain, usable through Gleo today</p>
          <ul className="flex min-w-0 flex-wrap gap-2">
            {["USDG", "WETH", ...STOCK_TOKENS.map((t) => t.symbol)].map((s) => (
              <li key={s}>
                <Link href="/assets" className="block rounded-full border border-line-2 px-3 py-1 font-mono text-[12.5px] hover:border-ink">
                  {s}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Three ways in */}
      <section className="bg-night py-16 text-fog sm:py-24">
        <Container>
          <SectionHead dark title="One network, three ways in" lead="Pick the door that matches what you are building. They all lead to the same ledger." />
          <div className="mt-12 grid grid-cols-1 border-t border-fog/15 md:grid-cols-3">
            {AUDIENCES.map((a, i) => (
              <div key={a.title} className={`min-w-0 py-8 md:px-8 ${i > 0 ? "border-t border-fog/15 md:border-t-0 md:border-l" : "md:pl-0"}`}>
                <p className="font-mono text-[12px] text-fog-2">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 font-display text-[1.7rem] font-semibold">{a.title}</h3>
                <p className="mt-3 text-[15.5px] leading-relaxed text-fog-2">{a.body}</p>
                <Link href={a.href} className="mt-6 inline-flex items-center gap-1.5 font-semibold text-fog hover:underline">
                  {a.cta} <ArrowRight className="size-4" />
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Journal */}
      <Section>
        <SectionHead
          title="From the journal"
          lead="Product notes, network decisions and the reasoning behind them, written by the people building Gleo."
          action={
            <ButtonLink href="/blog" variant="line">
              All posts
            </ButtonLink>
          }
        />
        <ul className="mt-10 border-t border-line-2">
          {latest.map((post) => (
            <li key={post.slug} className="border-b border-line-2">
              <Link href={`/blog/${post.slug}`} className="group grid grid-cols-1 gap-2 py-6 md:grid-cols-[180px_minmax(0,1fr)_auto] md:items-baseline md:gap-8">
                <span className="font-mono text-[12.5px] text-ink-3">
                  {formatDate(post.date)} · {post.category}
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-[1.4rem] leading-snug font-semibold group-hover:underline">{post.title}</span>
                  <span className="mt-1 block text-[15px] text-ink-2">{post.summary}</span>
                </span>
                <ArrowRight className="hidden size-5 text-ink-3 md:block" />
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* Performance */}
      <Section tone="card">
        <SectionHead
          title="Measured, not promised"
          lead="The figures below are read from Robinhood Chain every few seconds. Underneath them are the targets Gleo's payment layer is designed to hit, marked as targets until they can be measured."
        />
        <div className="mt-10">
          <LiveFigures />
        </div>
        <div className="mt-12">
          <p className="mb-4 text-sm font-semibold text-ink-2">Design targets for Gleo payments</p>
          <Figures
            items={[
              { label: "Settlement", value: "< 10 s", tag: "target", note: "From signing to final, including the wallet round trip" },
              { label: "Fee per payment", value: "$0.0001", tag: "target", note: "Paid in ETH; compare the live reading above" },
              { label: "Throughput", value: "4,000 tps", tag: "target", note: "Payments per second the routing layer is sized for" },
              { label: "Reach", value: "180+", tag: "target", note: "Countries we aim to cover through anchors" },
            ]}
          />
        </div>
      </Section>

      {/* Use cases */}
      <Section>
        <SectionHead title="Built for work that already exists" lead="Remittances, payroll, funds and loans are old jobs. Gleo makes them cheaper, faster and open around the clock." />
        <div className="mt-14 space-y-20">
          <Split title="Payments that clear before the coffee cools" art="globe">
            <p>Send dollars from one wallet to another anywhere the internet reaches. The recipient sees the money within a block, and the fee is a fraction of a cent.</p>
            <p>
              <Link href="/use-cases/payments" className="font-semibold text-sea-deep underline underline-offset-4">
                Gleo for payments
              </Link>
            </p>
          </Split>
          <Split title="Put real assets on the ledger" art="token" reverse>
            <p>Gold, shares, bonds, invoices and property can be issued as tokens that carry their rules with them: who may hold them, and what the issuer can do if something goes wrong.</p>
            <p>
              <Link href="/use-cases/tokenization" className="font-semibold text-sea-deep underline underline-offset-4">
                Gleo for tokenization
              </Link>
            </p>
          </Split>
          <Split title="Open markets for real-world value" art="pool">
            <p>Lend, borrow and trade against tokenized assets in markets anyone can inspect. Smart contracts hold the rules; nobody holds your funds for you.</p>
            <p>
              <Link href="/use-cases/defi" className="font-semibold text-sea-deep underline underline-offset-4">
                Gleo for DeFi
              </Link>
            </p>
          </Split>
        </div>
      </Section>

      {/* Grants */}
      <Section tone="card">
        <SectionHead title="Money for people who build" lead="Grants for open-source work, an enterprise fund for companies, and a map of what already plugs in." />
        <div className="mt-10">
          <Rows
            cols={1}
            items={[
              { title: "Builder grants", body: "Milestone-based support for wallets, tools and integrations that make Gleo more useful. Applications open with the grants round.", href: "/grants", meta: <Tag tone="plan">Opening soon</Tag> },
              { title: "Enterprise fund", body: "For companies taking payments or issuance to production: capital, introductions and help with the regulated parts.", href: "/enterprise-fund" },
              { title: "Explore the ecosystem", body: "Wallets, explorers, oracles and launchpads on Robinhood Chain that Gleo works with today.", href: "/ecosystem" },
            ]}
          />
        </div>
      </Section>

      <CtaBand
        title="Hear it when it ships"
        body={`We post releases, contract addresses and grant rounds on X first. An email list opens once there is enough worth sending.`}
        actions={
          <>
            <ButtonLink href={BRAND.x} variant="fog">
              Follow {BRAND.xHandle}
            </ButtonLink>
            <ButtonLink href="/community" variant="line" className="border-fog/30 text-fog hover:border-fog">
              Community
            </ButtonLink>
          </>
        }
      />
    </>
  );
}
