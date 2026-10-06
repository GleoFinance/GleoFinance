import type { Metadata } from "next";
import { BRAND } from "@/config/brand";
import { LiveFigures } from "@/components/live/LiveFigures";
import { ButtonLink, CtaBand, Faq, LinkTiles, PageHero, Rows, Section, SectionHead, Split, Steps, Tag } from "@/components/ui";

export const metadata: Metadata = {
  title: "On and off-ramps",
  description: "Anchors connect bank money and cash to Gleo. One shared interface means a wallet integrates once and reaches every anchor.",
};

export default function Ramps() {
  return (
    <>
      <PageHero
        title="One interface between cash and the chain"
        lead="Anchors are the regulated businesses that take local money in and hand tokens out, and the reverse. Gleo asks all of them to speak the same interface, so reaching a new country is a listing, not a project."
        art="anchor"
        meta={<Tag tone="practice">Anchor flows in practice mode</Tag>}
        actions={
          <>
            <ButtonLink href="/anchors" variant="accent">
              Open the anchor directory
            </ButtonLink>
            <ButtonLink href="/use-cases/payments" variant="line">
              Payments
            </ButtonLink>
          </>
        }
      />

      <Section>
        <SectionHead title="Two sides of the same door" lead="A ramp needs someone holding cash and someone holding the user. Gleo connects the two." />
        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2">
          <div className="min-w-0 border-t-4 border-sea pt-6">
            <h3 className="font-display text-2xl font-semibold">Anchors</h3>
            <p className="mt-3 text-[15.5px] leading-relaxed text-ink-2">
              Exchanges, money transfer operators, banks and payment firms with a local licence. They take deposits, run identity checks
              and pay out to bank accounts, mobile money or cash counters.
            </p>
          </div>
          <div className="min-w-0 border-t-4 border-flare pt-6">
            <h3 className="font-display text-2xl font-semibold">Wallets</h3>
            <p className="mt-3 text-[15.5px] leading-relaxed text-ink-2">
              Apps that hold the user&apos;s keys and show balances. They ask an anchor for a quote, show the fees, and hand the user over for the
              checks the anchor is required to run.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="card">
        <SectionHead title="Integrate once" lead="What a single shared interface changes for each side." />
        <div className="mt-8">
          <Rows
            items={[
              { title: "Cash access for crypto users", body: "A wallet that supports the interface can offer deposits and withdrawals in every country where an anchor is listed, without signing a contract per country first." },
              { title: "A channel into every wallet", body: "An anchor that implements the interface becomes reachable from every Gleo-compatible wallet the day it is listed." },
              { title: "Cheaper movement in the middle", body: "Between the two cash legs the money travels as USDG on Robinhood Chain, where a transfer costs a fraction of a cent." },
            ]}
          />
        </div>
      </Section>

      <Section>
        <SectionHead title="The network the ramps sit on" lead="Live readings from Robinhood Chain, where every anchor settles." />
        <div className="mt-10">
          <LiveFigures />
        </div>
      </Section>

      <Section tone="night">
        <SectionHead dark title="Reach further with the same build" />
        <div className="mt-8">
          <Rows
            dark
            items={[
              { title: "New markets", body: "Add a country by listing its anchor, not by opening a bank relationship there." },
              { title: "New payment services", body: "Bill pay, payouts to mobile money and cash pickup become options on the same rails." },
              { title: "Checks done once, where they belong", body: "Identity checks happen at the anchor that holds the licence. The wallet passes the user through and does not store documents it does not need." },
            ]}
          />
        </div>
      </Section>

      <Section>
        <SectionHead title="A deposit, step by step" lead="This is the flow the anchor directory rehearses in practice mode." />
        <div className="mt-12">
          <Steps
            steps={[
              { title: "Choose an anchor", body: "Filter by country, currency and payment method; compare fees and limits." },
              { title: "Get a quote", body: "The anchor states its rate and fee before anything moves." },
              { title: "Pass checks", body: "The anchor runs the identity checks its licence requires." },
              { title: "Receive tokens", body: "After the bank or cash leg clears, USDG arrives in the wallet." },
            ]}
          />
        </div>
      </Section>

      <Section tone="card">
        <Split title="Who will use the ramps first" art="wallet" reverse>
          <p>
            Gleo&apos;s own Send tool and the practice anchor directory are the first two consumers. Anchor listings open once the interface
            specification is published; there are no live anchors on Gleo today, and we will not list one we have not verified.
          </p>
          <Tag tone="plan">Anchor listings</Tag>
        </Split>
      </Section>

      <Section>
        <SectionHead title="Asked often" />
        <div className="mt-8">
          <Faq
            items={[
              { q: "Can I cash out through Gleo today?", a: "Not yet. Anchor flows run in practice mode until verified anchors are listed. You can already send and receive USDG on Robinhood Chain." },
              { q: "Who runs the identity checks?", a: "The anchor, because it holds the licence for the cash leg. Gleo does not collect identity documents." },
              { q: "How do I become an anchor?", a: "Message us on X with your licences, countries and payment methods. We will share the interface specification as it is published." },
              { q: "What currencies will be supported?", a: "Whatever listed anchors support. The on-chain leg uses USDG, a dollar token already on Robinhood Chain." },
            ]}
          />
        </div>
      </Section>

      <Section tone="card" tight>
        <SectionHead title="More to explore" />
        <div className="mt-8">
          <LinkTiles
            items={[
              { href: "/anchors", title: "Anchor directory", body: "Browse regions and rehearse a deposit or withdrawal.", tag: "practice" },
              { href: "/learn", title: "Learn the basics", body: "Guides on anchors, stablecoins and cross-border payments." },
              { href: "/fintechs", title: "For fintechs and wallets", body: "What integrating Gleo looks like for a product team." },
            ]}
          />
        </div>
      </Section>

      <CtaBand
        title="Run a licensed cash business?"
        body="We are lining up the first anchors. Tell us where you operate."
        actions={
          <ButtonLink href={BRAND.x} variant="fog">
            Message {BRAND.xHandle}
          </ButtonLink>
        }
      />
    </>
  );
}
