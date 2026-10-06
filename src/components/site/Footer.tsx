import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BRAND, CHAIN, hasGithub } from "@/config/brand";
import { FOOTER, LEGAL } from "@/config/nav";
import { Wordmark } from "@/components/Mark";
import { CopyCaBlock } from "@/components/CopyCa";

function XIcon({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.77L17.75 3Zm-1.08 16.2h1.7L7.4 4.73H5.58l11.09 14.47Z" />
    </svg>
  );
}

function GithubIcon({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

function Group({ title, links }: (typeof FOOTER)[number]) {
  return (
    <div className="min-w-0">
      <h2 className="text-[12px] leading-[1.6] font-semibold tracking-[0.02em] text-fog uppercase">{title}</h2>
      <ul className="mt-3 space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-[16px] leading-relaxed text-fog/70 transition-colors hover:text-fog">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const [about, products, network, developers, connect] = FOOTER;
  return (
    <footer className="bg-night text-fog">
      <div className="mx-auto max-w-[1440px] px-[var(--gutter)] pt-20 pb-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <div className="min-w-0">
            <Wordmark tone="fog" />
            <p className="mt-6 max-w-[290px] text-[16px] leading-relaxed text-fog/70">{BRAND.description.split(":")[0]}.</p>
            <CopyCaBlock className="mt-8 max-w-[300px]" />
          </div>
          <Group {...about} />
          <div className="grid min-w-0 gap-10">
            <Group {...products} />
            <Group {...network} />
          </div>
          <div className="grid min-w-0 gap-10">
            <Group {...developers} />
            <Group {...connect} />
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-6 border-t border-fog/20 pt-8 text-[16px] text-fog/70 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-6">
            <span>Follow us:</span>
            <a href={BRAND.x} target="_blank" rel="noreferrer" aria-label={`${BRAND.name} on X (${BRAND.xHandle})`} className="text-fog hover:opacity-70">
              <XIcon />
            </a>
            {hasGithub() ? (
              <a href={BRAND.github} target="_blank" rel="noreferrer" aria-label={`${BRAND.name} on GitHub`} className="text-fog hover:opacity-70">
                <GithubIcon />
              </a>
            ) : null}
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {LEGAL.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-fog">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={CHAIN.explorer} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-fog">
                Block explorer <ArrowUpRight className="size-3.5" />
              </a>
            </li>
          </ul>
          <p>
            © {new Date().getFullYear()} {BRAND.name} · {CHAIN.name}
          </p>
        </div>
        <p className="mt-6 text-[12px] leading-relaxed text-fog/50">
          {BRAND.name} runs on {CHAIN.name} (chain id {CHAIN.id}). Nothing on this site is investment advice. Tools marked practice sign
          free receipts and never move funds.
        </p>
      </div>
    </footer>
  );
}
