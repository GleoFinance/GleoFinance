import { AppFrame } from "@/components/app/AppFrame";
import { NetworkPanel } from "@/components/app/NetworkPanel";
import { ToolGuide } from "@/components/app/ToolGuide";
import { pageMeta } from "@/lib/seo";

const description =
  "Live Robinhood Chain network stats: latest block, block time, gas price and the dollar cost of a USDG or ETH transfer, read every few seconds. Check them now.";

export const metadata = pageMeta({
  path: "/network",
  title: "Robinhood Chain Network Stats: Blocks, Gas and Fees",
  description,
  keywords: ["Robinhood Chain network stats", "Robinhood Chain gas price", "block time", "transaction fee"],
});

export default function NetworkPage() {
  return (
    <AppFrame
      status="live"
      eyebrow="Network"
      path="/network"
      crumb="Network"
      description={description}
      title="Robinhood Chain network stats, live"
      lead={
        <p>
          These Robinhood Chain network stats are read from the chain through Gleo&apos;s server a few seconds ago. Fees are priced with the
          live ETH rate from OKX. No figure on this page is typed in by hand, and each one can be checked on the public block explorer.
        </p>
      }
      guide={
        <ToolGuide
          eyebrow="Where the numbers come from"
          title="How Gleo reads the chain"
          lead="Each reading is a standard JSON-RPC call to Robinhood Chain, cached for a few seconds on the server so every visitor sees the same snapshot."
          points={[
            { title: "Block and block time", body: "The latest block number, and the average time between the last 120 blocks." },
            { title: "Gas and fees", body: "eth_gasPrice times a gas estimate for a real transfer, converted to dollars at the live ETH price." },
            { title: "USDG supply", body: "totalSupply() of the USDG contract, divided by its six decimals." },
          ]}
          related={[
            { href: "/send", title: "Send a payment", body: "Use the fee you see here on a real USDG or ETH transfer from your wallet.", label: "Open Send" },
            { href: "/assets", title: "Tokenized stocks on-chain", body: "Every stock token Gleo has verified on Robinhood Chain, with live supply.", label: "Browse the assets" },
            { href: "/developers", title: "Developer hub", body: "RPC endpoints, chain id and contract notes for building on Gleo.", label: "Open the developer hub" },
          ]}
        />
      }
    >
      <NetworkPanel />
    </AppFrame>
  );
}
