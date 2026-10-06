import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/config/brand";
import { STOCK_TOKENS } from "@/config/assets.generated";
import { ButtonLink, CtaBand, Faq, Figures, LinkTiles, PageHero, Rows, Section, SectionHead, Split, Tag } from "@/components/ui";

export const metadata: Metadata = {
  title: "Asset tokenization",
  description: "Issue gold, equities, bonds, securities and property as tokens on Gleo, with freeze, clawback and holder approval built into the asset.",
};

export default function Tokenization() {
  return (
    <>
      <PageHero
        title="Real-world assets, issued as tokens"
        lead="Gleo lets an issuer put gold, fund shares, bonds, invoices or property on Robinhood Chain as tokens that carry their own rules: who may hold them, and what the issuer may do when it has to."
        art="token"
        meta={<Tag tone="practice">Issuer console in practice mode</Tag>}
        actions={
          <>
            <ButtonLink href="/tokenize" variant="accent">
              Try the issuer console
            </ButtonLink>
            <ButtonLink href="/assets" variant="line">
              Browse assets on-chain
            </ButtonLink>
          </>
        }
      />

      <Section>
        <SectionHead title="Two kinds of asset, one ledger" lead="Most tokenized value falls into one of two groups. Both use the same issuing tools and the same controls." />
        <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line-2 bg-line-2 md:grid-cols-2">
          <div className="bg-card p-7">
            <h3 className="font-display text-2xl font-semibold">Assets you pay with</h3>
            <p className="mt-3 text-[15.5px] leading-relaxed text-ink-2">
              Dollar and local-currency tokens, deposit tokens from banks, and gold or silver grams people save in. They need a stable
              reserve, fast redemption and a clear issuer.
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {["Stable dollars", "Bank deposits", "Gold grams", "Local currencies"].map((t) => (
                <li key={t} className="rounded-full bg-paper px-3 py-1 text-sm">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-card p-7">
            <h3 className="font-display text-2xl font-semibold">Assets you invest in</h3>
            <p className="mt-3 text-[15.5px] leading-relaxed text-ink-2">
              Equities, fund shares, government and corporate bonds, private credit and property interests. They need holder rules,
              corporate actions and an audit trail regulators can follow.
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {["Equities", "Fund shares", "Bonds", "Private credit", "Property"].map((t) => (
                <li key={t} className="rounded-full bg-paper px-3 py-1 text-sm">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="night">
        <SectionHead
          dark
          title="Already on the chain"
          lead="Robinhood Chain carries tokenized shares and a regulated dollar today. Each one below was checked on-chain, not matched by ticker; copycats are filtered out."
        />
        <ul className="mt-10 flex flex-wrap gap-2">
          {["USDG", ...STOCK_TOKENS.map((t) => t.symbol)].map((s) => (
            <li key={s}>
              <Link href="/assets" className="block rounded-full border border-fog/25 px-3.5 py-1.5 font-mono text-[13px] hover:border-fog">
                {s}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-fog-2">These tokens are issued by others; Gleo lists them and lets you use them, it does not issue them.</p>
      </Section>

      <Section>
        <SectionHead
          title="Help with the parts that are not code"
          lead="Legal structure, custody of the underlying asset, audits and investor onboarding are where tokenization projects slow down. Service providers can take those on."
          action={
            <ButtonLink href="/ecosystem/service-providers" variant="line">
              Service providers
            </ButtonLink>
          }
        />
      </Section>

      <Section tone="card">
        <SectionHead title="Predictable enough to plan around" lead="Issuers need to know what operations will cost before they launch. These are the goals Gleo is designed to meet." />
        <div className="mt-10">
          <Figures
            items={[
              { label: "Cost to issue or transfer", value: "$0.0001", tag: "target", note: "Network fee per operation" },
              { label: "Time to final", value: "< 10 s", tag: "target", note: "For transfers and redemptions" },
              { label: "Throughput", value: "4,000 tps", tag: "target", note: "Sized for corporate actions across many holders" },
            ]}
          />
        </div>
      </Section>

      <Section>
        <SectionHead title="What makes Gleo fit for issuance" />
        <div className="mt-8">
          <Rows
            items={[
              {
                title: "Controls live in the asset",
                body: "Holder approval, freeze and clawback are settings on the token, chosen at issue. A regulated issuer does not have to bolt on a separate permission system, and holders can see which controls apply before they buy.",
              },
              {
                title: "Costs you can forecast",
                body: "Fees are small and paid in ETH at the network's going rate. The live panel shows the current price of a transfer, so a budget can be checked against reality at any time.",
              },
              {
                title: "Agreement among known validators",
                body: "Gleo's settlement design follows federated Byzantine agreement: each validator picks the peers it trusts, and a transaction is final once overlapping groups agree. No energy race, and no waiting for probabilistic confirmations.",
              },
              {
                title: "Lower running costs",
                body: "Registers, transfer agents and reconciliation between them collapse into one shared record that issuer, holder and auditor all read.",
              },
              {
                title: "Distribution built in",
                body: "Every wallet that can reach Robinhood Chain can hold an approved token, and anchors give holders a route back to cash.",
              },
            ]}
          />
        </div>
      </Section>

      <Section tone="card">
        <Split title="Rehearse an issuance before you commit" art="ledger">
          <p>
            The Tokenize console walks through defining an asset, setting its controls, approving holders, minting, freezing and clawing
            back. Each step is signed with your wallet as a practice receipt.
          </p>
          <p>No transaction is sent: Gleo&apos;s issuance contracts are not deployed yet, so nothing in the console touches the chain.</p>
          <ButtonLink href="/tokenize" variant="ink">
            Open the console
          </ButtonLink>
        </Split>
      </Section>

      <Section>
        <SectionHead title="Issuer questions" />
        <div className="mt-8">
          <Faq
            items={[
              { q: "Can I issue a token on Gleo today?", a: "Not on mainnet through Gleo yet. The issuance contracts are designed but not deployed or audited. You can rehearse the full flow in practice mode." },
              { q: "Which controls can I switch on?", a: "Holder approval (only approved addresses may hold), freeze (pause one holder), and clawback (return tokens to the issuer, for court orders or lost keys). Each is chosen at issue and visible to holders." },
              { q: "Does Gleo check my investors?", a: "No. Identity and suitability checks stay with the issuer or its provider. Gleo enforces the approval list the issuer maintains." },
              { q: "What proves the asset exists?", a: "The on-chain supply shows what was issued. Proof of the underlying, such as a vault or custodian report, has to come from the issuer and its auditor." },
            ]}
          />
        </div>
      </Section>

      <Section tone="card" tight>
        <SectionHead title="More to explore" />
        <div className="mt-8">
          <LinkTiles
            items={[
              { href: "/developers", title: "Developer documentation", body: "Network details, endpoints and how to build against Robinhood Chain." },
              { href: "/case-studies/gold-savings-token", title: "A gold savings token", body: "Illustrative scenario: a dealer issues grams of allocated gold.", tag: "example" },
              { href: "/learn/intro", title: "What is Gleo", body: "The network in ten minutes, if you are starting from zero." },
            ]}
          />
        </div>
      </Section>

      <CtaBand
        title="Planning an issuance?"
        body="Tell us the asset, the market and the controls you need. We will tell you honestly what is ready and what is not."
        actions={
          <ButtonLink href={BRAND.x} variant="fog">
            Message {BRAND.xHandle}
          </ButtonLink>
        }
      />
    </>
  );
}
