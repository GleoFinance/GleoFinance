import Link from "next/link";
import { BRAND, CHAIN } from "@/config/brand";
import { USDG } from "@/config/assets.generated";
import { faqLd, pageMeta } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { ButtonLink, CtaBand, Eyebrow, Faq, PageHero, Section } from "@/components/ui";

export const metadata = pageMeta({
  path: "/faq",
  title: "FAQ: USDG Payments, Wallets and the $GLEO Token",
  description:
    "Straight answers on Gleo: what is live, what runs in practice mode, USDG payment fees, wallets, adding Robinhood Chain and the $GLEO contract. Read them here.",
  keywords: ["Gleo FAQ", "USDG payments", "add Robinhood Chain to wallet", "$GLEO contract address", "practice mode"],
});

type Item = { q: string; a: string; more?: [string, string] };

const GROUPS: { title: string; items: Item[] }[] = [
  {
    title: "Gleo basics",
    items: [
      {
        q: "What is Gleo?",
        a: `Gleo is a payments, asset tokenization and DeFi network on ${CHAIN.name}. It moves dollars between wallets in seconds, issues real-world assets as tokens with built-in controls, and opens markets for them.`,
        more: ["/learn/intro", "Read the Gleo overview"],
      },
      {
        q: "Which parts of Gleo work today?",
        a: "Live: sending ETH or USDG, the network panel, the asset explorer and the swap page. Practice: tokenizing, anchors, lending and pools, because the Gleo contracts they need are not deployed yet.",
        more: ["/app", "Open the app overview"],
      },
      {
        q: "What does practice mode mean?",
        a: "You get the full interface, and each action is signed by your wallet as a free message (personal_sign). Nothing is sent on-chain, no funds move, and the receipt stays in your browser. It shows exactly what the real action will do.",
      },
      {
        q: "Why does Gleo run on Robinhood Chain?",
        a: "The chain already has a regulated dollar token, verified stock tokens and deep liquidity, and it runs standard EVM tooling. Gleo builds on that rather than starting a new chain.",
        more: ["/blog", "Read the reasoning in the Gleo journal"],
      },
    ],
  },
  {
    title: "The $GLEO token",
    items: [
      {
        q: "What is the $GLEO contract address?",
        a: `It is published at launch. Until then the Copy CA buttons in the header and footer read "At launch". Trust only the address shown on ${BRAND.domain} and on ${BRAND.xHandle}.`,
      },
      {
        q: "Where can I buy $GLEO?",
        a: "On the swap page, which trades through Pons from the moment the contract is published. Until then it shows your balance and waits.",
        more: ["/swap", "Open the $GLEO swap page"],
      },
      {
        q: "Is anyone selling $GLEO before launch?",
        a: "Not us. There is no presale and no private round announced. Anything offering $GLEO before the address appears on this site is not Gleo.",
      },
    ],
  },
  {
    title: "Fees and speed",
    items: [
      {
        q: "How much does a USDG payment cost?",
        a: "A USDG transfer costs a fraction of a cent, paid in ETH. The exact figure, read from the chain every few seconds, is on the network panel.",
        more: ["/network", "See today's transfer cost"],
      },
      {
        q: "How fast is settlement?",
        a: "Blocks on Robinhood Chain arrive several times a second. Figures marked Design target on this site are goals for Gleo's payment layer, not measurements.",
      },
      { q: "Why do I need ETH?", a: "Gas on Robinhood Chain is paid in ETH, so keep a small amount next to your USDG. Sponsored gas for apps is planned." },
      {
        q: "What is USDG?",
        a: `A dollar token on Robinhood Chain at ${USDG.address}, with ${USDG.decimals} decimals. Gleo uses it for payments.`,
        more: ["/assets", "See USDG in the asset explorer"],
      },
    ],
  },
  {
    title: "Wallets and the network",
    items: [
      {
        q: "Which wallets work with Gleo?",
        a: "Any EVM wallet that can add a custom network, such as MetaMask, Rabby, OKX Wallet, Coinbase Wallet, Trust, Rainbow, Bitget, Zerion and Brave. On phones, open the site in the wallet's own browser or use WalletConnect where it is configured.",
      },
      { q: "Why is Phantom greyed out?", a: "Phantom does not let sites add custom EVM networks, so it cannot reach Robinhood Chain. Use another wallet for Gleo." },
      {
        q: "How do I add Robinhood Chain to my wallet?",
        a: `Press Connect and pick your wallet; the site asks the wallet to add the network if it is missing. To add it by hand: chain id ${CHAIN.id}, RPC ${CHAIN.publicRpc}, currency ETH, explorer ${CHAIN.explorer}.`,
        more: ["/developers#network", "Copy the network settings"],
      },
      { q: "Will Gleo ever ask for my seed phrase?", a: "Never. No page and no person from Gleo needs it. Anyone who asks is trying to rob you." },
      {
        q: "I sent funds to the wrong address. Can you reverse it?",
        a: "No. Plain ETH and USDG transfers are final, and nobody at Gleo controls them. That is why the send tool checks addresses and shows a summary before you sign.",
      },
    ],
  },
];

export default function FaqPage() {
  const all = GROUPS.flatMap((g) => g.items);
  return (
    <>
      <JsonLd data={faqLd(all.map(({ q, a }) => ({ q, a })))} />
      <PageHero
        eyebrow="FAQ"
        title="Gleo FAQ: payments, wallets and $GLEO"
        lead={
          <>
            <p>
              This Gleo FAQ covers what works today, what runs in practice mode, what USDG payments cost and how to stay safe. If your question is
              missing, ask {BRAND.xHandle} on X.
            </p>
            <nav aria-label="FAQ sections" className="mt-8 flex flex-wrap gap-2">
              {GROUPS.map((g, i) => (
                <a key={g.title} href={`#faq-${i}`} className="rounded-full border border-ink px-4 py-1.5 text-[14px] text-ink transition-colors hover:bg-paper-2">
                  {g.title}
                </a>
              ))}
            </nav>
          </>
        }
      />
      {GROUPS.map((g, i) => (
        <Section key={g.title} id={`faq-${i}`} tone={i % 2 ? "paper" : "gray"} tight>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-16">
            <div className="min-w-0">
              <Eyebrow>FAQs</Eyebrow>
              <h2 className="t-h2">{g.title}</h2>
            </div>
            <div className="min-w-0">
              <Faq
                items={g.items.map((it) => ({
                  q: it.q,
                  a: (
                    <>
                      <span className="break-words">{it.a}</span>
                      {it.more ? (
                        <>
                          {" "}
                          <Link href={it.more[0]} className="text-ink underline underline-offset-4">
                            {it.more[1]}
                          </Link>
                          .
                        </>
                      ) : null}
                    </>
                  ),
                }))}
              />
            </div>
          </div>
        </Section>
      ))}
      <CtaBand
        eyebrow="Still stuck?"
        title="Ask the Gleo team directly"
        body="Message us on X with what you tried and what you saw. Screenshots help."
        actions={
          <>
            <ButtonLink href={BRAND.x}>Message {BRAND.xHandle}</ButtonLink>
            <ButtonLink href="/community" variant="line">
              Community page
            </ButtonLink>
          </>
        }
      />
    </>
  );
}
