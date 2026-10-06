import { Mark } from "@/components/Mark";

/* Small pieces used by the blog and learn pages (fork A group). */

const THUMB: Record<string, { bg: string; tone: "ink" | "fog" }> = {
  Network: { bg: "#0f0f0f", tone: "fog" },
  Product: { bg: "#fdda24", tone: "ink" },
  Developers: { bg: "#b4aae8", tone: "ink" },
  Policy: { bg: "#00a7b5", tone: "ink" },
};

/** Square thumbnail in the category colour with the Gleo mark; no text to clip. */
export function BlogThumb({ category, className = "size-[82px]" }: { category: string; className?: string }) {
  const t = THUMB[category] ?? THUMB.Network;
  return (
    <span className={`flex shrink-0 items-center justify-center ${className}`} style={{ background: t.bg }} aria-hidden="true">
      <Mark className="size-8" tone={t.tone} />
    </span>
  );
}

/** Small yellow pill used above post titles, as on the reference blog lists. */
export function Chip({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex rounded-full bg-sea px-2 py-px text-[10px] leading-[1.6] font-semibold text-ink">{children}</span>;
}
