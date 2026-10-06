import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ARTICLES, LEARN_TOPICS } from "@/lib/content/learn";
import { ButtonLink, CtaBand, PageHero, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Learn",
  description: "Plain guides to blockchains, payments, stablecoins, anchors, lending markets, oracles and consensus, written for Gleo.",
};

export default function LearnPage() {
  return (
    <>
      <PageHero
        title="Learn how open money works"
        lead="Short guides that start from first principles and end with something you can try on Gleo. No prior knowledge assumed."
        art="compass"
        actions={
          <ButtonLink href="/learn/intro" variant="accent">
            Start with the overview
          </ButtonLink>
        }
      />
      <Section>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[220px_minmax(0,1fr)]">
          <nav aria-label="Topics" className="min-w-0 lg:sticky lg:top-24 lg:self-start">
            <p className="label">Topics</p>
            <ul className="mt-3 flex flex-wrap gap-2 lg:flex-col">
              {LEARN_TOPICS.map((t) => (
                <li key={t}>
                  <a href={`#${t.toLowerCase()}`} className="block rounded-full border border-line-2 px-3 py-1 text-sm hover:border-ink lg:rounded-none lg:border-0 lg:px-0">
                    {t}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="min-w-0 space-y-14">
            {LEARN_TOPICS.map((topic) => (
              <div key={topic} id={topic.toLowerCase()}>
                <h2 className="font-display text-2xl font-bold">{topic}</h2>
                <ul className="mt-4 border-t border-line-2">
                  {ARTICLES.filter((a) => a.topic === topic).map((a) => (
                    <li key={a.slug} className="border-b border-line-2">
                      <Link href={`/learn/${a.slug}`} className="group grid grid-cols-1 gap-1 py-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-6">
                        <span className="min-w-0">
                          <span className="block text-[18px] font-semibold group-hover:underline">{a.title}</span>
                          <span className="mt-1 block text-[15px] text-ink-2">{a.summary}</span>
                        </span>
                        <span className="flex items-center gap-2 font-mono text-[12px] text-ink-3">
                          {a.minutes} min <ArrowRight className="size-4" />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Section>
      <CtaBand
        title="Ready to try it?"
        body="Send a few cents of USDG to a friend and watch it arrive."
        actions={
          <ButtonLink href="/send" variant="fog">
            Open Send
          </ButtonLink>
        }
      />
    </>
  );
}
