import type { Metadata } from "next";
import { BRAND } from "@/config/brand";

/**
 * One helper for every route's metadata, so titles, canonicals and social
 * cards are built the same way everywhere.
 *
 * `title` is the primary keyword phrase; the brand is appended here
 * ("Cross-border payments — Gleo"). Keep the result 50–60 characters and the
 * description 140–160 characters; referensi/seo-check.mjs enforces both.
 */
export const OG_IMAGE = { url: "/opengraph-image.jpg", width: 1200, height: 630, alt: `${BRAND.name} on Robinhood Chain` };

export function pageMeta({
  path,
  title,
  description,
  type = "website",
  noindex = false,
  publishedTime,
  keywords,
}: {
  path: string;
  title: string;
  description: string;
  type?: "website" | "article";
  noindex?: boolean;
  publishedTime?: string;
  keywords?: string[];
}): Metadata {
  const full = `${title} — ${BRAND.name}`;
  const url = `${BRAND.url}${path === "/" ? "" : path}`;
  return {
    title: { absolute: full },
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      siteName: BRAND.name,
      title: full,
      description,
      locale: "en_US",
      images: [OG_IMAGE],
      ...(type === "article" && publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      site: BRAND.xHandle,
      creator: BRAND.xHandle,
      title: full,
      description,
      images: [OG_IMAGE.url],
    },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...crumbs].map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${BRAND.url}${c.path === "/" ? "" : c.path}`,
    })),
  };
}

export function faqLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
  };
}

export function articleLd({
  path,
  title,
  description,
  date,
  type = "BlogPosting",
  author = `${BRAND.name} team`,
}: {
  path: string;
  title: string;
  description: string;
  date?: string;
  type?: "BlogPosting" | "Article";
  author?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    headline: title,
    description,
    mainEntityOfPage: `${BRAND.url}${path}`,
    url: `${BRAND.url}${path}`,
    image: `${BRAND.url}${OG_IMAGE.url}`,
    ...(date ? { datePublished: date, dateModified: date } : {}),
    author: { "@type": "Organization", name: author, url: BRAND.url },
    publisher: { "@type": "Organization", name: BRAND.name, logo: { "@type": "ImageObject", url: `${BRAND.url}/icon.png` } },
  };
}

export function webAppLd({ path, name, description }: { path: string; name: string; description: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url: `${BRAND.url}${path}`,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any (web browser with an EVM wallet)",
    publisher: { "@type": "Organization", name: BRAND.name, url: BRAND.url },
  };
}

export const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: BRAND.name,
  url: BRAND.url,
  logo: `${BRAND.url}/icon.png`,
  description: BRAND.description,
  sameAs: [BRAND.x],
};

export const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: BRAND.name,
  url: BRAND.url,
  inLanguage: "en",
  publisher: { "@type": "Organization", name: BRAND.name, url: BRAND.url },
};
