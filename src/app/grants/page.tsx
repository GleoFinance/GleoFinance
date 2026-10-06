import { BRAND } from "@/config/brand";
import { faqLd, pageMeta } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { ButtonLink, CtaBand, Faq, InfoCards, PageHero, Section, SectionHead, Split, Tag } from "@/components/ui";

export const metadata = pageMeta({
  path: "/grants",
  title: "Builder Grants and Funding for Robinhood Chain",
  description:
    "Milestone-based builder grants, a bug bounty, research and matching support for teams building payments and tokenization on Robinhood Chain. See each program.",
  keywords: ["builder grants", "crypto grants", "Robinhood Chain funding", "open-source grants", "bug bounty"],
});

const FAQ = [
  { q: "Can I apply for a Gleo grant now?", a: "Not yet. Each round is announced on X with its budget, rules and form. Security reports are the exception and are welcome today." },
  { q: "Are grants paid in $GLEO?", a: "Each round states the asset it pays in. Builders usually prefer USDG, and that is the default we plan around." },
  { q: "Does my project have to be open source?", a: "For builder and research grants, yes. Matching and enterprise support can cover closed products." },
];

export default function GrantsPage() {
  return (
    <>
      <PageHero
        tone="gray"
        eyebrow="Grants and funding"
        title="Builder grants and funding for Gleo"
        lead={
          <p>
            Gleo is only as useful as the wallets, ramps and tools built around it, and these builder grants and funding programs exist to pay for
            that work on Robinhood Chain. Apart from the bug bounty, none is open yet; each one opens with an announcement on X.
          </p>
        }
        art="grant"
        meta={<Tag tone="plan">Programs open in rounds</Tag>}
        actions={<ButtonLink href={BRAND.x}>Get round dates on X</ButtonLink>}
      />

      <Section>
        <Split eyebrow="Main program" art="people" title="Builder grants paid in milestones">
          <p>
            The main program funds open-source work in stages: a first payment once the plan is agreed, the rest as each milestone ships and can be
            checked by anyone. Reviews and outcomes will be published.
          </p>
          <p>
            Wallet integrations, anchor tooling, payment libraries and asset dashboards come first, because they make every other project easier
            to build.
          </p>
          <div className="pt-2">
            <Tag tone="plan">First round: after Gleo Contracts deploy</Tag>
          </div>
        </Split>
      </Section>

      <Section tone="sand">
        <Split eyebrow="Open now" art="shield" title="Bug bounty for security researchers" reverse>
          <p>
            Found a way to hurt Gleo users? Tell us privately first and we will pay for it. Reports on this website are accepted today, and Gleo
            Contracts join the scope on the day their addresses are published.
          </p>
          <div className="pt-2">
            <ButtonLink href="/grants/bug-bounty">Read the bug bounty rules</ButtonLink>
          </div>
        </Split>
      </Section>

      <Section tone="gray">
        <SectionHead
          eyebrow="Every program"
          title="Funding programs at a glance"
          lead="Amounts are set per round and published with it. Nothing on this page promises a figure before that round opens."
        />
        <div className="mt-12">
          <InfoCards
            cols={3}
            items={[
              {
                title: "Matching fund",
                meta: <Tag tone="plan" />,
                body: "For projects that already raised from others: Gleo matches part of the round when the work lands on Robinhood Chain.",
              },
              {
                title: "Research grants",
                meta: <Tag tone="plan" />,
                body: "For university groups and independent researchers studying payments, tokenized assets, privacy or market design, with findings published openly.",
              },
              {
                title: "Marketing grants",
                meta: <Tag tone="plan" />,
                body: "Support for launches, guides and local groups that bring new people to tools built on Gleo, paid against agreed deliverables.",
              },
            ]}
          />
        </div>
      </Section>

      <Section tone="night">
        <SectionHead
          dark
          split
          eyebrow="Companies"
          title="Larger backing for payment companies"
          lead="Firms taking payments or issuance into production need more than a grant. The Gleo enterprise fund is set up for them."
          action={
            <ButtonLink href="/enterprise-fund" variant="fog">
              Read about the enterprise fund
            </ButtonLink>
          }
        />
      </Section>

      <Section>
        <JsonLd data={faqLd(FAQ)} />
        <SectionHead eyebrow="FAQs" title="Questions about Gleo grants" />
        <div className="mt-10">
          <Faq items={FAQ} />
        </div>
      </Section>

      <CtaBand
        eyebrow="Get ready"
        title="Build now, apply when the round opens"
        body="The strongest applications point at something that already works. The chain, USDG and the stock tokens are live today."
        actions={
          <>
            <ButtonLink href="/developers">Open the developer hub</ButtonLink>
            <ButtonLink href="/smart-contracts" variant="line">
              Smart contract quick start
            </ButtonLink>
          </>
        }
      />
    </>
  );
}
