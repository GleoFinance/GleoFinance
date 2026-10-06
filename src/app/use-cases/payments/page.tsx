import { ArrowDownToLine, ArrowLeftRight, ArrowUpFromLine, Users } from "lucide-react";
import { BRAND } from "@/config/brand";
import { pageMeta, faqLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Glyph } from "@/components/glyph";
import { JumpTo } from "@/components/content/JumpTo";
import { ScenarioCover } from "@/components/content/ScenarioCover";
import { ButtonLink, Faq, InfoCards, LinkTiles, PageHero, Section, SectionHead, Split, Tag } from "@/components/ui";

export const metadata = pageMeta({
  path: "/use-cases/payments",
  title: "Cross-Border Payments in USDG, Settled in Seconds",
  description:
    "Cross-border payments in USDG on Robinhood Chain: wallet to wallet in about a block, fee shown before you sign, no cut-off times. Send your first payment.",
  keywords: ["cross-border payments", "USDG payments", "international money transfer", "global payroll", "remittances"],
});

const FAQ = [
  {
    q: "What do I need to make a cross-border payment with Gleo?",
    a: "An EVM wallet that can add a network, a small amount of ETH on Robinhood Chain to cover the fee, and the USDG or ETH you plan to send. The Send tool adds Robinhood Chain to your wallet if it is missing.",
  },
  {
    q: "How quickly does the recipient receive the money?",
    a: "As soon as the transfer is included in a block. Robinhood Chain produces blocks in well under a second; the live network panel shows the current average.",
  },
  {
    q: "Can a payment be cancelled after it is sent?",
    a: "No. A confirmed transfer is final. That is why the Send tool checks the address format and checksum, re-checks your balance and shows a summary before your wallet asks you to sign.",
  },
  {
    q: "How much does a USDG transfer cost?",
    a: "Only the network fee, paid in ETH, usually a fraction of a cent. Gleo adds nothing on top of direct transfers. The live panel prices a USDG transfer every few seconds.",
  },
  {
    q: "Can the person I pay withdraw local currency?",
    a: "That leg runs through anchors, licensed businesses that swap tokens for bank money or cash. Anchor listings are not open yet, so the anchor directory runs in practice mode today.",
  },
];

const JUMP = [
  { id: "how-it-works", label: "How it works" },
  { id: "payment-types", label: "Payment types" },
  { id: "three-legs", label: "Pay in, move, pay out" },
  { id: "bulk-payouts", label: "Bulk payouts" },
  { id: "scenario", label: "Payroll scenario" },
  { id: "faq", label: "FAQ" },
  { id: "explore", label: "Keep exploring" },
];

