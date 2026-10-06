import type { Metadata } from "next";
import { AppFrame } from "@/components/app/AppFrame";
import { AnchorsTool } from "@/components/app/AnchorsTool";

export const metadata: Metadata = {
  title: "Anchors (practice)",
  description: "Cash in and cash out between local currencies and USDG through anchors. Practice mode with reference FX rates; no money moves.",
};

export default function AnchorsPage() {
  return (
    <AppFrame
      status="practice"
      title="Anchors: cash in, cash out"
      lead="Anchors are the regulated businesses that take local money and hand out tokens, or the reverse. This page shows how a Gleo corridor works end to end, from quote to reference number."
    >
      <AnchorsTool />
    </AppFrame>
  );
}
