import { Container, Eyebrow, Tag } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd, webAppLd } from "@/lib/seo";
import { AppNav } from "@/components/app/AppNav";

/**
 * Shell for the app tools: a white opener (eyebrow, serif H1, lead), then a
 * grey band holding the tool list on the side and the tool itself in white
 * square panels. Optional `guide` content sits underneath for readers who
 * want to know how the tool works.
 */
export function AppFrame({
  title,
  lead,
  status,
  children,
  aside,
  eyebrow,
  path,
  crumb,
  description,
  guide,
}: {
  title: React.ReactNode;
  lead: React.ReactNode;
  status: "live" | "practice";
  children: React.ReactNode;
  aside?: React.ReactNode;
  eyebrow?: string;
  /** Route path, used for the breadcrumb and WebApplication data. */
  path?: string;
  /** Short page name for the breadcrumb trail. */
  crumb?: string;
  /** Plain-text summary for WebApplication data (live tools only). */
  description?: string;
  guide?: React.ReactNode;
}) {
  const ld: object[] = [];
  if (path && crumb) ld.push(breadcrumbLd(path === "/app" ? [{ name: "App", path }] : [{ name: "App", path: "/app" }, { name: crumb, path }]));
  if (path && crumb && description && status === "live") ld.push(webAppLd({ path, name: `Gleo ${crumb}`, description }));
  return (
    <>
      {ld.length ? <JsonLd data={ld} /> : null}
      <section className="border-b border-line bg-paper">
        <Container className="grid grid-cols-1 gap-8 py-14 lg:py-20 xl:grid-cols-[minmax(0,1fr)_minmax(0,360px)] xl:items-end xl:gap-16">
          <div className="min-w-0 max-w-[720px]">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              {eyebrow ? <Eyebrow className="mb-0">{eyebrow}</Eyebrow> : null}
              <Tag tone={status} />
            </div>
            <h1 className="t-h1 text-balance">{title}</h1>
            <div className="t-lead mt-8 text-ink-2">{lead}</div>
          </div>
          {aside ? <div className="min-w-0">{aside}</div> : null}
        </Container>
      </section>
      <section className="bg-paper-2">
        <Container className="grid grid-cols-1 gap-8 py-10 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-12 lg:py-16">
          <AppNav />
          <div className="min-w-0">{children}</div>
        </Container>
      </section>
      {guide}
    </>
  );
}

export function PracticeNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-flare bg-flare-soft px-4 py-3 text-[14px] leading-relaxed text-ink">
      <strong className="font-semibold text-flare-deep">Practice mode.</strong> {children}
    </div>
  );
}
