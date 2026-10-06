import type { Metadata } from "next";
import { AppFrame } from "@/components/app/AppFrame";
import { PoolsTool } from "@/components/app/PoolsTool";

export const metadata: Metadata = {
  title: "Pools (practice)",
  description: "Swap and provide liquidity in constant-product pools seeded at live prices. Practice mode: signed receipts, no transactions.",
};

export default function PoolsPage() {
  return (
    <AppFrame
      status="practice"
      title="Pools"
      lead="Trade USDG against tokenized assets, or provide liquidity and earn the fee. Each pool is seeded at the live market price, then moves only with your own signed trades."
    >
      <PoolsTool />
    </AppFrame>
  );
}
