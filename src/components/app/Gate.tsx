"use client";

import { ArrowUpRight } from "lucide-react";
import { CHAIN } from "@/config/brand";
import { useWalletModal } from "@/components/wallet/WalletButton";
import { useWallet } from "@/components/wallet/WalletProvider";

/**
 * Shows a connect or switch-network prompt until the wallet is ready, then
 * renders the children. `needsChain` is false for tools that only sign.
 */
export function Gate({ children, needsChain = true, what }: { children: React.ReactNode; needsChain?: boolean; what: string }) {
  const { address, chainId, onRobinhoodChain, switchNetwork, switching } = useWallet();
  const { open } = useWalletModal();
  if (!address) {
    return (
      <div className="border border-line bg-paper p-6 sm:p-8">
        <p className="font-display text-[24px] leading-[1.2] tracking-[-0.02em]">Connect a wallet to {what}</p>
        <p className="mt-3 max-w-lg text-[16px] leading-relaxed text-ink-2">
          Any EVM wallet that can add a custom network will do. Connecting shares your address and nothing else, and {CHAIN.name} is
          added to the wallet if it is not there yet.
        </p>
        <button type="button" onClick={open} className="pill pill-ink mt-6" data-testid="gate-connect">
          Connect wallet
          <span className="pill-disc">
            <ArrowUpRight className="size-4" />
          </span>
        </button>
      </div>
    );
  }
  if (needsChain && chainId !== null && !onRobinhoodChain) {
    return (
      <div className="border border-down bg-down-soft p-6 sm:p-8">
        <p className="font-display text-[24px] leading-[1.2] tracking-[-0.02em]">Wrong network</p>
        <p className="mt-3 text-[16px] leading-relaxed text-ink-2">
          Your wallet is on chain {chainId}. Switch it to {CHAIN.name} (chain id {CHAIN.id}) to {what}.
        </p>
        <button type="button" onClick={switchNetwork} disabled={switching} className="btn btn-ink mt-6 h-11 px-6">
          {switching ? "Confirm in wallet…" : `Switch to ${CHAIN.name}`}
        </button>
      </div>
    );
  }
  return <>{children}</>;
}
