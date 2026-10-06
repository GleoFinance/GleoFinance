import { BRAND } from "@/config/brand";
import { pageMeta } from "@/lib/seo";
import { ButtonLink, LinkTiles, PageHero, Section, SectionHead, Split } from "@/components/ui";

export const metadata = pageMeta({
  path: "/use-cases",
  title: "Stablecoin and Tokenization Use Cases for Business",
  description:
    "Stablecoin use cases on Gleo: cross-border payments, cash ramps, tokenized assets, aid payouts and DeFi on Robinhood Chain. Find the one that fits your team.",
  keywords: ["stablecoin use cases", "blockchain payments for business", "asset tokenization", "aid disbursement", "DeFi"],
});

export default function UseCases() {
  return (
    <>
      <PageHero
        tone="night"
        eyebrow="Use cases"
        title="Stablecoin use cases Gleo is built for"
        lead={`These are the stablecoin use cases ${BRAND.name} handles on Robinhood Chain: sending money between countries, getting cash in and out, putting real assets on a ledger, delivering aid and running open markets. They share one network, one dollar token and one set of tools, so a team that starts with one can add the next without starting over.`}
        art="compass"
        crumbs={[{ name: "Use cases", path: "/use-cases" }]}
        actions={
          <>
            <ButtonLink href="/send" variant="fog">
              Send a payment
            </ButtonLink>
            <ButtonLink href="/case-studies" variant="fog">
              See worked scenarios
            </ButtonLink>
          </>
        }
      />

      <Section tone="gray">
        <Split eyebrow="Payments" title="Cross-border payments without the waiting" art="globe">
          <p>
            Money sent abroad usually passes through several banks, each adding time and a fee. On Gleo the sender&apos;s wallet pays the
            recipient&apos;s wallet directly in USDG, and the transfer is final within a block.
          </p>
          <p>Remittances, supplier invoices, payroll and marketplace payouts all follow the same pattern.</p>
          <div className="pt-2">
            <ButtonLink href="/use-cases/payments">Explore cross-border payments</ButtonLink>
          </div>
        </Split>
      </Section>

      <Section>
        <Split eyebrow="On and off-ramps" title="One shared interface for every cash gateway" art="anchor" reverse>
          <p>
            Anchors are the licensed businesses that turn bank money or cash into tokens and back. Gleo asks each of them to speak the same
            interface, so a wallet that works with one anchor works with all of them.
          </p>
          <p>For a wallet team that means one integration rather than one per country; for an anchor, every compatible wallet becomes a channel.</p>
          <div className="pt-2">
            <ButtonLink href="/use-cases/ramps">Explore on and off-ramps</ButtonLink>
          </div>
        </Split>
      </Section>

      <Section tone="gray">
        <Split eyebrow="Asset tokenization" title="Give real assets a place on the ledger" art="token">
          <p>
            Gold, fund shares, bonds and property can be issued as tokens whose rules travel with them: who may hold them, and what the
            issuer may do when a court order or a lost key demands it.
          </p>
          <p>Tokenized stocks already trade on Robinhood Chain, and the Gleo asset explorer lists the verified ones with live supply.</p>
          <div className="pt-2">
            <ButtonLink href="/use-cases/tokenization">Explore asset tokenization</ButtonLink>
          </div>
        </Split>
      </Section>

      <Section>
        <Split eyebrow="Aid disbursements" title="Relief payments that can be shown to have arrived" art="fanout" reverse>
          <p>
            Relief teams can send support straight to recipients&apos; phones and let them collect cash at local agents. Each payment is on
            the public record, while the list of who received it stays private.
          </p>
          <div className="pt-2">
            <ButtonLink href="/use-cases/aid">Explore aid disbursements</ButtonLink>
          </div>
        </Split>
      </Section>

      <Section tone="gray">
        <Split eyebrow="DeFi" title="Open markets for tokenized stocks and dollars" art="pool">
          <p>
            Lend USDG, borrow against verified share tokens and provide liquidity in markets whose rules sit in open contracts. The
            markets are not deployed yet; every position can be rehearsed in practice mode.
          </p>
          <div className="pt-2">
            <ButtonLink href="/use-cases/defi">Explore DeFi on Gleo</ButtonLink>
          </div>
        </Split>
      </Section>

      <Section>
        <SectionHead eyebrow="Keep exploring" title="More for you to look into" />
        <div className="mt-10">
          <LinkTiles
            items={[
              { href: "/anchors", title: "Anchor directory", body: "Cash-in and cash-out gateways by region, and how a deposit works step by step.", tag: "practice", label: "Open the directory" },
              { href: "/case-studies", title: "Field scenarios", body: "Four worked examples, from contractor payroll to borrowing against shares.", tag: "example", label: "Read the scenarios" },
              { href: "/ecosystem/service-providers", title: "Service providers", body: "Categories of firms that help teams integrate, audit and run Gleo in production.", label: "See service providers" },
            ]}
          />
        </div>
      </Section>

      <Section tone="night">
        <SectionHead
          dark
          split
          eyebrow="Talk to us"
          title="Not sure which use case fits?"
          lead="Tell us what you move and where. The team reads every message on X and will point you at the right tool, or say if Gleo is not ready for it yet."
          action={
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={BRAND.x} variant="fog">
                Message {BRAND.xHandle}
              </ButtonLink>
              <ButtonLink href="/use-cases/privacy" variant="fog">
                Read about privacy
              </ButtonLink>
            </div>
          }
        />
      </Section>
    </>
  );
}
