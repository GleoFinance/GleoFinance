import type { Metadata } from "next";
import { AppFrame } from "@/components/app/AppFrame";
import { SendTool } from "@/components/app/SendTool";

export const metadata: Metadata = {
  title: "Send a payment",
  description: "Send USDG or ETH to any address on Robinhood Chain from your own wallet, with the fee shown before you sign.",
};

export default function SendPage() {
  return (
    <AppFrame
      status="live"
      title="Send a payment"
      lead="Move USDG or ETH to any address on Robinhood Chain. The address is checked, the fee is estimated for this exact transfer, and nothing leaves your wallet until you confirm it there."
    >
      <SendTool />
    </AppFrame>
  );
}
