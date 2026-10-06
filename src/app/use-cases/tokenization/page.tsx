import Link from "next/link";
import { Gem, Landmark } from "lucide-react";
import { BRAND } from "@/config/brand";
import { STOCK_TOKENS, USDG } from "@/config/assets.generated";
import { pageMeta, faqLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Glyph } from "@/components/glyph";
import { JumpTo } from "@/components/content/JumpTo";
import { ScenarioCover } from "@/components/content/ScenarioCover";
import { ButtonLink, Faq, Figures, LinkTiles, PageHero, Rows, Section, SectionHead, Split, Tag } from "@/components/ui";

export const metadata = pageMeta({
  path: "/use-cases/tokenization",
  title: "Real-World Asset Tokenization with Built-In Controls",
  description:
    "Real-world asset tokenization on Robinhood Chain: issue gold, fund shares or bonds as tokens with holder approval, freeze and clawback. Rehearse it free.",
  keywords: ["real-world asset tokenization", "tokenized stocks", "asset issuance", "RWA tokens", "clawback and freeze"],
});

const FAQ = [
  {
    q: "Can I issue a tokenized asset through Gleo today?",
    a: "Not on mainnet yet. The Gleo issuance contracts are designed but not deployed or audited. The Tokenize console lets you rehearse every step in practice mode, signed with your own wallet and free.",
  },
  {
    q: "Which issuer controls does a Gleo asset support?",
    a: "Holder approval (only approved addresses may hold), freeze (pause a single holder) and clawback (return tokens to the issuer, for court orders or lost keys). Each one is chosen when the asset is created and is visible to every holder.",
  },
  {
    q: "Does Gleo verify my investors?",
    a: "No. Identity and suitability checks stay with the issuer or a provider it hires. Gleo enforces the approval list the issuer keeps.",
  },
  {
    q: "How do holders know the underlying asset exists?",
    a: "On-chain supply shows exactly what was issued. Evidence of the asset itself, such as a vault or custodian report, has to come from the issuer and its auditor.",
  },
];

const JUMP = [
  { id: "asset-types", label: "Two kinds of asset" },
  { id: "on-chain-now", label: "Already on Robinhood Chain" },
  { id: "why-gleo", label: "Why issue on Gleo" },
  { id: "targets", label: "Design targets" },
  { id: "console", label: "Issuer console" },
  { id: "faq", label: "FAQ" },
];

