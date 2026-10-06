import type { Metadata } from "next";
import { ButtonLink, CtaBand, PageHero, Section, Tag } from "@/components/ui";

export const metadata: Metadata = {
  title: "Roadmap",
  description: "What Gleo plans to build from Q4 2026 to Q3 2027. Every item is marked Planned until it ships.",
};

const QUARTERS: { quarter: string; theme: string; items: { title: string; body: string; done?: boolean }[] }[] = [
  {
    quarter: "Q4 2026",
    theme: "Useful without new contracts",
    items: [
      { title: "Send tool", body: "ETH and USDG transfers with address checks, balance checks and dollar fee previews.", done: true },
      { title: "Network panel", body: "Live block, block time, gas and USDG supply from Robinhood Chain.", done: true },
      { title: "Asset explorer", body: "Tokenized stocks verified against the chain's beacon, with live supply.", done: true },
      { title: "$GLEO launch", body: "Contract address published in the navigation bar, the footer and on X; swaps through Pons." },
      { title: "Contract drafts published", body: "Issuance with asset controls and the anchor registry, open for review." },
    ],
  },
  {
    quarter: "Q1 2027",
    theme: "Issuance",
    items: [
      { title: "External audit of issuance contracts", body: "Scope, firm and report published before deployment." },
      { title: "Issuance on mainnet", body: "Freeze, clawback and holder approval chosen at creation, one-way afterwards." },
      { title: "Bug bounty goes live", body: "Payouts set by severity once contracts hold funds." },
    ],
  },
  {
    quarter: "Q2 2027",
    theme: "Anchors and grants",
    items: [
      { title: "Anchor registry", body: "First vetted anchors listed with fees, corridors and limits in one format." },
      { title: "Builder grants, first round", body: "Milestone-based support for wallets and integrations." },
      { title: "Batch payouts", body: "Pay many recipients in one signed operation." },
    ],
  },
  {
    quarter: "Q3 2027",
    theme: "Markets",
    items: [
      { title: "Money market", body: "Lending and borrowing against tokenized assets, after audit." },
      { title: "Pools", body: "Automated market maker for Gleo-issued assets." },
      { title: "Throughput measurement", body: "First published measurement against the payment design targets." },
    ],
  },
];

export default function RoadmapPage() {
  return (
    <>
      <PageHero
        title="Where Gleo is going"
        lead="A year of plans, laid out by quarter. Items move when plans change; they are not quietly removed. Anything not marked Shipped is a plan, not a promise."
        art="calendar"
      />
      <Section>
        <ol className="relative grid grid-cols-1 gap-12">
          {QUARTERS.map((q) => (
            <li key={q.quarter} className="grid grid-cols-1 gap-6 border-t border-line-2 pt-8 lg:grid-cols-[260px_minmax(0,1fr)]">
              <div className="min-w-0">
                <p className="font-display text-4xl font-bold tracking-tight">{q.quarter}</p>
                <p className="mt-2 text-ink-2">{q.theme}</p>
              </div>
              <ul className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2">
                {q.items.map((it) => (
                  <li key={it.title} className="min-w-0 rounded-2xl border border-line-2 bg-card p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="min-w-0 text-[17px] font-bold">{it.title}</h3>
                      {it.done ? <Tag tone="live">Shipped</Tag> : <Tag tone="plan" />}
                    </div>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-ink-2">{it.body}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Section>
      <CtaBand
        title="Try what has shipped"
        actions={
          <>
            <ButtonLink href="/send" variant="fog">
              Send
            </ButtonLink>
            <ButtonLink href="/assets" variant="line" className="border-fog/30 text-fog hover:border-fog">
              Assets
            </ButtonLink>
          </>
        }
      />
    </>
  );
}
