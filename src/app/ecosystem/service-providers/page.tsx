import { BarChart3, Code2, Coins, Server, ShieldCheck } from "lucide-react";
import { BRAND } from "@/config/brand";
import { pageMeta, faqLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Glyph } from "@/components/glyph";
import { ButtonLink, Faq, LinkTiles, PageHero, Section, SectionHead, Tag } from "@/components/ui";

export const metadata = pageMeta({
  path: "/ecosystem/service-providers",
  title: "Blockchain Service Providers for Payments and Tokens",
  description:
    "Blockchain service providers for Gleo builders: development, infrastructure, compliance, tokenization and audit. See what we check before listing. Apply.",
  keywords: ["blockchain service providers", "smart contract audit", "tokenization services", "crypto compliance", "RPC infrastructure"],
});

const CATEGORIES = [
  {
    icon: Code2,
    title: "Development services",
    body: "Agencies and studios that design and build payment apps, issuer dashboards and wallet integrations on Robinhood Chain.",
    asks: ["Shipped EVM work you can link to", "A named lead engineer", "Willingness to publish an integration guide"],
  },
  {
    icon: Server,
    title: "Infrastructure and white-label",
    body: "RPC providers, custody, key management and white-label wallets for teams that would rather not run their own.",
    asks: ["Robinhood Chain support in production", "Uptime history", "Clear incident reporting"],
  },
  {
    icon: BarChart3,
    title: "Analytics and compliance",
    body: "Transaction monitoring, sanctions screening and on-chain analytics for issuers, anchors and regulated businesses.",
    asks: ["Coverage of Robinhood Chain", "Screening that works on the anchor side", "Data handling you can describe in writing"],
  },
  {
    icon: Coins,
    title: "Tokenization services",
    body: "Legal structuring, custody of the underlying asset, transfer agency and investor onboarding for issuers.",
    asks: ["At least one live issuance behind you", "Jurisdictions you can cover", "How you evidence the underlying asset"],
  },
  {
    icon: ShieldCheck,
    title: "Security audit",
    body: "Smart contract and protocol reviews for Gleo Contracts and the projects built on them.",
    asks: ["Published reports", "Solidity and EVM expertise", "A disclosure policy"],
  },
];

const FAQ = [
  { q: "Does a listing cost anything?", a: "No. Listings are never paid placements, and the page will always say so." },
  { q: "Does a listing mean Gleo endorses the firm?", a: "It means we checked the points listed for its category. It is not a guarantee of the firm's work, so do your own diligence." },
  { q: "How does a firm apply?", a: `Message ${BRAND.xHandle} on X with your category, a link to past work and a contact. Every application gets a reply.` },
];

export default function ServiceProviders() {
  return (
    <>
      <PageHero
        eyebrow="Service providers"
        title="Blockchain service providers for teams building on Gleo"
        lead="Building on Gleo should not mean learning every discipline yourself. We are assembling a short list of blockchain service providers in five categories. It is empty today because we only list firms we have checked against the points below."
        art="people"
        meta={<Tag tone="plan">Applications open</Tag>}
        crumbs={[
          { name: "Ecosystem", path: "/ecosystem" },
          { name: "Service providers", path: "/ecosystem/service-providers" },
        ]}
        actions={
          <>
            <ButtonLink href={BRAND.x}>Apply on X</ButtonLink>
            <ButtonLink href="/ecosystem" variant="line">
              Browse the ecosystem
            </ButtonLink>
          </>
        }
      />

      <Section tone="gray">
        <SectionHead eyebrow="Five categories" title="What each category covers, and what we ask" />
        <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c) => (
            <li key={c.title} className="flex min-w-0 flex-col border border-line bg-paper p-8 lg:p-10">
              <Glyph icon={c.icon} />
              <h3 className="t-h3 mt-8">{c.title}</h3>
              <p className="mt-3 text-[16px] leading-relaxed text-ink-2">{c.body}</p>
              <p className="label mt-6">What we ask</p>
              <ul className="mt-3 space-y-2 text-[15px] text-ink-2">
                {c.asks.map((a) => (
                  <li key={a} className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-ink" />
                    <span className="min-w-0">{a}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-auto pt-6 text-[13px] text-ink-3">No providers listed yet.</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <JsonLd data={faqLd(FAQ)} />
        <SectionHead eyebrow="FAQ" title="Questions about service provider listings" />
        <div className="mt-10">
          <Faq items={FAQ} />
        </div>
      </Section>

      <Section tone="gray" tight>
        <SectionHead eyebrow="Keep exploring" title="Building it yourself instead?" />
        <div className="mt-10">
          <LinkTiles
            items={[
              { href: "/developers", title: "Developer hub", body: "Network details, endpoints and how to start building against Robinhood Chain.", label: "Open the developer hub" },
              { href: "/grants/bug-bounty", title: "Bug bounty", body: "How security researchers report issues in Gleo contracts and this site.", label: "Read the bug bounty" },
              { href: "/use-cases/tokenization", title: "Asset tokenization", body: "What issuers need from legal, custody and audit partners.", label: "Explore tokenization" },
            ]}
          />
        </div>
      </Section>
    </>
  );
}
