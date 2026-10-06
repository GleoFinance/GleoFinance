import type { Metadata } from "next";
import { BRAND } from "@/config/brand";
import { ButtonLink, CtaBand, Faq, PageHero, Section, SectionHead, Tag } from "@/components/ui";

export const metadata: Metadata = {
  title: "Service providers",
  description: "Categories of firms that help teams build on Gleo: development, infrastructure, analytics, tokenization and audit. Applications are open.",
};

const CATEGORIES = [
  {
    title: "Development services",
    body: "Agencies and studios that design and build payment apps, issuer dashboards and wallet integrations on Robinhood Chain.",
    asks: ["Shipped EVM work you can link to", "A named lead engineer", "Willingness to publish an integration guide"],
  },
  {
    title: "Infrastructure and white-label",
    body: "RPC providers, custody, key management and white-label wallets for teams that do not want to run their own.",
    asks: ["Robinhood Chain support in production", "Uptime history", "Clear incident reporting"],
  },
  {
    title: "Analytics and compliance",
    body: "Transaction monitoring, sanctions screening and on-chain analytics for issuers, anchors and regulated businesses.",
    asks: ["Coverage of Robinhood Chain", "Screening that works on the anchor side", "Data handling you can describe in writing"],
  },
  {
    title: "Tokenization services",
    body: "Legal structuring, custody of the underlying asset, transfer agency and investor onboarding for issuers.",
    asks: ["Experience with at least one live issuance", "Jurisdictions you can cover", "How you evidence the underlying asset"],
  },
  {
    title: "Audit",
    body: "Smart contract and protocol security reviews for Gleo Contracts and the projects built on them.",
    asks: ["Published reports", "Solidity and EVM expertise", "A disclosure policy"],
  },
];

export default function ServiceProviders() {
  return (
    <>
      <PageHero
        title="Service providers"
        lead="Building on Gleo should not mean learning everything yourself. We are assembling a short list of firms in five categories. The list is empty today because we only list providers we have checked."
        art="people"
        meta={<Tag tone="plan">Applications open</Tag>}
        actions={
          <ButtonLink href={BRAND.x} variant="accent">
            Apply on X
          </ButtonLink>
        }
      />

      <Section>
        <SectionHead title="Five categories" lead="What each category covers, and what we ask before listing a firm." />
        <div className="mt-10 border-t-2 border-ink">
          {CATEGORIES.map((c, i) => (
            <div key={c.title} className="grid grid-cols-1 gap-4 border-b border-line-2 py-8 lg:grid-cols-[60px_minmax(0,1fr)_minmax(0,1fr)] lg:gap-8">
              <span className="font-mono text-[12px] text-ink-3">{String(i + 1).padStart(2, "0")}</span>
              <div className="min-w-0">
                <h3 className="font-display text-2xl font-semibold">{c.title}</h3>
                <p className="mt-2 text-[15.5px] leading-relaxed text-ink-2">{c.body}</p>
                <p className="mt-3 text-sm text-ink-3">No providers listed yet.</p>
              </div>
              <div className="min-w-0 rounded-2xl bg-card p-5">
                <p className="label">What we ask</p>
                <ul className="mt-3 space-y-2 text-[15px] text-ink-2">
                  {c.asks.map((a) => (
                    <li key={a} className="flex gap-2">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-sea" />
                      <span className="min-w-0">{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="card">
        <SectionHead title="Want to know more?" />
        <div className="mt-8">
          <Faq
            items={[
              { q: "Does a listing cost anything?", a: "No. Listings are not paid placements, and we will say so on the page." },
              { q: "Does a listing mean Gleo endorses the firm?", a: "It means we checked the points above. It is not a guarantee of their work; do your own diligence." },
              { q: "How do I apply?", a: `Message ${BRAND.xHandle} on X with your category, a link to past work and a contact. We reply to every application.` },
            ]}
          />
        </div>
      </Section>

      <CtaBand
        title="Building it yourself instead?"
        body="The developer hub has the network details and endpoints you need to start."
        actions={
          <ButtonLink href="/developers" variant="fog">
            Developer hub
          </ButtonLink>
        }
      />
    </>
  );
}
