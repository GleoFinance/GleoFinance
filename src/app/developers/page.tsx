import Link from "next/link";
import { BarChart3, Building2, Code2, Landmark, Repeat, Smartphone } from "lucide-react";
import { BRAND, CHAIN } from "@/config/brand";
import { USDG, WETH } from "@/config/assets.generated";
import { faqLd, pageMeta } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Glyph } from "@/components/glyph";
import { CopyBlock } from "./CopyBlock";
import { ButtonLink, CtaBand, Eyebrow, Faq, PageHero, Section, SectionHead, Tag, TextLink } from "@/components/ui";

export const metadata = pageMeta({
  path: "/developers",
  title: "Developer Hub for Building on Robinhood Chain",
  description:
    "Chain ID, RPC endpoints, USDG and WETH addresses, read-only APIs and a docs map for building payment apps on Robinhood Chain with Gleo. Start building today.",
  keywords: ["developer hub", "Robinhood Chain developers", "Robinhood Chain RPC", "chain id 4663", "USDG contract address", "EVM payments API"],
});

const ROLES = [
  { icon: Landmark, title: "Asset issuers", body: "Put a fund, a deposit or a commodity on-chain with holder rules attached.", href: "/use-cases/tokenization", cta: "Read the tokenization guide" },
  { icon: Code2, title: "Contract developers", body: "Write Solidity that holds and moves USDG and verified stock tokens.", href: "/smart-contracts", cta: "Start with smart contracts" },
  { icon: Repeat, title: "Ramp operators", body: "Run an anchor that swaps local cash for tokens and back again.", href: "/use-cases/ramps", cta: "See how ramps work" },
  { icon: Smartphone, title: "App teams", body: "Add dollar transfers and asset access to a wallet or fintech product.", href: "/fintechs", cta: "Payment rails for apps" },
  { icon: Building2, title: "Infrastructure teams", body: "Offer RPC, indexing or custody to projects building on the network.", href: "/ecosystem/service-providers", cta: "Service provider directory" },
  { icon: BarChart3, title: "Analysts", body: "Read supply, fees, blocks and listed assets straight from the chain.", href: "/network", cta: "Open the live network panel" },
];

