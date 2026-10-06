"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { APP_LINKS } from "@/config/nav";

/** Tool list: a vertical hairline list on wide screens, a scrolling chip row on phones. */
export function AppNav() {
  const pathname = usePathname();
  const items = [{ href: "/app", label: "Overview", status: null as "live" | "practice" | null }, ...APP_LINKS];
  return (
    <nav aria-label="App tools" className="min-w-0">
      <p className="label mb-3 hidden lg:block">Tools</p>
      <ul className="-mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)] pb-1 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-t lg:border-line-2 lg:px-0">
        {items.map((l) => {
          const active = pathname === l.href;
          return (
            <li key={l.href} className="shrink-0 lg:border-b lg:border-line-2">
              <Link
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center justify-between gap-3 rounded-full border px-4 py-2 text-[14px] whitespace-nowrap lg:rounded-none lg:border-0 lg:px-0 lg:py-3 ${
                  active ? "border-ink bg-ink text-fog lg:bg-transparent lg:font-semibold lg:text-ink" : "border-line-2 bg-paper text-ink hover:border-ink lg:bg-transparent"
                }`}
              >
                <span className="flex items-center gap-2">
                  {active ? <span className="hidden h-4 w-[3px] bg-sea lg:inline-block" aria-hidden="true" /> : null}
                  {l.label}
                </span>
                {l.status ? (
                  <span
                    className={`size-2 shrink-0 rounded-full ${l.status === "live" ? "bg-up" : "bg-flare"}`}
                    role="img"
                    aria-label={l.status === "live" ? "live tool" : "practice tool"}
                  />
                ) : null}
              </Link>
            </li>
          );
        })}
      </ul>
      <p className="mt-5 hidden text-[13px] leading-relaxed text-ink-3 lg:block">
        <span className="mr-1.5 inline-block size-2 rounded-full bg-up align-middle" /> Live: real readings or real transactions
        <br />
        <span className="mr-1.5 inline-block size-2 rounded-full bg-flare align-middle" /> Practice: free signed receipts only
      </p>
    </nav>
  );
}
