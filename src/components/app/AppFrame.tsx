"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { APP_LINKS } from "@/config/nav";
import { Container, Tag } from "@/components/ui";

/** Shell for the app tools: a tool list on the side, the tool on the right. */
export function AppFrame({
  title,
  lead,
  status,
  children,
  aside,
}: {
  title: string;
  lead: React.ReactNode;
  status: "live" | "practice";
  children: React.ReactNode;
  aside?: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <div className="bg-paper">
      <Container className="grid grid-cols-1 gap-8 py-8 sm:py-12 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-12">
        <nav aria-label="App tools" className="min-w-0">
          <ul className="-mx-4 flex gap-1 overflow-x-auto px-4 pb-1 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0">
            <li className="shrink-0">
              <Link
                href="/app"
                className={`block rounded-full px-3 py-1.5 text-sm font-semibold whitespace-nowrap lg:rounded-lg ${pathname === "/app" ? "bg-ink text-fog" : "text-ink-2 hover:bg-card"}`}
              >
                Overview
              </Link>
            </li>
            {APP_LINKS.map((l) => (
              <li key={l.href} className="shrink-0">
                <Link
                  href={l.href}
                  className={`flex items-center justify-between gap-2 rounded-full px-3 py-1.5 text-sm font-semibold whitespace-nowrap lg:rounded-lg ${
                    pathname === l.href ? "bg-ink text-fog" : "text-ink-2 hover:bg-card"
                  }`}
                >
                  {l.label}
                  <span className={`size-1.5 rounded-full ${l.status === "live" ? "bg-sea" : "bg-flare"}`} aria-label={l.status} />
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-4 hidden text-[12.5px] leading-relaxed text-ink-3 lg:block">
            <span className="mr-1 inline-block size-1.5 rounded-full bg-sea align-middle" /> live: real transactions or real readings
            <br />
            <span className="mr-1 inline-block size-1.5 rounded-full bg-flare align-middle" /> practice: signed receipts only
          </p>
        </nav>
        <div className="min-w-0">
          <div className="grid grid-cols-1 gap-6 border-b border-line-2 pb-8 xl:grid-cols-[minmax(0,1fr)_minmax(0,340px)] xl:items-end">
            <div className="min-w-0">
              <div className="mb-3">
                <Tag tone={status} />
              </div>
              <h1 className="font-display text-[clamp(2.2rem,4.4vw,3.6rem)] leading-[1] font-bold tracking-[-0.03em]">{title}</h1>
              <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-ink-2">{lead}</p>
            </div>
            {aside ? <div className="min-w-0">{aside}</div> : null}
          </div>
          <div className="pt-8">{children}</div>
        </div>
      </Container>
    </div>
  );
}

export function PracticeNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-flare/40 bg-flare-soft px-4 py-3 text-[14px] leading-relaxed text-ink">
      <strong className="font-semibold text-flare-deep">Practice mode.</strong> {children}
    </div>
  );
}
