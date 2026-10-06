import type { Metadata } from "next";
import Link from "next/link";
import { Download } from "lucide-react";
import { BRAND } from "@/config/brand";
import { Mark } from "@/components/Mark";
import { Container, Section, SectionHead } from "@/components/ui";

export const metadata: Metadata = {
  title: "Brand resources",
  description: "Gleo logo files, social card, colour palette and typefaces for anyone writing about or building with Gleo.",
};

const FILES = [
  { href: "/brand/gleo-mark.webp", name: "Mark, transparent", size: "512 × 512 WebP", plate: "bg-card" },
  { href: "/brand/gleo-plate.webp", name: "Mark on plate", size: "512 × 512 WebP", plate: "bg-paper-2" },
  { href: "/brand/og.webp", name: "Social card", size: "1200 × 630 WebP", plate: "bg-night" },
];

const COLORS = [
  { name: "Ink", hex: "#0a1c24", use: "Text, dark bands", swatch: "bg-ink", dark: true },
  { name: "Fog paper", hex: "#edf0ee", use: "Page background", swatch: "bg-paper" },
  { name: "Sea", hex: "#0c7a64", use: "Primary actions, live", swatch: "bg-sea", dark: true },
  { name: "Flare", hex: "#e8612d", use: "The payment dot, practice", swatch: "bg-flare", dark: true },
  { name: "Fog", hex: "#e6eeeb", use: "Text on dark", swatch: "bg-fog" },
  { name: "Night 2", hex: "#112b35", use: "Panels on dark", swatch: "bg-night-2", dark: true },
];

const TYPE = [
  { name: "Bricolage Grotesque", role: "Headlines", cls: "font-display text-4xl font-bold tracking-tight" },
  { name: "Hanken Grotesk", role: "Body text and interface", cls: "font-sans text-3xl" },
  { name: "IBM Plex Mono", role: "Addresses, numbers, labels", cls: "font-mono text-2xl" },
];

export default function BrandPage() {
  return (
    <>
      <section className="meridians-night bg-night text-fog">
        <Container className="grid grid-cols-1 items-center gap-10 py-16 sm:py-24 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <div className="min-w-0">
            <h1 className="font-display text-[clamp(2.4rem,5.4vw,4.6rem)] leading-[0.98] font-bold tracking-[-0.03em]">The brand resource hub</h1>
            <p className="mt-6 max-w-xl text-[18px] leading-relaxed text-fog-2">
              The files and rules for showing Gleo correctly. Use them freely to write about Gleo or to show that your product works with it, within
              the <Link href="/brand-policy" className="underline underline-offset-4">brand policy</Link>.
            </p>
          </div>
          <div className="flex min-w-0 justify-center">
            <Mark tone="fog" className="size-40 sm:size-52" />
          </div>
        </Container>
      </section>

      <Section tone="card">
        <SectionHead title="The source of truth" lead="These are the only official files. If a logo looks different from these, it is not ours." />
        <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {FILES.map((f) => (
            <li key={f.href} className="min-w-0 overflow-hidden rounded-2xl border border-line-2">
              <div className={`flex aspect-[4/3] items-center justify-center p-6 ${f.plate}`}>
                <img src={f.href} alt={f.name} className="max-h-full max-w-full object-contain" />
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-line-2 p-4">
                <span className="min-w-0">
                  <span className="block font-semibold">{f.name}</span>
                  <span className="block font-mono text-[12px] text-ink-3">{f.size}</span>
                </span>
                <a href={f.href} download className="btn btn-line h-9 shrink-0 px-3 text-sm">
                  <Download className="size-4" /> Download
                </a>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <SectionHead title="Colour" lead="Fog and ink do most of the work. Sea marks what is live and what to press; flare is used sparingly, like the dot in the mark." />
        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COLORS.map((c) => (
            <li key={c.name} className="flex min-w-0 items-stretch overflow-hidden rounded-2xl border border-line-2 bg-card">
              <span className={`w-24 shrink-0 ${c.swatch}`} />
              <span className="min-w-0 p-4">
                <span className="block font-semibold">{c.name}</span>
                <span className="block font-mono text-[13px] text-ink-2">{c.hex}</span>
                <span className="mt-1 block text-[13.5px] text-ink-3">{c.use}</span>
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="card">
        <SectionHead title="Type" lead="Three free families from Google Fonts." />
        <div className="mt-10 border-t border-line-2">
          {TYPE.map((t) => (
            <div key={t.name} className="grid grid-cols-1 gap-3 border-b border-line-2 py-6 md:grid-cols-[260px_minmax(0,1fr)] md:items-center">
              <span>
                <span className="block font-semibold">{t.name}</span>
                <span className="block text-sm text-ink-3">{t.role}</span>
              </span>
              <span className={`min-w-0 break-words ${t.cls}`}>{t.name === "IBM Plex Mono" ? "0x5fc5…d168 · 250.00" : BRAND.slogan}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead title="Building your own materials" />
        <ul className="mt-8 max-w-3xl list-disc space-y-3 pl-5 text-[16px] leading-relaxed text-ink-2">
          <li>Write the name as &ldquo;Gleo&rdquo; and the token as &ldquo;{BRAND.symbol}&rdquo;. Not GLEO in running text, not Gleo Network.</li>
          <li>Keep clear space around the mark of at least the height of its dot on every side.</li>
          <li>Do not recolour, stretch, outline or animate the mark, and do not put it on a busy photo.</li>
          <li>Say &ldquo;works with Gleo&rdquo; or &ldquo;built on Gleo&rdquo;, never anything that suggests we endorse or partner with you unless we do.</li>
        </ul>
      </Section>
    </>
  );
}
