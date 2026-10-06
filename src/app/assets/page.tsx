import { AppFrame } from "@/components/app/AppFrame";
import { AssetTable } from "@/components/app/AssetTable";
import { ToolGuide } from "@/components/app/ToolGuide";
import { pageMeta } from "@/lib/seo";

const description =
  "Browse tokenized stocks, ETFs and USDG on Robinhood Chain. Gleo verifies each contract on-chain and shows live supply, price and pool depth. Explore the list.";

export const metadata = pageMeta({
  path: "/assets",
  title: "Tokenized Stocks on Robinhood Chain, Verified Live",
  description,
  keywords: ["tokenized stocks Robinhood Chain", "stock tokens", "tokenized ETF", "USDG supply"],
});

export default function AssetsPage() {
  return (
    <AppFrame
      status="live"
      eyebrow="Asset explorer"
      path="/assets"
      crumb="Assets"
      description={description}
      title="Tokenized stocks on Robinhood Chain"
      lead={
        <p>
          The tokenized stocks and funds below already exist on Robinhood Chain, next to USDG and wrapped ether. Gleo checks every contract
          on-chain before listing it and reads supply live, so the table shows what the ledger holds rather than a list someone typed up.
        </p>
      }
      guide={
        <ToolGuide
          eyebrow="How assets are verified"
          title="Telling a real stock token from a look-alike"
          lead="Anyone can deploy a token called AAPL. Gleo lists a stock token only when three on-chain checks pass, and rejects contracts that merely borrow a ticker."
          points={[
            { title: "Beacon proxy", body: "The contract must be a proxy pointing to the chain's official stock-token beacon." },
            { title: "Symbol matches", body: "symbol() must return the ticker the asset is listed under." },
            { title: "Name suffix", body: "name() must end with the issuer's standard suffix for stock tokens." },
          ]}
          related={[
            { href: "/use-cases/tokenization", title: "Asset tokenization", body: "How funds, bonds and invoices become tokens with rules attached.", label: "Read the tokenization guide" },
            { href: "/lend", title: "Lend and borrow", body: "Practice borrowing against tokenized stocks at live prices.", label: "Try lending practice" },
            { href: "/pools", title: "Liquidity pools", body: "Practice swaps and liquidity against stock tokens seeded at market prices.", label: "Try pools practice" },
          ]}
        />
      }
    >
      <AssetTable />
    </AppFrame>
  );
}
