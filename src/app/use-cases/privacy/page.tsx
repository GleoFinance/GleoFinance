import type { Metadata } from "next";
import { BRAND } from "@/config/brand";
import { ButtonLink, CtaBand, Faq, PageHero, Rows, Section, SectionHead, Split, Tag } from "@/components/ui";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Open by default, private on purpose: how Gleo approaches confidentiality for payroll, treasury and institutional settlement.",
};

export default function Privacy() {
  return (
    <>
      <PageHero
        title="Open ledger, closed books where it counts"
        lead="A public chain lets anyone verify a payment. It also lets anyone read a salary. Gleo keeps the ledger open by default and adds privacy where a business genuinely needs it, without hiding from regulators."
        art="shield"
        meta={<Tag tone="plan">Privacy features are planned</Tag>}
      />

      <Section>
        <SectionHead title="Transparent by default. Confidential by choice." lead="Two audiences, two different worries." />
        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2">
          <div className="min-w-0">
            <h3 className="font-display text-2xl font-semibold">Institutions and companies</h3>
            <p className="mt-3 text-[15.5px] leading-relaxed text-ink-2">
              A treasury does not want competitors reading its positions, and an employer cannot publish payroll. They need amounts hidden
              from the public while auditors and regulators can still see them.
            </p>
          </div>
          <div className="min-w-0">
            <h3 className="font-display text-2xl font-semibold">Developers</h3>
            <p className="mt-3 text-[15.5px] leading-relaxed text-ink-2">
              Builders want privacy as a setting they can switch on per asset or per flow, using standard tools, rather than a separate
              chain with its own wallets and liquidity.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="card">
        <SectionHead title="How privacy works on Gleo" />
        <div className="mt-8">
          <Rows
            items={[
              { title: "Public unless chosen otherwise", body: "Ordinary transfers on Robinhood Chain are public: sender, recipient and amount. That is what makes them easy to verify, and it stays the default." },
              { title: "Opt-in, per asset", body: "An issuer will be able to mark an asset as confidential so balances and amounts are encrypted on-chain, while transfers still prove they add up." },
              { title: "Ready for audit", body: "Confidential assets carry a viewing key held by the issuer and its auditor, so compliance checks do not depend on the public seeing everything." },
            ]}
          />
        </div>
      </Section>

      <Section tone="night">
        <Split title="Openness and privacy are not a trade-off" art="shield" dark>
          <p>
            The usual choice is between a public ledger nobody can use for payroll, and a private one nobody can verify. Gleo&apos;s approach is
            to keep the proof public and the details private: anyone can check that money was neither created nor lost, but only the
            parties and their auditors can read the amounts.
          </p>
        </Split>
      </Section>

      <Section>
        <SectionHead title="The building blocks" lead="None of these are live on Gleo yet. They are the pieces the privacy work is built from." />
        <div className="mt-8">
          <Rows
            items={[
              { title: "Confidential tokens", body: "Balances and amounts stored encrypted, with proofs that every transfer balances.", meta: <Tag tone="plan" /> },
              { title: "Private payments", body: "Payments that hide who paid whom from the public while staying visible to the parties.", meta: <Tag tone="plan" /> },
              { title: "Zero-knowledge verifiers", body: "Contracts that check a proof instead of reading the data, so a rule can be enforced without revealing what it was applied to.", meta: <Tag tone="plan" /> },
            ]}
          />
        </div>
      </Section>

      <Section tone="card">
        <SectionHead title="Where it matters most" />
        <div className="mt-8">
          <Rows
            cols={2}
            numbered={false}
            items={[
              { title: "Payroll", body: "Pay staff on-chain without publishing everyone's salary." },
              { title: "Treasury management", body: "Move reserves between entities without signalling strategy." },
              { title: "Business and consumer payments", body: "Keep supplier prices and customer purchases between the parties." },
              { title: "Institutional settlement", body: "Settle large trades without exposing positions to the market." },
            ]}
          />
        </div>
      </Section>

      <Section>
        <SectionHead title="Questions about privacy" />
        <div className="mt-8">
          <Faq
            items={[
              { q: "Are my Gleo payments private today?", a: "No. Transfers you make with the Send tool are ordinary public transactions on Robinhood Chain. Anyone can see the addresses and amounts on the explorer." },
              { q: "Will private assets help people avoid checks?", a: "No. Confidential assets are designed with issuer and auditor viewing keys, and holder approval still applies." },
              { q: "Does this site track me?", a: "See the privacy policy. In short: no accounts, and practice receipts stay in your own browser." },
            ]}
          />
        </div>
      </Section>

      <CtaBand
        title="Need confidentiality for a real flow?"
        body="Tell us what has to stay private and who still needs to see it. That shapes what we build first."
        actions={
          <>
            <ButtonLink href={BRAND.x} variant="fog">
              Message {BRAND.xHandle}
            </ButtonLink>
            <ButtonLink href="/privacy-policy" variant="line" className="border-fog/30 text-fog hover:border-fog">
              Privacy policy
            </ButtonLink>
          </>
        }
      />
    </>
  );
}
