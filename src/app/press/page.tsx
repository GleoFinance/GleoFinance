import { BRAND } from "@/config/brand";
import { pageMeta } from "@/lib/seo";
import { ButtonLink, CtaBand, Eyebrow, LinkTiles, PageHero, Section, SectionHead } from "@/components/ui";

export const metadata = pageMeta({
  path: "/press",
  title: "Press Releases, Announcements and Media Kit",
  description:
    "Official Gleo press releases and announcements, plus the media kit with logo files, colours and type. No releases issued yet; journalists can reach us on X.",
  keywords: ["press releases", "media kit", "Gleo announcements", "crypto payments news", "Robinhood Chain news"],
});

export default function PressPage() {
  return (
    <>
      <PageHero
        eyebrow="Press"
        title="Gleo press releases and announcements"
        lead={
          <>
            <p>
              Official Gleo press releases and announcements are listed on this page. If a statement is not here or posted by {BRAND.xHandle}, it
              did not come from us.
            </p>
            <p className="mt-4">Logo files, colours and type are on the brand resources page.</p>
          </>
        }
        actions={<ButtonLink href="/brand">Brand resources</ButtonLink>}
      />

      <Section tone="gray">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-16">
          <div className="min-w-0">
            <Eyebrow>Releases</Eyebrow>
            <h2 className="t-h2">No press releases yet</h2>
          </div>
          <p className="t-lead min-w-0 text-ink-2 lg:pt-9">
            The first release goes out when the $GLEO contract and the first Gleo Contracts are live. Until then, product news is in the journal and
            short announcements are on X.
          </p>
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow="Media" title="Resources for journalists and writers" lead="Logo files, colours and the facts we stand behind, in one place." />
        <div className="mt-12">
          <LinkTiles
            items={[
              { href: "/brand", title: "Media kit", body: "Logo files, the social card, palette and type.", label: "Download brand files" },
              { href: "/blog", title: "Journal", body: "Longer posts from the team about product and network decisions.", label: "Read the Gleo journal" },
              { href: BRAND.x, title: "Announcements on X", body: `${BRAND.xHandle}: releases, addresses and corrections land here first.`, label: `Follow ${BRAND.xHandle}` },
            ]}
          />
        </div>
      </Section>

      <CtaBand
        eyebrow="Press contact"
        title="Questions from the press"
        body="Send a direct message on X with your outlet and deadline, and we will reply as quickly as we can."
        actions={
          <>
            <ButtonLink href={BRAND.x}>Message {BRAND.xHandle}</ButtonLink>
            <ButtonLink href="/about" variant="line">
              About Gleo
            </ButtonLink>
          </>
        }
      />
    </>
  );
}
