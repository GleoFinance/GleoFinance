import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SCENARIOS } from "@/lib/content/scenarios";
import { ButtonLink, CtaBand, PageHero, Section, SectionHead, Tag } from "@/components/ui";

export const metadata: Metadata = {
  title: "Field scenarios",
  description: "Illustrative worked examples of payments, tokenization, aid and lending on Gleo, from the problem to the steps and the risks.",
};

export default function Scenarios() {
  const [first, ...rest] = SCENARIOS;
  return (
    <>
      <PageHero
        title="Field scenarios"
        lead="Gleo is new, so we will not show you logos of customers we do not have. Instead, here are worked examples: a realistic team, a real problem, and exactly how Gleo would handle it, including what can go wrong."
        art="compass"
        meta={<Tag tone="example">Every scenario is illustrative</Tag>}
      />

      <Section>
        <SectionHead title="Start here" lead="The most common reason teams look at Gleo: paying people in other countries." />
        <Link
          href={`/case-studies/${first.slug}`}
          className="mt-10 grid grid-cols-1 gap-6 rounded-2xl border border-line-2 bg-card p-6 transition-colors hover:border-ink sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
        >
          <div className="min-w-0">
            <div className="flex flex-wrap gap-2">
              <Tag tone="example" />
              <span className="rounded-full bg-paper px-2 py-0.5 font-mono text-[10.5px] uppercase">{first.area}</span>
            </div>
            <h2 className="mt-4 font-display text-[clamp(1.6rem,3vw,2.3rem)] leading-tight font-bold">{first.title}</h2>
            <p className="mt-2 text-sm text-ink-3">{first.who}</p>
          </div>
          <div className="min-w-0">
            <p className="text-[16px] leading-relaxed text-ink-2">{first.summary}</p>
            <span className="mt-5 inline-flex items-center gap-1.5 font-semibold text-sea-deep">
              Read the scenario <ArrowRight className="size-4" />
            </span>
          </div>
        </Link>
      </Section>

      <Section tone="card">
        <SectionHead title="All scenarios" />
        <ul className="mt-8 border-t border-line-2">
          {rest.map((s) => (
            <li key={s.slug} className="border-b border-line-2">
              <Link href={`/case-studies/${s.slug}`} className="group grid grid-cols-1 gap-2 py-6 md:grid-cols-[140px_minmax(0,1fr)_auto] md:items-baseline md:gap-8">
                <span className="font-mono text-[12px] text-ink-3 uppercase">{s.area}</span>
                <span className="min-w-0">
                  <span className="block font-display text-[1.35rem] leading-snug font-semibold group-hover:underline">{s.title}</span>
                  <span className="mt-1 block text-[15px] text-ink-2">{s.summary}</span>
                </span>
                <ArrowRight className="hidden size-5 text-ink-3 md:block" />
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand
        title="Have a real case?"
        body="If you run one of these flows today and want to try it on Gleo, we would like to write the first real study with you."
        actions={
          <ButtonLink href="/use-cases" variant="fog">
            Browse use cases
          </ButtonLink>
        }
      />
    </>
  );
}
