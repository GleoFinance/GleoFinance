import { Gauge, Hammer, Landmark } from "lucide-react";
import { CHAIN } from "@/config/brand";
import { pageMeta } from "@/lib/seo";
import { CopyBlock } from "@/app/developers/CopyBlock";
import { Glyph } from "@/components/glyph";
import { ButtonLink, CtaBand, Figures, LinkTiles, PageHero, Rows, Section, SectionHead, Split, Steps, Tag } from "@/components/ui";

export const metadata = pageMeta({
  path: "/smart-contracts",
  title: "Solidity Smart Contracts on Robinhood Chain",
  description:
    "Plan, test and deploy Solidity smart contracts on Robinhood Chain with Foundry or Hardhat, using real USDG and stock tokens. Read the six-step quick start.",
  keywords: ["Solidity smart contracts", "Robinhood Chain", "Foundry fork mainnet", "ERC-20 asset controls", "EVM deployment"],
});

const STEPS = [
  { title: "Install the toolchain", body: "Foundry (forge, cast, anvil) or Hardhat. Both treat Robinhood Chain like any other EVM network." },
  { title: "Write a first contract", body: "A small Solidity contract that stores a value and emits an event, compiled with solc 0.8.x and tested locally." },
  { title: "Fork mainnet on your laptop", body: "Run anvil with --fork-url on the public RPC and chain id 4663 so your tests see real USDG and stock-token state." },
  { title: "Read live state", body: "Call totalSupply() on USDG or a stock token from a test. Reads cost nothing and prove the setup reaches the chain." },
  { title: "Deploy", body: "Fund a deployer with a little ETH on Robinhood Chain and deploy with forge create or a Hardhat script. Gas is paid in ETH." },
  { title: "Verify and connect", body: "Publish the source on Blockscout, then wire a front end through any EIP-6963 wallet, the way this site does." },
];

const QUALITIES = [
  {
    icon: Hammer,
    title: "Familiar for builders",
    body: "Plain Solidity, standard ABIs and the tooling you already know. If it runs on an EVM chain, it runs here, and it can be tested against a mainnet fork.",
  },
  {
    icon: Gauge,
    title: "Cheap at high volume",
    body: "Blocks arrive several times a second and a token transfer costs a fraction of a cent, so contracts that settle many small payments stay affordable.",
  },
  {
    icon: Landmark,
    title: "Backed by real assets",
    body: "Contracts can hold and move a dollar token and verified stock tokens that already exist, instead of synthetic stand-ins.",
  },
];

