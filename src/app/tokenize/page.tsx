import { AppFrame } from "@/components/app/AppFrame";
import { TokenizeTool } from "@/components/app/TokenizeTool";
import { ToolGuide } from "@/components/app/ToolGuide";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  path: "/tokenize",
  title: "Tokenize Real-World Assets: Issuer Console Practice",
  description:
    "Practice tokenizing a real-world asset with holder approval, freeze and clawback, then run each control yourself. Signed receipts only, no funds move. Try it.",
  keywords: ["tokenize real-world assets", "asset issuance", "freeze and clawback", "holder approval"],
});

export default function TokenizePage() {
  return (
    <AppFrame
      status="practice"
      eyebrow="Issuer console"
      path="/tokenize"
      crumb="Tokenize"
      title="Tokenize a real-world asset with built-in controls"
      lead={
        <p>
          Tokenize a real-world asset the way a regulated issuer would: describe it, pick the controls it carries for life, then approve
          holders, transfer, freeze and claw back. Each action is signed by your wallet as a free practice receipt; nothing is deployed and
          no funds move.
        </p>
      }
      guide={
        <ToolGuide
          eyebrow="How issuance will work"
          title="Controls that travel with the asset"
          lead="The console mirrors the GleoAsset contract that is designed but not yet deployed or audited. The rules below are the ones it will enforce."
          points={[
            { title: "Chosen at issue", body: "Holder approval, freeze and clawback are switched on when the asset is created and cannot be added later." },
            { title: "Holder approval", body: "Only approved addresses can receive the asset, the usual requirement for funds and securities." },
            { title: "Freeze", body: "The issuer can stop one holder's balance from moving, for example during a court order." },
            { title: "Clawback", body: "The issuer can pull tokens back from a holder, recorded on-chain for anyone to audit." },
          ]}
          related={[
            { href: "/use-cases/tokenization", title: "Asset tokenization", body: "Which assets suit tokenization and what issuers need in place.", label: "Read the tokenization guide" },
            { href: "/blog/asset-controls-design-notes", title: "Design notes on asset controls", body: "Why controls are fixed at issue and how they are meant to be governed.", label: "Read the design notes" },
            { href: "/institutions", title: "Gleo for institutions", body: "Issuance and around-the-clock settlement for banks and fund managers.", label: "See the institutions page" },
          ]}
        />
      }
    >
      <TokenizeTool />
    </AppFrame>
  );
}
