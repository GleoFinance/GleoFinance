import Link from "next/link";
import { BRAND, CHAIN } from "@/config/brand";
import { LongForm } from "@/components/ui";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  path: "/terms-of-service",
  title: "Terms of Service for the Website and App Tools",
  description:
    "The terms for using the Gleo website and its payment, swap and practice tools on Robinhood Chain: eligibility, risks, your wallet and our limits. Read first.",
  keywords: ["terms of service", "terms of use", "crypto risk disclosure", "Gleo app terms", "Robinhood Chain"],
});

export default function TermsPage() {
  return (
    <LongForm
      eyebrow="Legal"
      title="Gleo terms of service"
      updated="October 6, 2026"
      lead={
        <p>
          These Gleo terms of service apply when you use {BRAND.domain} and its tools. By using the site you agree to them.
        </p>
      }
    >
      <h2>Eligibility</h2>
      <p>You must be old enough to enter a binding contract where you live, and you must not be barred from using the services by sanctions or other law.</p>
      <h2>Privacy</h2>
      <p>
        How the site handles information is described in the <Link href="/privacy-policy">privacy policy</Link>, which is part of these terms.
      </p>
      <h2>What the site is</h2>
      <p>
        The site is an interface. It reads public data from {CHAIN.name} and prepares transactions that your own wallet signs and sends. Gleo never
        holds your funds or your keys and cannot move, freeze or recover anything in your wallet.
      </p>
      <h2>When the site changes</h2>
      <p>We may add, change or remove features at any time, including moving a practice tool to a live one or the other way round.</p>
      <h2>Use of the network</h2>
      <p>
        Transactions on {CHAIN.name} are public and final. You are responsible for checking the recipient, amount and network before you sign. Fees
        are paid to the network, not to Gleo, and can change.
      </p>
      <h2>Practice mode</h2>
      <p>
        Tools marked Practice do not send transactions and do not create, lend, borrow or exchange anything real. Their receipts are signed
        messages with no value and no claim on anything.
      </p>
      <h2>The {BRAND.symbol} token</h2>
      <p>
        {BRAND.symbol} is a digital token with no promise of value, return or redemption. Its price can fall to nothing. Nothing on the site is an
        offer to sell securities or investment advice. Swaps go through third-party contracts (Pons and Uniswap) that Gleo does not control.
      </p>
      <h2>Regulatory acknowledgements</h2>
      <p>You are responsible for following the laws that apply to you, including tax and reporting rules for the assets you hold and move.</p>
      <h2>Reliance on information</h2>
      <p>
        Live figures are read from public sources and may be delayed or wrong. Figures marked Design target are goals, not measurements. Do not
        rely on any of them as the only basis for a decision.
      </p>
      <h2>Third-party resources</h2>
      <p>Wallets, the explorer, price feeds, Pons, Uniswap and other services are run by others under their own terms.</p>
      <h2>Prohibited use</h2>
      <ul>
        <li>Using the site for money laundering, sanctions evasion, fraud or financing harm.</li>
        <li>Attacking the site or its public endpoints, or using them beyond reasonable rates.</li>
        <li>Pretending to be Gleo or misusing the brand (see the <Link href="/brand-policy">brand policy</Link>).</li>
      </ul>
      <h2>Intellectual property</h2>
      <p>The site design, text and brand belong to Gleo. Source code published in a public repository is licensed under that repository&rsquo;s licence.</p>
      <h2>Disclaimer of warranties</h2>
      <p>The site and its tools are provided as they are, without warranties of any kind, to the fullest extent the law allows.</p>
      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent the law allows, Gleo is not liable for indirect or consequential losses, or for losses caused by your wallet, the
        network, third-party contracts, or transactions you signed.
      </p>
      <h2>Indemnification</h2>
      <p>You agree to cover losses Gleo suffers because you broke these terms or the law while using the site.</p>
      <h2>Disputes</h2>
      <p>Before any formal claim, contact us and give us thirty days to try to resolve the issue informally.</p>
      <h2>Severability and entire agreement</h2>
      <p>If part of these terms cannot be enforced, the rest still applies. These terms and the policies they link to are the whole agreement about using the site.</p>
      <h2>Contact</h2>
      <p>
        Direct message <a href={BRAND.x}>{BRAND.xHandle}</a> on X.
      </p>
    </LongForm>
  );
}
