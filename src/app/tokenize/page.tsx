import type { Metadata } from "next";
import { AppFrame } from "@/components/app/AppFrame";
import { TokenizeTool } from "@/components/app/TokenizeTool";

export const metadata: Metadata = {
  title: "Tokenize an asset (practice)",
  description: "Issue a real-world asset with holder approval, freeze and clawback, and exercise each control. Practice mode: signed receipts, no transactions.",
};

export default function TokenizePage() {
  return (
    <AppFrame
      status="practice"
      title="Issuer console"
      lead="Describe an asset, choose the controls it carries for life, then approve holders, transfer, freeze and claw back the way a regulated issuer would. Every action is signed by your wallet."
    >
      <TokenizeTool />
    </AppFrame>
  );
}
