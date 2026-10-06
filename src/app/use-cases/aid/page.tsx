import type { Metadata } from "next";
import { BRAND } from "@/config/brand";
import { ButtonLink, CtaBand, Faq, LinkTiles, PageHero, Rows, Section, SectionHead, Split, Tag } from "@/components/ui";

export const metadata: Metadata = {
  title: "Aid disbursements",
  description: "Send humanitarian cash assistance to recipients' phones on Gleo, with cash-out at local agents and a public record donors can check.",
};

const STEPS = [
  { n: "01", title: "Register", body: "Field staff enrol recipients and help them set up a phone wallet, including backup words." },
  { n: "02", title: "Fund", body: "The programme moves its budget into one funding wallet as USDG." },
  { n: "03", title: "Send", body: "Payments go out on schedule, each with its own transaction record." },
  { n: "04", title: "Spend or cash out", body: "Recipients pay shops directly or withdraw cash at an agent nearby." },
  { n: "05", title: "Report", body: "Donors read outflows on the explorer; names stay with the organisation." },
];

export default function Aid() {
  return (
    <>
      <PageHero
        title="Relief payments that reach people, on the record"
        lead="When banks are shut and carrying cash is dangerous, a phone wallet still works. Gleo lets aid teams send support directly to recipients and show donors that it arrived."
        art="fanout"
        actions={
          <>
            <ButtonLink href="/case-studies/cash-assistance-pilot" variant="accent">
              Read a worked example
            </ButtonLink>
            <ButtonLink href="/send" variant="line">
              Try a transfer
            </ButtonLink>
          </>
        }
      />

      <Section>
        <SectionHead title="How a programme runs" lead="Five stages, from enrolment to the donor report." />
        <ol className="mt-12 grid grid-cols-1 border-t border-line-2 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((s, i) => (
            <li key={s.n} className={`min-w-0 border-b border-line-2 py-6 lg:border-b-0 lg:px-5 ${i === 0 ? "lg:pl-0" : "lg:border-l"}`}>
              <p className="font-mono text-[12px] text-ink-3">{s.n}</p>
              <h3 className="mt-3 text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{s.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="card">
        <Split title="A disbursement tool, not a blockchain project" art="ledger">
          <p>
            Aid teams should not need engineers to run a payout. Gleo&apos;s planned disbursement tool takes a spreadsheet of recipients and
            amounts, flags bad rows, sends the batch and produces a report.
          </p>
          <p>Until its contract is deployed, payments go out one by one through the Send tool, which already works.</p>
          <div className="flex flex-wrap gap-2">
            <Tag tone="live">Single transfers</Tag>
            <Tag tone="plan">Batch tool</Tag>
          </div>
        </Split>
      </Section>

      <Section tone="night">
        <SectionHead dark title="Why digital cash fits relief work" />
        <div className="mt-8">
          <Rows
            dark
            cols={2}
            items={[
              { title: "Fast", body: "A payment lands within a block, which matters in the first days after a disaster." },
              { title: "Visible", body: "Every outflow from the funding wallet is public, so donors can check it themselves." },
              { title: "Reachable", body: "A basic smartphone is enough; no bank account required." },
              { title: "Global", body: "The same tool works in every country, with anchors handling local cash." },
              { title: "Stable", body: "Recipients hold dollars, which protects them while local prices swing." },
              { title: "Cheap to run", body: "Network fees are a fraction of a cent, so more of the budget reaches people." },
            ]}
          />
        </div>
      </Section>

      <Section>
        <SectionHead title="Hard questions, straight answers" />
        <div className="mt-8">
          <Faq
            items={[
              { q: "Are recipients' identities on the blockchain?", a: "No. Only wallet addresses and amounts are public. The list that links an address to a person stays in the organisation's own systems." },
              { q: "What happens if a recipient loses their phone?", a: "Without the backup words, the funds in that wallet cannot be recovered. Programmes should agree a recovery approach at enrolment, for example small weekly payments so little is ever at risk." },
              { q: "Where can recipients get cash?", a: "At anchors and their agents. Agent coverage depends on local partners; anchor flows run in practice mode on Gleo today." },
              { q: "Has Gleo run an aid programme?", a: "No. The scenario on this site is illustrative. We would rather say that than borrow someone else's track record." },
            ]}
          />
        </div>
      </Section>

      <Section tone="card" tight>
        <SectionHead title="Learn more" />
        <div className="mt-8">
          <LinkTiles
            items={[
              { href: "/case-studies/cash-assistance-pilot", title: "Cash assistance pilot", body: "A worked example for 1,200 households after a flood.", tag: "example" },
              { href: "/learn", title: "Wallet basics", body: "What a wallet is, and what the backup words protect." },
              { href: "/use-cases/ramps", title: "Cash-out through anchors", body: "How recipients turn tokens into local money." },
            ]}
          />
        </div>
      </Section>

      <CtaBand
        title="Planning a cash programme?"
        body="We will help you work out whether Gleo fits, and say so plainly if it does not yet."
        actions={
          <ButtonLink href={BRAND.x} variant="fog">
            Message {BRAND.xHandle}
          </ButtonLink>
        }
      />
    </>
  );
}
