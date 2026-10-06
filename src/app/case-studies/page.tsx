import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";
import { BRAND } from "@/config/brand";
import { SCENARIOS } from "@/lib/content/scenarios";
import { pageMeta, breadcrumbLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { FilterGrid } from "@/components/content/FilterGrid";
import { SCENARIO_ICONS, ScenarioCover } from "@/components/content/ScenarioCover";
import { ButtonLink, Container, Eyebrow, Section, SectionHead, Tag } from "@/components/ui";

export const metadata = pageMeta({
  path: "/case-studies",
  title: "Illustrative Case Studies for Stablecoin Finance",
  description:
    "Stablecoin case studies worked step by step: contractor payroll, a gold token, an aid pilot and a share-backed loan on Robinhood Chain. Each one illustrative.",
  keywords: ["stablecoin case studies", "blockchain payroll example", "gold tokenization example", "cash assistance pilot", "borrow against stocks"],
});

export default function Scenarios() {
  const spotlight = SCENARIOS.slice(0, 3);
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Case studies", path: "/case-studies" }])} />
      <section className="bg-sand text-ink">
        <Container className="grid grid-cols-1 items-center gap-10 py-16 lg:grid-cols-2 lg:gap-24 lg:py-16">
          <div className="min-w-0">
            <ScenarioCover area="Payments" icon={Users} label="Illustration for the Gleo case studies" className="aspect-[4/3]" />
          </div>
          <div className="min-w-0">
            <div className="mb-5">
              <Tag tone="example">Every scenario is illustrative</Tag>
            </div>
            <Eyebrow>Case studies</Eyebrow>
            <h1 className="t-h1 text-balance">Stablecoin case studies, worked from start to finish</h1>
            <div className="t-lead mt-8 text-ink/80">
              Gleo is new, so we will not show logos of customers we do not have. These stablecoin case studies are worked examples
              instead: a realistic team, a real problem, the exact steps on Robinhood Chain and what could go wrong.
            </div>
          </div>
        </Container>
      </section>

      <Section tone="night">
        <SectionHead dark eyebrow="Spotlight" title="Highlighted scenarios" />
        <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {spotlight.map((s) => (
            <li key={s.slug} className="min-w-0">
              <Link href={`/case-studies/${s.slug}`} className="group flex h-full flex-col bg-[#f9f9f9] text-ink">
                <ScenarioCover area={s.area} icon={SCENARIO_ICONS[s.area]} label={`Illustration: ${s.title}`} />
                <div className="flex flex-1 flex-col px-6 pt-6 pb-4">
                  <h3 className="flex-1 text-[16px] leading-[1.6] font-semibold group-hover:underline">{s.title}</h3>
                  <span className="mt-6 flex items-center gap-4 border-t border-line pt-4 text-[16px]">
                    <ArrowRight className="size-4" /> Read the {s.area.toLowerCase()} scenario
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <h2 className="sr-only">All case studies</h2>
        <FilterGrid
          label="Filter by area"
          searchable
          searchLabel="Search scenarios"
          items={SCENARIOS.map((s) => ({
            key: s.slug,
            category: s.area,
            text: `${s.title} ${s.summary} ${s.who}`,
            node: (
              <Link href={`/case-studies/${s.slug}`} className="group block">
                <ScenarioCover area={s.area} icon={SCENARIO_ICONS[s.area]} label={`Illustration: ${s.title}`} />
                <h3 className="mt-5 text-[16px] leading-[1.6] font-semibold group-hover:underline">{s.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-ink-2">{s.summary}</p>
              </Link>
            ),
          }))}
        />
      </Section>

      <Section tone="gray">
        <SectionHead
          split
          eyebrow="Write the first real one"
          title="Running one of these flows today?"
          lead="If you pay people abroad, issue an asset or run a cash programme and want to try it on Gleo, we would like to write the first real case study with you."
          action={
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={BRAND.x}>Message {BRAND.xHandle}</ButtonLink>
              <ButtonLink href="/use-cases" variant="line">
                Browse all use cases
              </ButtonLink>
            </div>
          }
        />
      </Section>
    </>
  );
}
