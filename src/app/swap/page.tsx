import { BRAND } from "@/config/brand";
import { SwapScreen } from "@/components/swap/SwapScreen";
import { ToolGuide } from "@/components/app/ToolGuide";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd, pageMeta, webAppLd } from "@/lib/seo";

const description = `Swap ${BRAND.symbol} for ETH on Robinhood Chain through Pons, with on-chain quotes that include launch fees and a trade you sign yourself. Open the swap.`;

export const metadata = pageMeta({
  path: "/swap",
  title: `Swap ${BRAND.symbol} for ETH on Robinhood Chain via Pons`,
  description,
  keywords: [`swap ${BRAND.symbol}`, `buy ${BRAND.ticker}`, "Pons launchpad", "Robinhood Chain swap"],
});

export default function SwapPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "App", path: "/app" },
            { name: "Swap", path: "/swap" },
          ]),
          webAppLd({ path: "/swap", name: `Gleo ${BRAND.symbol} swap`, description }),
        ]}
      />
      <SwapScreen />
      <ToolGuide
        eyebrow="How the swap works"
        title={`Where ${BRAND.symbol} trades and how quotes are made`}
        lead={`${BRAND.symbol} launches on Pons, a launchpad on Robinhood Chain. The swap screen talks to the same contracts Pons uses, straight from your wallet.`}
        points={[
          { title: "Bonding curve first", body: "Until the token graduates, every buy and sell goes through its Pons bonding curve." },
          { title: "Then a Uniswap v4 pool", body: "After graduation, swaps route to the token's Uniswap v4 pool on the same chain." },
          { title: "Quotes from the chain", body: "Each quote is read from the contracts with fees included, and protected by the slippage you choose." },
        ]}
        related={[
          { href: "/blog/introducing-gleo-token", title: `Introducing ${BRAND.symbol}`, body: "What the token is for and how its launch works.", label: "Read the announcement" },
          { href: "/faq", title: "Gleo FAQ", body: "Contract address, wallets, fees and practice mode, answered plainly.", label: "Read the FAQ" },
          { href: "/network", title: "Live network stats", body: "Gas price and the cost of a transaction on Robinhood Chain right now.", label: "Open network stats" },
        ]}
      />
    </>
  );
}
