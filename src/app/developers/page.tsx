import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BRAND, CHAIN } from "@/config/brand";
import { USDG, WETH } from "@/config/assets.generated";
import { CopyBlock } from "./CopyBlock";
import { ButtonLink, Container, CtaBand, Faq, Section, SectionHead, Tag } from "@/components/ui";

export const metadata: Metadata = {
  title: "Developers",
  description: "The Gleo developer hub: who builds what, a map of the docs, Robinhood Chain network details and read-only public endpoints.",
};

const ROLES = [
  { title: "Asset issuers", body: "Put a fund, a deposit or a commodity on-chain with holder rules.", href: "/use-cases/tokenization" },
  { title: "Contract developers", body: "Write Solidity that moves USDG and tokenized assets.", href: "/smart-contracts" },
  { title: "Ramp operators", body: "Run an anchor that swaps cash for tokens and back.", href: "/use-cases/ramps" },
  { title: "App teams", body: "Add payments and asset access to a wallet or fintech product.", href: "/fintechs" },
  { title: "Infrastructure", body: "Run RPC, indexing or custody for the network.", href: "/ecosystem/service-providers" },
  { title: "Analysts", body: "Read the chain: supply, fees, blocks and assets.", href: "/network" },
];

const MAP = [
  { group: "Build", links: [["/smart-contracts", "Smart contracts"], ["/send", "Payment flow, working"], ["/swap", "Swap through Pons"]] },
  { group: "Learn", links: [["/learn/intro", "What is Gleo"], ["/learn", "Guides"], ["/blog", "Journal"]] },
  { group: "Tokens", links: [["/assets", "Asset explorer"], ["/tokenize", "Issuer console (practice)"], ["/use-cases/tokenization", "Tokenization"]] },
  { group: "Data", links: [["/network", "Live network panel"], ["/api/network", "/api/network JSON"], ["/api/assets", "/api/assets JSON"]] },
  { group: "Tools", links: [["/products", "Products and tools"], ["/ecosystem", "Ecosystem"], [CHAIN.explorer, "Blockscout explorer"]] },
  { group: "Networks", links: [["#network", "Network details"], ["/faq", "Adding the network"], ["/grants/bug-bounty", "Bug bounty"]] },
];

const NETWORK = `Network name:   ${CHAIN.name}
Chain ID:       ${CHAIN.id} (${CHAIN.hex})
Currency:       ${CHAIN.nativeSymbol} (18 decimals)
RPC:            ${CHAIN.publicRpc}
RPC fallback:   ${CHAIN.fallbackRpc}
Explorer:       ${CHAIN.explorer}
USDG:           ${USDG.address} (${USDG.decimals} decimals)
WETH:           ${WETH.address} (${WETH.decimals} decimals)`;

const RELAY = `curl -s ${BRAND.url}/api/rpc \\
  -H 'content-type: application/json' \\
  -d '{"jsonrpc":"2.0","id":1,"method":"eth_blockNumber","params":[]}'`;

