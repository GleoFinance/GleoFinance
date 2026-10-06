import type { Metadata } from "next";
import Link from "next/link";
import { BRAND, CHAIN } from "@/config/brand";
import { USDG } from "@/config/assets.generated";
import { Container, CtaBand, ButtonLink, Faq, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Straight answers about Gleo: what is live, what is practice, the $GLEO contract, fees, wallets and adding Robinhood Chain.",
};

const a = (href: string, text: string) => (
  <Link href={href} className="font-semibold text-sea-deep underline underline-offset-4">
    {text}
  </Link>
);

const GROUPS: { title: string; items: { q: string; a: React.ReactNode }[] }[] = [
  {
    title: "The basics",
    items: [
      { q: "What is Gleo?", a: <>A payments, asset tokenization and DeFi network on {CHAIN.name}. It moves dollars between wallets in seconds, issues real-world assets as tokens with built-in controls, and opens markets for them. {a("/learn/intro", "Read the overview")}.</> },
      { q: "Which parts work today?", a: <>Live: sending ETH or USDG ({a("/send", "/send")}), the network panel, the asset explorer and the swap page. Practice: tokenizing, anchors, lending and pools, because the Gleo contracts they need are not deployed yet.</> },
      { q: "What does practice mode mean?", a: "You get the full interface, and each action is signed with your wallet as a free message (personal_sign). Nothing is sent on-chain, no funds move, and the receipt is stored in your browser. It shows exactly what the real action will do." },
      { q: "Why Robinhood Chain?", a: "It already has a regulated dollar token, verified stock tokens and deep liquidity, and it runs standard EVM tooling. Gleo builds on that instead of starting a new chain." },
    ],
  },
  {
    title: "$GLEO and the contract",
    items: [
      { q: "What is the $GLEO contract address?", a: <>It is published at launch. Until then the Copy CA buttons in the header and footer read &ldquo;At launch&rdquo;. Trust only the address shown on {BRAND.domain} and on {BRAND.xHandle}.</> },
      { q: "Where can I buy $GLEO?", a: <>On the {a("/swap", "swap page")}, which trades through Pons from the moment the contract is published. Until then it shows your balance and waits.</> },
      { q: "Is anyone selling $GLEO before launch?", a: "Not us. There is no presale and no private round announced. Anything offering $GLEO before the address appears here is not Gleo." },
    ],
  },
  {
    title: "Fees and speed",
    items: [
      { q: "How much does a payment cost?", a: <>A USDG transfer costs a fraction of a cent in ETH. The exact figure, read from the chain, is on the {a("/network", "network panel")}.</> },
      { q: "How fast is settlement?", a: "Blocks on Robinhood Chain arrive several times a second. The figures on the home page marked Design target are goals for Gleo's payment layer, not measurements." },
      { q: "Why do I need ETH?", a: "Gas on Robinhood Chain is paid in ETH. Keep a small amount next to your USDG. Sponsored gas for apps is planned." },
      { q: "What is USDG?", a: <>A dollar token on Robinhood Chain at <code className="font-mono text-[13px] break-all">{USDG.address}</code>, with {USDG.decimals} decimals. Gleo uses it for payments.</> },
    ],
  },
  {
    title: "Wallets and the network",
    items: [
      { q: "Which wallets work?", a: "Any EVM wallet that can add a custom network: MetaMask, Rabby, OKX Wallet, Coinbase Wallet, Trust, Rainbow, Bitget, Zerion and Brave among others. On phones, open the site inside the wallet's browser or use WalletConnect where it is configured." },
      { q: "Why is Phantom greyed out?", a: "Phantom does not let sites add custom EVM networks, so it cannot reach Robinhood Chain. Use another wallet for Gleo." },
      { q: "How do I add Robinhood Chain?", a: <>Click Connect and pick your wallet; the site asks the wallet to add the network if it is missing. To add it by hand: chain id {CHAIN.id}, RPC {CHAIN.publicRpc}, currency ETH, explorer {CHAIN.explorer}.</> },
      { q: "Will Gleo ever ask for my seed phrase?", a: "Never. No page and no person from Gleo needs it. Anyone who asks is trying to rob you." },
      { q: "I sent funds to the wrong address. Can you reverse it?", a: "No. Plain ETH and USDG transfers are final, and nobody at Gleo controls them. The send tool checks addresses and shows a summary before you sign for this reason." },
    ],
  },
];

export default function FaqPage() {
  return (
    <>
      <section className="meridians border-b border-line bg-paper">
        <Container className="py-14 sm:py-20">
          <h1 className="font-display text-[clamp(2.4rem,5.4vw,4.6rem)] leading-[0.98] font-bold tracking-[-0.03em]">Straight answers</h1>
          <p className="mt-6 max-w-2xl text-[18px] leading-relaxed text-ink-2">
            What works, what does not yet, and how to stay safe. If your question is missing, ask {BRAND.xHandle} on X.
          </p>
          <nav aria-label="FAQ sections" className="mt-8 flex flex-wrap gap-2">
            {GROUPS.map((g, i) => (
              <a key={g.title} href={`#faq-${i}`} className="rounded-full border border-line-2 bg-card px-4 py-1.5 text-sm font-semibold hover:border-ink">
                {g.title}
              </a>
            ))}
          </nav>
        </Container>
      </section>
      {GROUPS.map((g, i) => (
        <Section key={g.title} id={`faq-${i}`} tone={i % 2 ? "paper" : "card"} tight>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
            <h2 className="font-display text-2xl font-bold">{g.title}</h2>
            <div className="min-w-0">
              <Faq items={g.items} />
            </div>
          </div>
        </Section>
      ))}
      <CtaBand title="Still stuck?" body="Message us on X with what you tried and what you saw. Screenshots help." actions={<ButtonLink href={BRAND.x} variant="fog">{BRAND.xHandle}</ButtonLink>} />
    </>
  );
}
