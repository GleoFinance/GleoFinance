import { AppFrame } from "@/components/app/AppFrame";
import { PoolsTool } from "@/components/app/PoolsTool";
import { ToolGuide } from "@/components/app/ToolGuide";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  path: "/pools",
  title: "Liquidity Pools for Tokenized Stocks and USDG",
  description:
    "Practice swaps and liquidity in USDG pools for tokenized stocks, seeded at live Robinhood Chain prices, with price impact and the 0.30% fee shown. Try a trade.",
  keywords: ["liquidity pools tokenized stocks", "AMM", "USDG pool", "provide liquidity"],
});

export default function PoolsPage() {
  return (
    <AppFrame
      status="practice"
      eyebrow="Pools"
      path="/pools"
      crumb="Pools"
      title="Liquidity pools for tokenized stocks"
      lead={
        <p>
          Trade USDG against tokenized stocks in practice liquidity pools, or add liquidity and earn the trading fee. Each pool starts at the
          live market price on Robinhood Chain and then moves only with your own signed trades, so you can see price impact for yourself.
        </p>
      }
      guide={
        <ToolGuide
          eyebrow="How the pools price trades"
          title="Constant product, explained briefly"
          lead="Each pool holds two assets and keeps the product of their reserves constant. A trade changes the ratio, and the ratio is the price."
          points={[
            { title: "Price impact", body: "Bigger trades move the ratio further, so the average price you get gets worse with size." },
            { title: "Trading fee", body: "Every swap pays 0.30% to the pool, shared among liquidity providers by their share." },
            { title: "Your share", body: "Adding liquidity mints pool shares; removing them returns both assets at the current ratio." },
          ]}
          related={[
            { href: "/use-cases/defi", title: "DeFi on Gleo", body: "Where pools fit next to lending and exchange.", label: "Read the DeFi guide" },
            { href: "/lend", title: "Lend and borrow", body: "Practice borrowing against tokenized stocks at live prices.", label: "Try lending practice" },
            { href: "/swap", title: "Swap $GLEO", body: "The live swap for the Gleo token through Pons.", label: "Open the swap" },
          ]}
        />
      }
    >
      <PoolsTool />
    </AppFrame>
  );
}
