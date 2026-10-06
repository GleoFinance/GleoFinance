import type { Metadata } from "next";
import { BRAND } from "@/config/brand";
import { SwapScreen } from "@/components/swap/SwapScreen";

export const metadata: Metadata = {
  title: `Swap ${BRAND.symbol}`,
  description: `Buy or sell ${BRAND.symbol} with ETH on Robinhood Chain through Pons, straight from your wallet.`,
};

export default function SwapPage() {
  return <SwapScreen />;
}
