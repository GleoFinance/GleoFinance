import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BRAND } from "@/config/brand";
import { POSTS, POST_SEO, findPost, formatDate, postsByDate } from "@/lib/content/blog";
import { articleLd, pageMeta } from "@/lib/seo";
import { ArticleBody } from "@/components/content/ArticleBody";
import { PostCover } from "@/components/content/PostCover";
import { BlogThumb } from "@/components/content/BlogParts";
import { TextLink } from "@/components/ui";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const slug = (await params).slug;
  const p = findPost(slug);
  const seo = POST_SEO[slug];
  if (!p || !seo) return { title: "Post not found", robots: { index: false } };
  return pageMeta({
    path: `/blog/${slug}`,
    title: seo.title,
    description: seo.description,
    type: "article",
    publishedTime: p.date,
    keywords: [seo.keyword],
  });
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const post = findPost(slug);
  const seo = POST_SEO[slug];
  if (!post || !seo) notFound();
  const more = postsByDate()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);
  const path = `/blog/${slug}`;
  return (
    <ArticleBody
      back={{ href: "/blog", label: "Back to the Gleo blog" }}
      eyebrow={post.category}
      title={seo.title}
      meta={`${formatDate(post.date)} · ${BRAND.name} team`}
      summary={seo.description}
      sections={post.sections}
      cover={<PostCover title={post.title} category={post.category} size="lg" className="aspect-[16/9]" />}
      crumbs={[
        { name: "Blog", path: "/blog" },
        { name: seo.title, path },
      ]}
      jsonLd={articleLd({ path, title: seo.title, description: seo.description, date: post.date })}
      aside={
        <div>
          <h2 className="text-[12px] font-semibold tracking-[0.02em] uppercase">More from the Gleo blog</h2>
          <ul className="mt-4 space-y-6">
            {more.map((p) => (
              <li key={p.slug}>
                <Link href={`/blog/${p.slug}`} className="group grid grid-cols-[72px_minmax(0,1fr)] gap-4">
                  <BlogThumb category={p.category} className="size-[72px]" />
                  <span className="min-w-0">
                    <span className="block text-[15px] leading-snug font-semibold group-hover:underline">{POST_SEO[p.slug]?.title ?? p.title}</span>
                    <span className="mt-1 block text-[12px] text-ink-3">{formatDate(p.date)}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <TextLink href="/learn" className="mt-8">
            Browse the Gleo learning guides
          </TextLink>
        </div>
      }
    />
  );
}
