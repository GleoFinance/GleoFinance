import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ARTICLES, ARTICLE_SEO, findArticle } from "@/lib/content/learn";
import { articleLd, pageMeta } from "@/lib/seo";
import { ArticleBody } from "@/components/content/ArticleBody";
import { TextLink } from "@/components/ui";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const slug = (await params).slug;
  const a = findArticle(slug);
  const seo = ARTICLE_SEO[slug];
  if (!a || !seo) return { title: "Guide not found", robots: { index: false } };
  return pageMeta({ path: `/learn/${slug}`, title: seo.title, description: seo.description, type: "article", keywords: [seo.keyword] });
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const article = findArticle(slug);
  const seo = ARTICLE_SEO[slug];
  if (!article || !seo) notFound();
  const more = ARTICLES.filter((a) => a.slug !== article.slug && a.topic === article.topic)
    .concat(ARTICLES.filter((a) => a.slug !== article.slug && a.topic !== article.topic))
    .slice(0, 3);
  const path = `/learn/${slug}`;
  return (
    <ArticleBody
      back={{ href: "/learn", label: "All Gleo guides" }}
      eyebrow={`Learn · ${article.topic}`}
      title={seo.title}
      meta={`${article.minutes} min read · Written by the Gleo team`}
      summary={seo.description}
      sections={article.sections}
      crumbs={[
        { name: "Learn", path: "/learn" },
        { name: seo.title, path },
      ]}
      jsonLd={articleLd({ path, title: seo.title, description: seo.description, type: "Article" })}
      aside={
        <div className="space-y-8">
          {article.tryIt ? (
            <div className="bg-night p-6 text-fog">
              <p className="font-display text-[24px] leading-tight">Try it on Gleo</p>
              <TextLink href={article.tryIt.href} dark className="mt-4">
                {article.tryIt.label}
              </TextLink>
            </div>
          ) : null}
          <div>
            <h2 className="text-[12px] font-semibold tracking-[0.02em] uppercase">Related guides</h2>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {more.map((a) => (
                <li key={a.slug}>
                  <Link href={`/learn/${a.slug}`} className="block py-4 text-[15px] leading-snug font-semibold hover:underline">
                    {ARTICLE_SEO[a.slug]?.title ?? a.title}
                  </Link>
                </li>
              ))}
            </ul>
            <TextLink href="/learn/intro" className="mt-6">
              What is Gleo? Start with the overview
            </TextLink>
          </div>
        </div>
      }
    />
  );
}
