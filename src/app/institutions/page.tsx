import { BRAND } from "@/config/brand";
import { faqLd, pageMeta } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { LiveFigures } from "@/components/live/LiveFigures";
import { ButtonLink, CtaBand, Faq, InfoCards, LinkTiles, PageHero, Section, SectionHead, Split } from "@/components/ui";

export const metadata = pageMeta({
  path: "/institutions",
  title: "Asset Tokenization and Settlement for Institutions",
  description:
    "Issue fund shares, deposits and securities as tokens with freeze, clawback and holder approval, then settle in USDG at any hour on Robinhood Chain. Try it.",
  keywords: ["institutional asset tokenization", "tokenized deposits", "24/7 settlement", "tokenized fund shares", "Robinhood Chain"],
});

const FAQ = [
  { q: "Do we need to run our own infrastructure?", a: "No. Start on the public RPC and move to a private RPC provider for production. Running a node is optional." },
  { q: "How do tokens and controls work technically?", a: "Gleo assets are ERC-20 tokens with role-gated control functions. Every control action emits an event, so indexers and auditors see it." },
  { q: "Is anything deployed yet?", a: "Not the Gleo contracts. They are in development and will be reviewed externally before they hold value. Until then the issuer console runs in practice mode." },
];

export default function InstitutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Institutions"
        title="Asset tokenization and settlement for institutions"
        lead={
          <p>
            Gleo gives banks, asset managers and transfer companies institutional asset tokenization with the issuer&apos;s rules built in, plus
            settlement in USDG that runs every hour of every day on a public ledger anyone can audit.
          </p>
        }
        art="bank"
        actions={
          <>
            <ButtonLink href="/tokenize">Try the issuer console</ButtonLink>
            <ButtonLink href={BRAND.x} variant="line">
              Talk to the team
            </ButtonLink>
          </>
        }
      />

      <Section tone="night">
        <Split dark eyebrow="Who it is for" art="token" title="Built around how institutions already work" reverse>
          <p>
            <strong className="font-semibold text-fog">Asset managers</strong> issue fund shares that settle against USDG and can sit in any approved
            wallet.
          </p>
          <p>
            <strong className="font-semibold text-fog">Banks</strong> issue deposit tokens and move them between clients and branches outside
            banking hours.
          </p>
          <p>
            <strong className="font-semibold text-fog">Transfer companies</strong> settle with partners abroad in seconds instead of pre-funding
            accounts for days.
          </p>
        </Split>
      </Section>

      <Section>
        <SectionHead
          eyebrow="Measured, not quoted"
          title="What your team can test today"
          lead="We have no institutional customers to cite yet. What we do have is the chain, its live readings, and tools you can try with your own wallet."
        />
        <div className="mt-10">
          <LiveFigures />
        </div>
        <div className="mt-12">
          <LinkTiles
            items={[
              { href: "/send", title: "Settle a USDG payment", body: "Send dollars from your wallet to any address and watch it land in the next block.", tag: "live", label: "Open Send" },
              { href: "/assets", title: "Inspect tokenized equities", body: "Stock tokens already issued on Robinhood Chain, verified on-chain, with live supply.", tag: "live", label: "Open the asset explorer" },
              { href: "/tokenize", title: "Run a practice issuance", body: "Create an asset, approve holders, freeze and claw back, signed as free practice receipts.", tag: "practice", label: "Open the issuer console" },
            ]}
          />
        </div>
      </Section>

      <Section tone="gray">
        <SectionHead eyebrow="Enterprise ready" title="Controls, audit trail and costs you can check" />
        <div className="mt-12">
          <InfoCards
            items={[
              { title: "Controls inside the asset", body: "Freeze, clawback and holder approval are part of the token contract, so they hold on every venue the asset reaches." },
              { title: "A public audit trail", body: "Every issuance, transfer and control action is an on-chain event your auditors can read without asking us." },
              { title: "Compliance hooks", body: "Allowlists tied to your own KYC, travel-rule data passed through anchors, and reporting from chain data." },
              { title: "Predictable costs", body: "Transfers cost fractions of a cent today. The live figure above is read from the chain, not taken from a brochure." },
            ]}
          />
        </div>
      </Section>

      <Section>
        <JsonLd data={faqLd(FAQ)} />
        <SectionHead eyebrow="For technical teams" title="Standard EVM, standard tokens, standard tooling" lead="No proprietary node to run and no custom token format to learn." />
        <div className="mt-10">
          <Faq items={FAQ} />
        </div>
      </Section>

      <CtaBand
        eyebrow="Next step"
        title="Run a practice issuance first"
        body="Start with the issuer console, then tell us which asset and which market you have in mind. Read the tokenization use case for the full picture."
        actions={
          <>
            <ButtonLink href="/tokenize">Open the issuer console</ButtonLink>
            <ButtonLink href="/use-cases/tokenization" variant="line">
              Tokenization use case
            </ButtonLink>
          </>
        }
      />
    </>
  );
}
