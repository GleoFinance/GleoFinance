"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import {
  ArrowLeftRight,
  ArrowRight,
  ArrowUpRight,
  BadgeDollarSign,
  BookOpen,
  Briefcase,
  Building2,
  CalendarDays,
  ChevronRight,
  CircleHelp,
  Code2,
  Coins,
  Compass,
  FileCode2,
  FileText,
  Flag,
  HandCoins,
  HandHeart,
  Landmark,
  Layers,
  LineChart,
  Megaphone,
  Menu,
  Newspaper,
  Puzzle,
  Repeat,
  Send,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Users,
  Wallet,
  X,
  type LucideIcon,
} from "lucide-react";
import { APP_LINKS, MENUS, type NavMenu } from "@/config/nav";
import { BRAND } from "@/config/brand";
import { Wordmark } from "@/components/Mark";
import { CopyCaTag } from "@/components/CopyCa";
import { NavWallet } from "@/components/wallet/WalletButton";

const APP_MENU: NavMenu = {
  label: "App",
  heads: ["Live tools", "Practice tools"],
  split: 4,
  links: APP_LINKS,
};

const ICONS: Record<string, LucideIcon> = {
  "/learn/intro": Compass,
  "/learn": BookOpen,
  "/blog": Newspaper,
  "/about": Flag,
  "/about/careers": Briefcase,
  "/use-cases/payments": Send,
  "/use-cases/tokenization": Coins,
  "/use-cases/ramps": Repeat,
  "/use-cases/aid": HandHeart,
  "/use-cases/defi": Layers,
  "/use-cases/privacy": ShieldCheck,
  "/case-studies": FileText,
  "/products": Puzzle,
  "/ecosystem": Users,
  "/developers": Code2,
  "/smart-contracts": FileCode2,
  "/grants": BadgeDollarSign,
  "/institutions": Landmark,
  "/fintechs": Smartphone,
  "/community": Users,
  "/events": CalendarDays,
  "/faq": CircleHelp,
  "/press": Megaphone,
  "/send": Send,
  "/network": LineChart,
  "/assets": Building2,
  "/swap": ArrowLeftRight,
  "/tokenize": Sparkles,
  "/anchors": Wallet,
  "/lend": HandCoins,
  "/pools": Layers,
};

/** Line icon over a yellow offset disc: the small menu glyph style. */
function MenuGlyph({ href }: { href: string }) {
  const Icon = ICONS[href] ?? ArrowRight;
  return (
    <span className="relative flex size-8 shrink-0 items-center justify-center" aria-hidden="true">
      <span className="absolute top-1 left-0.5 size-5 rounded-full bg-sea" />
      <Icon className="relative size-6 text-ink" strokeWidth={1.6} />
    </span>
  );
}

function XIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.77L17.75 3Zm-1.08 16.2h1.7L7.4 4.73H5.58l11.09 14.47Z" />
    </svg>
  );
}

export function Header() {
  const [open, setOpen] = useState<string | null>(null);
  const [drawer, setDrawer] = useState(false);
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();
  const bar = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  // Close menus on navigation (state adjusted during render, not in an effect).
  const [seenPath, setSeenPath] = useState(pathname);
  if (seenPath !== pathname) {
    setSeenPath(pathname);
    setOpen(null);
    setDrawer(false);
    setHidden(false);
  }

  // Slide the bar away while scrolling down, bring it back on the way up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - last) < 6) return;
      setHidden(y > last && y > 160);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    <header
      className="site-header fixed inset-x-0 top-0 z-50 border-b border-line bg-paper"
      data-hidden={hidden && !open && !drawer ? "true" : "false"}
    >
      <div ref={bar} className="relative" onMouseLeave={leave}>
        <div className="mx-auto flex h-[var(--header-h)] max-w-[1440px] items-center gap-2 pl-[var(--gutter)] sm:gap-3 lg:pr-[var(--gutter)]">
          <Wordmark />
          <nav aria-label="Main" className="ml-6 hidden h-full items-stretch lg:flex">
            {menus.map((menu) => (
              <button
                key={menu.label}
                type="button"
                aria-expanded={open === menu.label}
                aria-haspopup="true"
                onClick={() => setOpen(open === menu.label ? null : menu.label)}
                onMouseEnter={() => enter(menu.label)}
                className={`relative flex cursor-pointer items-center px-4 text-[12px] leading-[1.6] text-ink after:absolute after:inset-x-0 after:bottom-0 after:h-[3px] after:bg-sea after:transition-opacity ${
                  open === menu.label ? "after:opacity-100" : "after:opacity-0"
                }`}
              >
                {menu.label}
              </button>
            ))}
          </nav>

          <div className="ml-auto flex min-w-0 items-center gap-1.5 sm:gap-2 lg:gap-4">
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
              className="flex h-[var(--header-h)] shrink-0 cursor-pointer items-center gap-2 bg-sea px-3.5 text-[16px] text-ink sm:px-6 lg:hidden"
            >
              <Menu className="size-5" />
              <span className="hidden sm:inline">Menu</span>
            </button>
          </div>
        </div>

        {active ? (
          <div className="absolute inset-x-0 top-full hidden border-b border-line bg-paper lg:block" onMouseEnter={() => enter(active.label)}>
            <MegaPanel menu={active} />
          </div>
        ) : null}
      </div>
      {drawer ? <Drawer onClose={() => setDrawer(false)} menus={menus} /> : null}
    </header>
  );
}

