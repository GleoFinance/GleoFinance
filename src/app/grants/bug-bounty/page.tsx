import { BRAND } from "@/config/brand";
import { faqLd, pageMeta } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { ButtonLink, CtaBand, Eyebrow, Faq, InfoCards, PageHero, Section, SectionHead, Tag } from "@/components/ui";

export const metadata = pageMeta({
  path: "/grants/bug-bounty",
  title: "Bug Bounty Program for Web3 Security Researchers",
  description:
    "Report security bugs in the Gleo website, its public APIs and, once deployed, Gleo Contracts. Read the scope, severity levels and rules, then file privately.",
  keywords: ["bug bounty program", "web3 security", "responsible disclosure", "smart contract vulnerability", "security report"],
});

const SEVERITY = [
  ["Critical", "Loss of user funds, a transaction the user did not intend, or control of a deployed Gleo contract.", "Highest reward"],
  ["High", "Getting the site to show a wrong address, amount or contract on a screen that asks for a signature.", "High reward"],
  ["Medium", "Abuse of the public endpoints that harms other users, such as getting around the RPC relay's limits.", "Medium reward"],
  ["Low", "Limited impact: information leaks with no funds at risk, or missing security headers with a real attack path.", "Credit and a small reward"],
];

const RULES = [
  { q: "Who can take part?", a: "Anyone, except people who work on Gleo and anyone barred by sanctions law. The first clear report of an issue earns the reward." },
  { q: "How should I test?", a: "Use your own wallets and your own funds, on a local fork where you can. Leave other users' funds and data alone, and stop once the issue is shown." },
  { q: "When can I publish my findings?", a: "Give us reasonable time to fix the issue first. We agree a date with you and credit you by name if you want." },
  { q: "What about repeat reports and known issues?", a: "Issues already reported or already listed as known are not paid twice. We tell you when that is the case." },
];

export default function BugBountyPage() {
  return (
    <>
      <PageHero
        eyebrow="Bug bounty"
        title="Gleo bug bounty program"
        lead={
          <p>
            The Gleo bug bounty program pays researchers who find ways to hurt Gleo users and tell us before anyone else. Reward amounts are
            published with the program terms when the contracts deploy; reports sent before then are honoured under those terms.
          </p>
        }
        art="shield"
        meta={<Tag tone="live">Accepting reports</Tag>}
        crumbs={[
          { name: "Grants and funding", path: "/grants" },
          { name: "Bug bounty", path: "/grants/bug-bounty" },
        ]}
        actions={<ButtonLink href={BRAND.x}>Message {BRAND.xHandle} privately</ButtonLink>}
      />

      <Section tone="night">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="min-w-0">
            <Eyebrow>How to report</Eyebrow>
            <h2 className="t-h2">File a security report in private</h2>
          </div>
          <p className="t-lead min-w-0 text-fog-2 lg:pt-9">
            Send a direct message to {BRAND.xHandle} on X saying you have a security report. We reply with a private channel for the details. Please
            do not post the issue in public, and never test against other people&apos;s funds.
          </p>
        </div>
      </Section>

      <Section tone="gray">
        <SectionHead eyebrow="Scope" title="What the bug bounty covers" />
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="min-w-0 border border-line bg-paper p-8 lg:p-10">
            <h3 className="text-[18px] font-semibold">In scope</h3>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-[16px] leading-relaxed text-ink-2">
              <li>This website at {BRAND.domain}, including the wallet dialog, send tool and swap screen.</li>
              <li>The public endpoints /api/rpc, /api/network and /api/assets.</li>
              <li>Gleo Contracts, from the day their addresses are published.</li>
            </ul>
          </div>
          <div className="min-w-0 border border-line bg-paper p-8 lg:p-10">
            <h3 className="text-[18px] font-semibold">Out of scope</h3>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-[16px] leading-relaxed text-ink-2">
              <li>Robinhood Chain itself, wallets, Pons, Uniswap and other third-party contracts. Report those to their owners.</li>
              <li>Volumetric denial of service, spam and social engineering of the team.</li>
              <li>Practice-mode receipts, which carry no value by design.</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow="Severity" title="How rewards follow impact" lead="Severity depends on the harm to real users, not on how clever the trick is." />
        <div className="mt-12">
          <InfoCards
            items={SEVERITY.map(([level, body, reward]) => ({
              title: level,
              meta: <Tag tone="example">{reward}</Tag>,
              body,
            }))}
          />
        </div>
      </Section>

      <Section tone="sand">
        <JsonLd data={faqLd(RULES)} />
        <SectionHead eyebrow="Rules" title="Rules for taking part in the bounty" />
        <div className="mt-10">
          <Faq items={RULES} />
        </div>
      </Section>

      <CtaBand
        eyebrow="More programs"
        title="Building instead of breaking?"
        body="Builder, research and matching grants open in rounds. The developer hub has everything you need to start before then."
        actions={
          <>
            <ButtonLink href="/grants">All grants and funding</ButtonLink>
            <ButtonLink href="/developers" variant="line">
              Developer hub
            </ButtonLink>
          </>
        }
      />
    </>
  );
}
