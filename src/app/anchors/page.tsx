import { AppFrame } from "@/components/app/AppFrame";
import { AnchorsTool } from "@/components/app/AnchorsTool";
import { ToolGuide } from "@/components/app/ToolGuide";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  path: "/anchors",
  title: "USDG On and Off-Ramp Anchors: Practice Corridors",
  description:
    "See how a USDG on and off-ramp works: pick a currency, get a quote at reference FX rates and sign a practice deposit or withdrawal. No money moves. Try it.",
  keywords: ["USDG on-ramp", "USDG off-ramp", "stablecoin anchors", "cash in cash out"],
});

export default function AnchorsPage() {
  return (
    <AppFrame
      status="practice"
      eyebrow="Anchors"
      path="/anchors"
      crumb="Anchors"
      title="Cash in and cash out of USDG through anchors"
      lead={
        <p>
          A USDG on and off-ramp needs an anchor: a licensed business that takes local money and hands out tokens, or the reverse. This page
          walks a Gleo corridor end to end, from quote to reference number, using reference exchange rates. No partner is live yet, so every
          transfer here is a signed practice receipt.
        </p>
      }
      guide={
        <ToolGuide
          eyebrow="How anchors fit in"
          title="From local cash to USDG and back"
          lead="Anchors are partners, not contracts. Gleo's part is the registry and the flow your wallet sees; the licensed partner handles the money."
          points={[
            { title: "Quote", body: "You choose a currency and amount and see the rate and fee before anything happens." },
            { title: "Identity check", body: "The anchor runs its own checks, as its licence requires. Gleo does not collect your documents." },
            { title: "Settlement", body: "Cash moves on a local rail; USDG moves on Robinhood Chain to or from your wallet." },
          ]}
          related={[
            { href: "/use-cases/ramps", title: "On and off-ramps", body: "Why ramps decide whether a payment network is useful day to day.", label: "Read the ramps guide" },
            { href: "/send", title: "Send USDG", body: "Move USDG to any address from your own wallet, live.", label: "Open Send" },
            { href: "/ecosystem/service-providers", title: "Service providers", body: "The kinds of partners Gleo works with to reach local money.", label: "See service providers" },
          ]}
        />
      }
    >
      <AnchorsTool />
    </AppFrame>
  );
}