function MenuColumn({ head, links, isApp }: { head?: string; links: NavMenu["links"]; isApp: boolean }) {
  return (
    <div className="min-w-0">
      {head ? <p className="px-4 text-[12px] leading-[1.6] text-ink-3">{head}</p> : null}
      <ul className="mt-3">
        {links.map((link) => {
          const status = isApp ? APP_LINKS.find((a) => a.href === link.href)?.status : undefined;
          return (
            <li key={link.href}>
              <Link href={link.href} className="group flex items-center gap-4 px-4 py-3 transition-colors hover:bg-paper-2">
                <MenuGlyph href={link.href} />
                <span className="min-w-0">
                  <span className="flex items-center gap-2 text-[12px] leading-[1.6] font-semibold text-ink">
                    {link.label}
                    {status === "practice" ? <span className="rounded-full bg-flare-soft px-1.5 text-[10px] text-flare-deep">practice</span> : null}
                  </span>
                  {link.note ? <span className="block text-[12px] leading-snug text-ink-3">{link.note}</span> : null}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function MegaPanel({ menu }: { menu: NavMenu }) {
  const isApp = menu.label === "App";
  const split = menu.split ?? Math.ceil(menu.links.length / 2);
  return (
    <div className="mx-auto max-w-[1440px] px-[var(--gutter)] pt-8 pb-6">
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,400px)] gap-6">
        <MenuColumn head={menu.heads?.[0]} links={menu.links.slice(0, split)} isApp={isApp} />
        <MenuColumn head={menu.heads?.[1]} links={menu.links.slice(split)} isApp={isApp} />
        <div className="min-w-0">
          {menu.feature ? (
            <>
              <p className="px-4 text-[12px] leading-[1.6] text-ink-3">{menu.feature.eyebrow}</p>
              <Link href={menu.feature.href} className="mt-3 block bg-night p-6 text-fog">
                <p className="font-display text-[28px] leading-[1.2]">{menu.feature.title}</p>
                <p className="mt-3 text-[16px] leading-relaxed text-fog-2">{menu.feature.body}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-[16px]">
                  <ArrowRight className="size-4 text-sea" /> {menu.feature.cta}
                </span>
              </Link>
            </>
          ) : (
            <>
              <p className="px-4 text-[12px] leading-[1.6] text-ink-3">{isApp ? "How the tools work" : "Stay in touch"}</p>
              <div className="mt-3 bg-night p-6 text-fog">
                <p className="font-display text-[28px] leading-[1.2]">{isApp ? "Live or practice" : "News lands on X first"}</p>
                <p className="mt-3 text-[16px] leading-relaxed text-fog-2">
                  {isApp
                    ? "Live tools move real tokens from your wallet. Practice tools wait for Gleo contracts, so they run on free signed receipts and never ask for a transaction."
                    : "Releases, contract addresses and grant rounds are posted on X before anywhere else."}
                </p>
                {!isApp ? (
                  <a href={BRAND.x} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-[16px]">
                    <ArrowUpRight className="size-4 text-sea" /> Follow {BRAND.xHandle}
                  </a>
                ) : (
                  <Link href="/app" className="mt-6 inline-flex items-center gap-2 text-[16px]">
                    <ArrowRight className="size-4 text-sea" /> App overview
                  </Link>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-4 text-[12px] text-ink-3">
        Follow us:
        <a href={BRAND.x} target="_blank" rel="noreferrer" aria-label={`${BRAND.name} on X`} className="text-ink hover:opacity-70">
          <XIcon />
        </a>
      </div>
    </div>
  );
}

function Drawer({ onClose, menus }: { onClose: () => void; menus: NavMenu[] }) {
  const [section, setSection] = useState<string | null>(null);
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

  const current = menus.find((m) => m.label === section) ?? null;

  // Rendered on <body> so no transformed ancestor can trap the fixed layer.
  return createPortal(
    <div role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-[60] flex flex-col bg-paper lg:hidden">
      <div className="flex h-[var(--header-h)] shrink-0 items-center justify-between border-b border-line px-[var(--gutter)]">
        <Wordmark />
        <button type="button" onClick={onClose} className="flex cursor-pointer items-center gap-3 text-[16px]">
          <X className="size-4" /> Close
        </button>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto px-[var(--gutter)] pt-4 pb-8">
        {current ? (
          <>
            <button type="button" onClick={() => setSection(null)} className="flex cursor-pointer items-center gap-2 py-4 text-[14px] text-ink-3">
              <ChevronRight className="size-4 rotate-180" /> Back
            </button>
            <p className="pb-2 text-[16px] font-semibold">{current.label}</p>
            <ul>
              {current.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} onClick={onClose} className="flex items-center gap-4 py-3">
                    <MenuGlyph href={link.href} />
                    <span className="min-w-0">
                      <span className="block text-[15px] font-semibold">{link.label}</span>
                      {link.note ? <span className="block text-[13px] text-ink-3">{link.note}</span> : null}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <ul>
            {menus.map((menu) => (
              <li key={menu.label} className="border-b border-dashed border-line-2">
                <button
                  type="button"
                  onClick={() => setSection(menu.label)}
                  className="flex w-full cursor-pointer items-center justify-between py-6 text-[16px] font-semibold"
                >
                  {menu.label}
                  <ChevronRight className="size-5" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="shrink-0 px-[var(--gutter)] pb-8">
        <NavWallet />
      </div>
    </div>,
    document.body,
  );
}
