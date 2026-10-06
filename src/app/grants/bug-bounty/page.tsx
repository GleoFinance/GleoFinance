import type { Metadata } from "next";
import { BRAND } from "@/config/brand";
import { ButtonLink, Container, Faq, Section, SectionHead, Tag } from "@/components/ui";

export const metadata: Metadata = {
  title: "Bug bounty",
  description: "Report security problems in the Gleo website and, once deployed, Gleo Contracts. Scope, severity levels, rules and how to reach us.",
};

const SEVERITY = [
  ["Critical", "Loss of user funds, a transaction the user did not intend, or control of a deployed Gleo contract.", "Highest reward"],
  ["High", "Tricking the site into showing a wrong address, amount or contract on a screen that asks for a signature.", "High reward"],
  ["Medium", "Abuse of the public endpoints that harms other users, such as bypassing the RPC relay's limits.", "Medium reward"],
  ["Low", "Problems with limited impact: information leaks without funds at risk, missing security headers with a real attack path.", "Acknowledgement and small reward"],
];

export default function BugBountyPage() {
  return (
    <>
      <section className="meridians border-b border-line bg-paper">
        <Container className="grid grid-cols-1 gap-10 py-14 sm:py-20 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-end">
          <div className="min-w-0">
            <Tag tone="live">Accepting reports</Tag>
            <h1 className="mt-5 font-display text-[clamp(2.4rem,5.4vw,4.6rem)] leading-[0.98] font-bold tracking-[-0.03em]">Bug bounty</h1>
            <p className="mt-6 max-w-xl text-[18px] leading-relaxed text-ink-2">
              If you find a way to hurt Gleo users, we want to hear it first and we will pay for it. Reward amounts are published with the program
              terms once the contracts deploy; reports made before then are honoured under those terms.
            </p>
          </div>
          <div className="min-w-0 rounded-2xl border border-line-2 bg-card p-6">
            <p className="font-display text-xl font-semibold">File a report</p>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-2">
              Send a direct message to {BRAND.xHandle} on X saying you have a security report. We reply with a private channel for the details.
              Do not post the issue publicly.
            </p>
            <ButtonLink href={BRAND.x} variant="ink" className="mt-5">
              Message {BRAND.xHandle}
            </ButtonLink>
          </div>
        </Container>
      </section>

      <Section tone="card">
        <SectionHead title="What is in scope" />
        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2">
          <div className="min-w-0">
            <h3 className="text-[17px] font-bold">In scope</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-[15.5px] leading-relaxed text-ink-2">
              <li>This website at {BRAND.domain}, including the wallet dialog, send tool and swap screen.</li>
              <li>The public endpoints /api/rpc, /api/network and /api/assets.</li>
              <li>Gleo Contracts, from the day their addresses are published.</li>
            </ul>
          </div>
          <div className="min-w-0">
            <h3 className="text-[17px] font-bold">Out of scope</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-[15.5px] leading-relaxed text-ink-2">
              <li>Robinhood Chain itself, wallets, Pons, Uniswap and other third-party contracts. Report those to their owners.</li>
              <li>Volumetric denial of service, spam and social engineering of the team.</li>
              <li>Practice-mode receipts, which carry no value by design.</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHead title="How serious is it?" lead="Severity follows impact on real users, not on the cleverness of the trick." />
        <div className="mt-10 border-t border-line-2">
          {SEVERITY.map(([level, body, reward]) => (
            <div key={level} className="grid grid-cols-1 gap-2 border-b border-line-2 py-5 md:grid-cols-[160px_minmax(0,1fr)_220px] md:gap-8">
              <p className="font-display text-xl font-semibold">{level}</p>
              <p className="min-w-0 text-[15.5px] leading-relaxed text-ink-2">{body}</p>
              <p className="font-mono text-[13px] text-ink-3 md:text-right">{reward}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="card">
        <SectionHead title="Rules for taking part" />
        <div className="mt-8">
          <Faq
            items={[
              { q: "Eligibility", a: "Anyone may report, except people who work on Gleo and anyone barred by sanctions law. The first clear report of an issue earns the reward." },
              { q: "Testing", a: "Test against your own wallets and your own funds, on a local fork where possible. Do not touch other users' funds or data, and stop once you have shown the issue." },
              { q: "Disclosure", a: "Give us a reasonable time to fix the issue before you talk about it publicly. We will agree a date with you and credit you if you want." },
              { q: "Repeat reports and known issues", a: "Issues already reported, or already listed as known, are not rewarded twice. We tell you if that is the case." },
            ]}
          />
        </div>
      </Section>
    </>
  );
}
