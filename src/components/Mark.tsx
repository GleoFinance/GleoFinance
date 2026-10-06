import Link from "next/link";
import { BRAND } from "@/config/brand";

/**
 * The Gleo mark: the owner's globe "G". The WebP in public/brand (from
 * scripts/make-brand.mjs) is used as a CSS mask over the current tone, so the
 * same file draws in ink on paper and in fog on the dark bands.
 */
export function Mark({ className = "size-7", tone = "ink" }: { className?: string; tone?: "ink" | "fog" }) {
  const mask = "url(/brand/gleo-mark.webp) center / contain no-repeat";
  return (
    <span
      aria-hidden="true"
      className={`inline-block shrink-0 ${tone === "fog" ? "bg-fog" : "bg-ink"} ${className}`}
      style={{ mask, WebkitMask: mask }}
    />
  );
}

export function Wordmark({ tone = "ink" }: { tone?: "ink" | "fog" }) {
  return (
    <Link href="/" className="flex shrink-0 items-center gap-2" aria-label={`${BRAND.name} home`}>
      <Mark tone={tone} className="size-8" />
      <span className={`text-[26px] leading-none font-medium tracking-[-0.03em] ${tone === "fog" ? "text-fog" : "text-ink"}`}>
        {BRAND.name}
      </span>
    </Link>
  );
}
