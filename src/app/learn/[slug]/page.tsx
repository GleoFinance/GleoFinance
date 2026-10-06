import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { ARTICLES, findArticle } from "@/lib/content/learn";
import { ArticleBody } from "@/components/content/ArticleBody";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const a = findArticle((await params).slug);
  return a ? { title: a.title, description: a.summary } : { title: "Not found" };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const article = findArticle((await params).slug);
  if (!article) notFound();
  const more = ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3);
  return (
    <ArticleBody
      back={{ href: "/learn", label: "All guides" }}
      title={article.title}
      meta={`${article.topic} · ${article.minutes} min read`}
      summary={article.summary}
      sections={article.sections}
      aside={
        <div className="space-y-6">
          {article.tryIt ? (
            <div className="rounded-2xl bg-night p-5 text-fog">
              <p className="font-display text-lg font-semibold">Try it on Gleo</p>
              <Link href={article.tryIt.href} className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold hover:underline">
                {article.tryIt.label} <ArrowRight className="size-4" />
              </Link>
            </div>
          ) : null}
          <div>
            <p className="label">Keep reading</p>
            <ul className="mt-3 space-y-3">
              {more.map((a) => (
                <li key={a.slug}>
                  <Link href={`/learn/${a.slug}`} className="text-[15px] font-semibold hover:underline">
                    {a.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      }
    />
  );
}
