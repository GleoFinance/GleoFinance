import { Building, Smartphone } from "lucide-react";
import { BRAND } from "@/config/brand";
import { pageMeta, faqLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Glyph } from "@/components/glyph";
import { LiveFigures } from "@/components/live/LiveFigures";
import { JumpTo } from "@/components/content/JumpTo";
import { ButtonLink, Faq, InfoCards, LinkTiles, PageHero, Rows, Section, SectionHead, Split, Steps, Tag } from "@/components/ui";

export const metadata = pageMeta({
  path: "/use-cases/ramps",
  title: "Crypto On and Off-Ramps Through Licensed Anchors",
  description:
    "On and off-ramps for Gleo: licensed anchors swap bank money or cash for USDG and back through one shared interface, so wallets integrate once. See how.",
  keywords: ["on and off-ramps", "crypto on-ramp", "cash out stablecoins", "anchors", "USDG"],
});

const FAQ = [
  {
    q: "Can I cash out USDG through Gleo today?",
    a: "Not yet. Anchor flows run in practice mode until verified anchors are listed. Sending and receiving USDG on Robinhood Chain already works.",
  },
  {
    q: "Who runs identity checks on a ramp?",
    a: "The anchor, because it holds the licence for the cash leg. Gleo does not collect identity documents.",
  },
  {
    q: "How does a business become a Gleo anchor?",
    a: "Message the team on X with your licences, countries and payment methods. We share the interface specification as it is published and check every anchor before listing it.",
  },
  {
    q: "Which currencies will the ramps support?",
    a: "Whatever listed anchors support locally. The on-chain leg always uses USDG, a dollar token already on Robinhood Chain.",
  },
];

const JUMP = [
  { id: "two-sides", label: "Anchors and wallets" },
  { id: "integrate-once", label: "Integrate once" },
  { id: "network", label: "Live network" },
  { id: "deposit-steps", label: "A deposit, step by step" },
  { id: "faq", label: "FAQ" },
];

