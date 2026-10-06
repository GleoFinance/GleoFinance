import type { Metadata } from "next";
import { AppFrame } from "@/components/app/AppFrame";
import { AssetTable } from "@/components/app/AssetTable";

export const metadata: Metadata = {
  title: "Asset explorer",
  description: "Tokenized stocks, funds and dollars already live on Robinhood Chain, each verified on-chain, with live supply and prices.",
};

export default function AssetsPage() {
  return (
    <AppFrame
      status="live"
      title="Tokenized assets, already on-chain"
      lead="These real-world assets exist on Robinhood Chain today. Gleo checks each contract on-chain before listing it and reads supply live, so what you see is what the ledger holds."
    >
      <AssetTable />
    </AppFrame>
  );
}
