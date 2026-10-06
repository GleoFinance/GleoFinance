import type { Metadata } from "next";
import { BRAND } from "@/config/brand";
import { ButtonLink, CtaBand, Faq, LinkTiles, PageHero, Rows, Section, SectionHead, Split } from "@/components/ui";
import { LiveFigures } from "@/components/live/LiveFigures";

export const metadata: Metadata = {
  title: "For institutions",
  description: "Issue funds, deposits and securities as tokens with built-in controls, and settle around the clock on Gleo.",
};

export default function InstitutionsPage() {
  return (
    <>
      <PageHero
        title="Settlement that keeps your hours: all of them"
        lead="Banks, asset managers and transfer companies use Gleo to issue assets with their rules attached and to settle in seconds, every day of the year, on a public ledger anyone can audit."
        art="bank"
        actions={
          <>
            <ButtonLink href="/tokenize" variant="accent">
              Try the issuer console
            </ButtonLink>
            <ButtonLink href={BRAND.x} variant="line">
              Talk to the team
            </ButtonLink>
          </>
        }
      />

      <Section tone="card">
        <SectionHead
          title="What you can test today"
          lead="We have no institutional customers to quote yet. What we do have is the chain, its live readings, and tools you can try with your own wallet."
        />
        <div className="mt-10">
          <LiveFigures />
        </div>
        <div className="mt-12">
          <LinkTiles
            items={[
              { href: "/send", title: "Settle a USDG payment", body: "Send dollars from your wallet to any address and watch it land in the next block.", tag: "live" },
              { href: "/assets", title: "Inspect tokenized equities", body: "Stock tokens already issued on Robinhood Chain, verified on-chain, with live supply.", tag: "live" },
              { href: "/tokenize", title: "Run an issuance", body: "Create an asset, approve holders, freeze and claw back, signed as practice receipts.", tag: "practice" },
            ]}
          />
        </div>
      </Section>

      <Section>
        <SectionHead title="Ready for enterprise work" />
        <div className="mt-10">
          <Rows
            cols={2}
            items={[
              { title: "Controls inside the asset", body: "Freeze, clawback and holder approval are part of the token contract, so they hold on every venue the asset reaches." },
              { title: "A public audit trail", body: "Every issuance, transfer and control action is an on-chain event your auditors can read without asking us." },
              { title: "Compliance hooks", body: "Allowlists tied to your own KYC, travel-rule data passed through anchors, and reporting from chain data." },
              { title: "Predictable costs", body: "Transfers cost fractions of a cent today. The live figure above is read from the chain, not quoted from a brochure." },
            ]}
          />
        </div>
      </Section>

      <Section tone="night">
        <Split dark art="token" title="Built for your institution" reverse>
          <p>
            <strong className="text-fog">Asset managers</strong> issue fund shares that settle against USDG and can be held in any approved wallet.
          </p>
          <p>
            <strong className="text-fog">Banks</strong> issue deposit tokens and move them between clients and branches outside banking hours.
          </p>
          <p>
            <strong className="text-fog">Transfer companies</strong> settle with partners abroad in seconds instead of pre-funding accounts for days.
          </p>
        </Split>
      </Section>

      <Section>
        <SectionHead title="For your technical teams" lead="Standard EVM, standard tokens, standard tooling. No proprietary node to run." />
        <div className="mt-8">
          <Faq
            items={[
              { q: "Do we need to run infrastructure?", a: "No. Use the public RPC to start and a private RPC provider for production. Running your own node is optional." },
              { q: "How do tokens and controls work technically?", a: "Gleo assets are ERC-20 tokens with role-gated control functions. Every action emits an event, so indexers and auditors see it." },
              { q: "Is anything deployed yet?", a: "Not the Gleo contracts. They are in development and will be reviewed externally before they hold value. The issuer console runs in practice mode until then." },
            ]}
          />
        </div>
      </Section>

      <CtaBand
        title="Ready to modernize settlement?"
        body="Start with the issuer console, then tell us which asset and which market you have in mind."
        actions={
          <>
            <ButtonLink href="/tokenize" variant="fog">
              Issuer console
            </ButtonLink>
            <ButtonLink href={BRAND.x} variant="line" className="border-fog/30 text-fog hover:border-fog">
              Contact on X
            </ButtonLink>
          </>
        }
      />
    </>
  );
}
