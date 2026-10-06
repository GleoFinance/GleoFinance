import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import { Art, type ArtName } from "@/components/art";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd, type Crumb } from "@/lib/seo";

/* Shared page vocabulary. Every page is composed from these so the site keeps
   one rhythm: an eyebrow line, a serif heading, a sans lead, square cards with
   hairline borders, black pills with a yellow arrow disc. */

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1440px] px-[var(--gutter)] ${className}`}>{children}</div>;
}

export type Tone = "paper" | "gray" | "card" | "night" | "sand" | "lilac" | "sea";
const toneClass: Record<Tone, string> = {
  paper: "bg-paper text-ink",
  gray: "bg-paper-2 text-ink",
  card: "bg-paper-2 text-ink",
  night: "bg-night text-fog",
  sand: "bg-sand text-ink",
  lilac: "bg-lilac text-ink",
  sea: "bg-sea text-ink",
};
export const isDark = (tone: Tone) => tone === "night";

export function Section({
  children,
  tone = "paper",
  id,
  className = "",
  tight = false,
}: {
  children: React.ReactNode;
  tone?: Tone;
  id?: string;
  className?: string;
  tight?: boolean;
}) {
  return (
    <section id={id} className={`${toneClass[tone]} ${tight ? "py-12 lg:py-16" : "py-16 lg:py-20"} ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`t-eyebrow mb-4 ${className}`}>{children}</p>;
}

/** Section heading: eyebrow, serif title, lead underneath (or beside it with `split`). */
export function SectionHead({
  eyebrow,
  title,
  lead,
  action,
  dark = false,
  split = false,
  center = false,
  className = "",
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  lead?: React.ReactNode;
  action?: React.ReactNode;
  dark?: boolean;
  split?: boolean;
  center?: boolean;
  className?: string;
}) {
  const leadClass = `t-lead ${dark ? "text-fog-2" : "text-ink-2"}`;
  if (split) {
    return (
      <div className={`grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-16 ${className}`}>
        <div className="min-w-0">
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <h2 className="t-h2 text-balance">{title}</h2>
        </div>
        {lead || action ? (
          <div className="min-w-0 lg:pt-9">
            {lead ? <div className={`${leadClass} max-w-[600px]`}>{lead}</div> : null}
            {action ? <div className="mt-6">{action}</div> : null}
          </div>
        ) : null}
      </div>
    );
  }
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-[792px] ${className}`}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="t-h2 text-balance">{title}</h2>
      {lead ? <div className={`${leadClass} mt-6`}>{lead}</div> : null}
      {action ? <div className={`mt-6 flex flex-wrap gap-3 ${center ? "justify-center" : ""}`}>{action}</div> : null}
    </div>
  );
}

/** Black (or outlined) pill with the yellow arrow disc. */
export function ButtonLink({
  href,
  children,
  variant = "ink",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "ink" | "accent" | "line" | "fog";
  className?: string;
}) {
  const external = /^https?:/.test(href);
  const tone = variant === "line" ? "pill-line" : variant === "fog" ? "pill-fog" : "pill-ink";
  const cls = `pill ${tone} ${className}`;
  const disc = <span className="pill-disc">{external ? <ArrowUpRight className="size-4" /> : <ArrowRight className="size-4" />}</span>;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cls}>
        {children}
        {disc}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
      {disc}
    </Link>
  );
}

/** Plain text link led by a small yellow arrow. */
export function TextLink({
  href,
  children,
  dark = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
}) {
  const external = /^https?:/.test(href);
  const cls = `group inline-flex items-center gap-2 text-[16px] leading-relaxed ${dark ? "text-fog" : "text-ink"} ${className}`;
  const arrow = external ? (
    <ArrowUpRight className={`size-4 shrink-0 ${dark ? "text-sea" : "text-ink"}`} />
  ) : (
    <ArrowRight className={`size-4 shrink-0 transition-transform group-hover:translate-x-0.5 ${dark ? "text-sea" : "text-ink"}`} />
  );
  const label = <span className="underline-offset-4 group-hover:underline">{children}</span>;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cls}>
        {arrow}
        {label}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {arrow}
      {label}
    </Link>
  );
}

export type TagTone = "live" | "practice" | "target" | "plan" | "example";
const tagClass: Record<TagTone, string> = {
  live: "bg-sea text-ink",
  practice: "bg-flare-soft text-flare-deep",
  target: "bg-paper-2 text-ink-2",
  plan: "bg-paper-2 text-ink-2",
  example: "bg-paper-2 text-ink-2",
};
const tagText: Record<TagTone, string> = {
  live: "Live",
  practice: "Practice",
  target: "Design target",
  plan: "Planned",
  example: "Illustrative",
};

export function Tag({ tone, children }: { tone: TagTone; children?: React.ReactNode }) {
  return (
    <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] leading-[1.6] font-semibold ${tagClass[tone]}`}>
      {tone === "live" ? <span className="live-dot size-1.5 rounded-full bg-ink" /> : null}
      {children ?? tagText[tone]}
    </span>
  );
}

