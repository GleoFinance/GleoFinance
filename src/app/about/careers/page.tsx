import type { Metadata } from "next";
import { BRAND } from "@/config/brand";
import { ButtonLink, CtaBand, PageHero, Rows, Section, SectionHead, Split, Steps, Tag } from "@/components/ui";
import { VALUES } from "../values";

export const metadata: Metadata = {
  title: "Careers",
  description: "Work on payments, tokenization and DeFi rails that anyone can use. Remote, small team, apply through X.",
};

const ROLES = [
  { title: "Smart contract engineer", body: "Solidity, Foundry, an eye for invariants. You will own issuance and money-market contracts through audit." },
  { title: "Frontend engineer", body: "Next.js and TypeScript. Wallet flows that explain themselves and never surprise anyone." },
  { title: "Payments partnerships", body: "Find and vet anchors: licences, corridors, fees and settlement times." },
  { title: "Developer relations", body: "Guides, examples and office hours for teams building on Gleo." },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        title="Build money tools people trust"
        lead="We are a small, remote team putting payments and real-world assets on open rails. If that sounds like the work you want to be doing, read on."
        art="wallet"
        actions={
          <ButtonLink href={BRAND.x} variant="accent">
            Message us on X
          </ButtonLink>
        }
      />
      <Section>
        <Split title="The mission" art="globe">
          <p>Make crossing a border as cheap for money as it already is for a message, and make real assets holdable by anyone.</p>
        </Split>
      </Section>
      <Section tone="card">
        <SectionHead title="What we value" />
        <div className="mt-8">
          <Rows items={VALUES.map((v) => ({ title: v.title, body: v.body }))} />
        </div>
      </Section>
      <Section>
        <SectionHead title="Working here" lead="What we can offer a small, early team today, without overselling." />
        <div className="mt-10">
          <Steps
            steps={[
              { title: "Work that ships", body: "Your code reaches the live site within days, not quarters." },
              { title: "Room to own things", body: "Each area has one clear owner and real decisions to make." },
              { title: "Remote by design", body: "Write first, meet when it helps, choose your hours." },
              { title: "Room to grow", body: "Learning budget and time for conference talks and open source." },
            ]}
          />
        </div>
      </Section>
      <Section tone="card">
        <SectionHead title="Open roles" lead={`Send a short note and something you built to ${BRAND.xHandle} by direct message. We reply to everyone.`} />
        <div className="mt-8">
          <Rows items={ROLES.map((r) => ({ title: r.title, body: r.body, meta: <Tag tone="plan">Open</Tag> }))} />
        </div>
      </Section>
      <CtaBand
        title="Sound right?"
        body="Tell us what you would build first."
        actions={
          <ButtonLink href={BRAND.x} variant="fog">
            DM {BRAND.xHandle}
          </ButtonLink>
        }
      />
    </>
  );
}
