import Link from "next/link";
import { ArrowRight, Code2, Network, Package, Scale } from "lucide-react";
import { BRAND } from "@/config/brand";
import { POST_CATEGORIES, POST_SEO, formatDate, postsByDate, type PostCategory } from "@/lib/content/blog";
import { pageMeta } from "@/lib/seo";
import { Glyph } from "@/components/glyph";
import { PostCover } from "@/components/content/PostCover";
import { BlogThumb, Chip } from "@/components/content/BlogParts";
import { ButtonLink, Container, CtaBand, PageHero, Section, SectionHead } from "@/components/ui";

export const metadata = pageMeta({
  path: "/blog",
  title: "Gleo Blog: Network News, Product Notes and Design",
  description:
    "The Gleo blog: network news, product changes and contract design notes from the team building payments on Robinhood Chain. Read the latest posts.",
  keywords: ["Gleo blog", "Robinhood Chain news", "stablecoin payments", "tokenization design notes"],
});

const CATEGORY: Record<PostCategory, { icon: typeof Network; blurb: string }> = {
  Network: { icon: Network, blurb: "Why the rails look the way they do." },
  Product: { icon: Package, blurb: "What changed in the tools you use." },
  Developers: { icon: Code2, blurb: "Contract designs, open for review." },
  Policy: { icon: Scale, blurb: "Roadmap, honesty rules and compliance." },
};

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams;
  const active = POST_CATEGORIES.find((c) => c.toLowerCase() === category?.toLowerCase()) ?? null;
  const all = postsByDate();
  const latest = all.slice(0, 2);
  const picks = all.slice(2, 5);
  const list = active ? all.filter((p) => p.category === active) : all;

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Gleo blog: news and notes from the network"
        lead="The Gleo blog is where the team explains what shipped, what changed and why: network news, product notes and contract designs for payments on Robinhood Chain."
        art="fanout"
        crumbs={[{ name: "Blog", path: "/blog" }]}
      />

      <section className="bg-paper pb-16 lg:pb-20">
        <Container className="grid grid-cols-1 gap-16 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-24">
          <div className="min-w-0">
            <h2 className="text-[28px] leading-tight font-semibold">Latest posts</h2>
            <ul className="mt-10 space-y-10">
              {latest.map((post) => (
                <li key={post.slug} className="min-w-0">
                  <Link href={`/blog/${post.slug}`} className="group grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,400px)_minmax(0,1fr)] md:items-center">
                    <div className="relative">
                      <PostCover title={post.title} category={post.category} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[12px] text-ink-3">{formatDate(post.date)}</p>
                      <h3 className="mt-2 text-[clamp(1.4rem,1.2rem+0.6vw,1.75rem)] leading-snug font-semibold group-hover:underline">
                        {POST_SEO[post.slug]?.title ?? post.title}
                      </h3>
                      <span className="mt-6 inline-flex items-center gap-2 text-[16px]">
                        <ArrowRight className="size-4" /> Read the post
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="min-w-0">
            <h2 className="text-[28px] leading-tight font-semibold">Top picks</h2>
            <ul className="mt-10 space-y-10">
              {picks.map((post) => (
                <li key={post.slug} className="min-w-0">
                  <Link href={`/blog/${post.slug}`} className="group grid grid-cols-[minmax(0,1fr)_82px] gap-6">
                    <span className="min-w-0">
                      <Chip>{post.category}</Chip>
                      <h3 className="mt-3 text-[16px] leading-[1.6] font-semibold group-hover:underline">{POST_SEO[post.slug]?.title ?? post.title}</h3>
                      <span className="mt-3 inline-flex items-center gap-2 text-[16px]">
                        <ArrowRight className="size-4" /> Read
                      </span>
                    </span>
                    <BlogThumb category={post.category} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <Section tone="gray">
        <SectionHead eyebrow="Categories" title="Posts sorted by subject" />
        <ul className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {POST_CATEGORIES.map((c) => {
            const count = all.filter((p) => p.category === c).length;
            const { icon, blurb } = CATEGORY[c];
            return (
              <li key={c} className="min-w-0">
                <Link href={`/blog?category=${c.toLowerCase()}#posts`} className="group block">
                  <Glyph icon={icon} size={96} />
                  <h3 className="mt-6 text-[16px] font-semibold group-hover:underline">
                    {c} posts <span className="font-normal text-ink-3">({count})</span>
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{blurb}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section id="posts">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHead eyebrow="Archive" title={active ? `${active} posts on the Gleo blog` : "Every post on the Gleo blog"} />
          {active ? (
            <Link href="/blog#posts" className="text-[15px] underline underline-offset-4">
              Show every category
            </Link>
          ) : null}
        </div>
        <ul className="mt-10 border-t border-line">
          {list.map((post) => (
            <li key={post.slug} className="border-b border-line">
              <Link
                href={`/blog/${post.slug}`}
                className="group grid grid-cols-1 gap-2 py-7 md:grid-cols-[200px_minmax(0,1fr)_auto] md:items-baseline md:gap-10"
              >
                <span className="text-[13px] text-ink-3">
                  {formatDate(post.date)} · {post.category}
                </span>
                <span className="min-w-0">
                  <span className="block text-[18px] leading-snug font-semibold group-hover:underline">{POST_SEO[post.slug]?.title ?? post.title}</span>
                  <span className="mt-2 block text-[15px] leading-relaxed text-ink-2">{post.summary}</span>
                </span>
                <ArrowRight className="hidden size-5 md:block" />
              </Link>
            </li>
          ))}
          {list.length === 0 ? <li className="py-6 text-ink-2">No posts in this subject yet.</li> : null}
        </ul>
      </Section>

      <CtaBand
        eyebrow="Updates"
        title="Never miss a Gleo blog post"
        body="Every new post is announced on X, together with releases and contract addresses."
        actions={
          <>
            <ButtonLink href={BRAND.x}>Follow {BRAND.xHandle} on X</ButtonLink>
            <ButtonLink href="/learn" variant="line">
              Browse the learning guides
            </ButtonLink>
          </>
        }
      />
    </>
  );
}
