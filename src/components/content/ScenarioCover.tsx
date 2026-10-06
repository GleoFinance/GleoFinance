import { Coins, HandHeart, LineChart, Repeat, Users, type LucideIcon } from "lucide-react";
import { Glyph } from "@/components/glyph";

/* Cover panel for a field scenario: a flat colour per area with a spot
   glyph and the "Illustrative" chip, so no photography is needed. */

const AREA_BG: Record<string, { bg: string; dark: boolean }> = {
  Payments: { bg: "#fdda24", dark: false },
  Tokenization: { bg: "#b4aae8", dark: false },
  Ramps: { bg: "#00a7b5", dark: false },
  Aid: { bg: "#d6d3c4", dark: false },
  DeFi: { bg: "#0f0f0f", dark: true },
};

export function ScenarioCover({
  area,
  icon,
  label,
  className = "",
}: {
  area: string;
  icon: LucideIcon;
  label: string;
  className?: string;
}) {
  const tone = AREA_BG[area] ?? AREA_BG.Payments;
  return (
    <div
      role="img"
      aria-label={label}
      className={`relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden ${className}`}
      style={{ background: tone.bg }}
    >
      <svg viewBox="0 0 400 225" className="absolute inset-0 size-full" preserveAspectRatio="none" aria-hidden="true">
        <path
          d="M-10 180 C 80 110, 150 210, 240 120 S 380 50, 420 90"
          fill="none"
          stroke={tone.dark ? "#fdda24" : "#0f0f0f"}
          strokeWidth="1.2"
          opacity="0.5"
        />
      </svg>
      <Glyph icon={icon} dark={tone.dark} size={96} />
      <span className={`absolute top-3 left-3 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${tone.dark ? "bg-sea text-ink" : "bg-ink text-fog"}`}>
        Illustrative
      </span>
    </div>
  );
}

/** Spot icon per scenario area. */
export const SCENARIO_ICONS: Record<string, LucideIcon> = {
  Payments: Users,
  Tokenization: Coins,
  Ramps: Repeat,
  Aid: HandHeart,
  DeFi: LineChart,
};
