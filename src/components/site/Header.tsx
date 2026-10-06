"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { APP_LINKS, MENUS, type NavMenu } from "@/config/nav";
import { BRAND } from "@/config/brand";
import { Wordmark } from "@/components/Mark";
import { CopyCaTag } from "@/components/CopyCa";
import { NavWallet } from "@/components/wallet/WalletButton";

const APP_MENU: NavMenu = { label: "App", links: APP_LINKS };

export function Header() {
  const [open, setOpen] = useState<string | null>(null);
  const [drawer, setDrawer] = useState(false);
  const pathname = usePathname();
  const bar = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  // Close menus on navigation (state adjusted during render, not in an effect).
  const [seenPath, setSeenPath] = useState(pathname);
  if (seenPath !== pathname) {
    setSeenPath(pathname);
    setOpen(null);
    setDrawer(false);
  }

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!bar.current?.contains(e.target as Node)) setOpen(null);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("pointerdown", onPointer);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const enter = (label: string) => {
    window.clearTimeout(closeTimer.current);
    setOpen(label);
  };
  const leave = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(null), 180);
  };

  const menus = [...MENUS, APP_MENU];
  const active = menus.find((m) => m.label === open) ?? null;

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur-md">
      <div ref={bar} className="relative mx-auto flex h-16 max-w-[1280px] items-center gap-3 px-4 sm:px-6" onMouseLeave={leave}>
        <Wordmark />
        <nav aria-label="Main" className="ml-6 hidden items-center gap-0.5 lg:flex">
          {menus.map((menu) => (
            <button
              key={menu.label}
              type="button"
              aria-expanded={open === menu.label}
              onClick={() => setOpen(open === menu.label ? null : menu.label)}
              onMouseEnter={() => enter(menu.label)}
              className={`flex h-9 cursor-pointer items-center gap-1 rounded-full px-3 text-[14.5px] font-medium transition-colors ${
                open === menu.label ? "bg-ink text-fog" : "text-ink-2 hover:text-ink"
              }`}
            >
              {menu.label}
              <ChevronDown className={`size-3.5 transition-transform ${open === menu.label ? "rotate-180" : ""}`} />
            </button>
          ))}
        </nav>

        <div className="ml-auto flex min-w-0 items-center gap-2">
          <CopyCaTag />
          <div className="hidden sm:block">
            <NavWallet />
          </div>
          <div className="sm:hidden">
            <NavWallet compact />
          </div>
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setDrawer(true)}
            className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-line-2 text-ink lg:hidden"
          >
            <Menu className="size-4" />
          </button>
        </div>

        {active ? (
          <div
            className="absolute top-full right-4 left-4 hidden pt-2 lg:block"
            onMouseEnter={() => enter(active.label)}
            onMouseLeave={leave}
          >
            <MegaPanel menu={active} />
          </div>
        ) : null}
      </div>
      {drawer ? <Drawer onClose={() => setDrawer(false)} menus={menus} /> : null}
    </header>
  );
}

function MegaPanel({ menu }: { menu: NavMenu }) {
  const isApp = menu.label === "App";
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_300px] overflow-hidden rounded-2xl border border-line-2 bg-card shadow-[0_24px_60px_-30px_rgba(10,28,36,0.45)]">
      <ul className={`grid gap-x-6 gap-y-1 p-5 ${menu.links.length > 5 ? "grid-cols-3" : "grid-cols-2"}`}>
        {menu.links.map((link) => {
          const status = isApp ? APP_LINKS.find((a) => a.href === link.href)?.status : undefined;
          return (
            <li key={link.href}>
              <Link href={link.href} className="group block rounded-xl px-3 py-2.5 transition-colors hover:bg-paper">
                <span className="flex items-center gap-2 text-[15px] font-semibold text-ink">
                  {link.label}
                  {status ? (
                    <span
                      className={`rounded-full px-1.5 py-px font-mono text-[9.5px] tracking-wide uppercase ${
                        status === "live" ? "bg-sea-soft text-sea-deep" : "bg-flare-soft text-flare-deep"
                      }`}
                    >
                      {status}
                    </span>
                  ) : null}
                </span>
                {link.note ? <span className="mt-0.5 block text-[13px] leading-snug text-ink-3">{link.note}</span> : null}
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="flex flex-col justify-between bg-night p-6 text-fog">
        {menu.feature ? (
          <>
            <div>
              <p className="font-display text-xl leading-tight font-semibold">{menu.feature.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-fog-2">{menu.feature.body}</p>
            </div>
            <Link href={menu.feature.href} className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-fog hover:underline">
              Go there <ArrowUpRight className="size-4" />
            </Link>
          </>
        ) : isApp ? (
          <div>
            <p className="font-display text-xl leading-tight font-semibold">Live or practice</p>
            <p className="mt-2 text-sm leading-relaxed text-fog-2">
              Live tools move real tokens from your wallet. Practice tools need Gleo contracts that are not deployed yet, so they run on
              signed receipts and never ask for a transaction.
            </p>
          </div>
        ) : (
          <div>
            <p className="font-display text-xl leading-tight font-semibold">Talk to us</p>
            <p className="mt-2 text-sm leading-relaxed text-fog-2">Announcements land on X first.</p>
            <a href={BRAND.x} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold hover:underline">
              {BRAND.xHandle} on X <ArrowUpRight className="size-4" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

function Drawer({ onClose, menus }: { onClose: () => void; menus: NavMenu[] }) {
  const [section, setSection] = useState<string | null>("App");
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  // The header blurs what is behind it, which would trap a fixed drawer
  // inside it; the drawer is rendered on <body> instead.
  return createPortal(
    <div role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-[60] flex flex-col bg-paper lg:hidden">
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-4 sm:px-6">
        <Wordmark />
        <button type="button" aria-label="Close menu" onClick={onClose} className="flex size-9 cursor-pointer items-center justify-center rounded-full border border-line-2">
          <X className="size-4" />
        </button>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-10 sm:px-6">
        {menus.map((menu) => (
          <div key={menu.label} className="border-b border-line">
            <button
              type="button"
              aria-expanded={section === menu.label}
              onClick={() => setSection(section === menu.label ? null : menu.label)}
              className="flex w-full cursor-pointer items-center justify-between py-4 font-display text-xl font-semibold"
            >
              {menu.label}
              <ChevronDown className={`size-5 transition-transform ${section === menu.label ? "rotate-180" : ""}`} />
            </button>
            {section === menu.label ? (
              <ul className="grid grid-cols-1 gap-1 pb-4 sm:grid-cols-2">
                {menu.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} onClick={onClose} className="block rounded-xl px-3 py-2 hover:bg-card">
                      <span className="block font-semibold">{link.label}</span>
                      {link.note ? <span className="block text-sm text-ink-3">{link.note}</span> : null}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
      </div>
    </div>,
    document.body,
  );
}
