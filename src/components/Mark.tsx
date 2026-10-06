import Link from "next/link";
import { BRAND } from "@/config/brand";

/** The Gleo mark: a G drawn as a globe whose open side lets a payment out. */
export function Mark({ className = "size-7", tone = "ink" }: { className?: string; tone?: "ink" | "fog" }) {
  const stroke = tone === "fog" ? "var(--color-fog)" : "var(--color-ink)";
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path d="M24.43 8.93 A11 11 0 1 0 27 16 H17.2" fill="none" stroke={stroke} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 5 C11.2 9.4 11.2 22.6 16 27" fill="none" stroke={stroke} strokeWidth="1.3" strokeLinecap="round" opacity="0.55" />
      <circle cx="26.6" cy="6.3" r="2.7" fill="var(--color-sea)" stroke={stroke} strokeWidth="0.8" />
    </svg>
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
