import type { Metadata } from "next";
import { BRAND, CHAIN } from "@/config/brand";
import { LongForm } from "@/components/ui";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "What the Gleo website collects, what stays in your browser, and which third parties it talks to.",
};

export default function PrivacyPolicyPage() {
  return (
    <LongForm
      title="Privacy policy"
      updated="October 5, 2026"
      lead={`This policy covers the website at ${BRAND.domain}. It is short because the site collects very little.`}
    >
      <h2>Overview</h2>
      <p>
        There are no accounts, no sign-up forms and no email list on this site. You can read every page without giving us anything. Connecting a
        wallet is optional and only shares your public address with your own browser session.
      </p>
      <h2>How information is collected</h2>
      <ul>
        <li>
          <strong>Wallet address.</strong> When you connect, the page reads your address and network from your wallet. Your address is public on{" "}
          {CHAIN.name} by nature; we do not store it on our servers.
        </li>
        <li>
          <strong>Transactions you send.</strong> Payments and swaps are signed by your wallet and sent to the chain, where they are public and
          permanent. We cannot hide or delete them.
        </li>
        <li>
          <strong>Server logs.</strong> Our hosting provider keeps standard request logs (IP address, time, page requested) for security and
          debugging, for a limited period.
        </li>
      </ul>
      <h2>What stays in your browser</h2>
      <p>
        The site uses your browser&rsquo;s local storage for a few conveniences: the wallet you last connected, practice-mode receipts (the signed
        messages from the tokenize, anchors, lend and pools tools), and small display preferences. They never leave your device unless you ask the
        site to verify a receipt, and you can clear them at any time in your browser settings.
      </p>
      <h2>How information is used</h2>
      <p>Only to run the site: show your balance, estimate fees, prepare transactions for your wallet, and keep the service secure.</p>
      <h2>How information is shared</h2>
      <p>
        To show live data, our server makes requests to third parties on your behalf: Robinhood Chain RPC endpoints for chain reads, OKX and
        CoinGecko for the ETH price, and Dexscreener for asset prices. These requests come from our server, not from your browser, and do not
        include your wallet address unless the read is about your address (for example, a balance check through the RPC relay). If you use
        WalletConnect, its relay service handles the connection between this site and your phone wallet.
      </p>
      <h2>Advertising and analytics</h2>
      <p>The site runs no advertising and no analytics cookies. If that changes, this policy will be updated first and the change will say so.</p>
      <h2>Third-party links and tools</h2>
      <p>Links to the explorer, Pons, X and other sites take you to services with their own privacy policies.</p>
      <h2>International visitors</h2>
      <p>The site can be reached from anywhere. Server requests may be processed in countries other than yours.</p>
      <h2>Retention</h2>
      <p>Server logs are kept only as long as the hosting provider needs them. Everything in local storage stays until you clear it.</p>
      <h2>Your choices</h2>
      <p>Do not connect a wallet if you only want to read. Disconnect at any time from the address menu. Clear site data to remove local receipts.</p>
      <h2>Changes to this policy</h2>
      <p>Changes are posted on this page with a new date. Significant changes are also announced on X.</p>
      <h2>Contact</h2>
      <p>
        Questions about privacy: direct message <a href={BRAND.x}>{BRAND.xHandle}</a> on X.
      </p>
    </LongForm>
  );
}
