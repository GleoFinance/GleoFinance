import type { Metadata } from "next";
import { BRAND } from "@/config/brand";
import { LiveFigures } from "@/components/live/LiveFigures";
import { ButtonLink, CtaBand, Faq, Figures, LinkTiles, PageHero, Rows, Section, SectionHead, Split, Steps, Tag } from "@/components/ui";

export const metadata: Metadata = {
  title: "Payments",
  description: "Cross-border payments on Gleo: dollars move wallet to wallet on Robinhood Chain within a block, for a fraction of a cent.",
};

export default function Payments() {
  return (
    <>
      <PageHero
        title="Money that crosses borders as fast as a message"
        lead="Pay anyone with a wallet, in any country, any hour. Gleo payments settle on Robinhood Chain within a block and cost a fraction of a cent in network fees."
        art="globe"
        meta={<Tag tone="live">Sending is live</Tag>}
        actions={
          <>
            <ButtonLink href="/send" variant="accent">
              Send a payment
            </ButtonLink>
            <ButtonLink href="/network" variant="line">
              Watch the network
            </ButtonLink>
          </>
        }
      />

      <Section>
        <SectionHead
          title="Built for an economy that never closes"
          lead="Bank rails pause at weekends, holidays and cut-off times. A blockchain does not. The figures below are read from the chain right now."
        />
        <div className="mt-10">
          <LiveFigures />
        </div>
        <div className="mt-10">
          <Figures
            items={[
              { label: "End-to-end settlement", value: "< 10 s", tag: "target", note: "Including the wallet round trip" },
              { label: "Fee per payment", value: "$0.0001", tag: "target", note: "Goal for the Gleo payment layer" },
              { label: "Countries reachable", value: "180+", tag: "target", note: "Through anchors, as coverage grows" },
            ]}
          />
        </div>
      </Section>

      <Section tone="card">
        <SectionHead title="What people pay for with it" lead="Seven payment jobs that move to Gleo with the least change to how a business already works." />
        <div className="mt-8">
          <Rows
            cols={2}
            items={[
              { title: "Remittances", body: "Family support sent home without a counter fee or a three-day wait. The recipient can hold dollars or cash out locally." },
              { title: "Invoices between businesses", body: "Pay a supplier abroad on the day the invoice is approved, with a transaction hash as the receipt." },
              { title: "Global payroll", body: "One payroll run for a team spread over many countries, each person paid in the same block." },
              { title: "Treasury moves", body: "Shift working capital between entities in minutes instead of waiting for the next banking day." },
              { title: "Creator and platform payouts", body: "Small, frequent payouts that cost more to wire than they are worth become practical." },
              { title: "Enterprise disbursements", body: "Refunds, rebates and claims paid out in bulk with an auditable trail." },
              { title: "Merchant settlement", body: "Card-like checkouts that settle to the merchant the same minute instead of days later." },
            ]}
          />
        </div>
      </Section>

      <Section>
        <SectionHead title="From cash in to cash out" lead="A full cross-border payment has three legs. Gleo covers the middle one directly and connects the other two through anchors." />
        <div className="mt-12">
          <Steps
            steps={[
              { title: "Pay in", body: "The sender deposits local money with an anchor and receives USDG, or already holds it." },
              { title: "Move", body: "USDG goes from the sender's wallet to the recipient's wallet on Robinhood Chain. This leg is live today." },
              { title: "Pay out", body: "The recipient keeps dollars on-chain or withdraws local currency through an anchor in their country." },
            ]}
          />
        </div>
      </Section>

      <Section tone="night">
        <Split title="Bulk payouts without building a payments team" art="fanout" dark>
          <p>
            Paying hundreds of people at once should be a file upload, not a project. Gleo&apos;s disbursement tool will take a list of
            addresses and amounts, check every row, and send the batch from one wallet with a report at the end.
          </p>
          <p>
            Today you can send individual payments with the Send tool. Batch sending needs a Gleo contract that is not deployed yet.
          </p>
          <div className="flex flex-wrap gap-2">
            <Tag tone="live">Single payments</Tag>
            <Tag tone="plan">Batch payouts</Tag>
          </div>
        </Split>
      </Section>

      <Section tone="card">
        <SectionHead title="See a payroll run worked through" lead="An illustrative scenario: forty contractors in nine countries, paid on the same afternoon." />
        <div className="mt-8">
          <ButtonLink href="/case-studies/freelancer-payroll" variant="ink">
            Read the scenario
          </ButtonLink>
        </div>
      </Section>

      <Section>
        <SectionHead title="Questions people ask first" />
        <div className="mt-8">
          <Faq
            items={[
              { q: "What do I need to send a payment?", a: "A wallet that can add a custom network, a little ETH on Robinhood Chain for the fee, and the USDG or ETH you want to send. The Send tool adds the network for you." },
              { q: "How long until the recipient has the money?", a: "The transfer is included in a block, and Robinhood Chain produces blocks in well under a second. The live panel shows the current average." },
              { q: "Can a payment be reversed?", a: "No. A confirmed transfer is final, which is why the Send tool checks the address and shows a summary before you sign. Issuers of regulated tokens can use clawback, but plain USDG and ETH transfers cannot be undone by Gleo." },
              { q: "What does it cost?", a: "Only the network fee, paid in ETH. The live figure above shows what a USDG transfer costs at this moment. Gleo adds no fee to direct transfers." },
              { q: "Can the recipient get local currency?", a: "Through an anchor in their country. Anchor coverage is being built out; the directory shows how it will work and runs in practice mode for now." },
            ]}
          />
        </div>
      </Section>

      <Section tone="card" tight>
        <SectionHead title="More to explore" />
        <div className="mt-8">
          <LinkTiles
            items={[
              { href: "/ecosystem/service-providers", title: "Integration partners", body: "Firms that help teams wire Gleo payments into existing systems." },
              { href: "/anchors", title: "Anchor directory", body: "Cash-in and cash-out gateways, with a practice deposit flow.", tag: "practice" },
              { href: "/developers", title: "Developer hub", body: "Chain details, RPC endpoints and the read-only APIs this site exposes." },
            ]}
          />
        </div>
      </Section>

      <CtaBand
        title="Move your first dollar now"
        body="Connect a wallet, paste an address, and see the fee before you sign."
        actions={
          <>
            <ButtonLink href="/send" variant="fog">
              Open Send
            </ButtonLink>
            <ButtonLink href={BRAND.x} variant="line" className="border-fog/30 text-fog hover:border-fog">
              Talk to us
            </ButtonLink>
          </>
        }
      />
    </>
  );
}
