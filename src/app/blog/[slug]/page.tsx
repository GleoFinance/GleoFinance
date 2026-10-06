import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BRAND } from "@/config/brand";
import { POSTS, findPost, formatDate, postsByDate } from "@/lib/content/blog";
import { ArticleBody } from "@/components/content/ArticleBody";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = findPost((await params).slug);
  return p ? { title: p.title, description: p.summary } : { title: "Not found" };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = findPost((await params).slug);
  if (!post) notFound();
  const more = postsByDate().filter((p) => p.slug !== post.slug).slice(0, 3);
  return (
    <ArticleBody
      back={{ href: "/blog", label: "Journal" }}
      title={post.title}
      meta={`${formatDate(post.date)} · ${post.category} · ${BRAND.name} team`}
      summary={post.summary}
      sections={post.sections}
      aside={
        <div>
          <p className="label">More from the journal</p>
          <ul className="mt-3 space-y-4">
            {more.map((p) => (
              <li key={p.slug}>
                <Link href={`/blog/${p.slug}`} className="block text-[15px] font-semibold hover:underline">
                  {p.title}
                </Link>
                <span className="font-mono text-[11.5px] text-ink-3">{formatDate(p.date)}</span>
              </li>
            ))}
          </ul>
        </div>
      }
    />
  );
}
