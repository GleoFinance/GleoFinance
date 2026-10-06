import type { Metadata } from "next";
import { CHAIN } from "@/config/brand";
import { CopyBlock } from "@/app/developers/CopyBlock";
import { ButtonLink, CtaBand, Figures, LinkTiles, PageHero, Rows, Section, SectionHead, Split, Steps, Tag } from "@/components/ui";

export const metadata: Metadata = {
  title: "Smart contracts",
  description: "Gleo Contracts: Solidity on Robinhood Chain for payments, asset controls and open markets. Chain details, tooling and a six-step start.",
};

const STEPS = [
  { title: "Set up the toolchain", body: "Install Foundry (forge, cast, anvil) or Hardhat. Both speak to Robinhood Chain like any other EVM network." },
  { title: "Write a first contract", body: "A small Solidity contract that stores a value and emits an event. Compile it with solc 0.8.x and run the tests locally." },
  { title: "Fork mainnet locally", body: "Start anvil with --fork-url pointed at the public RPC and chain id 4663, so tests run against real USDG and stock-token state." },
  { title: "Read real state", body: "Call totalSupply() on USDG or a stock token from your test. Reading costs nothing and proves your setup sees the live chain." },
  { title: "Deploy", body: "Fund a deployer with a little ETH on Robinhood Chain and deploy with forge create or a Hardhat script. Gas is paid in ETH." },
  { title: "Verify and connect", body: "Verify the source on Blockscout, then connect a front end through any EIP-6963 wallet, the same way this site does." },
];

export default function SmartContractsPage() {
  return (
    <>
      <PageHero
        title="Gleo Contracts: rules that run themselves"
        lead="Gleo's payment routing, asset controls and markets are written as Solidity contracts on Robinhood Chain. Anything you build can call them, compose them, or sit beside them."
        art="code"
        meta={<Tag tone="plan">Core contracts in development</Tag>}
        actions={
          <>
            <ButtonLink href="#start" variant="accent">
              Start building
            </ButtonLink>
            <ButtonLink href="/developers" variant="line">
              Developer hub
            </ButtonLink>
          </>
        }
      />

      <Section tone="card">
        <SectionHead
          title="What is already there to build on"
          lead="Gleo's own contracts are not deployed yet. The chain they will live on is: a dollar token, verified stock tokens, deep pools and a public explorer, all reachable from any EVM tool."
        />
        <div className="mt-10">
          <Rows
            cols={2}
            items={[
              { title: "USDG", body: "A dollar token with six decimals and hundreds of millions in circulation. The settlement asset for Gleo payments." },
              { title: "Stock tokens", body: "Equities and ETFs issued as tokens and identified by the chain's token beacon, not by ticker. Listed on the asset explorer.", href: "/assets" },
              { title: "Uniswap pools", body: "Live liquidity for ETH, USDG and stock tokens. Price discovery exists before a single Gleo contract ships." },
              { title: "Pons launchpad", body: "Where $GLEO trades from launch. The swap page talks to its contracts directly.", href: "/swap" },
            ]}
          />
        </div>
      </Section>

      <Section>
        <SectionHead title="Designed for three kinds of work" />
        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3">
          {[
            ["Builders", "Plain Solidity, standard ABIs, familiar tooling. If it runs on an EVM chain, it runs here, and you can test it against a fork of mainnet."],
            ["Volume", "Blocks arrive several times a second and a token transfer costs a fraction of a cent, so contracts that settle many small payments stay affordable."],
            ["Real-world value", "Contracts can hold and move dollars and stock tokens that already exist, rather than synthetic stand-ins."],
          ].map(([t, b]) => (
            <div key={t} className="min-w-0 border-l-2 border-sea pl-5">
              <h3 className="font-display text-2xl font-semibold">{t}</h3>
              <p className="mt-3 text-[15.5px] leading-relaxed text-ink-2">{b}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="night">
        <Split dark art="shield" title="Why the asset rules live in the contract">
          <p>
            Issuers need to freeze a stolen balance, claw back a mistaken transfer, or limit holders to approved accounts. Gleo Contracts put those
            controls in the token itself, behind roles the issuer controls, so every wallet and market sees the same rules.
          </p>
          <p>
            Passkey-friendly smart accounts, upgrade paths that need a time delay, and events for every control action are part of the design. The
            practice console on <a href="/tokenize" className="underline underline-offset-4">/tokenize</a> walks through each control without touching the chain.
          </p>
        </Split>
      </Section>

      <Section tone="card">
        <SectionHead title="Planned contract set" lead="Each one ships with source verified on Blockscout and an external review before it holds real value." />
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
        <SectionHead title="Start building in six steps" lead="Everything below works today against Robinhood Chain mainnet. None of it needs a Gleo contract." />
        <div className="mt-12">
          <Steps steps={STEPS.slice(0, 3)} />
        </div>
        <div className="mt-10">
          <Steps steps={STEPS.slice(3)} />
        </div>
        <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-2">
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

      <Section tone="card">
        <SectionHead title="Build and connect" lead="The pieces a contract usually needs around it, and where to find them on Robinhood Chain." />
        <div className="mt-10">
          <LinkTiles
            items={[
              { href: "/use-cases/defi", title: "Protocols", body: "Pools and markets your contract can route through or price against." },
              { href: "/products", title: "Wallets", body: "Any EIP-6963 wallet that can add a custom network. The connect dialog on this site lists them." },
              { href: "/ecosystem", title: "Bridges", body: "Ways ETH and tokens arrive on Robinhood Chain from other networks." },
              { href: "/learn", title: "Oracles", body: "Price feeds for ETH and equities, read on-chain by contracts that need a mark price." },
              { href: "/use-cases/tokenization", title: "Tokenization", body: "Asset controls and issuance patterns for real-world value." },
              { href: "/developers", title: "RPC providers", body: "The public endpoint, a second public fallback, and private endpoints for production load." },
            ]}
          />
        </div>
      </Section>

      <CtaBand
        title="Building something on Gleo?"
        body="Tell us what you are working on. Builder grants open with the first round, and early projects get a direct line to the team."
        actions={
          <>
            <ButtonLink href="/grants" variant="fog">
              Grants and funding
            </ButtonLink>
            <ButtonLink href="/community" variant="line" className="border-fog/30 text-fog hover:border-fog">
              Join the community
            </ButtonLink>
          </>
        }
      />
    </>
  );
}
