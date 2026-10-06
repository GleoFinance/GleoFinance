import { Download } from "lucide-react";
import { BRAND } from "@/config/brand";
import { pageMeta } from "@/lib/seo";
import { Mark } from "@/components/Mark";
import { ButtonLink, CtaBand, Eyebrow, PageHero, Section, SectionHead } from "@/components/ui";

export const metadata = pageMeta({
  path: "/brand",
  title: "Brand Resources: Logo Files, Colours and Fonts",
  description:
    "Download the official Gleo logo files and social card, and see the colour palette and typefaces for writing about or building with Gleo. Use them freely.",
  keywords: ["brand resources", "Gleo logo", "media kit", "brand colours", "brand fonts"],
});

const FILES = [
  { href: "/brand/gleo-mark.webp", name: "Mark, transparent", size: "512 × 512 WebP", plate: "bg-paper" },
  { href: "/brand/gleo-plate.webp", name: "Mark on plate", size: "512 × 512 WebP", plate: "bg-paper-2" },
  { href: "/brand/gleo-banner.webp", name: "Banner with wordmark", size: "1500 × 500 WebP", plate: "bg-paper-2" },
  { href: "/brand/og.webp", name: "Social card", size: "1200 × 630 WebP", plate: "bg-night" },
];

const COLORS = [
  { name: "Paper", hex: "#ffffff", use: "Page background", swatch: "bg-paper" },
  { name: "Ink", hex: "#0f0f0f", use: "Text, dark bands, primary buttons", swatch: "bg-ink" },
  { name: "Yellow", hex: "#fdda24", use: "Accent: arrow discs, live tags, highlights", swatch: "bg-sea" },
  { name: "Lavender", hex: "#b7ace8", use: "Illustration fills, practice tags", swatch: "bg-flare" },
  { name: "Teal", hex: "#00a7b5", use: "Secondary accent in illustrations", swatch: "bg-teal" },
  { name: "Sand", hex: "#d6d3c4", use: "Calm bands such as funding", swatch: "bg-sand" },
  { name: "Gray", hex: "#f2f2f2", use: "Card bands and stat cells", swatch: "bg-paper-2" },
];

const TYPE = [
  { name: "Lora", role: "Display headings, set at regular weight", cls: "font-display text-[clamp(2rem,1.6rem+1.6vw,3rem)] leading-[1.1] tracking-[-0.03em]", sample: BRAND.slogan },
  { name: "Inter", role: "Body text and interface", cls: "font-sans text-[clamp(1.4rem,1.2rem+0.8vw,1.9rem)]", sample: BRAND.slogan },
  { name: "IBM Plex Mono", role: "Addresses, amounts and data", cls: "font-mono text-[clamp(1.1rem,1rem+0.6vw,1.5rem)]", sample: "0x5fc5…d168 · 250.00 USDG" },
];

export default function BrandPage() {
  return (
    <>
      <PageHero
        eyebrow="Brand"
        title="Gleo brand resources and logo files"
        lead={
          <p>
            These Gleo brand resources are the files and rules for showing Gleo correctly. Use them freely to write about Gleo or to show that your
            product works with it, within the brand policy.
          </p>
        }
        actions={
          <>
            <ButtonLink href="#files">Download logo files</ButtonLink>
            <ButtonLink href="/brand-policy" variant="line">
              Read the brand policy
            </ButtonLink>
          </>
        }
      />

      <Section tone="night">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="min-w-0">
            <Eyebrow>The mark</Eyebrow>
            <h2 className="t-h2">A globe with a G at its equator</h2>
            <p className="t-lead mt-6 text-fog-2">
              The Gleo mark draws the letter G across the equator of a line globe: one network for money that crosses borders. Use it in solid ink
              on light backgrounds or in white on dark ones, with clear space of at least half its height around it.
            </p>
          </div>
          <div className="flex min-w-0 justify-center">
            <Mark tone="fog" className="size-40 sm:size-52" />
          </div>
        </div>
      </Section>

      <Section id="files" tone="gray">
        <SectionHead eyebrow="Downloads" title="Official logo files" lead="These are the only official files. If a logo looks different from these, it is not ours." />
        <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {FILES.map((f) => (
            <li key={f.href} className="min-w-0 border border-line bg-paper">
              <div className={`flex aspect-[4/3] items-center justify-center p-6 ${f.plate}`}>
                <img src={f.href} alt={`Gleo ${f.name.toLowerCase()}`} width={512} height={f.href.includes("og") ? 269 : f.href.includes("banner") ? 171 : 512} className="max-h-full max-w-full object-contain" />
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-line p-5">
                <span className="min-w-0">
                  <span className="block font-semibold">{f.name}</span>
                  <span className="block text-[13px] text-ink-3">{f.size}</span>
                </span>
                <a href={f.href} download className="btn btn-line h-10 shrink-0 px-4 text-sm">
                  <Download className="size-4" /> Download
                </a>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <SectionHead
          eyebrow="Colour"
          title="The Gleo colour palette"
          lead="White paper and near-black ink do most of the work. Yellow marks what to press and what is live; lavender, teal and sand fill illustrations and calm bands."
        />
        <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {COLORS.map((c) => (
            <li key={c.name} className="min-w-0 border border-line">
              <span className={`block h-28 border-b border-line ${c.swatch}`} />
              <span className="block p-5">
                <span className="block font-semibold">{c.name}</span>
                <span className="block font-mono text-[13px] text-ink-2">{c.hex}</span>
                <span className="mt-1 block text-[14px] text-ink-3">{c.use}</span>
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="gray">
        <SectionHead eyebrow="Type" title="Typefaces used on Gleo" lead="Three free families from Google Fonts." />
        <div className="mt-12 grid grid-cols-1 gap-6">
          {TYPE.map((t) => (
            <div key={t.name} className="grid min-w-0 grid-cols-1 gap-4 border border-line bg-paper p-8 md:grid-cols-[260px_minmax(0,1fr)] md:items-center">
              <span className="min-w-0">
                <span className="block font-semibold">{t.name}</span>
                <span className="block text-[14px] text-ink-3">{t.role}</span>
              </span>
              <span className={`min-w-0 break-words ${t.cls}`}>{t.sample}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow="Usage" title="Making your own Gleo materials" />
        <ul className="t-lead mt-8 max-w-[792px] list-disc space-y-3 pl-5 text-ink-2">
          <li>Write the name as &ldquo;Gleo&rdquo; and the token as &ldquo;{BRAND.symbol}&rdquo;. Not GLEO in running text, not Gleo Network.</li>
          <li>Keep clear space around the mark of at least the height of its dot on every side.</li>
          <li>Do not recolour, stretch, outline or animate the mark, and do not put it on a busy photo.</li>
          <li>Say &ldquo;works with Gleo&rdquo; or &ldquo;built on Gleo&rdquo;, never anything that suggests we endorse or partner with you unless we do.</li>
        </ul>
      </Section>

      <CtaBand
        eyebrow="Writing about Gleo?"
        title="Check the press page and policy"
        body="Official statements are listed on the press page; the brand policy explains what needs our permission."
        actions={
          <>
            <ButtonLink href="/press">Press releases</ButtonLink>
            <ButtonLink href="/brand-policy" variant="line">
              Brand policy
            </ButtonLink>
          </>
        }
      />
    </>
  );
}
