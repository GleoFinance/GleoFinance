import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BRAND } from "@/config/brand";
import { POST_CATEGORIES, formatDate, postsByDate, type PostCategory } from "@/lib/content/blog";
import { ButtonLink, Container, CtaBand, Section, SectionHead } from "@/components/ui";

export const metadata: Metadata = {
  title: "Journal",
  description: "Notes from the Gleo team: network decisions, product changes, developer design notes and policy.",
};

const BLURB: Record<PostCategory, string> = {
  Network: "Why the rails look the way they do.",
  Product: "What changed in the tools you use.",
  Developers: "Contract designs, open for review.",
  Policy: "Roadmap, honesty rules and compliance.",
};

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams;
  const active = POST_CATEGORIES.find((c) => c.toLowerCase() === category?.toLowerCase()) ?? null;
  const all = postsByDate();
  const [featured, ...rest] = all;
  const list = active ? all.filter((p) => p.category === active) : rest;

  return (
    <>
      <section className="meridians border-b border-line bg-paper">
        <Container className="grid grid-cols-1 gap-10 py-14 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-end">
          <h1 className="font-display text-[clamp(2.6rem,6vw,5rem)] leading-[0.95] font-bold tracking-[-0.035em]">Journal</h1>
          <Link href={`/blog/${featured.slug}`} className="group block min-w-0 rounded-2xl bg-night p-6 text-fog sm:p-8">
            <p className="font-mono text-[12px] text-fog-2">
              Latest · {formatDate(featured.date)} · {featured.category}
            </p>
            <p className="mt-3 font-display text-[clamp(1.5rem,2.6vw,2.1rem)] leading-tight font-semibold group-hover:underline">{featured.title}</p>
            <p className="mt-3 text-[15.5px] leading-relaxed text-fog-2">{featured.summary}</p>
          </Link>
        </Container>
      </section>

      <Section tone="card" tight>
        <SectionHead title="Sorted by subject" />
        <ul className="mt-8 grid grid-cols-1 border-t border-line-2 sm:grid-cols-2 lg:grid-cols-4">
          {POST_CATEGORIES.map((c) => {
            const count = all.filter((p) => p.category === c).length;
            return (
              <li key={c} className="min-w-0 border-b border-line-2 lg:border-r lg:last:border-r-0">
                <Link href={`/blog?category=${c.toLowerCase()}`} className={`block p-5 hover:bg-paper ${active === c ? "bg-paper" : ""}`}>
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="font-display text-xl font-semibold">{c}</span>
                    <span className="font-mono text-[12px] text-ink-3">{count}</span>
                  </span>
                  <span className="mt-1 block text-[14.5px] text-ink-2">{BLURB[c]}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-[clamp(1.8rem,3.4vw,2.6rem)] leading-tight font-bold tracking-tight">
            {active ? `${active} posts` : "Everything else"}
          </h2>
          {active ? (
            <Link href="/blog" className="text-sm font-semibold text-sea-deep underline underline-offset-4">
              Clear filter
            </Link>
          ) : null}
        </div>
        <ul className="mt-8 border-t border-line-2">
          {list.map((post) => (
            <li key={post.slug} className="border-b border-line-2">
              <Link href={`/blog/${post.slug}`} className="group grid grid-cols-1 gap-2 py-6 md:grid-cols-[180px_minmax(0,1fr)_auto] md:items-baseline md:gap-8">
                <span className="font-mono text-[12.5px] text-ink-3">
                  {formatDate(post.date)} · {post.category}
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-[1.35rem] leading-snug font-semibold group-hover:underline">{post.title}</span>
                  <span className="mt-1 block text-[15px] text-ink-2">{post.summary}</span>
                </span>
                <ArrowRight className="hidden size-5 text-ink-3 md:block" />
              </Link>
            </li>
          ))}
          {list.length === 0 ? <li className="py-6 text-ink-2">No posts in this subject yet.</li> : null}
        </ul>
      </Section>

      <CtaBand
        title="Never miss a post"
        body="Every new journal entry is announced on X."
        actions={
          <ButtonLink href={BRAND.x} variant="fog">
            Follow {BRAND.xHandle}
          </ButtonLink>
        }
      />
    </>
  );
}
