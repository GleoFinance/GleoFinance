import { BarChart3, Code2, Coins, Megaphone, Palette, Send } from "lucide-react";
import { BRAND } from "@/config/brand";
import { pageMeta } from "@/lib/seo";
import { Glyph } from "@/components/glyph";
import { ButtonLink, CtaBand, PageHero, Section, SectionHead, Tag } from "@/components/ui";

export const metadata = pageMeta({
  path: "/about/team",
  title: "The Gleo Team: Who Builds the Payments Network",
  description:
    "Meet the Gleo team by what each group owns: payments, issuance, contracts and security, data, design and community. See how to verify who speaks for Gleo.",
  keywords: ["Gleo team", "Gleo leadership", "blockchain payments team"],
});

const GROUPS = [
  { icon: Send, title: "Payments", body: "The Send tool, fee previews, address checks and, next, anchor integrations." },
  { icon: Coins, title: "Issuance and compliance", body: "Asset controls, the issuer console and the rules an issuer accepts at creation." },
  { icon: Code2, title: "Contracts and security", body: "Gleo Contracts in Solidity, test suites, external audits and the bug bounty." },
  { icon: BarChart3, title: "Data", body: "Network readings, asset verification against the chain's stock-token beacon, and price sources." },
  { icon: Palette, title: "Design and web", body: "This site, the app screens and the Gleo brand." },
  { icon: Megaphone, title: "Community", body: "X, events, grants and keeping every conversation civil." },
];

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="Team"
        title="The Gleo team behind the payment rails"
        lead="The Gleo team is small and distributed. For now we work under the project name rather than our own, so you will know us by what we ship and how we answer."
        art="people"
        crumbs={[
          { name: "About", path: "/about" },
          { name: "Team", path: "/about/team" },
        ]}
      />

      <Section>
        <SectionHead
          eyebrow="Leadership"
          title="How the work is divided"
          lead="Names and faces will be added when each person chooses to publish them. Until then, these are the groups and what each one owns."
        />
        <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {GROUPS.map((g) => (
            <li key={g.title} className="min-w-0 border border-line p-8">
              <Glyph icon={g.icon} />
              <h3 className="t-h3 mt-8">{g.title}</h3>
              <p className="mt-3 text-[16px] leading-relaxed text-ink-2">{g.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="gray">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="min-w-0">
            <SectionHead
              eyebrow="Governance"
              title="Board and advisors"
              lead={`There is no board or advisory group to list yet. When there is, each person will be named here with their role and any interest they hold in ${BRAND.symbol}.`}
            />
          </div>
          <div className="min-w-0 self-end border border-line bg-paper p-8">
            <Tag tone="plan">Pending</Tag>
            <h3 className="mt-4 text-[18px] font-semibold">How to check who speaks for Gleo</h3>
            <p className="mt-3 text-[16px] leading-relaxed text-ink-2">
              Anyone claiming to represent Gleo who cannot be reached through {BRAND.xHandle} on X is not part of the team. We never ask for seed
              phrases or private keys.
            </p>
          </div>
        </div>
      </Section>

      <CtaBand
        eyebrow="Careers"
        title="Join the Gleo team"
        body="We hire for outcomes, from anywhere. Read what we value and which roles are open."
        actions={
          <>
            <ButtonLink href="/about/careers">See open roles at Gleo</ButtonLink>
            <ButtonLink href="/about" variant="line">
              Read the Gleo mission
            </ButtonLink>
          </>
        }
      />
    </>
  );
}
