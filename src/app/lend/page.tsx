import type { Metadata } from "next";
import { AppFrame } from "@/components/app/AppFrame";
import { LendTool } from "@/components/app/LendTool";

export const metadata: Metadata = {
  title: "Lend and borrow (practice)",
  description: "Supply and borrow against tokenized stocks, ETH and USDG at live prices. Practice mode: signed receipts, no transactions.",
};

export default function LendPage() {
  return (
    <AppFrame
      status="practice"
      title="Lend and borrow"
      lead="Supply an asset, borrow against it, and watch your health factor move with live prices. The rules match the money market Gleo plans to deploy."
    >
      <LendTool />
    </AppFrame>
  );
}
