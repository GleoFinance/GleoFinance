import type { Metadata } from "next";
import { BRAND } from "@/config/brand";
import { ButtonLink, CtaBand, PageHero, Rows, Section, SectionHead, Tag } from "@/components/ui";

export const metadata: Metadata = {
  title: "Team",
  description: "Who builds Gleo: the groups behind payments, issuance, contracts and community. The team is pseudonymous for now.",
};

export default function TeamPage() {
  return (
    <>
      <PageHero
        title="The people behind the rails"
        lead="Gleo is built by a small, distributed team. For now we work under the project name rather than our own; you will know us by what we ship and how we answer."
        art="people"
      />
      <Section>
        <SectionHead
          title="How the work is split"
          lead="Names and faces will be added here when each person chooses to publish them. Until then, these are the groups and what each one owns."
        />
        <div className="mt-10">
          <Rows
            cols={2}
            items={[
              { title: "Payments", body: "The Send tool, fee previews, address checks and, next, anchor integrations." },
              { title: "Issuance and compliance", body: "Asset controls, the issuer console and the rules an issuer accepts at creation." },
              { title: "Contracts and security", body: "Gleo Contracts in Solidity, test suites, external audits and the bug bounty." },
              { title: "Data", body: "Network readings, asset verification against the chain's stock-token beacon and price sources." },
              { title: "Design and web", body: "This site, the app screens and the brand." },
              { title: "Community", body: "X, events, grants and keeping the conversation civil." },
            ]}
          />
        </div>
      </Section>
      <Section tone="card">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="min-w-0">
            <h2 className="font-display text-[clamp(1.8rem,3.2vw,2.5rem)] leading-tight font-bold tracking-tight">Board and advisors</h2>
            <p className="mt-4 text-[16.5px] leading-relaxed text-ink-2">
              There is no board or advisory group to list yet. When there is, each person will be named here with their role and any interest they
              hold in {BRAND.symbol}.
            </p>
          </div>
          <div className="min-w-0 rounded-2xl border border-line-2 p-6">
            <Tag tone="plan">Pending</Tag>
            <p className="mt-3 text-[15.5px] leading-relaxed text-ink-2">
              Anyone claiming to represent Gleo who is not reachable through {BRAND.xHandle} is not part of the team.
            </p>
          </div>
        </div>
      </Section>
      <CtaBand
        title="Join the team"
        actions={
          <ButtonLink href="/about/careers" variant="fog">
            See open roles
          </ButtonLink>
        }
      />
    </>
  );
}
