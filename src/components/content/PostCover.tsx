import { Mark } from "@/components/Mark";

/* Cover art for journal posts, drawn in CSS/SVG so no stock imagery is needed:
   a coloured field per category, a fine route line, and the title set in the
   display serif. */

const PALETTE: Record<string, { bg: string; fg: string; line: string; chip: string }> = {
  Network: { bg: "#0f0f0f", fg: "#ffffff", line: "#fdda24", chip: "bg-sea text-ink" },
  Product: { bg: "#fdda24", fg: "#0f0f0f", line: "#0f0f0f", chip: "bg-ink text-fog" },
  Developers: { bg: "#b4aae8", fg: "#0f0f0f", line: "#0f0f0f", chip: "bg-ink text-fog" },
  Policy: { bg: "#00a7b5", fg: "#0f0f0f", line: "#ffffff", chip: "bg-ink text-fog" },
};

export function PostCover({
  title,
  category,
  size = "md",
  className = "",
}: {
  title: string;
  category: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const p = PALETTE[category] ?? PALETTE.Network;
  return (
    <div
      role="img"
      aria-label={`Cover: ${title}`}
      className={`relative isolate flex aspect-[4/3] w-full flex-col items-center justify-center overflow-hidden p-6 text-center ${className}`}
      style={{ background: p.bg, color: p.fg }}
    >
      <svg viewBox="0 0 400 300" className="absolute inset-0 -z-10 size-full" preserveAspectRatio="none" aria-hidden="true">
        <path d="M-10 230 C 90 140, 160 260, 250 150 S 380 60, 420 110" fill="none" stroke={p.line} strokeWidth="1.5" opacity="0.7" />
        <path d="M-10 70 H 120 V 20" fill="none" stroke={p.line} strokeWidth="1" opacity="0.35" />
        <path d="M410 250 H 300 V 290" fill="none" stroke={p.line} strokeWidth="1" opacity="0.35" />
        <circle cx="250" cy="150" r="5" fill={p.line} />
      </svg>
      {size !== "sm" ? (
        <span className="mb-3 inline-flex items-center gap-1.5 text-[13px] font-medium">
          <Mark className="size-4" tone={p.fg === "#ffffff" ? "fog" : "ink"} /> Gleo
        </span>
      ) : null}
      {size !== "sm" ? (
        <span className={`font-display leading-[1.15] ${size === "lg" ? "text-[clamp(1.5rem,1.2rem+1.4vw,2.2rem)]" : "text-[clamp(1.15rem,1rem+0.6vw,1.4rem)]"}`}>
          {title}
        </span>
      ) : null}
      <span className={`absolute top-3 left-3 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${p.chip}`}>{category}</span>
    </div>
  );
}
