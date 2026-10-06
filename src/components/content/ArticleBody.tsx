import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui";

/** Shared layout for learn articles and journal posts: a narrow column of prose beside a short side rail. */
export function ArticleBody({
  back,
  title,
  meta,
  summary,
  sections,
  aside,
}: {
  back: { href: string; label: string };
  title: string;
  meta: React.ReactNode;
  summary: string;
  sections: { heading?: string; paragraphs: string[] }[];
  aside?: React.ReactNode;
}) {
  return (
    <>
      <section className="meridians border-b border-line bg-paper">
        <Container className="py-12 sm:py-16">
          <Link href={back.href} className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-2 hover:text-ink">
            <ArrowLeft className="size-4" /> {back.label}
          </Link>
          <div className="mt-6 font-mono text-[12.5px] text-ink-3">{meta}</div>
          <h1 className="mt-3 max-w-4xl font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.02] font-bold tracking-[-0.03em] text-balance">{title}</h1>
          <p className="mt-5 max-w-2xl text-[18px] leading-relaxed text-ink-2">{summary}</p>
        </Container>
      </section>
      <section className="bg-card">
        <Container className="grid grid-cols-1 gap-12 py-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_280px]">
          <article className="prose-gleo max-w-3xl min-w-0">
            {sections.map((s, i) => (
              <div key={i}>
                {s.heading ? <h2>{s.heading}</h2> : null}
                {s.paragraphs.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            ))}
          </article>
          {aside ? <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">{aside}</aside> : null}
        </Container>
      </section>
    </>
  );
}
