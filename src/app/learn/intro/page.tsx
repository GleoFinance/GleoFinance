import type { Metadata } from "next";
import Link from "next/link";
import { BRAND, CHAIN } from "@/config/brand";
import { ARTICLES } from "@/lib/content/learn";
import { LiveFigures } from "@/components/live/LiveFigures";
import { ButtonLink, CtaBand, LinkTiles, PageHero, Rows, Section, SectionHead, Split, Tag } from "@/components/ui";

export const metadata: Metadata = {
  title: "What is Gleo",
  description: "Gleo in ten minutes: a payments, asset tokenization and DeFi network on Robinhood Chain, what is live today and what comes next.",
};

export default function IntroPage() {
  const next = ["federated-byzantine-agreement", "stablecoins", "smart-contract-basics", "anchors-basics"]
    .map((s) => ARTICLES.find((a) => a.slug === s)!)
    .filter(Boolean);
  return (
    <>
      <PageHero
        title="Gleo, the network and the people around it"
        lead={`${BRAND.name} is a set of financial rails on ${CHAIN.name}: dollar payments that settle in a block, real-world assets issued with their rules attached, and open markets to put both to work.`}
        art="ledger"
        actions={
          <>
            <ButtonLink href="/send" variant="accent">
              Try a payment
            </ButtonLink>
            <ButtonLink href="/learn" variant="line">
              All guides
            </ButtonLink>
          </>
        }
      />

      <Section>
        <Split title="Built to be used, not admired" art="globe">
          <p>
            Most blockchains are judged by what they could do. Gleo is judged by whether someone in one country can pay someone in another in
            the time it takes to read this sentence, for less than a cent.
          </p>
          <p>
            That means picking a fast, cheap, widely supported chain rather than building a new one, and spending our effort on the parts people
            touch: address checks, fee previews, asset verification and clear receipts.
          </p>
        </Split>
      </Section>

      <Section tone="card">
        <SectionHead title="Three jobs Gleo does" lead="Each one has a live part you can use today and a contract-backed part that runs in practice mode until it is audited." />
        <div className="mt-10">
          <Rows
            items={[
              {
                title: "Payments",
                meta: <Tag tone="live" />,
                body: "Send ETH or USDG to any address on Robinhood Chain from your own wallet, with the fee shown in dollars before you sign.",
                href: "/use-cases/payments",
              },
              {
                title: "Asset tokenization",
                meta: <Tag tone="practice" />,
                body: "Issue a token for gold, a bond, a fund share or a property, with freeze, clawback and holder approval decided at creation.",
                href: "/use-cases/tokenization",
              },
              {
                title: "Decentralized finance",
                meta: <Tag tone="practice" />,
                body: "Lend, borrow and provide liquidity against tokenized assets through contracts anyone can read.",
                href: "/use-cases/defi",
              },
            ]}
          />
          <p className="mt-6 text-[15px] text-ink-2">
            Building something? Start at the <Link href="/developers" className="font-semibold text-sea-deep underline underline-offset-4">developer hub</Link>.
          </p>
        </div>
      </Section>

      <section className="bg-night py-16 text-fog sm:py-24">
        <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <div className="min-w-0">
            <h2 className="font-display text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.05] font-bold tracking-[-0.02em]">A network you can join without asking</h2>
            <p className="mt-5 text-[17px] leading-relaxed text-fog-2">
              Wallets, anchors, issuers and developers each connect to the same ledger. Nobody needs our permission to read it or to build on it.
            </p>
            <div className="mt-6">
              <ButtonLink href="/community" variant="fog">
                Meet the community
              </ButtonLink>
            </div>
          </div>
          <ul className="grid min-w-0 grid-cols-1 gap-px overflow-hidden rounded-2xl bg-fog/15 sm:grid-cols-2">
            {[
              ["Wallets", "Any EVM wallet that can add a custom network."],
              ["Anchors", "Businesses that exchange local money for tokens."],
              ["Issuers", "Funds, treasuries and companies putting assets on-chain."],
              ["Developers", "Teams building apps on top of the rails."],
            ].map(([t, b]) => (
              <li key={t} className="bg-night p-6">
                <p className="font-display text-xl font-semibold">{t}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-fog-2">{b}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Section>
        <SectionHead title="Made for real work" lead="Remittances, supplier payments, payroll, fund distribution and collateralised loans already exist. The rails underneath them are what changes." />
        <div className="mt-10">
          <LinkTiles
            cols={4}
            items={[
              { href: "/use-cases/payments", title: "Remittances", body: "Money home in seconds, not days." },
              { href: "/use-cases/aid", title: "Aid payouts", body: "One batch, many recipients." },
              { href: "/use-cases/tokenization", title: "Fund shares", body: "Issued and redeemed on-chain." },
              { href: "/use-cases/ramps", title: "Cash access", body: "Anchors at both ends." },
            ]}
          />
        </div>
      </Section>

      <Section tone="card">
        <SectionHead title="The network right now" lead="Read from Robinhood Chain every few seconds. These are the chain's own figures, not Gleo's traffic." />
        <div className="mt-10">
          <LiveFigures />
        </div>
      </Section>

      <Section>
        <SectionHead title="Your next read" />
        <div className="mt-8">
          <LinkTiles
            cols={4}
            items={next.map((a) => ({ href: `/learn/${a.slug}`, title: a.title, body: a.summary, label: `${a.minutes} min read` }))}
          />
        </div>
      </Section>

      <CtaBand
        title="Updates go out on X first"
        body="Contract addresses, releases and grant rounds."
        actions={
          <ButtonLink href={BRAND.x} variant="fog">
            Follow {BRAND.xHandle}
          </ButtonLink>
        }
      />
    </>
  );
}
