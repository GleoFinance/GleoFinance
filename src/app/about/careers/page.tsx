import { Binoculars, Globe2, MessagesSquare } from "lucide-react";
import { BRAND } from "@/config/brand";
import { pageMeta } from "@/lib/seo";
import { Glyph } from "@/components/glyph";
import { ButtonLink, CtaBand, InfoCards, PageHero, Rows, Section, SectionHead, Split, Tag } from "@/components/ui";
import { VALUES } from "../values";

export const metadata = pageMeta({
  path: "/about/careers",
  title: "Careers at Gleo: Remote Blockchain Payment Jobs",
  description:
    "Careers at Gleo: remote roles in Solidity, frontend, payments partnerships and developer relations, building open payment rails. See open roles and apply.",
  keywords: ["Gleo careers", "remote blockchain jobs", "Solidity engineer job", "payments jobs"],
});

const ROLES = [
  { title: "Smart contract engineer", body: "Solidity, Foundry and an eye for invariants. You will own the issuance and money-market contracts through audit." },
  { title: "Frontend engineer", body: "Next.js and TypeScript. Wallet flows that explain themselves and never surprise anyone." },
  { title: "Payments partnerships", body: "Find and vet anchors: licences, corridors, fees and settlement times." },
  { title: "Developer relations", body: "Guides, examples and office hours for teams building on Gleo." },
];

const ICONS = [Binoculars, Globe2, MessagesSquare];

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Careers at Gleo: build payment tools people trust"
        lead="Careers at Gleo mean small-team, remote work on payments and real-world assets on open rails. If that is the work you want to be doing, read on."
        art="wallet"
        crumbs={[
          { name: "About", path: "/about" },
          { name: "Careers", path: "/about/careers" },
        ]}
        actions={<ButtonLink href={BRAND.x}>Message {BRAND.xHandle} on X</ButtonLink>}
      />

      <Section tone="night">
        <Split dark eyebrow="Mission" title="Make borders cheap for money" art="globe">
          <p>Crossing a border should cost money no more than it costs a message, and real assets should be holdable by anyone with a phone.</p>
          <p>Everything we hire for serves that goal, from the contract that holds an asset&apos;s rules to the screen that shows a fee.</p>
        </Split>
      </Section>

      <Section>
        <SectionHead eyebrow="Values" title="What the Gleo team values" />
        <ul className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-6">
          {VALUES.map((v, i) => {
            const Icon = ICONS[i] ?? Binoculars;
            return (
              <li key={v.title} className="min-w-0">
                <Glyph icon={Icon} size={96} />
                <h3 className="t-h3 mt-8">{v.title}</h3>
                <p className="mt-3 text-[16px] leading-relaxed text-ink-2">{v.body}</p>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section tone="gray">
        <SectionHead
          eyebrow="Working here"
          title="What a small, early team can offer"
          lead="No perks list padded for show. This is what working at Gleo looks like today."
        />
        <div className="mt-12">
          <InfoCards
            items={[
              { title: "Work that ships", body: "Your code reaches the live site within days, not quarters." },
              { title: "Room to own things", body: "Each area has one clear owner and real decisions to make." },
              { title: "Remote by design", body: "Write first, meet when it helps, choose your own hours." },
              { title: "Time to grow", body: "A learning budget, plus time for talks and open-source work." },
            ]}
          />
        </div>
      </Section>

      <Section>
        <SectionHead
          eyebrow="Open roles"
          title="Roles open at Gleo now"
          lead={`Send a short note and something you built to ${BRAND.xHandle} by direct message on X. Everyone gets a reply.`}
        />
        <div className="mt-10">
          <Rows items={ROLES.map((r) => ({ title: r.title, body: r.body, meta: <Tag tone="plan">Open</Tag> }))} />
        </div>
      </Section>

      <CtaBand
        eyebrow="Apply"
        title="Does Gleo sound like your next job?"
        body="Tell us what you would build first and link one thing you have shipped."
        actions={
          <>
            <ButtonLink href={BRAND.x}>DM {BRAND.xHandle} on X</ButtonLink>
            <ButtonLink href="/about/team" variant="line">
              Meet the Gleo team
            </ButtonLink>
          </>
        }
      />
    </>
  );
}
