import type { Metadata } from "next";
import { AppFrame } from "@/components/app/AppFrame";
import { NetworkPanel } from "@/components/app/NetworkPanel";

export const metadata: Metadata = {
  title: "Live network",
  description: "Block time, latest block, gas price and the dollar cost of a transfer on Robinhood Chain, read live.",
};

export default function NetworkPage() {
  return (
    <AppFrame
      status="live"
      title="The network, right now"
      lead="Every number on this page is read from Robinhood Chain through Gleo's server a few seconds ago. Fees are priced with the live ETH rate from OKX. Nothing here is an average we typed in."
    >
      <NetworkPanel />
    </AppFrame>
  );
}
