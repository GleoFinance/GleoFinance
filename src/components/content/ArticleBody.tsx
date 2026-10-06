import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd, type Crumb } from "@/lib/seo";

/**
 * Shared layout for learn guides and journal posts: eyebrow, serif H1, meta
 * line and lead, an optional cover, then a narrow prose column beside a
 * short side rail.
 */
export function ArticleBody({
  back,
  eyebrow,
  title,
  meta,
  summary,
  sections,
  cover,
  aside,
  crumbs,
  jsonLd,
}: {
  back: { href: string; label: string };
  eyebrow?: React.ReactNode;
  title: string;
  meta: React.ReactNode;
  summary: string;
  sections: { heading?: string; paragraphs: string[] }[];
  cover?: React.ReactNode;
  aside?: React.ReactNode;
  crumbs?: Crumb[];
  jsonLd?: object;
}) {
  return (
    <>
      {crumbs ? <JsonLd data={breadcrumbLd(crumbs)} /> : null}
      {jsonLd ? <JsonLd data={jsonLd} /> : null}
      <section className="bg-paper">
        <Container className="pt-12 pb-10 lg:pt-16">
          <Link href={back.href} className="inline-flex items-center gap-2 text-[14px] text-ink-2 hover:text-ink">
            <ArrowLeft className="size-4" /> {back.label}
          </Link>
          <div className="mt-10 max-w-[900px]">
            {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
            <h1 className="t-h1 text-balance">{title}</h1>
            <p className="mt-6 text-[13px] text-ink-3">{meta}</p>
            <p className="t-lead mt-6 max-w-[680px] text-ink-2">{summary}</p>
          </div>
          {cover ? <div className="mt-12 max-w-[900px]">{cover}</div> : null}
        </Container>
      </section>
      <section className="bg-paper">
        <Container className="grid grid-cols-1 gap-12 pb-20 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-20 lg:pb-24">
          <article className="prose-gleo max-w-[720px] min-w-0 border-t border-line pt-10">
            {sections.map((s, i) => (
              <div key={i}>
                {s.heading ? <h2>{s.heading}</h2> : null}
                {s.paragraphs.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            ))}
          </article>
          {aside ? <aside className="min-w-0 lg:sticky lg:top-28 lg:self-start">{aside}</aside> : null}
        </Container>
      </section>
    </>
  );
}
