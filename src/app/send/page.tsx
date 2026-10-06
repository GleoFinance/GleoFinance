import { AppFrame } from "@/components/app/AppFrame";
import { SendTool } from "@/components/app/SendTool";
import { ToolGuide } from "@/components/app/ToolGuide";
import { pageMeta } from "@/lib/seo";

const description =
  "Send USDG or ETH to any Robinhood Chain address from your own wallet. Gleo checks the address and balance and shows the real fee before you sign. Try it now.";

export const metadata = pageMeta({
  path: "/send",
  title: "Send USDG or ETH on Robinhood Chain From Your Wallet",
  description,
  keywords: ["send USDG", "Robinhood Chain transfer", "USDG payment", "send ETH Robinhood Chain"],
});

export default function SendPage() {
  return (
    <AppFrame
      status="live"
      eyebrow="Payments"
      path="/send"
      crumb="Send"
      description={description}
      title="Send USDG on Robinhood Chain"
      lead={
        <p>
          Send USDG on Robinhood Chain, or ETH if you prefer, to any address from the wallet you already use. Gleo checks the address,
          re-reads your balance, estimates the fee for this exact transfer and dry-runs it before your wallet opens. Nothing moves until you
          confirm in the wallet.
        </p>
      }
      guide={
        <ToolGuide
          eyebrow="How sending works"
          title="A USDG transfer, step by step"
          lead="Send is a thin, careful layer over a normal token transfer. Gleo never holds your funds and never sees your keys; it only prepares the transaction your wallet signs."
          points={[
            { title: "Address check", body: "The recipient is checked for a valid checksum, so a typo is caught before anything is signed." },
            { title: "Real fee, priced live", body: "Gas is estimated for this transfer and priced with the current ETH rate, then shown in dollars." },
            { title: "Dry run first", body: "The transfer is simulated against the latest block just before your wallet opens. If it would fail, you see why." },
            { title: "Receipt on the explorer", body: "Once the block lands you get a link to the transaction on the public block explorer." },
          ]}
          related={[
            { href: "/network", title: "Live network stats", body: "Block time, gas price and the dollar cost of a transfer right now.", label: "Open network stats" },
            { href: "/use-cases/payments", title: "Cross-border payments", body: "Why stablecoin transfers suit remittances, payroll and supplier invoices.", label: "Read the payments guide" },
            { href: "/anchors", title: "Cash in and cash out", body: "How anchors could turn local currency into USDG and back, in practice mode.", label: "Try the anchors practice" },
          ]}
        />
      }
    >
      <SendTool />
    </AppFrame>
  );
}
