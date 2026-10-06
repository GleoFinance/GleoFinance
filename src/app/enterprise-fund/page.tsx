import type { Metadata } from "next";
import { BRAND } from "@/config/brand";
import { ButtonLink, CtaBand, PageHero, Section, SectionHead, Split, Steps, Tag } from "@/components/ui";

export const metadata: Metadata = {
  title: "Enterprise fund",
  description: "Capital and hands-on help for companies taking payments, ramps or asset issuance on Gleo into production.",
};

const CRITERIA = [
  ["Fit with Gleo", "The product moves money or real-world assets, and Gleo makes it cheaper, faster or reachable where it was not."],
  ["Impact", "Real people or businesses end up with better access to payments, savings or markets."],
  ["Team", "Founders who know the regulated side of their market as well as the code."],
  ["Timing", "A product close to launch, or live elsewhere and ready to add Robinhood Chain."],
  ["Viability", "A plan to earn revenue that does not depend on token prices going up."],
  ["Use case", "A concrete flow we can test: who pays whom, in what asset, and how they cash out."],
];

export default function EnterpriseFundPage() {
  return (
    <>
      <PageHero
        tone="night"
        title="A fund for companies that move real money"
        lead="Grants pay for open tools. The enterprise fund backs companies building businesses on Gleo: payment firms, ramps, issuers and the infrastructure under them."
        art="bank"
        meta={<Tag tone="plan">Opens after Gleo Contracts deploy</Tag>}
        actions={
          <ButtonLink href={BRAND.x} variant="fog">
            Tell us what you are building
          </ButtonLink>
        }
      />

      <Section>
        <Split art="globe" title="Why a fund">
          <p>
            Most money still crosses borders slowly and at a high price. The companies that change that need runway through licensing, banking
            partners and the first months of volume, which is longer than a grant covers.
          </p>
          <p>The fund is meant to carry good teams through that stretch and to keep the network useful for the people those companies serve.</p>
        </Split>
      </Section>

      <Section tone="card">
        <SectionHead title="More than capital" lead="Money is the smallest part of what a payments company needs from a network." />
        <div className="mt-12">
          <Steps
            steps={[
              { title: "Introductions", body: "Warm connections to anchors, wallets and issuers already building on Gleo, so your first integration partner is a message away." },
              { title: "Rails that reach people", body: "Help planning cash-in and cash-out coverage for the corridors you serve, using the anchor network as it grows." },
              { title: "Support at each stage", body: "From first pilot to follow-on rounds: technical reviews, compliance questions and introductions to later investors." },
            ]}
          />
        </div>
      </Section>

      <Section>
        <SectionHead title="Investments so far" />
        <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-ink-2">
          None. No investments have been announced yet. When the fund makes one, it will be listed here with the date and what the company is
          building, and announced on X.
        </p>
      </Section>

      <Section tone="card">
        <SectionHead title="What we look for" />
        <dl className="mt-10 grid grid-cols-1 gap-x-12 md:grid-cols-2">
          {CRITERIA.map(([t, b], i) => (
            <div key={t} className="min-w-0 border-t border-line-2 py-6">
              <dt className="flex items-baseline gap-4 font-display text-xl font-semibold">
                <span className="font-mono text-[12px] font-normal text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                {t}
              </dt>
              <dd className="mt-2 pl-9 text-[15.5px] leading-relaxed text-ink-2">{b}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <CtaBand
        title="Tell us about what you are building"
        body={`Send a short note to ${BRAND.xHandle} on X: the product, the corridor or asset, and where you are today. We read every message.`}
        actions={
          <>
            <ButtonLink href={BRAND.x} variant="fog">
              Message us on X
            </ButtonLink>
            <ButtonLink href="/grants" variant="line" className="border-fog/30 text-fog hover:border-fog">
              Grants instead
            </ButtonLink>
          </>
        }
      />
    </>
  );
}