export type HeroTone = "paper" | "night" | "lilac" | "sea" | "gray" | "teal";
const heroTone: Record<HeroTone, string> = {
  paper: "bg-paper text-ink",
  night: "bg-night text-fog",
  lilac: "bg-lilac text-ink",
  sea: "bg-sea text-ink",
  gray: "bg-paper-2 text-ink",
  teal: "bg-teal text-ink",
};

/** Page opener: eyebrow, serif H1, lead and pills on the left; a drawing on the right. */
export function PageHero({
  eyebrow,
  title,
  lead,
  actions,
  art,
  tone = "paper",
  meta,
  crumbs,
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  lead: React.ReactNode;
  actions?: React.ReactNode;
  art?: ArtName;
  tone?: HeroTone;
  meta?: React.ReactNode;
  crumbs?: Crumb[];
}) {
  const night = tone === "night";
  return (
    <section className={heroTone[tone]}>
      {crumbs ? <JsonLd data={breadcrumbLd(crumbs)} /> : null}
      <Container
        className={`grid min-h-[min(560px,calc(100svh-var(--header-h)))] grid-cols-1 items-center gap-10 py-16 lg:py-24 ${art ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-20" : ""}`}
      >
        <div className="min-w-0 max-w-[680px]">
          {meta ? <div className="mb-5 flex flex-wrap items-center gap-2">{meta}</div> : null}
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <h1 className="t-h1 text-balance">{title}</h1>
          <div className={`t-lead mt-8 ${night ? "text-fog-2" : tone === "paper" || tone === "gray" ? "text-ink-2" : "text-ink/80"}`}>{lead}</div>
          {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
        </div>
        {art ? (
          <div className="mx-auto w-full max-w-[460px] min-w-0">
            <Art name={art} night={night} />
          </div>
        ) : null}
      </Container>
    </section>
  );
}

/** Hairline list: title and body per row, optional link. */
export function Rows({
  items,
  dark = false,
  numbered = true,
  cols = 1,
}: {
  items: { title: React.ReactNode; body: React.ReactNode; href?: string; meta?: React.ReactNode }[];
  dark?: boolean;
  numbered?: boolean;
  cols?: 1 | 2;
}) {
  const line = dark ? "border-fog/20" : "border-line-2";
  return (
    <ol className={`grid grid-cols-1 ${cols === 2 ? "md:grid-cols-2 md:gap-x-12" : ""}`}>
      {items.map((item, i) => {
        const inner = (
          <div className={`grid grid-cols-[auto_minmax(0,1fr)] gap-x-6 border-t ${line} py-7`}>
            <span className={`pt-0.5 text-[14px] tabular-nums ${dark ? "text-fog-2" : "text-ink-3"}`}>{numbered ? String(i + 1).padStart(2, "0") : "—"}</span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <h3 className="t-h3">{item.title}</h3>
                {item.meta}
              </div>
              <div className={`t-lead mt-2 ${dark ? "text-fog-2" : "text-ink-2"}`}>{item.body}</div>
              {item.href ? (
                <span className={`mt-3 inline-flex items-center gap-2 text-[16px] ${dark ? "text-fog" : "text-ink"}`}>
                  <ArrowRight className={`size-4 ${dark ? "text-sea" : ""}`} /> Read more
                </span>
              ) : null}
            </div>
          </div>
        );
        return (
          <li key={i} className="min-w-0">
            {item.href ? (
              <Link href={item.href} className="block transition-opacity hover:opacity-80">
                {inner}
              </Link>
            ) : (
              inner
            )}
          </li>
        );
      })}
    </ol>
  );
}

/** Words beside a drawing. */
export function Split({
  eyebrow,
  title,
  children,
  art,
  reverse = false,
  dark = false,
  as = "h2",
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  children: React.ReactNode;
  art: ArtName;
  reverse?: boolean;
  dark?: boolean;
  as?: "h2" | "h3";
}) {
  const H = as;
  return (
    <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-24">
      <div className={`min-w-0 ${reverse ? "lg:order-2" : ""}`}>
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <H className="t-h2 text-balance">{title}</H>
        <div className={`t-lead mt-6 space-y-4 ${dark ? "text-fog-2" : "text-ink-2"}`}>{children}</div>
      </div>
      <div className="mx-auto w-full max-w-[520px] min-w-0">
        <Art name={art} night={dark} />
      </div>
    </div>
  );
}

/** A left-to-right sequence. */
export function Steps({ steps, dark = false }: { steps: { title: string; body: React.ReactNode }[]; dark?: boolean }) {
  return (
    <ol className={`grid grid-cols-1 gap-6 sm:grid-cols-2 ${steps.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
      {steps.map((step, i) => (
        <li key={step.title} className={`min-w-0 border p-8 ${dark ? "border-fog/25 bg-night-2" : "border-line bg-paper"}`}>
          <span className="flex size-8 items-center justify-center rounded-full bg-sea text-[14px] font-semibold text-ink">{i + 1}</span>
          <h3 className="mt-6 text-[17px] leading-snug font-semibold">{step.title}</h3>
          <div className={`mt-3 text-[16px] leading-relaxed ${dark ? "text-fog-2" : "text-ink-2"}`}>{step.body}</div>
        </li>
      ))}
    </ol>
  );
}

export function Faq({ items, dark = false }: { items: { q: string; a: React.ReactNode }[]; dark?: boolean }) {
  return (
    <div className={`divide-y border-y ${dark ? "divide-fog/15 border-fog/15" : "divide-line border-line"}`}>
      {items.map((item) => (
        <details key={item.q} className="group py-6">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-[18px] leading-snug font-semibold [&::-webkit-details-marker]:hidden">
            <h3 className="min-w-0">{item.q}</h3>
            <span className={`flex size-8 shrink-0 items-center justify-center rounded-full border ${dark ? "border-fog/40" : "border-ink"}`}>
              <ChevronDown className="size-4 transition-transform group-open:rotate-180" />
            </span>
          </summary>
          <div className={`t-lead mt-4 max-w-3xl ${dark ? "text-fog-2" : "text-ink-2"}`}>{item.a}</div>
        </details>
      ))}
    </div>
  );
}

/** Square bordered cards for "where next" lists. */
export function LinkTiles({
  items,
  cols = 3,
  dark = false,
}: {
  items: { href: string; title: string; body: React.ReactNode; tag?: TagTone; label?: string }[];
  cols?: 2 | 3 | 4;
  dark?: boolean;
}) {
  const grid = cols === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : cols === 2 ? "md:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";
  return (
    <ul className={`grid grid-cols-1 gap-6 ${grid}`}>
      {items.map((item) => {
        const external = /^https?:/.test(item.href);
        const body = (
          <>
            <div className="flex items-start justify-between gap-3">
              <h3 className="min-w-0 text-[18px] leading-snug font-semibold">{item.title}</h3>
              {item.tag ? <Tag tone={item.tag} /> : null}
            </div>
            <div className={`mt-4 flex-1 text-[16px] leading-relaxed ${dark ? "text-fog-2" : "text-ink-2"}`}>{item.body}</div>
            <span className={`mt-6 inline-flex items-center gap-2 text-[16px] ${dark ? "text-fog" : "text-ink"}`}>
              {external ? <ArrowUpRight className={`size-4 ${dark ? "text-sea" : ""}`} /> : <ArrowRight className={`size-4 ${dark ? "text-sea" : ""}`} />}
              {item.label ?? "Learn more"}
            </span>
          </>
        );
        const cls = `flex h-full flex-col border p-8 transition-colors lg:p-10 ${
          dark ? "border-fog/25 bg-night-2 hover:border-fog" : "border-line bg-paper hover:border-ink"
        }`;
        return (
          <li key={item.href + item.title} className="min-w-0">
            {external ? (
              <a href={item.href} target="_blank" rel="noreferrer" className={cls}>
                {body}
              </a>
            ) : (
              <Link href={item.href} className={cls}>
                {body}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/** Plain square cards (no link) on a gray band. */
export function InfoCards({
  items,
  cols = 4,
}: {
  items: { title: React.ReactNode; body: React.ReactNode; meta?: React.ReactNode }[];
  cols?: 2 | 3 | 4;
}) {
  const grid = cols === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : cols === 2 ? "md:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";
  return (
    <ul className={`grid grid-cols-1 gap-6 ${grid}`}>
      {items.map((item, i) => (
        <li key={i} className="min-w-0 border border-line bg-paper p-8 lg:p-10">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-[16px] leading-snug font-semibold">{item.title}</h3>
            {item.meta}
          </div>
          <div className="mt-4 text-[16px] leading-relaxed text-ink-2">{item.body}</div>
        </li>
      ))}
    </ul>
  );
}

/** Closing band: centred heading over a drifting yellow light, pills below. */
export function CtaBand({
  eyebrow,
  title,
  body,
  actions,
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  body?: React.ReactNode;
  actions: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-paper text-ink">
      <div className="glow-field -z-10" aria-hidden="true" />
      <Container className="py-20 lg:py-24">
        <div className="mx-auto max-w-[612px] text-center">
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <h2 className="t-h2 text-balance">{title}</h2>
          {body ? <p className="t-lead mt-6 text-ink-2">{body}</p> : null}
          <div className="mt-8 flex flex-wrap justify-center gap-3">{actions}</div>
        </div>
      </Container>
    </section>
  );
}

/** Stat grid: square cells with a hairline frame, big serif numbers, honest labels. */
export function Figures({
  items,
  dark = false,
}: {
  items: { value: React.ReactNode; label: string; note?: React.ReactNode; tag?: TagTone }[];
  dark?: boolean;
}) {
  return (
    <dl
      className={`grid grid-cols-1 border-t border-l sm:grid-cols-2 ${items.length >= 4 ? "xl:grid-cols-4" : "lg:grid-cols-3"} ${
        dark ? "border-fog/30" : "border-rule"
      }`}
    >
      {items.map((item) => (
        <div key={item.label} className={`flex min-w-0 flex-col border-r border-b p-4 lg:p-5 ${dark ? "border-fog/30" : "border-rule bg-paper-2"}`}>
          <dt className={`flex flex-wrap items-center gap-2 text-[16px] font-medium ${dark ? "text-fog" : "text-ink"}`}>
            {item.label}
            {item.tag ? <Tag tone={item.tag} /> : null}
          </dt>
          <dd className="mt-6 font-display text-[clamp(2.2rem,1.9rem+1.2vw,3.2rem)] leading-none tracking-[-0.02em] [overflow-wrap:anywhere] tabular-nums">{item.value}</dd>
          {item.note ? <dd className={`mt-auto pt-6 text-[12.5px] leading-snug ${dark ? "text-fog-2" : "text-ink"}`}>{item.note}</dd> : null}
        </div>
      ))}
    </dl>
  );
}

/** Long-form page body (legal, policies, articles). */
export function LongForm({
  eyebrow,
  title,
  lead,
  updated,
  crumbs,
  children,
}: {
  eyebrow?: React.ReactNode;
  title: string;
  lead?: React.ReactNode;
  updated?: string;
  crumbs?: Crumb[];
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="bg-paper">
        {crumbs ? <JsonLd data={breadcrumbLd(crumbs)} /> : null}
        <Container className="pt-16 pb-10 lg:pt-24">
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <h1 className="t-h1 max-w-4xl text-balance">{title}</h1>
          {lead ? <div className="t-lead mt-8 max-w-[680px] text-ink-2">{lead}</div> : null}
          {updated ? <p className="mt-6 text-[13px] text-ink-3">Last updated {updated}</p> : null}
        </Container>
      </section>
      <section className="bg-paper">
        <Container className="pb-20 lg:pb-24">
          <div className="prose-gleo max-w-[792px] border-t border-line pt-10">{children}</div>
        </Container>
      </section>
    </>
  );
}