export default function DevelopersPage() {
  return (
    <>
      <section className="meridians-night bg-night text-fog">
        <Container className="py-16 sm:py-24">
          <h1 className="max-w-4xl font-display text-[clamp(2.4rem,5.4vw,4.6rem)] leading-[0.98] font-bold tracking-[-0.03em]">
            The developer hub
          </h1>
          <p className="mt-6 max-w-2xl text-[18px] leading-relaxed text-fog-2">
            Gleo is plain EVM on {CHAIN.name}. Start with the role closest to yours, use the map to find the right page, and copy the network details
            straight into your config.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/smart-contracts" variant="fog">
              Smart contracts
            </ButtonLink>
            <ButtonLink href="#network" variant="line" className="border-fog/30 text-fog hover:border-fog">
              Network details
            </ButtonLink>
          </div>
        </Container>
      </section>

      <Section>
        <SectionHead title="Gleo for…" lead="Six common starting points. Each one opens the page that matters most for that job." />
        <ul className="mt-10 grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
          {ROLES.map((r) => (
            <li key={r.title} className="min-w-0 border-t border-line-2">
              <Link href={r.href} className="group block h-full py-6">
                <span className="flex items-center justify-between gap-3 font-display text-xl font-semibold">
                  {r.title}
                  <ArrowRight className="size-4 shrink-0 text-ink-3 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="mt-2 block text-[15px] leading-relaxed text-ink-2">{r.body}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="card">
        <SectionHead title="Find your way around" lead="Every page on this site that a developer is likely to need, grouped the way you would look for it." />
        <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {MAP.map((m) => (
            <div key={m.group} className="min-w-0">
              <h3 className="font-mono text-[12px] tracking-[0.08em] text-ink-3 uppercase">{m.group}</h3>
              <ul className="mt-3 space-y-2">
                {m.links.map(([href, label]) => (
                  <li key={href}>
                    {/^https?:|^\/api\//.test(href) ? (
                      <a href={href} target="_blank" rel="noreferrer" className="text-[16px] font-semibold text-ink underline-offset-4 hover:underline">
                        {label}
                      </a>
                    ) : (
                      <Link href={href} className="text-[16px] font-semibold text-ink underline-offset-4 hover:underline">
                        {label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section id="network">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="min-w-0">
            <h2 className="font-display text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.05] font-bold tracking-[-0.02em]">Network details</h2>
            <p className="mt-5 text-[17px] leading-relaxed text-ink-2">
              Everything a wallet, script or contract test needs. The connect button on this site adds the network for you; this block is for
              tools that ask for it by hand.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-2">
              The public RPC is rate-limited and meant for development. For production traffic, use a private endpoint from an RPC provider.
            </p>
          </div>
          <CopyBlock label="Robinhood Chain mainnet" text={NETWORK} />
        </div>
      </Section>

      <Section tone="card">
        <SectionHead
          title="Public read-only endpoints"
          lead="The same endpoints this site uses. They only read; nothing here can sign or send a transaction. Please keep request rates modest."
        />
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="min-w-0 space-y-6">
            {[
              ["POST /api/rpc", "JSON-RPC relay with a method allowlist (reads, gas estimates, receipts). eth_getLogs needs numeric hex fromBlock and toBlock, at most 20,000 blocks apart. Up to 20 calls per batch."],
              ["GET /api/network", "One snapshot: latest block, average block time, gas price, ETH price, the cost of an ETH and a USDG transfer in dollars, USDG supply and the last eight blocks."],
              ["GET /api/assets", "Tokenized assets verified on-chain, with live supply and the last DEX price where the token is the base side of the pool."],
            ].map(([t, b]) => (
              <div key={t} className="min-w-0 border-t border-line-2 pt-5">
                <p className="flex flex-wrap items-center gap-2 font-mono text-[14px] font-semibold">
                  {t} <Tag tone="live" />
                </p>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{b}</p>
              </div>
            ))}
          </div>
          <CopyBlock label="Try the relay" text={RELAY} />
        </div>
      </Section>

      <Section>
        <SectionHead title="Developer resources" />
        <div className="mt-8">
          <Faq
            items={[
              { q: "Where do I ask questions?", a: <>Post on X and tag {BRAND.xHandle}, or send a direct message. A developer channel opens alongside the first grants round.</> },
              { q: "Is there an SDK?", a: "Not yet. Gleo Contracts will publish ABIs and a small TypeScript client when they deploy. Until then, any EVM library works against the chain directly." },
              { q: "Where is the source for this site?", a: "The public repository is published once the code is cleaned up for release. Its link will appear in the footer." },
              { q: "How do I report a vulnerability?", a: <>See the <Link href="/grants/bug-bounty" className="underline">bug bounty page</Link>. Please do not post security issues in public.</> },
            ]}
          />
        </div>
      </Section>

      <CtaBand
        title="Ship a payment flow today"
        body="The send tool on this site is a working reference: address checks, balance checks, fee estimate, confirmation and an explorer link."
        actions={
          <ButtonLink href="/send" variant="fog">
            Open the send tool
          </ButtonLink>
        }
      />
    </>
  );
}
