"use client";

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
      <div className="rounded-2xl border border-dashed border-line-2 bg-card p-6">
        <p className="font-display text-xl font-semibold">Connect a wallet to {what}</p>
        <p className="mt-2 max-w-lg text-[15px] text-ink-2">
          Any EVM wallet that can add a network works. Connecting shares your address only; {CHAIN.name} is added to the wallet if it is missing.
        </p>
        <button type="button" onClick={open} className="btn btn-ink mt-5 h-11 px-5" data-testid="gate-connect">
          Connect wallet
        </button>
      </div>
    );
  }
  if (needsChain && chainId !== null && !onRobinhoodChain) {
    return (
      <div className="rounded-2xl border border-down/40 bg-down-soft p-6">
        <p className="font-display text-xl font-semibold">Wrong network</p>
        <p className="mt-2 text-[15px] text-ink-2">
          Your wallet is on chain {chainId}. Switch it to {CHAIN.name} (chain id {CHAIN.id}) to {what}.
        </p>
        <button type="button" onClick={switchNetwork} disabled={switching} className="btn btn-accent mt-5 h-11 px-5">
          {switching ? "Confirm in wallet…" : `Switch to ${CHAIN.name}`}
        </button>
      </div>
    );
  }
  return <>{children}</>;
}
