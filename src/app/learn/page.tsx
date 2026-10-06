import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ARTICLES, ARTICLE_SEO, LEARN_TOPICS, type LearnTopic } from "@/lib/content/learn";
import { faqLd, pageMeta } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { ButtonLink, CtaBand, Faq, PageHero, Section, SectionHead, TextLink } from "@/components/ui";

export const metadata = pageMeta({
  path: "/learn",
  title: "Learn Blockchain, Stablecoins and On-Chain Payments",
  description:
    "Free guides that teach blockchain, stablecoins and on-chain payments from first principles, each ending with something you can try on Gleo. Start reading.",
  keywords: ["learn blockchain", "stablecoin guide", "on-chain payments", "DeFi basics", "Robinhood Chain"],
});

const TOPIC_NOTE: Record<LearnTopic, string> = {
  Foundations: "Ledgers, keys and contracts: the vocabulary every other guide builds on.",
  Payments: "How money moves between people and countries once both sides read one ledger.",
  DeFi: "Markets run by code: pooled lending, collateral and the prices contracts rely on.",
  Network: "What the chain underneath Gleo does, and what a transaction actually costs.",
};

const FAQ = [
  {
    q: "Do I need a wallet or any crypto to read the guides?",
    a: "No. Every guide is free to read without an account. You only need a wallet with a little ETH on Robinhood Chain if you want to try a live action such as sending USDG.",
  },
  {
    q: "Which guide should I read first?",
    a: "Start with blockchain basics if the terms are new to you, or with the Gleo overview if you already know how wallets work and want to see what Gleo adds.",
  },
  {
    q: "Are the examples in the guides real?",
    a: "Live examples, such as the network panel and the Send tool, use real Robinhood Chain data. Tools that need Gleo contracts run in practice mode and say so on screen.",
  },
];

export default function LearnPage() {
  return (
    <>
      <JsonLd data={faqLd(FAQ)} />
      <PageHero
        tone="lilac"
        eyebrow="Resources"
        title="Learn blockchain and on-chain payments"
        lead="Learn blockchain, stablecoins and on-chain payments at your own pace. Each guide starts from first principles, takes a few minutes, and ends with something you can try on Gleo."
        art="compass"
        crumbs={[{ name: "Learn", path: "/learn" }]}
        actions={
          <ButtonLink href="/learn/intro" variant="ink">
            Start with the Gleo overview
          </ButtonLink>
        }
      />

      <Section>
        <SectionHead
          eyebrow="Start from the ground up"
          title="Guides on ledgers, stablecoins and DeFi"
          lead="Pick a topic or read in order. Nothing assumes prior knowledge, and every guide links to the part of Gleo where the idea becomes something you can use."
        />
        <nav aria-label="Guide topics" className="mt-10 flex flex-wrap gap-2">
          {LEARN_TOPICS.map((t) => (
            <a key={t} href={`#${t.toLowerCase()}`} className="rounded-full border border-ink px-4 py-1.5 text-[14px] transition-colors hover:bg-paper-2">
              {t}
            </a>
          ))}
        </nav>
        <div className="mt-14 space-y-16">
          {LEARN_TOPICS.map((topic) => (
            <div key={topic} id={topic.toLowerCase()} className="scroll-mt-28">
              <div className="grid grid-cols-1 gap-2 border-t border-ink pt-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
                <div className="min-w-0">
                  <h2 className="t-h3">{topic}</h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{TOPIC_NOTE[topic]}</p>
                </div>
                <ul className="grid min-w-0 grid-cols-1 gap-6 md:grid-cols-2">
                  {ARTICLES.filter((a) => a.topic === topic).map((a) => (
                    <li key={a.slug} className="min-w-0">
                      <Link href={`/learn/${a.slug}`} className="group flex h-full flex-col border border-line p-8 transition-colors hover:border-ink">
                        <span className="text-[12px] text-ink-3">{a.minutes} min read</span>
                        <h3 className="mt-3 text-[18px] leading-snug font-semibold">{ARTICLE_SEO[a.slug]?.title ?? a.title}</h3>
                        <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink-2">{a.summary}</p>
                        <span className="mt-6 inline-flex items-center gap-2 text-[15px]">
                          <ArrowRight className="size-4" /> Read the guide
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="night">
        <SectionHead
          dark
          split
          eyebrow="Learn by doing"
          title="Read a guide, then try it live"
          lead={
            <>
              <p>
                The quickest way to understand a stablecoin transfer is to make one. Send a few cents of USDG to a friend, then watch the block that
                carries it arrive on the network panel.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <TextLink href="/send" dark>
                  Send USDG from your own wallet
                </TextLink>
                <TextLink href="/network" dark>
                  Watch Robinhood Chain blocks live
                </TextLink>
              </div>
            </>
          }
        />
      </Section>

      <Section tone="gray">
        <SectionHead eyebrow="Questions" title="About the Gleo learning guides" />
        <div className="mt-10 max-w-[900px]">
          <Faq items={FAQ} />
        </div>
      </Section>

      <CtaBand
        eyebrow="Keep reading"
        title="Fresh notes from the people building Gleo"
        body="Design decisions, release notes and the reasoning behind them live on the Gleo blog."
        actions={
          <ButtonLink href="/blog" variant="ink">
            Read the Gleo blog
          </ButtonLink>
        }
      />
    </>
  );
}
