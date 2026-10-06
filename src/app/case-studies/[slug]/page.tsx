import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { SCENARIOS, findScenario } from "@/lib/content/scenarios";
import { articleLd, breadcrumbLd, pageMeta } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { SCENARIO_ICONS, ScenarioCover } from "@/components/content/ScenarioCover";
import { ButtonLink, Container, Eyebrow, InfoCards, Section, SectionHead, Steps, Tag, TextLink } from "@/components/ui";

export function generateStaticParams() {
  return SCENARIOS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const s = findScenario((await params).slug);
  if (!s) return { title: "Scenario not found", robots: { index: false } };
  return pageMeta({ path: `/case-studies/${s.slug}`, title: s.seoTitle, description: s.seoDescription, type: "article" });
}

export default async function ScenarioPage({ params }: { params: Promise<{ slug: string }> }) {
  const s = findScenario((await params).slug);
  if (!s) notFound();
  const path = `/case-studies/${s.slug}`;
  const index = SCENARIOS.findIndex((x) => x.slug === s.slug);
  const next = SCENARIOS[(index + 1) % SCENARIOS.length];
  const icon = SCENARIO_ICONS[s.area];
  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Case studies", path: "/case-studies" },
            { name: s.seoTitle, path },
          ]),
          articleLd({ path, title: s.seoTitle, description: s.seoDescription, type: "Article" }),
        ]}
      />
      <section className="bg-sand text-ink">
        <Container className="grid grid-cols-1 items-center gap-10 py-16 lg:grid-cols-2 lg:gap-24">
          <div className="min-w-0 lg:order-2">
            <ScenarioCover area={s.area} icon={icon} label={`Illustration: ${s.title}`} className="aspect-[4/3]" />
          </div>
          <div className="min-w-0">
            <Link href="/case-studies" className="inline-flex items-center gap-2 text-[14px] text-ink/80 hover:text-ink">
              <ArrowLeft className="size-4" /> All case studies
            </Link>
            <div className="mt-6 mb-5 flex flex-wrap gap-2">
              <Tag tone="example" />
              <span className="border border-ink/20 px-2.5 py-0.5 text-[12px]">{s.area}</span>
            </div>
            <Eyebrow>Field scenario</Eyebrow>
            <h1 className="t-h1 text-balance">{s.seoTitle}</h1>
            <p className="t-lead mt-8 text-ink/80">{s.summary}</p>
            <p className="mt-4 text-[13px] text-ink/70">
              Who: {s.who}. An invented composite, not a customer; the numbers are example inputs, not results.
            </p>
          </div>
        </Container>
      </section>

      <Section tone="night" tight>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-16">
          <div className="min-w-0">
            <Eyebrow>The problem</Eyebrow>
            <h2 className="t-h2 text-balance">{s.title}</h2>
          </div>
          <div className="t-lead min-w-0 space-y-4 text-fog-2 lg:pt-9">
            {s.problem.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="gray">
        <SectionHead eyebrow="The setup" title="What is in place before the first transaction" />
        <div className="mt-10">
          <InfoCards cols={3} items={s.setup.map((i) => ({ title: i.title, body: i.body }))} />
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow="How it runs" title="The flow, step by step" />
        <div className="mt-10">
          <Steps steps={s.flow.map((body, i) => ({ title: `Step ${i + 1}`, body }))} />
        </div>
      </Section>

      <Section tone="gray">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-16">
          <div className="min-w-0">
            <Eyebrow>Risks</Eyebrow>
            <h2 className="t-h2">What to watch</h2>
          </div>
          <ul className="min-w-0 space-y-4 lg:pt-9">
            {s.watch.map((w) => (
              <li key={w} className="border border-line bg-paper p-6 text-[16px] leading-relaxed text-ink-2">
                {w}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tight>
        <SectionHead eyebrow="Try it" title="Gleo tools used in this scenario" />
        <div className="mt-8 flex flex-wrap gap-3">
          {s.tools.map((t) => (
            <ButtonLink key={t.href} href={t.href} variant="line">
              {t.label}
            </ButtonLink>
          ))}
        </div>
      </Section>

      <Section tone="night">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-24">
          <div className="min-w-0">
            <ScenarioCover area={next.area} icon={SCENARIO_ICONS[next.area]} label={`Illustration: ${next.title}`} />
          </div>
          <div className="min-w-0">
            <Eyebrow>Next scenario</Eyebrow>
            <h2 className="t-h2 text-balance">{next.title}</h2>
            <p className="t-lead mt-6 text-fog-2">{next.summary}</p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <ButtonLink href={`/case-studies/${next.slug}`} variant="fog">
                Read the next scenario
              </ButtonLink>
              <TextLink href="/case-studies" dark>
                All case studies
              </TextLink>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