export default function Payments() {
  return (
    <>
      <PageHero
        eyebrow="Payments"
        title="Cross-border payments that settle in a block"
        lead="Gleo makes cross-border payments in USDG, a dollar token on Robinhood Chain. Money goes straight from the sender's wallet to the recipient's, any hour of any day, and the network fee is shown before anything is signed. Use it for family support, supplier invoices, payroll or payouts, without waiting for a banking day."
        art="globe"
        meta={<Tag tone="live">Sending is live</Tag>}
        crumbs={[
          { name: "Use cases", path: "/use-cases" },
          { name: "Cross-border payments", path: "/use-cases/payments" },
        ]}
        actions={
          <>
            <ButtonLink href="/send">Send a payment</ButtonLink>
            <ButtonLink href="/network" variant="line">
              See the live network
            </ButtonLink>
          </>
        }
      />

      <Section tone="night" id="how-it-works" tight>
        <SectionHead
          dark
          split
          eyebrow="How it works"
          title="Dollars that travel wallet to wallet"
          lead="A bank transfer abroad hops through correspondent banks, each adding a day and a fee. On Gleo there is one hop: the sender signs, the transfer lands in the next block on Robinhood Chain, and both sides can open the same transaction on the public explorer as proof."
        />
      </Section>

      <Section tone="gray" id="payment-types">
        <SectionHead eyebrow="Payment types" title="Seven jobs one payment rail can do" />
        <div className="mt-10">
          <InfoCards
            items={[
              { title: "Remittances", body: "Support for family abroad that arrives the same minute, with no counter fee taken on the way." },
              { title: "Supplier invoices", body: "Settle an approved invoice the day it is approved and keep the transaction hash as the receipt." },
              { title: "Global payroll", body: "Pay a team spread across countries in one run, each person in the same block." },
              { title: "Treasury moves", body: "Shift working capital between your own entities in minutes, weekends included." },
              { title: "Creator payouts", body: "Small, frequent payments that would cost more to wire than they are worth." },
              { title: "Refunds and rebates", body: "Claims and rebates paid in bulk with a trail an auditor can follow line by line." },
              { title: "Merchant settlement", body: "Checkout revenue that reaches the merchant within minutes rather than days." },
            ]}
          />
        </div>
      </Section>

      <Section id="three-legs">
        <SectionHead
          eyebrow="Pay in, move, pay out"
          title="Every leg of a cross-border payment"
          lead="A full payment between two countries has three parts. Gleo runs the middle one on-chain today and connects the two cash legs through anchors as they are listed."
        />
        <ul className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-6">
          {[
            { icon: ArrowDownToLine, title: "Pay in", tag: "practice" as const, body: "The sender swaps local money for USDG with an anchor, or already holds USDG in a wallet." },
            { icon: ArrowLeftRight, title: "Move", tag: "live" as const, body: "USDG goes from wallet to wallet on Robinhood Chain. This leg works on mainnet now through the Send tool." },
            { icon: ArrowUpFromLine, title: "Pay out", tag: "practice" as const, body: "The recipient keeps dollars on-chain or withdraws local currency through an anchor in their country." },
          ].map((leg) => (
            <li key={leg.title} className="min-w-0">
              <Glyph icon={leg.icon} />
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <h3 className="t-h3">{leg.title}</h3>
                <Tag tone={leg.tag} />
              </div>
              <p className="t-lead mt-3 text-ink-2">{leg.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="bulk-payouts">
        <Split eyebrow="Bulk payouts" title="Paying hundreds of people from one file" art="fanout">
          <p>
            A payout run should be a spreadsheet upload, not an engineering project. The planned Gleo disbursement tool reads a list of
            addresses and amounts, flags rows that fail validation, sends the batch from one wallet and returns a report with a hash for
            every line.
          </p>
          <p>Until its contract is deployed and audited, payments go out one at a time through the Send tool, which already runs on mainnet.</p>
          <div className="flex flex-wrap gap-2">
            <Tag tone="live">Single payments</Tag>
            <Tag tone="plan">Batch payouts</Tag>
          </div>
          <div className="pt-2">
            <ButtonLink href="/send">Send a single payment</ButtonLink>
          </div>
        </Split>
      </Section>

      <Section id="scenario">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-24">
          <div className="min-w-0">
            <ScenarioCover area="Payments" icon={Users} label="Illustration for the contractor payroll scenario" />
          </div>
          <div className="min-w-0">
            <p className="t-eyebrow mb-4">Field scenario</p>
            <h2 className="t-h2 text-balance">How a studio could pay forty contractors in one afternoon</h2>
            <p className="t-lead mt-6 text-ink-2">
              An illustrative walk-through: a design studio swaps monthly wire batches for USDG payouts, checks each new address with a
              test transfer, and turns reconciliation into a list of transaction hashes.
            </p>
            <div className="mt-8">
              <ButtonLink href="/case-studies/freelancer-payroll">Read the payroll scenario</ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      <Section id="faq">
        <JsonLd data={faqLd(FAQ)} />
        <SectionHead eyebrow="FAQ" title="Questions about cross-border payments on Gleo" />
        <div className="mt-10">
          <Faq items={FAQ} />
        </div>
      </Section>

      <Section id="explore" tight>
        <SectionHead eyebrow="Keep exploring" title="More for teams that move money" />
        <div className="mt-10">
          <LinkTiles
            items={[
              { href: "/ecosystem/service-providers", title: "Integration help", body: "Categories of firms that can wire Gleo payments into an existing finance stack.", label: "See service providers" },
              { href: "/anchors", title: "Anchor directory", body: "Cash-in and cash-out gateways by region, with a deposit flow you can rehearse.", tag: "practice", label: "Open the anchor directory" },
              { href: "/use-cases/ramps", title: "On and off-ramps", body: "How licensed anchors connect bank money and cash to USDG on Robinhood Chain.", label: "Read about ramps" },
            ]}
          />
        </div>
      </Section>

      <Section tone="gray" id="contact">
        <SectionHead
          split
          eyebrow="Talk to us"
          title="Moving money abroad today?"
          lead={`Tell us what you send, how often and to which countries. We answer on X and will say plainly which parts Gleo covers now and which are still planned.`}
          action={
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={BRAND.x}>Message {BRAND.xHandle}</ButtonLink>
              <ButtonLink href="/faq" variant="line">
                Read the Gleo FAQ
              </ButtonLink>
            </div>
          }
        />
      </Section>
      <JumpTo items={JUMP} />
    </>
  );
}
