import type { LucideIcon } from "lucide-react";

/**
 * Small spot illustration: a line icon in ink (or white on dark bands) over
 * two offset colour blobs, yellow and lavender. Used where a section shows a
 * hand-drawn icon above a card heading.
 */
export function Glyph({ icon: Icon, dark = false, size = 64 }: { icon: LucideIcon; dark?: boolean; size?: number }) {
  return (
    <span className="relative inline-flex shrink-0 items-center justify-center" style={{ width: size, height: size }} aria-hidden="true">
      <span className="absolute rounded-full bg-sea" style={{ width: size * 0.55, height: size * 0.55, left: size * 0.04, top: size * 0.22 }} />
      <span
        className="absolute rounded-full bg-flare"
        style={{ width: size * 0.3, height: size * 0.3, right: size * 0.06, bottom: size * 0.04, opacity: dark ? 0.9 : 1 }}
      />
      <Icon className={`relative ${dark ? "text-fog" : "text-ink"}`} style={{ width: size * 0.8, height: size * 0.8 }} strokeWidth={1.4} />
    </span>
  );
}
