import type { Metadata } from "next";
import { BRAND } from "@/config/brand";
import { ButtonLink, CtaBand, Faq, PageHero, Rows, Section, SectionHead, Split, Tag } from "@/components/ui";

export const metadata: Metadata = {
  title: "Grants and funding",
  description: "Builder grants, a bug bounty, matching support, research and marketing grants, and an enterprise fund for teams building on Gleo.",
};

export default function GrantsPage() {
  return (
    <>
      <PageHero
        title="Grow with grants and funding"
        lead="Gleo is only as useful as the wallets, ramps and tools around it. These programs exist to pay for that work. None of them is open yet; each opens with an announcement on X."
        art="grant"
        meta={<Tag tone="plan">Programs open in rounds</Tag>}
        actions={
          <ButtonLink href={BRAND.x} variant="accent">
            Get notified on X
          </ButtonLink>
        }
      />

      <Section tone="card">
        <Split art="people" title="Builder grants, decided in the open">
          <p>
            The main program funds open-source work in milestones: a first payment when the plan is agreed, the rest as each milestone ships and can
            be checked by anyone. Reviews and results will be published.
          </p>
          <p>Wallet integrations, anchor tooling, payment SDKs and asset dashboards come first, because they make every other project easier.</p>
          <div className="pt-2">
            <Tag tone="plan">First round: after Gleo Contracts deploy</Tag>
          </div>
        </Split>
      </Section>

      <Section>
        <SectionHead title="Every program at a glance" lead="Amounts are set per round and published with it. Nothing below promises a figure until that round opens." />
        <div className="mt-10">
          <Rows
            items={[
              {
                title: "Bug bounty",
                meta: <Tag tone="live">Reports accepted now</Tag>,
                body: "Rewards for finding security problems in this website today and in Gleo Contracts once they deploy. Severity decides the reward.",
                href: "/grants/bug-bounty",
              },
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
                body: "Support for launches, guides and local communities that bring new people to tools built on Gleo, paid against agreed deliverables.",
              },
            ]}
          />
        </div>
      </Section>

      <Section tone="night">
        <SectionHead
          dark
          title="More funding sources"
          lead="Companies taking payments or issuance into production need more than a grant. The enterprise fund is built for them."
          action={
            <ButtonLink href="/enterprise-fund" variant="fog">
              Enterprise fund
            </ButtonLink>
          }
        />
      </Section>

      <Section>
        <SectionHead title="Questions" />
        <div className="mt-8">
          <Faq
            items={[
              { q: "Can I apply now?", a: "Not yet. Rounds are announced on X with the amount, the rules and the form. Bug reports are the exception and are welcome now." },
              { q: "Is grant money paid in $GLEO?", a: "Each round says which asset it pays in. Builders usually prefer USDG, and that is the default we plan for." },
              { q: "Do I have to open-source my work?", a: "For builder and research grants, yes. Matching and enterprise support can cover closed products." },
            ]}
          />
        </div>
      </Section>

      <CtaBand
        title="Start now, apply when the round opens"
        body="The best applications point at something that already works. The chain, USDG and the stock tokens are live today."
        actions={
          <ButtonLink href="/developers" variant="fog">
            Developer hub
          </ButtonLink>
        }
      />
    </>
  );
}
