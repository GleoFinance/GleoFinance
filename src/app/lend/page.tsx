import { AppFrame } from "@/components/app/AppFrame";
import { LendTool } from "@/components/app/LendTool";
import { ToolGuide } from "@/components/app/ToolGuide";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  path: "/lend",
  title: "Lend and Borrow Against Tokenized Stocks (Practice)",
  description:
    "Practice lending and borrowing against tokenized stocks, ETH and USDG at live Robinhood Chain prices and watch your health factor move. Signed receipts only.",
  keywords: ["borrow against tokenized stocks", "DeFi lending", "health factor", "USDG lending"],
});

export default function LendPage() {
  return (
    <AppFrame
      status="practice"
      eyebrow="Money market"
      path="/lend"
      crumb="Lend"
      title="Lend and borrow against tokenized stocks"
      lead={
        <p>
          Lend USDG or borrow against tokenized stocks and ETH, priced live from Robinhood Chain pools, and watch your health factor react.
          The rules match the money market Gleo plans to deploy after an external audit. Until then each action is a free signed receipt.
        </p>
      }
      guide={
        <ToolGuide
          eyebrow="How the market is designed"
          title="Collateral, rates and health"
          lead="The planned GleoMarket contract follows the familiar money-market pattern, with extra care for assets that only trade during market hours."
          points={[
            { title: "Collateral factor", body: "Each asset counts for part of its value as collateral, lower for more volatile assets." },
            { title: "Kinked rates", body: "Borrow rates rise slowly at first, then steeply once most of a pool is lent out." },
            { title: "Health factor", body: "Below 1.0 a position can be liquidated. The tool shows how close you are." },
            { title: "Stock price risk", body: "Stock prices pause outside exchange hours, so the oracle design needs staleness checks." },
          ]}
          related={[
            { href: "/use-cases/defi", title: "DeFi on Gleo", body: "Lending, pools and exchange built on tokenized real-world assets.", label: "Read the DeFi guide" },
            { href: "/assets", title: "Tokenized stocks", body: "The verified stock tokens that could serve as collateral.", label: "Browse the assets" },
            { href: "/pools", title: "Liquidity pools", body: "Practice swaps and liquidity against the same assets.", label: "Try pools practice" },
          ]}
        />
      }
    >
      <LendTool />
    </AppFrame>
  );
}