export default function Ramps() {
  return (
    <>
      <PageHero
        eyebrow="Cash in, cash out"
        title="On and off-ramps between cash and USDG"
        lead="Gleo on and off-ramps run through anchors: licensed businesses that take local money in and hand out USDG on Robinhood Chain, and pay out again on the way back. Every anchor speaks one shared interface, so adding a country becomes a listing rather than a new integration."
        art="anchor"
        meta={<Tag tone="practice">Anchor flows in practice mode</Tag>}
        crumbs={[
          { name: "Use cases", path: "/use-cases" },
          { name: "On and off-ramps", path: "/use-cases/ramps" },
        ]}
        actions={
          <>
            <ButtonLink href="/anchors">Open the anchor directory</ButtonLink>
            <ButtonLink href="/use-cases/payments" variant="line">
              Cross-border payments
            </ButtonLink>
          </>
        }
      />

      <Section tone="night" tight>
        <SectionHead
          dark
          split
          eyebrow="How it works"
          title="A ramp is a door with a licence on one side"
          lead="Somebody has to hold the cash and run the checks the law requires; somebody else holds the user's keys. The anchor does the first, the wallet the second, and the money crosses between them as USDG in a single on-chain transfer."
        />
      </Section>

      <Section tone="gray" id="two-sides">
        <SectionHead eyebrow="Two sides" title="Anchors and wallets meet in the middle" />
        <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {[
            {
              icon: Building,
              title: "Anchors",
              body: "Exchanges, money transfer operators, banks and payment firms with a local licence. They take deposits, run identity checks and pay out to bank accounts, mobile money or cash counters.",
            },
            {
              icon: Smartphone,
              title: "Wallets",
              body: "Apps that hold the user's keys and show balances. They request a quote from an anchor, show the fee, and pass the user to the anchor for the checks it must run.",
            },
          ].map((c) => (
            <li key={c.title} className="min-w-0 border border-line bg-paper p-8 lg:p-10">
              <Glyph icon={c.icon} />
              <h3 className="t-h3 mt-8">{c.title}</h3>
              <p className="t-lead mt-3 text-ink-2">{c.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="integrate-once">
        <SectionHead eyebrow="One interface" title="Integrate once, reach every listed country" />
        <div className="mt-10">
          <InfoCards
            cols={3}
            items={[
              { title: "Cash access for wallet users", body: "A wallet that supports the interface can offer deposits and withdrawals wherever an anchor is listed, without a contract per country." },
              { title: "A channel into every wallet", body: "An anchor that implements the interface is reachable from every compatible wallet on the day it is listed." },
              { title: "Cheap movement in between", body: "Between the two cash legs the money travels as USDG on Robinhood Chain, where a transfer costs a fraction of a cent." },
            ]}
          />
        </div>
      </Section>

      <Section tone="gray" id="network">
        <SectionHead eyebrow="Live readings" title="The chain every Gleo anchor settles on" lead="Read from Robinhood Chain every few seconds." />
        <div className="mt-10">
          <LiveFigures />
        </div>
      </Section>

      <Section tone="night">
        <SectionHead dark eyebrow="Room to grow" title="New markets on the same build" />
        <div className="mt-8">
          <Rows
            dark
            items={[
              { title: "New countries", body: "Reach a market by listing a local anchor, not by opening a banking relationship there." },
              { title: "New payment services", body: "Bill pay, payouts to mobile money and cash pickup become options on the same rails." },
              { title: "Checks done once, by the licence holder", body: "Identity checks happen at the anchor. The wallet passes the user through and keeps no documents it does not need." },
            ]}
          />
        </div>
      </Section>

      <Section id="deposit-steps">
        <SectionHead eyebrow="Step by step" title="How a USDG deposit through an anchor works" lead="This is the flow the anchor directory rehearses in practice mode." />
        <div className="mt-12">
          <Steps
            steps={[
              { title: "Choose an anchor", body: "Filter by country, currency and payment method, then compare fees and limits." },
              { title: "Get a quote", body: "The anchor states its rate and fee before any money moves." },
              { title: "Pass the checks", body: "The anchor runs the identity checks its licence requires." },
              { title: "Receive USDG", body: "Once the bank or cash leg clears, USDG lands in the wallet." },
            ]}
          />
        </div>
      </Section>

      <Section tone="gray">
        <Split eyebrow="Status" title="Who uses the ramps first" art="wallet" reverse>
          <p>
            The Gleo Send tool and the practice anchor directory are the first two consumers. Listings open once the interface specification
            is published. There are no live anchors on Gleo today, and none will be listed before we verify it.
          </p>
          <Tag tone="plan">Anchor listings</Tag>
        </Split>
      </Section>

      <Section id="faq">
        <JsonLd data={faqLd(FAQ)} />
        <SectionHead eyebrow="FAQ" title="Questions about on and off-ramps" />
        <div className="mt-10">
          <Faq items={FAQ} />
        </div>
      </Section>

      <Section tight>
        <SectionHead eyebrow="Keep exploring" title="More about moving cash on and off-chain" />
        <div className="mt-10">
          <LinkTiles
            items={[
              { href: "/anchors", title: "Anchor directory", body: "Browse regions and rehearse a deposit or withdrawal.", tag: "practice", label: "Open the directory" },
              { href: "/learn", title: "Learn the basics", body: "Guides on anchors, stablecoins and cross-border payments.", label: "Read the guides" },
              { href: "/fintechs", title: "For fintechs and wallets", body: "What adding Gleo looks like for a product team.", label: "See payment rails for apps" },
            ]}
          />
        </div>
      </Section>

      <Section tone="gray">
        <SectionHead
          split
          eyebrow="Become an anchor"
          title="Run a licensed cash business?"
          lead="We are lining up the first anchors. Tell us where you operate and which payment methods you cover."
          action={<ButtonLink href={BRAND.x}>Message {BRAND.xHandle}</ButtonLink>}
        />
      </Section>
      <JumpTo items={JUMP} />
    </>
  );
}
