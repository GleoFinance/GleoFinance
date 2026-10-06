import type { MetadataRoute } from "next";
import { BRAND } from "@/config/brand";
import { APP_LINKS, FOOTER, LEGAL, MENUS } from "@/config/nav";
import { POSTS } from "@/lib/content/blog";
import { ARTICLES } from "@/lib/content/learn";
import { SCENARIOS } from "@/lib/content/scenarios";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = new Set<string>(["/", "/app", "/use-cases", "/enterprise-fund", "/grants/bug-bounty", "/brand"]);
  for (const m of MENUS) for (const l of m.links) paths.add(l.href);
  for (const c of FOOTER) for (const l of c.links) paths.add(l.href);
  for (const l of [...APP_LINKS, ...LEGAL]) paths.add(l.href);
  for (const p of POSTS) paths.add(`/blog/${p.slug}`);
  for (const a of ARTICLES) paths.add(`/learn/${a.slug}`);
  for (const s of SCENARIOS) paths.add(`/case-studies/${s.slug}`);
  return [...paths].map((p) => ({ url: `${BRAND.url}${p === "/" ? "" : p}` }));
}
