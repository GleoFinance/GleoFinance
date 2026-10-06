import { InfoCards, LinkTiles, Section, SectionHead } from "@/components/ui";
import type { TagTone } from "@/components/ui";

/**
 * Explanation under a tool: how it works in a few cards, then related pages.
 * Gives each tool page enough plain-language context to stand on its own.
 */
export function ToolGuide({
  eyebrow,
  title,
  lead,
  points,
  related,
}: {
  eyebrow: string;
  title: string;
  lead: React.ReactNode;
  points: { title: string; body: React.ReactNode }[];
  related: { href: string; title: string; body: string; label: string; tag?: TagTone }[];
}) {
  return (
    <>
      <Section>
        <SectionHead eyebrow={eyebrow} title={title} lead={lead} />
        <div className="mt-12">
          <InfoCards items={points} cols={points.length === 4 ? 4 : 3} />
        </div>
      </Section>
      <Section tone="gray" tight>
        <h2 className="t-h3">Related Gleo pages</h2>
        <div className="mt-8">
          <LinkTiles items={related} cols={3} />
        </div>
      </Section>
    </>
  );
}