const MAP: { group: string; links: [string, string][] }[] = [
  { group: "Build", links: [["/smart-contracts", "Smart contract quick start"], ["/send", "Working payment flow"], ["/swap", "Token swap through Pons"]] },
  { group: "Learn", links: [["/learn/intro", "What Gleo is"], ["/learn", "Guides from first principles"], ["/blog", "Engineering journal"]] },
  { group: "Tokens", links: [["/assets", "Verified asset explorer"], ["/tokenize", "Issuer console (practice)"], ["/use-cases/tokenization", "Tokenization use case"]] },
  { group: "Data", links: [["/network", "Live network panel"], ["/api/network", "/api/network JSON"], ["/api/assets", "/api/assets JSON"]] },
  { group: "Tools", links: [["/products", "Products and tools"], ["/ecosystem", "Ecosystem map"], [CHAIN.explorer, "Blockscout explorer"]] },
  { group: "Network", links: [["#network", "Network settings"], ["/faq", "Adding the network to a wallet"], ["/grants/bug-bounty", "Bug bounty"]] },
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

const ENDPOINTS = [
  [
    "POST /api/rpc",
    "JSON-RPC relay with a method allowlist: reads, gas estimates and receipts. eth_getLogs needs numeric hex fromBlock and toBlock no more than 20,000 blocks apart, and a batch holds at most 20 calls.",
  ],
  [
    "GET /api/network",
    "A single snapshot: latest block, average block time, gas price, ETH price, the dollar cost of an ETH and a USDG transfer, USDG supply and the last eight blocks.",
  ],
  ["GET /api/assets", "Tokenized assets verified on-chain, with live supply and the last DEX price where the token is the base side of its pool."],
];

const FAQ = [
  { q: "Where do developers ask questions?", a: `Post on X and tag ${BRAND.xHandle}, or send a direct message. A builder chat opens with the first grants round.` },
  { q: "Is there a Gleo SDK?", a: "Not yet. Gleo Contracts will ship with ABIs and a small TypeScript client when they deploy. Until then any EVM library talks to Robinhood Chain directly." },
  { q: "Where is the source code for this site?", a: "The public repository is released once the code is tidied for publication. A link will appear in the footer on that day." },
  { q: "How do I report a vulnerability?", a: "Use the bug bounty page and keep the details private until we have fixed the issue." },
];

export default function DevelopersPage() {
  return (
    <>
      <PageHero
        eyebrow="Developers"
        title="Developer hub for Robinhood Chain payments"
        lead={
          <p>
            This developer hub collects what you need to build payments on {CHAIN.name} with Gleo: network settings, contract addresses, read-only
            endpoints and a map of every technical page. Gleo is plain EVM, so the tools you already use will work.
          </p>
        }
        art="code"
        actions={
          <>
            <ButtonLink href="/smart-contracts">Smart contract quick start</ButtonLink>
            <ButtonLink href="#network" variant="line">
              Network settings
            </ButtonLink>
          </>
        }
      />

      <Section tone="night">
        <SectionHead
          dark
          split
          eyebrow="Start here"
          title="Pick the role closest to yours"
          lead="Six common starting points. Each one opens the page that matters most for that kind of work, so you skip the reading you do not need."
        />
        <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ROLES.map((r) => (
            <li key={r.title} className="flex min-w-0 flex-col border border-fog/25 bg-night-2 px-6 py-8">
              <Glyph icon={r.icon} dark />
              <h3 className="t-h3 mt-8">{r.title}</h3>
              <p className="mt-3 flex-1 text-[16px] leading-relaxed text-fog/70">{r.body}</p>
              <TextLink href={r.href} dark className="mt-6">
                {r.cta}
              </TextLink>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="gray">
        <SectionHead eyebrow="Docs map" title="Find the right developer page" lead="Every page on this site a developer is likely to need, grouped the way you would go looking for it." />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MAP.map((m) => (
            <div key={m.group} className="min-w-0 border border-line bg-paper p-8">
              <h3 className="text-[16px] font-semibold">{m.group}</h3>
              <ul className="mt-4 space-y-2">
                {m.links.map(([href, label]) => (
                  <li key={href}>
                    {/^https?:|^\/api\//.test(href) ? (
                      <a href={href} target="_blank" rel="noreferrer" className="text-[16px] text-ink-2 underline-offset-4 hover:text-ink hover:underline">
                        {label}
                      </a>
                    ) : (
                      <Link href={href} className="text-[16px] text-ink-2 underline-offset-4 hover:text-ink hover:underline">
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
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="min-w-0">
            <Eyebrow>Network settings</Eyebrow>
            <h2 className="t-h2">Robinhood Chain RPC and chain ID</h2>
            <p className="t-lead mt-6 text-ink-2">
              Everything a wallet, script or test suite asks for. The connect button on this site adds the network automatically; this block is for
              tools that want it typed in.
            </p>
            <p className="t-lead mt-4 text-ink-2">
              The public RPC is rate-limited and meant for development. Production traffic belongs on a private endpoint from an RPC provider.
            </p>
          </div>
          <CopyBlock label="Robinhood Chain mainnet" text={NETWORK} />
        </div>
      </Section>

      <Section tone="gray">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="min-w-0">
            <Eyebrow>Public endpoints</Eyebrow>
            <h2 className="t-h2">Read-only APIs behind this site</h2>
            <p className="t-lead mt-6 text-ink-2">
              The same endpoints these pages use. They only read: nothing here can sign or broadcast a transaction. Please keep request rates modest.
            </p>
            <div className="mt-8">
              <CopyBlock label="Call the relay" text={RELAY} />
            </div>
          </div>
          <ul className="min-w-0 space-y-6">
            {ENDPOINTS.map(([t, b]) => (
              <li key={t} className="min-w-0 border border-line bg-paper p-8">
                <h3 className="flex flex-wrap items-center gap-2 font-mono text-[15px] font-medium">
                  {t} <Tag tone="live" />
                </h3>
                <p className="mt-3 text-[16px] leading-relaxed text-ink-2">{b}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section>
        <JsonLd data={faqLd(FAQ)} />
        <SectionHead eyebrow="FAQs" title="Developer questions, answered" />
        <div className="mt-10">
          <Faq
            items={FAQ.map((f) =>
              f.q.startsWith("How do I report")
                ? {
                    q: f.q,
                    a: (
                      <>
                        Use the{" "}
                        <Link href="/grants/bug-bounty" className="underline underline-offset-4">
                          Gleo bug bounty program
                        </Link>{" "}
                        and keep the details private until we have fixed the issue.
                      </>
                    ),
                  }
                : f,
            )}
          />
        </div>
      </Section>

      <CtaBand
        eyebrow="Try it"
        title="Ship a USDG payment flow today"
        body="The send tool on this site is a working reference: address checks, balance checks, a fee estimate, confirmation and an explorer link."
        actions={
          <>
            <ButtonLink href="/send">Open the send tool</ButtonLink>
            <ButtonLink href="/grants" variant="line">
              Builder grants
            </ButtonLink>
          </>
        }
      />
    </>
  );
}
