import { Building2, Code2 } from "lucide-react";
import { BRAND } from "@/config/brand";
import { pageMeta, faqLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Glyph } from "@/components/glyph";
import { ButtonLink, Faq, InfoCards, PageHero, Rows, Section, SectionHead, Split, Tag } from "@/components/ui";

export const metadata = pageMeta({
  path: "/use-cases/privacy",
  title: "Confidential Payments on a Public Blockchain",
  description:
    "How Gleo plans confidential payments on a public blockchain: hidden amounts for payroll and treasury, viewing keys for auditors, open proofs for everyone.",
  keywords: ["confidential payments", "blockchain privacy", "private payroll", "viewing keys", "zero-knowledge proofs"],
});

const FAQ = [
  {
    q: "Are my Gleo payments private today?",
    a: "No. Transfers made with the Send tool are ordinary public transactions on Robinhood Chain; anyone can see the addresses and amounts on the explorer.",
  },
  {
    q: "Could confidential assets be used to dodge compliance checks?",
    a: "They are designed not to be. Confidential assets carry issuer and auditor viewing keys, and holder approval still applies to every transfer.",
  },
  {
    q: "Does this website track me?",
    a: "The privacy policy has the detail. In short: there are no accounts, and practice receipts stay in your own browser.",
  },
];

export default function Privacy() {
  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title="Confidential payments on an open ledger"
        lead="A public chain lets anyone verify a payment, and it also lets anyone read a salary. Gleo is designing confidential payments for the cases that need them, such as payroll and treasury, while the proof that every transfer adds up stays public and auditors keep their view."
        art="shield"
        meta={<Tag tone="plan">Privacy features are planned</Tag>}
        crumbs={[
          { name: "Use cases", path: "/use-cases" },
          { name: "Privacy", path: "/use-cases/privacy" },
        ]}
        actions={
          <ButtonLink href="/privacy-policy" variant="line">
            Read the privacy policy
          </ButtonLink>
        }
      />

      <Section tone="night" tight>
        <SectionHead
          dark
          split
          eyebrow="The idea"
          title="Public proof, private details"
          lead="The usual choice is a public ledger nobody can use for payroll, or a private one nobody can check. Gleo keeps the proof open and the details closed: anyone can confirm that no money was created or lost, while only the parties and their auditors can read the amounts."
        />
      </Section>

      <Section tone="gray">
        <SectionHead eyebrow="Who needs it" title="Two audiences, two different concerns" />
        <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {[
            {
              icon: Building2,
              title: "Companies and institutions",
              body: "A treasury does not want competitors reading its positions, and an employer cannot publish payroll. Amounts must be hidden from the public while auditors and regulators can still see them.",
            },
            {
              icon: Code2,
              title: "Developers",
              body: "Builders want privacy as a setting per asset or per flow, using standard tools, rather than a separate chain with its own wallets and liquidity.",
            },
          ].map((c) => (
            <li key={c.title} className="min-w-0 border border-line bg-paper p-8 lg:p-10">
              <Glyph icon={c.icon} />
              <h3 className="t-h3 mt-8">{c.title}</h3>
              <p className="t-lead mt-3 text-ink-2">{c.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <SectionHead eyebrow="Design" title="How privacy will work on Gleo" />
        <div className="mt-8">
          <Rows
            items={[
              { title: "Public unless chosen otherwise", body: "Ordinary transfers on Robinhood Chain show sender, recipient and amount. That makes them easy to verify, and it stays the default." },
              { title: "Opt-in, asset by asset", body: "An issuer will be able to mark an asset as confidential, so balances and amounts are encrypted on-chain while each transfer still proves it balances." },
              { title: "Built for audit", body: "Confidential assets carry a viewing key held by the issuer and its auditor, so compliance never depends on the public seeing everything." },
            ]}
          />
        </div>
      </Section>

      <Section tone="gray">
        <Split eyebrow="Building blocks" title="The parts the privacy work is built from" art="shield">
          <p>None of these are live on Gleo yet. Each one is labelled planned until it ships and has been audited.</p>
          <ul className="space-y-4">
            {[
              ["Confidential tokens", "Encrypted balances and amounts, with proofs that every transfer balances."],
              ["Private payments", "Transfers that hide who paid whom from the public but not from the parties."],
              ["Zero-knowledge verifiers", "Contracts that check a proof instead of reading the data behind it."],
            ].map(([t, b]) => (
              <li key={t} className="border-t border-line pt-4">
                <span className="flex flex-wrap items-center gap-2 font-semibold text-ink">
                  {t} <Tag tone="plan" />
                </span>
                <span className="mt-1 block">{b}</span>
              </li>
            ))}
          </ul>
        </Split>
      </Section>

      <Section>
        <SectionHead eyebrow="Where it matters" title="Payments that should stay between the parties" />
        <div className="mt-10">
          <InfoCards
            items={[
              { title: "Payroll", body: "Pay staff on-chain without publishing everyone's salary." },
              { title: "Treasury management", body: "Move reserves between entities without signalling strategy." },
              { title: "Business payments", body: "Keep supplier prices and customer purchases between the two sides." },
              { title: "Institutional settlement", body: "Settle large trades without showing positions to the market." },
            ]}
          />
        </div>
      </Section>

      <Section tone="gray">
        <JsonLd data={faqLd(FAQ)} />
        <SectionHead eyebrow="FAQ" title="Questions about privacy on Gleo" />
        <div className="mt-10">
          <Faq items={FAQ} />
        </div>
      </Section>

      <Section>
        <SectionHead
          split
          eyebrow="Talk to us"
          title="Need confidentiality for a real flow?"
          lead="Tell us what has to stay private and who still needs to see it. That shapes what we build first."
          action={
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={BRAND.x}>Message {BRAND.xHandle}</ButtonLink>
              <ButtonLink href="/use-cases/payments" variant="line">
                Cross-border payments
              </ButtonLink>
            </div>
          }
        />
      </Section>
    </>
  );
}
