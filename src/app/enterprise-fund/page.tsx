import { Compass, Handshake, Route } from "lucide-react";
import { BRAND } from "@/config/brand";
import { pageMeta } from "@/lib/seo";
import { Glyph } from "@/components/glyph";
import { ButtonLink, CtaBand, Eyebrow, InfoCards, PageHero, Section, SectionHead, Split, Tag } from "@/components/ui";

export const metadata = pageMeta({
  path: "/enterprise-fund",
  title: "Enterprise Fund for Payment and Fintech Companies",
  description:
    "Capital, partner introductions and launch help for payment firms, ramps and asset issuers building on Gleo and Robinhood Chain. See what the fund looks for.",
  keywords: ["enterprise fund", "fintech funding", "payments startup investment", "Robinhood Chain", "stablecoin companies"],
});

const CRITERIA = [
  ["Fit with Gleo", "The product moves money or real-world assets, and Gleo makes it cheaper, faster or reachable where it was not."],
  ["Impact", "Real people or businesses end up with better access to payments, savings or markets."],
  ["Team", "Founders who understand the regulated side of their market as well as the code."],
  ["Timing", "A product close to launch, or live elsewhere and ready to add Robinhood Chain."],
  ["Viability", "A revenue plan that does not rely on token prices going up."],
  ["Use case", "A concrete flow we can test: who pays whom, in what asset, and how they cash out."],
];

const HELP = [
  { icon: Handshake, title: "Introductions", body: "Warm connections to anchors, wallets and issuers building on Gleo, so a first integration partner is one message away." },
  { icon: Route, title: "Rails that reach people", body: "Help planning cash-in and cash-out coverage for the corridors you serve as the anchor network grows." },
  { icon: Compass, title: "Support at each stage", body: "From first pilot to later rounds: technical reviews, compliance questions and introductions to follow-on investors." },
];

export default function EnterpriseFundPage() {
  return (
    <>
      <PageHero
        tone="night"
        eyebrow="Enterprise fund"
        title="An enterprise fund for companies that move real money"
        lead={
          <p>
            Grants pay for open tools. The Gleo enterprise fund is meant to back companies building businesses on Robinhood Chain: payment firms,
            ramps, issuers and the infrastructure underneath them. It opens after Gleo Contracts deploy.
          </p>
        }
        art="bank"
        meta={<Tag tone="plan">Opens after Gleo Contracts deploy</Tag>}
        actions={
          <ButtonLink href={BRAND.x} variant="fog">
            Tell us what you are building
          </ButtonLink>
        }
      />

      <Section>
        <Split eyebrow="Why it exists" art="globe" title="Why payment companies need a fund">
          <p>
            Most money still crosses borders slowly and at a high price. The companies that change that need runway through licensing, banking
            partners and the first months of volume, which takes longer than a grant covers.
          </p>
          <p>The fund is designed to carry good teams through that stretch and keep the network useful for the people those companies serve.</p>
        </Split>
      </Section>

      <Section tone="sand">
        <SectionHead eyebrow="Beyond capital" title="Help that goes past the cheque" lead="Money is the smallest part of what a payments company needs from a network." />
        <ul className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-6">
          {HELP.map((h) => (
            <li key={h.title} className="min-w-0">
              <Glyph icon={h.icon} />
              <h3 className="t-h3 mt-8">{h.title}</h3>
              <p className="mt-3 text-[16px] leading-relaxed text-ink-2">{h.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-16">
          <div className="min-w-0">
            <Eyebrow>Portfolio</Eyebrow>
            <h2 className="t-h2">Investments made so far</h2>
          </div>
          <p className="t-lead min-w-0 text-ink-2 lg:pt-9">
            None. The fund has not announced an investment yet. When it makes one, the company will be listed here with the date and what it is
            building, and the news will go out on X.
          </p>
        </div>
      </Section>

      <Section tone="gray">
        <SectionHead eyebrow="Criteria" title="What the enterprise fund looks for" />
        <div className="mt-12">
          <InfoCards cols={3} items={CRITERIA.map(([title, body]) => ({ title, body }))} />
        </div>
      </Section>

      <CtaBand
        eyebrow="Get in touch"
        title="Tell us about your company"
        body={`Send a short note to ${BRAND.xHandle} on X: the product, the corridor or asset, and where you are today. We read every message.`}
        actions={
          <>
            <ButtonLink href={BRAND.x}>Message us on X</ButtonLink>
            <ButtonLink href="/grants" variant="line">
              Builder grants instead
            </ButtonLink>
          </>
        }
      />
    </>
  );
}
