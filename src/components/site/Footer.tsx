import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BRAND, CHAIN, hasGithub } from "@/config/brand";
import { FOOTER, LEGAL } from "@/config/nav";
import { Wordmark } from "@/components/Mark";
import { CopyCaBlock } from "@/components/CopyCa";

function XIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.77L17.75 3Zm-1.08 16.2h1.7L7.4 4.73H5.58l11.09 14.47Z" />
    </svg>
  );
}

function GithubIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-night text-fog">
      <div className="mx-auto max-w-[1280px] px-4 pt-16 pb-8 sm:px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)]">
          <div>
            <Wordmark tone="fog" />
            <p className="mt-5 font-display text-2xl leading-snug font-semibold">{BRAND.slogan}</p>
            <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-fog-2">{BRAND.tagline}</p>
            <CopyCaBlock className="mt-7" />
            <div className="mt-6 flex items-center gap-2">
              <a
                href={BRAND.x}
                target="_blank"
                rel="noreferrer"
                aria-label={`${BRAND.name} on X`}
                className="flex h-10 items-center gap-2 rounded-full border border-fog/20 px-4 text-sm hover:border-fog"
              >
                <XIcon /> {BRAND.xHandle}
              </a>
              {hasGithub() ? (
                <a
                  href={BRAND.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${BRAND.name} on GitHub`}
                  className="flex size-10 items-center justify-center rounded-full border border-fog/20 hover:border-fog"
                >
                  <GithubIcon />
                </a>
              ) : null}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 xl:grid-cols-5">
            {FOOTER.map((col) => (
              <div key={col.title} className="min-w-0">
                <p className="font-mono text-[11px] tracking-[0.1em] text-fog-2 uppercase">{col.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-[14.5px] text-fog/85 hover:text-fog hover:underline">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-fog/15 pt-6 text-[13px] text-fog-2 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {BRAND.name}. Runs on {CHAIN.name} (chain id {CHAIN.id}). Nothing on this site is investment advice.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {LEGAL.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-fog">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={CHAIN.explorer} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-fog">
                Explorer <ArrowUpRight className="size-3" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
