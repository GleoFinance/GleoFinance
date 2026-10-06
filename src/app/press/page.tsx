import type { Metadata } from "next";
import { BRAND } from "@/config/brand";
import { ButtonLink, Container, LinkTiles, Section, SectionHead } from "@/components/ui";

export const metadata: Metadata = {
  title: "Press",
  description: "Gleo announcements and media kit. No press releases have been issued yet.",
};

export default function PressPage() {
  return (
    <>
      <section className="meridians border-b border-line bg-paper">
        <Container className="grid grid-cols-1 gap-8 py-14 sm:py-20 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-end">
          <h1 className="font-display text-[clamp(2.4rem,5.4vw,4.6rem)] leading-[0.98] font-bold tracking-[-0.03em]">Press releases</h1>
          <p className="min-w-0 text-[18px] leading-relaxed text-ink-2">
            Official statements from Gleo. If it is not listed here or posted by {BRAND.xHandle}, it did not come from us.
          </p>
        </Container>
      </section>

      <Section tone="card">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
          <p className="font-mono text-[12px] tracking-[0.08em] text-ink-3 uppercase">Releases</p>
          <div className="min-w-0 border-t border-line-2 pt-6">
            <p className="font-display text-2xl font-semibold">No press releases yet.</p>
            <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-ink-2">
              The first one goes out when the $GLEO contract and the first Gleo Contracts are live. Until then, product news is in the journal and
              short announcements are on X.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHead title="For journalists and writers" lead="Logo files, colours and the facts we stand behind, in one place." />
        <div className="mt-10">
          <LinkTiles
            items={[
              { href: "/brand", title: "Media kit", body: "Logo files, the social card, palette and type." },
              { href: "/blog", title: "Journal", body: "Longer posts from the team about product and network decisions." },
              { href: BRAND.x, title: "Announcements on X", body: `${BRAND.xHandle}: releases, addresses and corrections land here first.` },
            ]}
          />
        </div>
        <div className="mt-10">
          <ButtonLink href={BRAND.x} variant="ink">
            Press questions by DM
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
