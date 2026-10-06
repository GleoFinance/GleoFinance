import { BRAND } from "@/config/brand";
import { faqLd, pageMeta } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { ButtonLink, CtaBand, Faq, Figures, LinkTiles, PageHero, Section, SectionHead, Split, Steps } from "@/components/ui";

export const metadata = pageMeta({
  path: "/fintechs",
  title: "Stablecoin Payment Rails for Fintechs and Wallets",
  description:
    "Add USDG transfers that land in about a block, cash access through anchors and verified stock tokens to your fintech app or wallet. Test a payment today.",
  keywords: ["stablecoin payment rails", "fintech payments API", "wallet integration", "USDG transfers", "cross-border payouts"],
});

const FAQ = [
  { q: "Can we charge our own fees?", a: "Yes. The network fee is tiny and paid in ETH; what you charge on top is your business. The planned payment router supports a fee field on each transfer." },
  { q: "Do our users need ETH for gas?", a: "Today, yes, a small amount. Sponsored transactions, where your service pays the gas, are planned for the payment router." },
  { q: "How do users cash out to local currency?", a: "Through anchors: regulated businesses that take tokens and pay out local money. The anchor directory runs in practice mode until the first anchors sign." },
];

export default function FintechsPage() {
  return (
    <>
      <PageHero
        tone="sea"
        eyebrow="Fintechs and wallets"
        title="Stablecoin payment rails for fintechs and wallets"
        lead={
          <p>
            Your app, your brand, your customers. Gleo provides the stablecoin payment rails underneath: USDG between any two wallets on Robinhood
            Chain, cash in and out through anchors, and a shelf of verified tokenized assets.
          </p>
        }
        art="wallet"
        actions={
          <>
            <ButtonLink href="/send">Send a test payment</ButtonLink>
            <ButtonLink href="/developers" variant="line">
              Developer hub
            </ButtonLink>
          </>
        }
      />

      <Section tone="night">
        <SectionHead
          dark
          split
          eyebrow="How it works"
          title="Cross-border transfers without the bank chain"
          lead="A payment between countries usually passes through several banks, each holding it for a while and taking a cut. On Gleo the sender's wallet pays the recipient's wallet directly, and the transfer is final in the next block."
        />
      </Section>

      <Section>
        <SectionHead
          eyebrow="Targets"
          title="Settlement goals for Gleo payments"
          lead="These are design targets, not measurements. Today's measured cost and block time are on the live network panel."
        />
        <div className="mt-10">
          <Figures
            items={[
              { label: "Settlement", value: "< 10 s", tag: "target", note: "End to end, wallet confirmation included" },
              { label: "Fee per payment", value: "$0.0001", tag: "target", note: "Compare with today's measured cost on /network" },
              { label: "Open hours", value: "24/7", note: "Blocks keep coming on weekends and holidays" },
            ]}
          />
        </div>
      </Section>

      <Section tone="gray">
        <SectionHead
          eyebrow="Try it yourself"
          title="What your product team can test today"
          lead="We will not show logos of customers we do not have. Here is what works right now, so you can judge it for yourself."
        />
        <div className="mt-12">
          <LinkTiles
            items={[
              { href: "/send", title: "Send ETH or USDG", body: "A working payment flow: address check, balance check, fee estimate, confirmation and explorer link.", tag: "live", label: "Open Send" },
              { href: "/assets", title: "Browse tokenized assets", body: "Verified stock and ETF tokens with live supply and last DEX price, ready to list in your app.", tag: "live", label: "Open the asset explorer" },
              { href: "/tokenize", title: "Issue your own asset", body: "The issuer console with freeze, clawback and allowlists, signed as free practice receipts.", tag: "practice", label: "Open the issuer console" },
            ]}
          />
        </div>
      </Section>

      <Section>
        <Split eyebrow="Two kinds of product" art="fanout" title="Consumer apps and business platforms">
          <p>
            <strong className="font-semibold text-ink">Consumer apps</strong> can offer remittances, savings in dollars and access to tokenized
            equities for users whose local options are poor.
          </p>
          <p>
            <strong className="font-semibold text-ink">Business platforms</strong> can run supplier payments, payroll and marketplace payouts in one
            batch, with a reference on every transfer for reconciliation.
          </p>
        </Split>
      </Section>

      <Section tone="night">
        <SectionHead dark eyebrow="Implementation" title="How we help you go live" lead="Money movement has sharp edges. We would rather help you avoid them than read about them later." />
        <div className="mt-12">
          <Steps
            dark
            steps={[
              { title: "Scope", body: "Which corridors, which assets, which users. We map them to anchors and contracts." },
              { title: "Prototype", body: "Build against mainnet reads and the practice tools before any contract holds value." },
              { title: "Review", body: "We look over the flow, especially address handling and confirmation screens." },
              { title: "Launch", body: "Go live in one corridor, measure, then widen." },
            ]}
          />
        </div>
      </Section>

      <Section>
        <JsonLd data={faqLd(FAQ)} />
        <SectionHead eyebrow="FAQs" title="Questions about your business model" />
        <div className="mt-10">
          <Faq items={FAQ} />
        </div>
      </Section>

      <CtaBand
        eyebrow="For your technical team"
        title="Plain EVM, plain ERC-20"
        body={`If your stack already talks to one EVM chain, it already talks to this one. Or send ${BRAND.xHandle} your corridor and expected volume and we will reply with a plan.`}
        actions={
          <>
            <ButtonLink href="/developers">Open the developer hub</ButtonLink>
            <ButtonLink href={BRAND.x} variant="line">
              Message us on X
            </ButtonLink>
          </>
        }
      />
    </>
  );
}
