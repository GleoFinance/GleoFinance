import type { Metadata } from "next";
import { BRAND } from "@/config/brand";
import { ButtonLink, Container, CtaBand, Faq, Figures, LinkTiles, Section, SectionHead, Split, Steps } from "@/components/ui";
import { Art } from "@/components/art";

export const metadata: Metadata = {
  title: "For fintechs and wallets",
  description: "Add dollar payments that clear in seconds, cash access through anchors and tokenized assets to your product with Gleo.",
};

export default function FintechsPage() {
  return (
    <>
      <section className="border-b border-line bg-sea text-white">
        <Container className="grid grid-cols-1 items-center gap-10 py-14 sm:py-20 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <div className="min-w-0">
            <h1 className="font-display text-[clamp(2.4rem,5.4vw,4.6rem)] leading-[0.98] font-bold tracking-[-0.03em]">Build payment rails your users never see</h1>
            <p className="mt-6 max-w-xl text-[18px] leading-relaxed text-white/80">
              Your app, your brand, your customers. Gleo carries the money underneath: USDG between any two wallets, cash in and out through anchors,
              and a shelf of tokenized assets.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/send" variant="fog">
                Try a payment
              </ButtonLink>
              <ButtonLink href="/developers" variant="line" className="border-white/40 text-white hover:border-white">
                Developer hub
              </ButtonLink>
            </div>
          </div>
          <div className="min-w-0 rounded-3xl bg-white/95 p-4">
            <Art name="wallet" />
          </div>
        </Container>
      </section>

      <Section>
        <SectionHead
          title="Cross-border payments, rebuilt from the ledger up"
          lead="A transfer between countries usually passes through several banks, each holding it for a while and taking a fee. On Gleo the sender's wallet pays the recipient's wallet directly."
        />
        <div className="mt-10">
          <Figures
            items={[
              { label: "Settlement", value: "< 10 s", tag: "target", note: "End to end, wallet confirmation included" },
              { label: "Fee per payment", value: "$0.0001", tag: "target", note: "See /network for today's measured cost" },
              { label: "Open hours", value: "24/7", note: "Blocks do not stop for weekends or holidays" },
            ]}
          />
        </div>
      </Section>

      <Section tone="card">
        <SectionHead
          title="What you can test today"
          lead="We will not show you logos of customers we do not have. Here is what works right now, so you can judge for yourself."
        />
        <div className="mt-10">
          <LinkTiles
            items={[
              { href: "/send", title: "Send ETH or USDG", body: "A working payment flow: address check, balance check, fee estimate, confirmation, explorer link.", tag: "live" },
              { href: "/assets", title: "Browse tokenized assets", body: "Verified stock and ETF tokens with live supply and last DEX price, ready to list in your app.", tag: "live" },
              { href: "/tokenize", title: "Issue your own asset", body: "The issuer console with freeze, clawback and allowlists, signed as practice receipts.", tag: "practice" },
            ]}
          />
        </div>
      </Section>

      <Section>
        <Split art="fanout" title="Consumer apps and business platforms">
          <p>
            <strong className="text-ink">For consumer apps:</strong> remittances, savings in dollars, and access to tokenized equities for users whose
            local options are poor.
          </p>
          <p>
            <strong className="text-ink">For business platforms:</strong> supplier payments, payroll and marketplace payouts in one batch, with a
            reference on every transfer for reconciliation.
          </p>
        </Split>
      </Section>

      <Section tone="night">
        <SectionHead dark title="Help with implementation" lead="Integrating money movement has sharp edges. We would rather help you avoid them than read about them later." />
        <div className="mt-12">
          <Steps
            dark
            steps={[
              { title: "Scope", body: "Which corridors, which assets, which users. We map it to anchors and contracts." },
              { title: "Prototype", body: "Build against mainnet reads and the practice tools before any contract holds value." },
              { title: "Review", body: "We look over the flow, especially address handling and confirmation screens." },
              { title: "Launch", body: "Go live in one corridor, measure, then widen." },
            ]}
          />
        </div>
      </Section>

      <Section>
        <SectionHead title="Built for your business model" />
        <div className="mt-8">
          <Faq
            items={[
              { q: "Can we charge our own fees?", a: "Yes. The network fee is tiny and paid in ETH; what you charge on top is your business. The payment router contract will support a fee field per transfer." },
              { q: "Do our users need to hold ETH for gas?", a: "Today, yes, a small amount. Sponsored transactions, where your service pays the gas, are planned for the payment router." },
              { q: "How do users cash out?", a: "Through anchors: regulated businesses that take tokens and pay out local currency. The anchor directory is in practice mode while the first anchors are signed." },
            ]}
          />
        </div>
      </Section>

      <Section tone="card">
        <SectionHead title="For your technical team" lead="Plain EVM and plain ERC-20. If your stack talks to one EVM chain, it already talks to this one." />
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/developers" variant="ink">
            Developer hub
          </ButtonLink>
          <ButtonLink href="/smart-contracts" variant="line">
            Smart contracts
          </ButtonLink>
        </div>
      </Section>

      <CtaBand
        title="Ready to change how your users pay?"
        body={`Send a note to ${BRAND.xHandle} with your corridor and your volume, and we will come back with a plan.`}
        actions={
          <ButtonLink href={BRAND.x} variant="fog">
            Message us on X
          </ButtonLink>
        }
      />
    </>
  );
}