export default function SmartContractsPage() {
  return (
    <>
      <PageHero
        eyebrow="Smart contracts"
        title="Solidity smart contracts that carry their own rules"
        lead={
          <p>
            Gleo writes its payment routing, asset controls and markets as Solidity smart contracts on {CHAIN.name}. They are still in development
            and not deployed. Everything else you need to build today, from a dollar token to verified stock tokens, is already live on the chain.
          </p>
        }
        art="code"
        meta={<Tag tone="plan">Gleo Contracts: not deployed yet</Tag>}
        actions={
          <>
            <ButtonLink href="#start">Follow the quick start</ButtonLink>
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
          eyebrow="On the chain today"
          title="What you can build on before Gleo ships"
          lead="Gleo's contracts are not live, but the chain they will run on is: a dollar token, verified stock tokens, deep pools and a public explorer, all reachable from any EVM tool."
        />
        <div className="mt-12">
          <Rows
            dark
            cols={2}
            items={[
              { title: "USDG", body: "A six-decimal dollar token with hundreds of millions in circulation. It is the settlement asset for Gleo payments." },
              { title: "Stock tokens", body: "Equities and ETFs issued as tokens and identified by the chain's token beacon rather than by ticker.", href: "/assets" },
              { title: "Uniswap pools", body: "Live liquidity for ETH, USDG and stock tokens, so price discovery exists before any Gleo contract." },
              { title: "Pons launchpad", body: "Where $GLEO trades from launch. The swap page calls its contracts directly.", href: "/swap" },
            ]}
          />
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow="Why Robinhood Chain" title="Designed for three kinds of contract work" />
        <ul className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-6">
          {QUALITIES.map((q) => (
            <li key={q.title} className="min-w-0">
              <Glyph icon={q.icon} />
              <h3 className="t-h3 mt-8">{q.title}</h3>
              <p className="mt-3 text-[16px] leading-relaxed text-ink-2">{q.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="sand">
        <Split eyebrow="Asset controls" art="shield" title="Why issuer rules live inside the token contract">
          <p>
            Issuers need to freeze a stolen balance, reverse a mistaken transfer or limit holders to approved accounts. Gleo Contracts put those
            controls in the token itself, behind roles the issuer holds, so every wallet and market reads the same rules.
          </p>
          <p>
            Time-delayed upgrades and an event for every control action are part of the design. The practice console at{" "}
            <a href="/tokenize" className="underline underline-offset-4">
              the Gleo issuer console
            </a>{" "}
            walks through each control without touching the chain.
          </p>
        </Split>
      </Section>

      <Section tone="gray">
        <SectionHead
          eyebrow="Roadmap"
          title="The planned Gleo contract set"
          lead="Each contract ships with source verified on Blockscout and an external review before it holds real value. Nothing below is deployed."
        />
        <div className="mt-10">
          <Figures
            items={[
              { label: "Payment router", value: "v0", tag: "plan", note: "Batched USDG payouts with references" },
              { label: "Controlled asset", value: "v0", tag: "plan", note: "ERC-20 with freeze, clawback, allowlist" },
              { label: "Money market", value: "v0", tag: "plan", note: "Lend and borrow against tokenized assets" },
              { label: "Pool", value: "v0", tag: "plan", note: "Constant-product market for Gleo assets" },
            ]}
          />
        </div>
      </Section>

      <Section id="start">
        <SectionHead
          eyebrow="Quick start"
          title="Deploy your first contract in six steps"
          lead="All of this works today on Robinhood Chain mainnet. None of it depends on a Gleo contract."
        />
        <div className="mt-12">
          <Steps steps={STEPS.slice(0, 3)} />
        </div>
        <div className="mt-6">
          <Steps steps={STEPS.slice(3)} />
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <CopyBlock
            label="foundry.toml"
            text={`[rpc_endpoints]\nrobinhood = "${CHAIN.publicRpc}"\n\n[etherscan]\nrobinhood = { key = "none", url = "${CHAIN.explorer}/api", chain = ${CHAIN.id} }`}
          />
          <CopyBlock
            label="Fork mainnet with anvil"
            text={`anvil --fork-url ${CHAIN.publicRpc} --chain-id ${CHAIN.id}\n\ncast call 0x5fc5360D0400a0Fd4f2af552ADD042D716F1d168 "totalSupply()(uint256)" --rpc-url ${CHAIN.publicRpc}`}
          />
        </div>
      </Section>

      <Section tone="gray">
        <SectionHead eyebrow="Around your contract" title="Build and connect on Robinhood Chain" lead="The pieces a contract usually needs next to it, and where to find them." />
        <div className="mt-12">
          <LinkTiles
            items={[
              { href: "/use-cases/defi", title: "Protocols", body: "Pools and markets your contract can route through or price against.", label: "DeFi on Gleo" },
              { href: "/products", title: "Wallets", body: "Any EIP-6963 wallet that can add a custom network. The connect dialog lists them.", label: "Products and tools" },
              { href: "/ecosystem", title: "Bridges", body: "Ways ETH and tokens arrive on Robinhood Chain from other networks.", label: "Ecosystem map" },
              { href: "/learn", title: "Oracles", body: "Price feeds for ETH and equities, read on-chain by contracts that need a mark price.", label: "Learning guides" },
              { href: "/use-cases/tokenization", title: "Tokenization", body: "Asset controls and issuance patterns for real-world value.", label: "Tokenization use case" },
              { href: "/developers", title: "RPC providers", body: "The public endpoint, a public fallback, and private endpoints for production load.", label: "Network settings" },
            ]}
          />
        </div>
      </Section>

      <CtaBand
        eyebrow="Builders"
        title="Building a contract on Gleo?"
        body="Tell us what you are working on. Builder grants open with the first round, and early projects get a direct line to the team."
        actions={
          <>
            <ButtonLink href="/grants">Grants and funding</ButtonLink>
            <ButtonLink href="/community" variant="line">
              Join the community
            </ButtonLink>
          </>
        }
      />
    </>
  );
}
