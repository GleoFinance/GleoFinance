import Link from "next/link";
import { ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import { Art, type ArtName } from "@/components/art";

/* Shared page vocabulary. Pages are composed from these so the whole site
   keeps one rhythm: left-aligned heads, hairline ledgers, few cards. */

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1280px] px-4 sm:px-6 ${className}`}>{children}</div>;
}

type Tone = "paper" | "card" | "night" | "sea";
const toneClass: Record<Tone, string> = {
  paper: "bg-paper text-ink",
  card: "bg-card text-ink",
  night: "bg-night text-fog",
  sea: "bg-sea text-white",
};

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
    <section id={id} className={`${toneClass[tone]} ${tight ? "py-12 sm:py-16" : "py-16 sm:py-24"} ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

/** Section heading: title on the left, a short lead (and an action) beside it on wide screens. */
export function SectionHead({
  title,
  lead,
  action,
  dark = false,
  className = "",
}: {
  title: React.ReactNode;
  lead?: React.ReactNode;
  action?: React.ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={`grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-end lg:gap-12 ${className}`}>
      <h2 className="font-display text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.05] font-bold tracking-[-0.02em] text-balance">{title}</h2>
      {lead || action ? (
        <div className="min-w-0">
          {lead ? <p className={`max-w-xl text-[17px] leading-relaxed ${dark ? "text-fog-2" : "text-ink-2"}`}>{lead}</p> : null}
          {action ? <div className="mt-5">{action}</div> : null}
        </div>
      ) : null}
    </div>
  );
}

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
  const cls = `btn btn-${variant} h-11 px-5 text-[15px] ${className}`;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cls}>
        {children}
        <ArrowUpRight className="size-4" />
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
      <ArrowRight className="size-4" />
    </Link>
  );
}

export type TagTone = "live" | "practice" | "target" | "plan" | "example";
const tagClass: Record<TagTone, string> = {
  live: "bg-sea-soft text-sea-deep",
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
    <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2 py-0.5 font-mono text-[10.5px] tracking-wide uppercase ${tagClass[tone]}`}>
      {tone === "live" ? <span className="live-dot size-1.5 rounded-full bg-sea" /> : null}
      {children ?? tagText[tone]}
    </span>
  );
}

/** Page opener: words on the left, a drawing on the right. */
export function PageHero({
  title,
  lead,
  actions,
  art,
  tone = "paper",
  meta,
}: {
  title: React.ReactNode;
  lead: React.ReactNode;
  actions?: React.ReactNode;
  art?: ArtName;
  tone?: "paper" | "night";
  meta?: React.ReactNode;
}) {
  const night = tone === "night";
  return (
    <section className={`${night ? "meridians-night bg-night text-fog" : "meridians bg-paper text-ink"} border-b border-line`}>
      <Container className="grid grid-cols-1 items-center gap-10 py-14 sm:py-20 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16">
        <div className="min-w-0">
          {meta ? <div className="mb-5 flex flex-wrap items-center gap-2">{meta}</div> : null}
          <h1 className="font-display text-[clamp(2.4rem,5.4vw,4.6rem)] leading-[0.98] font-bold tracking-[-0.03em] text-balance">{title}</h1>
          <p className={`mt-6 max-w-xl text-[18px] leading-relaxed ${night ? "text-fog-2" : "text-ink-2"}`}>{lead}</p>
          {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
        </div>
        {art ? (
          <div className="min-w-0">
            <Art name={art} night={night} />
          </div>
        ) : null}
      </Container>
    </section>
  );
}

/** Ledger-style list: numbered rows separated by hairlines. */
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
  const line = dark ? "border-fog/15" : "border-line-2";
  return (
    <ol className={`grid grid-cols-1 ${cols === 2 ? "md:grid-cols-2 md:gap-x-12" : ""}`}>
      {items.map((item, i) => {
        const inner = (
          <div className={`grid grid-cols-[auto_minmax(0,1fr)] gap-x-5 border-t ${line} py-6`}>
            <span className={`pt-1 font-mono text-[12px] ${dark ? "text-fog-2" : "text-ink-3"}`}>{numbered ? String(i + 1).padStart(2, "0") : "—"}</span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <h3 className="font-display text-[1.3rem] leading-snug font-semibold">{item.title}</h3>
                {item.meta}
              </div>
              <div className={`mt-2 text-[15.5px] leading-relaxed ${dark ? "text-fog-2" : "text-ink-2"}`}>{item.body}</div>
              {item.href ? (
                <span className={`mt-3 inline-flex items-center gap-1 text-sm font-semibold ${dark ? "text-fog" : "text-sea-deep"}`}>
                  Read more <ArrowRight className="size-3.5" />
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
  title,
  children,
  art,
  reverse = false,
  dark = false,
}: {
  title: React.ReactNode;
  children: React.ReactNode;
  art: ArtName;
  reverse?: boolean;
  dark?: boolean;
}) {
  return (
    <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div className={`min-w-0 ${reverse ? "lg:order-2" : ""}`}>
        <h2 className="font-display text-[clamp(1.8rem,3.2vw,2.6rem)] leading-[1.08] font-bold tracking-[-0.02em] text-balance">{title}</h2>
        <div className={`mt-5 space-y-4 text-[16.5px] leading-relaxed ${dark ? "text-fog-2" : "text-ink-2"}`}>{children}</div>
      </div>
      <div className="min-w-0">
        <Art name={art} night={dark} />
      </div>
    </div>
  );
}

/** A left-to-right sequence with a connecting rule. */
export function Steps({ steps, dark = false }: { steps: { title: string; body: React.ReactNode }[]; dark?: boolean }) {
  return (
    <ol className={`grid grid-cols-1 gap-8 sm:grid-cols-2 ${steps.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
      {steps.map((step, i) => (
        <li key={step.title} className="min-w-0">
          <div className="flex items-center gap-3">
            <span
              className={`flex size-9 shrink-0 items-center justify-center rounded-full font-mono text-sm font-semibold ${
                dark ? "bg-fog text-ink" : "bg-ink text-fog"
              }`}
            >
              {i + 1}
            </span>
            <span className={`h-px flex-1 ${dark ? "bg-fog/20" : "bg-line-2"}`} />
          </div>
          <h3 className="mt-4 text-[17px] font-bold">{step.title}</h3>
          <div className={`mt-1.5 text-[15px] leading-relaxed ${dark ? "text-fog-2" : "text-ink-2"}`}>{step.body}</div>
        </li>
      ))}
    </ol>
  );
}