export default function Tokenization() {
  return (
    <>
      <PageHero
        eyebrow="Asset tokenization"
        title="Real-world asset tokenization, with the rules inside the token"
        lead="Gleo is building real-world asset tokenization for Robinhood Chain: an issuer puts gold, fund shares, bonds, invoices or property on-chain as tokens that carry their own rules about who may hold them and what the issuer may do when it must. The issuer console runs in practice mode while the contracts are audited."
        art="token"
        meta={<Tag tone="practice">Issuer console in practice mode</Tag>}
        crumbs={[
          { name: "Use cases", path: "/use-cases" },
          { name: "Asset tokenization", path: "/use-cases/tokenization" },
        ]}
        actions={
          <>
            <ButtonLink href="/tokenize">Try the issuer console</ButtonLink>
            <ButtonLink href="/assets" variant="line">
              Browse tokenized assets
            </ButtonLink>
          </>
        }
      />

      <Section tone="night" tight>
        <SectionHead
          dark
          split
          eyebrow="How it works"
          title="One register that issuer, holder and auditor all read"
          lead="Share registers, transfer agents and the reconciliation between them usually live in separate systems. A token puts the register on a public ledger: the issuer mints and burns, holders transfer within the rules, and an auditor reads the same record everyone else does."
        />
      </Section>

      <Section tone="gray" id="asset-types">
        <SectionHead eyebrow="Asset types" title="Two kinds of asset, one ledger" lead="Most tokenized value falls into one of two groups. Both use the same issuing tools and the same controls." />
        <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {[
            {
              icon: Gem,
              title: "Assets people pay and save with",
              body: "Dollar and local-currency tokens, bank deposit tokens and gold or silver measured in grams. They need a stable reserve, quick redemption and a named issuer.",
              chips: ["Stable dollars", "Deposit tokens", "Gold grams", "Local currencies"],
            },
            {
              icon: Landmark,
              title: "Assets people invest in",
              body: "Equities, fund shares, government and corporate bonds, private credit and property interests. They need holder rules, corporate actions and a trail regulators can follow.",
              chips: ["Equities", "Fund shares", "Bonds", "Private credit", "Property"],
            },
          ].map((g) => (
            <li key={g.title} className="min-w-0 border border-line bg-paper p-8 lg:p-10">
              <Glyph icon={g.icon} />
              <h3 className="t-h3 mt-8">{g.title}</h3>
              <p className="t-lead mt-3 text-ink-2">{g.body}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {g.chips.map((c) => (
                  <li key={c} className="border border-line px-2.5 py-1 text-[13px]">
                    {c}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="on-chain-now">
        <SectionHead
          eyebrow="Live on Robinhood Chain"
          title="Tokenized stocks and a dollar token you can check today"
          lead="Robinhood Chain already carries tokenized shares and USDG. Each token below was verified against the chain's stock-token beacon, not matched by ticker, so look-alike contracts are left out. They are issued by others; Gleo lists them and lets you use them."
        />
        <ul className="mt-10 flex flex-wrap gap-2">
          {[USDG.symbol, ...STOCK_TOKENS.map((t) => t.symbol)].map((s) => (
            <li key={s}>
              <Link href="/assets" className="block border border-line px-4 py-2 text-[14px] font-semibold transition-colors hover:border-ink">
                {s}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-[14px] text-ink-3">
          Live supply and prices for every token are in the{" "}
          <Link href="/assets" className="text-ink underline underline-offset-4">
            Gleo asset explorer
          </Link>
          .
        </p>
      </Section>

      <Section tone="gray" id="why-gleo">
        <SectionHead eyebrow="Why issue on Gleo" title="What makes Gleo a fit for asset issuance" />
        <div className="mt-8">
          <Rows
            items={[
              {
                title: "Controls are part of the asset",
                body: "Holder approval, freeze and clawback are settings on the token itself, fixed at issue. A regulated issuer does not have to bolt on a separate permission layer, and a buyer can see which controls apply before buying.",
              },
              {
                title: "Fees you can budget for",
                body: "Every operation pays a small network fee in ETH at the going rate. The live network panel prices a transfer every few seconds, so a forecast can be checked against reality at any time.",
              },
              {
                title: "Final settlement within a block",
                body: "Robinhood Chain confirms transactions in well under a second on average, so a transfer or redemption is done when the block is.",
              },
              {
                title: "Distribution through ordinary wallets",
                body: "Any EVM wallet that can reach Robinhood Chain can hold an approved token, and anchors give holders a route back to cash as they are listed.",
              },
            ]}
          />
        </div>
      </Section>

      <Section id="targets">
        <SectionHead
          eyebrow="Design targets"
          title="Numbers Gleo is designed to meet for issuers"
          lead="These are goals for the Gleo issuance layer, not measurements. Live readings from the chain are on the network panel."
        />
        <div className="mt-10">
          <Figures
            items={[
              { label: "Cost per issue or transfer", value: "$0.0001", tag: "target", note: "Network fee per operation" },
              { label: "Time to final", value: "< 10 s", tag: "target", note: "For transfers and redemptions, wallet included" },
              { label: "Throughput", value: "4,000 tps", tag: "target", note: "Sized for corporate actions across many holders" },
            ]}
          />
        </div>
      </Section>

      <Section tone="gray" id="console">
        <Split eyebrow="Practice mode" title="Rehearse an issuance before you commit" art="ledger">
          <p>
            The Tokenize console walks through defining an asset, choosing its controls, approving holders, minting, freezing and clawing
            back. Each step is signed with your wallet as a free practice receipt.
          </p>
          <p>No transaction is sent: the Gleo issuance contracts are not deployed, so nothing in the console touches the chain.</p>
          <div className="pt-2">
            <ButtonLink href="/tokenize">Open the Tokenize console</ButtonLink>
          </div>
        </Split>
      </Section>

      <Section>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-24">
          <div className="min-w-0">
            <ScenarioCover area="Tokenization" icon={Gem} label="Illustration for the gold savings token scenario" />
          </div>
          <div className="min-w-0">
            <p className="t-eyebrow mb-4">Field scenario</p>
            <h2 className="t-h2 text-balance">A bullion dealer turns vaulted gold into a savings token</h2>
            <p className="t-lead mt-6 text-ink-2">
              One token per allocated gram, holder approval from day one and supply anyone can compare with the vault report. An
              illustrative plan, worked through step by step.
            </p>
            <div className="mt-8">
              <ButtonLink href="/case-studies/gold-savings-token">Read the gold token scenario</ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      <Section id="faq">
        <JsonLd data={faqLd(FAQ)} />
        <SectionHead eyebrow="FAQ" title="Questions issuers ask about tokenization" />
        <div className="mt-10">
          <Faq items={FAQ} />
        </div>
      </Section>

      <Section tight>
        <SectionHead eyebrow="Keep exploring" title="More for asset issuers" />
        <div className="mt-10">
          <LinkTiles
            items={[
              { href: "/ecosystem/service-providers", title: "Legal and custody help", body: "Categories of firms that handle structuring, custody of the underlying and investor onboarding.", label: "See service providers" },
              { href: "/institutions", title: "Gleo for institutions", body: "Issuance and settlement for banks, funds and asset managers.", label: "Read the institutions page" },
              { href: "/developers", title: "Developer hub", body: "Chain details, endpoints and how to build against Robinhood Chain.", label: "Open the developer hub" },
            ]}
          />
        </div>
      </Section>

      <Section tone="gray">
        <SectionHead
          split
          eyebrow="Talk to us"
          title="Planning an issuance?"
          lead="Tell us the asset, the market and the controls you need. We will say honestly what is ready and what is still being built."
          action={<ButtonLink href={BRAND.x}>Message {BRAND.xHandle}</ButtonLink>}
        />
      </Section>
      <JumpTo items={JUMP} />
    </>
  );
}
