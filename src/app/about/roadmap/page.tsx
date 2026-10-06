import { pageMeta } from "@/lib/seo";
import { ButtonLink, Container, CtaBand, Eyebrow, PageHero, Tag } from "@/components/ui";

export const metadata = pageMeta({
  path: "/about/roadmap",
  title: "Gleo Roadmap 2026–2027: Payments, Issuance, Markets",
  description:
    "The Gleo roadmap from Q4 2026 to Q3 2027: payments, asset issuance, anchors and markets. Every item stays marked Planned until it ships. See what is next.",
  keywords: ["Gleo roadmap", "Robinhood Chain roadmap", "tokenization roadmap"],
});

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
        eyebrow="Roadmap"
        title="The Gleo roadmap, quarter by quarter"
        lead="The Gleo roadmap lays out a year of plans by quarter. Items move when plans change; they are never quietly removed. Anything not marked Shipped is a plan, not a promise."
        art="calendar"
        crumbs={[
          { name: "About", path: "/about" },
          { name: "Roadmap", path: "/about/roadmap" },
        ]}
        actions={<ButtonLink href="/blog/roadmap-notes-autumn-2026">Read the autumn 2026 roadmap notes</ButtonLink>}
      />
      {QUARTERS.map((q, i) => (
        <section key={q.quarter} className={i % 2 === 0 ? "bg-paper-2 py-16 lg:py-20" : "bg-paper py-16 lg:py-20"}>
          <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] lg:gap-16">
            <div className="min-w-0">
              <Eyebrow>{q.theme}</Eyebrow>
              <h2 className="t-h2">{q.quarter}</h2>
            </div>
            <ul className="grid min-w-0 grid-cols-1 gap-6 md:grid-cols-2">
              {q.items.map((it) => (
                <li key={it.title} className="min-w-0 border border-line bg-paper p-8">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="min-w-0 text-[17px] leading-snug font-semibold">{it.title}</h3>
                    {it.done ? <Tag tone="live">Shipped</Tag> : <Tag tone="plan" />}
                  </div>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{it.body}</p>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ))}
      <CtaBand
        eyebrow="Already live"
        title="Try what has shipped on Gleo"
        body="Send, the network panel and the asset explorer read and move real data on Robinhood Chain today."
        actions={
          <>
            <ButtonLink href="/send">Send USDG or ETH</ButtonLink>
            <ButtonLink href="/assets" variant="line">
              Browse verified assets
            </ButtonLink>
          </>
        }
      />
    </>
  );
}