export function Faq({ items, dark = false }: { items: { q: string; a: React.ReactNode }[]; dark?: boolean }) {
  return (
    <div className={`divide-y border-y ${dark ? "divide-fog/15 border-fog/15" : "divide-line-2 border-line-2"}`}>
      {items.map((item) => (
        <details key={item.q} className="group py-5">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-[17px] font-semibold [&::-webkit-details-marker]:hidden">
            <span className="min-w-0">{item.q}</span>
            <Plus className="mt-1 size-4 shrink-0 transition-transform group-open:rotate-45" />
          </summary>
          <div className={`mt-3 max-w-3xl text-[15.5px] leading-relaxed ${dark ? "text-fog-2" : "text-ink-2"}`}>{item.a}</div>
        </details>
      ))}
    </div>
  );
}

/** Bordered link tiles; used for "where next" lists, not as decoration. */
export function LinkTiles({
  items,
  cols = 3,
}: {
  items: { href: string; title: string; body: React.ReactNode; tag?: TagTone; label?: string }[];
  cols?: 2 | 3 | 4;
}) {
  const grid = cols === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : cols === 2 ? "md:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";
  return (
    <ul className={`grid grid-cols-1 gap-4 ${grid}`}>
      {items.map((item) => {
        const external = /^https?:/.test(item.href);
        const body = (
          <>
            <div className="flex items-start justify-between gap-3">
              <h3 className="min-w-0 text-[17px] leading-snug font-bold">{item.title}</h3>
              {item.tag ? <Tag tone={item.tag} /> : external ? <ArrowUpRight className="size-4 shrink-0 text-ink-3" /> : <ArrowRight className="size-4 shrink-0 text-ink-3" />}
            </div>
            <div className="mt-2 text-[14.5px] leading-relaxed text-ink-2">{item.body}</div>
            {item.label ? <p className="mt-4 text-sm font-semibold text-sea-deep">{item.label}</p> : null}
          </>
        );
        const cls = "flex h-full flex-col rounded-2xl border border-line-2 bg-card p-5 transition-colors hover:border-ink";
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

/** Closing band at the foot of a page. */
export function CtaBand({ title, body, actions }: { title: React.ReactNode; body?: React.ReactNode; actions: React.ReactNode }) {
  return (
    <section className="meridians-night bg-night text-fog">
      <Container className="grid grid-cols-1 gap-8 py-16 sm:py-20 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-end">
        <h2 className="font-display text-[clamp(2rem,4vw,3.4rem)] leading-[1.02] font-bold tracking-[-0.025em] text-balance">{title}</h2>
        <div className="min-w-0">
          {body ? <p className="text-[17px] leading-relaxed text-fog-2">{body}</p> : null}
          <div className="mt-6 flex flex-wrap gap-3">{actions}</div>
        </div>
      </Container>
    </section>
  );
}

/** Big figures with an honest label under each one. */
export function Figures({
  items,
  dark = false,
}: {
  items: { value: React.ReactNode; label: string; note?: React.ReactNode; tag?: TagTone }[];
  dark?: boolean;
}) {
  return (
    <dl className={`grid grid-cols-1 border-t sm:grid-cols-2 ${items.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"} ${dark ? "border-fog/15" : "border-line-2"}`}>
      {items.map((item) => (
        <div key={item.label} className={`min-w-0 border-b py-6 sm:pr-6 ${dark ? "border-fog/15" : "border-line-2"}`}>
          <dt className={`flex flex-wrap items-center gap-2 text-sm ${dark ? "text-fog-2" : "text-ink-3"}`}>
            {item.label}
            {item.tag ? <Tag tone={item.tag} /> : null}
          </dt>
          <dd className="mt-2 font-display text-[clamp(2rem,3.4vw,2.8rem)] leading-none font-bold tracking-tight tabular-nums">{item.value}</dd>
          {item.note ? <dd className={`mt-2 text-[13.5px] leading-snug ${dark ? "text-fog-2" : "text-ink-3"}`}>{item.note}</dd> : null}
        </div>
      ))}
    </dl>
  );
}

/** Long-form page body (legal, policies, articles). */
export function LongForm({
  title,
  lead,
  updated,
  children,
}: {
  title: string;
  lead?: React.ReactNode;
  updated?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="meridians border-b border-line bg-paper">
        <Container className="py-14 sm:py-20">
          <h1 className="max-w-4xl font-display text-[clamp(2.3rem,5vw,4rem)] leading-[1] font-bold tracking-[-0.03em]">{title}</h1>
          {lead ? <p className="mt-5 max-w-2xl text-[18px] leading-relaxed text-ink-2">{lead}</p> : null}
          {updated ? <p className="mt-5 font-mono text-[12px] text-ink-3">Last updated {updated}</p> : null}
        </Container>
      </section>
      <section className="bg-card">
        <Container className="py-12 sm:py-16">
          <div className="prose-gleo max-w-3xl">{children}</div>
        </Container>
      </section>
    </>
  );
}
