import { HandHeart } from "lucide-react";
import { BRAND } from "@/config/brand";
import { pageMeta, faqLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { JumpTo } from "@/components/content/JumpTo";
import { ScenarioCover } from "@/components/content/ScenarioCover";
import { ButtonLink, Faq, InfoCards, LinkTiles, PageHero, Section, SectionHead, Split, Steps, Tag } from "@/components/ui";

export const metadata = pageMeta({
  path: "/use-cases/aid",
  title: "Humanitarian Cash Assistance Paid in Digital Dollars",
  description:
    "Humanitarian cash assistance on Gleo: send USDG to recipients' phone wallets, let them cash out at local agents and show donors every payment. Learn how.",
  keywords: ["humanitarian cash assistance", "aid disbursement", "digital cash transfers", "donor transparency", "USDG"],
});

const FAQ = [
  {
    q: "Are recipients' identities written to the blockchain?",
    a: "No. Only wallet addresses and amounts are public. The list linking an address to a person stays inside the organisation's own systems.",
  },
  {
    q: "What if a recipient loses their phone?",
    a: "Funds in a wallet cannot be recovered without its backup words. Programmes should agree a recovery approach at enrolment, for example smaller weekly payments so little is ever at risk.",
  },
  {
    q: "Where can recipients get cash?",
    a: "At anchors and their agents. Coverage depends on local partners, and anchor flows on Gleo run in practice mode today.",
  },
  {
    q: "Has Gleo run an aid programme?",
    a: "No. The scenario on this site is illustrative. We would rather say so than borrow somebody else's track record.",
  },
];

const JUMP = [
  { id: "programme", label: "How a programme runs" },
  { id: "tool", label: "Disbursement tool" },
  { id: "why", label: "Why digital cash" },
  { id: "scenario", label: "Pilot scenario" },
  { id: "faq", label: "FAQ" },
];

export default function Aid() {
  return (
    <>
      <PageHero
        eyebrow="Aid disbursements"
        title="Humanitarian cash assistance that arrives, on the record"
        lead="When banks are shut and carrying cash is risky, a phone wallet still works. Gleo lets relief teams deliver humanitarian cash assistance in USDG straight to recipients, and gives donors a public trail showing the money left the programme wallet and reached people."
        art="fanout"
        crumbs={[
          { name: "Use cases", path: "/use-cases" },
          { name: "Aid disbursements", path: "/use-cases/aid" },
        ]}
        actions={
          <>
            <ButtonLink href="/case-studies/cash-assistance-pilot">Read the pilot scenario</ButtonLink>
            <ButtonLink href="/send" variant="line">
              Try a USDG transfer
            </ButtonLink>
          </>
        }
      />

      <Section tone="night" tight>
        <SectionHead
          dark
          split
          eyebrow="How it works"
          title="Public payments, private people"
          lead="Every outflow from a programme's funding wallet is visible on the explorer, so donors can check delivery themselves. The register that links addresses to names never leaves the organisation."
        />
      </Section>

      <Section tone="gray" id="programme">
        <SectionHead eyebrow="Five stages" title="How a cash assistance programme runs on Gleo" />
        <div className="mt-10">
          <Steps
            steps={[
              { title: "Register", body: "Field staff enrol recipients and help each one set up a phone wallet and its backup words." },
              { title: "Fund", body: "The programme moves its budget into a single funding wallet as USDG." },
              { title: "Send", body: "Payments go out on schedule, each with its own transaction record." },
              { title: "Report", body: "Donors read the outflows on the explorer; recipients spend or cash out at an agent nearby." },
            ]}
          />
        </div>
      </Section>

      <Section id="tool">
        <Split eyebrow="Disbursement tool" title="A payout tool, not a blockchain project" art="ledger">
          <p>
            Aid teams should not need engineers to run a payout. The planned Gleo disbursement tool takes a spreadsheet of recipients and
            amounts, flags bad rows, sends the batch and produces a report.
          </p>
          <p>Until its contract is deployed, payments go out one by one through the Send tool, which already works on mainnet.</p>
          <div className="flex flex-wrap gap-2">
            <Tag tone="live">Single transfers</Tag>
            <Tag tone="plan">Batch tool</Tag>
          </div>
        </Split>
      </Section>

      <Section tone="gray" id="why">
        <SectionHead eyebrow="Why digital cash" title="Six reasons digital dollars suit relief work" />
        <div className="mt-10">
          <InfoCards
            cols={3}
            items={[
              { title: "Fast", body: "A payment lands within a block, which matters most in the first days after a disaster." },
              { title: "Checkable", body: "Every outflow from the funding wallet is public, so donors can verify it without asking." },
              { title: "Reachable", body: "A basic smartphone is enough; recipients need no bank account." },
              { title: "Portable", body: "The same tool works in every country, with anchors handling the local cash leg." },
              { title: "Stable", body: "Recipients hold dollars, which protects them while local prices swing." },
              { title: "Cheap to run", body: "Network fees are a fraction of a cent, so more of the budget reaches people." },
            ]}
          />
        </div>
      </Section>

      <Section id="scenario">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-24">
          <div className="min-w-0">
            <ScenarioCover area="Aid" icon={HandHeart} label="Illustration for the cash assistance pilot scenario" />
          </div>
          <div className="min-w-0">
            <p className="t-eyebrow mb-4">Field scenario</p>
            <h2 className="t-h2 text-balance">A cash assistance pilot for 1,200 households after a flood</h2>
            <p className="t-lead mt-6 text-ink-2">
              Weekly USDG to phone wallets, cash-out at local shops, and outflows donors can follow. An illustrative plan with the risks
              written down.
            </p>
            <div className="mt-8">
              <ButtonLink href="/case-studies/cash-assistance-pilot">Read the pilot scenario</ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="gray" id="faq">
        <JsonLd data={faqLd(FAQ)} />
        <SectionHead eyebrow="FAQ" title="Hard questions about aid on a public ledger" />
        <div className="mt-10">
          <Faq items={FAQ} />
        </div>
      </Section>

      <Section tight>
        <SectionHead eyebrow="Keep exploring" title="More for relief and programme teams" />
        <div className="mt-10">
          <LinkTiles
            items={[
              { href: "/learn", title: "Wallet basics", body: "What a wallet is, and what its backup words protect.", label: "Read the guides" },
              { href: "/use-cases/ramps", title: "Cash-out through anchors", body: "How recipients turn USDG into local money.", label: "Read about ramps" },
              { href: "/use-cases/privacy", title: "Privacy on Gleo", body: "What is public on-chain and what stays with your organisation.", label: "Read about privacy" },
            ]}
          />
        </div>
      </Section>

      <Section tone="gray">
        <SectionHead
          split
          eyebrow="Talk to us"
          title="Planning a cash programme?"
          lead="We will help you work out whether Gleo fits, and say so plainly if it does not fit yet."
          action={<ButtonLink href={BRAND.x}>Message {BRAND.xHandle}</ButtonLink>}
        />
      </Section>
      <JumpTo items={JUMP} />
    </>
  );
}
