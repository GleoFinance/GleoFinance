import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SCENARIOS, findScenario } from "@/lib/content/scenarios";
import { ButtonLink, Container, CtaBand, Section, SectionHead, Steps, Tag } from "@/components/ui";

export function generateStaticParams() {
  return SCENARIOS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const s = findScenario((await params).slug);
  return s ? { title: s.title, description: s.summary } : { title: "Scenario not found" };
}

export default async function ScenarioPage({ params }: { params: Promise<{ slug: string }> }) {
  const s = findScenario((await params).slug);
  if (!s) notFound();
  const index = SCENARIOS.findIndex((x) => x.slug === s.slug);
  const next = SCENARIOS[(index + 1) % SCENARIOS.length];
  return (
    <>
      <section className="meridians border-b border-line bg-paper">
        <Container className="py-14 sm:py-20">
          <Link href="/case-studies" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-2 hover:text-ink">
            <ArrowLeft className="size-4" /> Field scenarios
          </Link>
          <div className="mt-6 flex flex-wrap gap-2">
            <Tag tone="example" />
            <span className="rounded-full bg-card px-2 py-0.5 font-mono text-[10.5px] uppercase">{s.area}</span>
          </div>
          <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.1rem,4.6vw,3.8rem)] leading-[1.02] font-bold tracking-[-0.03em] text-balance">{s.title}</h1>
          <p className="mt-5 max-w-2xl text-[18px] leading-relaxed text-ink-2">{s.summary}</p>
          <p className="mt-4 font-mono text-[12.5px] text-ink-3">Who: {s.who} (an invented composite, not a customer)</p>
        </Container>
      </section>

      <Section tone="card">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[260px_minmax(0,1fr)]">
          <h2 className="font-display text-3xl font-bold">The problem</h2>
          <div className="min-w-0 max-w-3xl space-y-4 text-[17px] leading-relaxed text-ink-2">
            {s.problem.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <SectionHead title="The setup" />
        <dl className="mt-8 grid grid-cols-1 gap-x-10 md:grid-cols-3">
          {s.setup.map((item) => (
            <div key={item.title} className="min-w-0 border-t-2 border-ink py-5">
              <dt className="text-lg font-bold">{item.title}</dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-ink-2">{item.body}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section tone="night">
        <SectionHead dark title="How it runs" />
        <div className="mt-12">
          <Steps dark steps={s.flow.map((body, i) => ({ title: `Step ${i + 1}`, body }))} />
        </div>
      </Section>

      <Section tone="card">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[260px_minmax(0,1fr)]">
          <h2 className="font-display text-3xl font-bold">What to watch</h2>
          <ul className="min-w-0 max-w-3xl space-y-4">
            {s.watch.map((w) => (
              <li key={w} className="border-l-4 border-flare pl-4 text-[16px] leading-relaxed text-ink-2">
                {w}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tight>
        <SectionHead title="Tools in this scenario" />
        <div className="mt-6 flex flex-wrap gap-3">
          {s.tools.map((t) => (
            <ButtonLink key={t.href} href={t.href} variant="line">
              {t.label}
            </ButtonLink>
          ))}
        </div>
      </Section>

      <CtaBand
        title={next.title}
        body="Next scenario"
        actions={
          <Link href={`/case-studies/${next.slug}`} className="btn btn-fog h-11 px-5 text-[15px]">
            Read it <ArrowRight className="size-4" />
          </Link>
        }
      />
    </>
  );
}
