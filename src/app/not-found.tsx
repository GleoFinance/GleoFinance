import type { Metadata } from "next";
import { ButtonLink, Container, Eyebrow, TextLink } from "@/components/ui";

export const metadata: Metadata = {
  title: { absolute: "Page not found — Gleo" },
  robots: { index: false, follow: true },
};

const LINKS: [string, string][] = [
  ["/send", "Send a USDG payment"],
  ["/network", "Live Robinhood Chain readings"],
  ["/use-cases", "What Gleo is used for"],
  ["/developers", "Developer hub"],
  ["/faq", "Gleo FAQ"],
];

export default function NotFound() {
  return (
    <section className="bg-paper">
      <Container className="grid grid-cols-1 gap-12 py-20 lg:grid-cols-2 lg:py-28">
        <div className="min-w-0">
          <Eyebrow>Error 404</Eyebrow>
          <h1 className="t-h1 text-balance">This page could not be found</h1>
          <p className="t-lead mt-8 max-w-[560px] text-ink-2">The address may have changed, or the page never existed. These links lead somewhere useful.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/">Back to the home page</ButtonLink>
            <ButtonLink href="/app" variant="line">
              Open the app
            </ButtonLink>
          </div>
        </div>
        <ul className="min-w-0 space-y-4 lg:pt-12">
          {LINKS.map(([href, label]) => (
            <li key={href} className="border-t border-line pt-4">
              <TextLink href={href}>{label}</TextLink>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
