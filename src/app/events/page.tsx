import { Mic, Users, Wrench } from "lucide-react";
import { BRAND } from "@/config/brand";
import { pageMeta } from "@/lib/seo";
import { Glyph } from "@/components/glyph";
import { ButtonLink, CtaBand, Eyebrow, PageHero, Section, SectionHead, Split, Tag } from "@/components/ui";

export const metadata = pageMeta({
  path: "/events",
  title: "Builder Office Hours, Community Calls and Meetups",
  description:
    "Planned Gleo builder office hours, monthly community calls and local meetups for people building payments on Robinhood Chain. No dates yet; follow on X.",
  keywords: ["builder office hours", "crypto community calls", "web3 meetups", "Robinhood Chain events", "payments meetup"],
});

const FORMATS = [
  { icon: Mic, title: "Monthly community call", body: "Forty-five minutes on what shipped, what comes next, and open questions from anyone who joins. Recorded and posted afterwards." },
  { icon: Wrench, title: "Builder office hours", body: "Book a slot with an engineer to look at your integration, your contract or your payment flow, one team at a time." },
  { icon: Users, title: "Local meetups", body: "Evenings in cities where people use Gleo to send money home, run by community members with our support." },
];

export default function EventsPage() {
  return (
    <>
      <PageHero
        tone="lilac"
        eyebrow="Events"
        title="Builder office hours, calls and meetups"
        lead={
          <p>
            Gleo events will be small and practical: builder office hours, community calls and meetups with the team, not stages and lanyards.
            Nothing is scheduled yet, and dates will be announced on X first.
          </p>
        }
        art="calendar"
        meta={<Tag tone="plan">No events scheduled yet</Tag>}
        actions={<ButtonLink href={BRAND.x}>Get event dates on X</ButtonLink>}
      />

      <Section>
        <SectionHead eyebrow="Formats" title="Planned session formats" lead="Three formats, each with a clear purpose. All of them are planned; none has taken place yet." />
        <ul className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-6">
          {FORMATS.map((f) => (
            <li key={f.title} className="min-w-0">
              <Glyph icon={f.icon} />
              <h3 className="t-h3 mt-8 flex flex-wrap items-center gap-2">
                {f.title} <Tag tone="plan" />
              </h3>
              <p className="mt-3 text-[16px] leading-relaxed text-ink-2">{f.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="night">
        <Split dark eyebrow="Meetups" art="people" title="How Gleo meetups will run">
          <p>
            <strong className="font-semibold text-fog">Small rooms.</strong> Twenty to forty people, so everyone can talk to everyone.
          </p>
          <p>
            <strong className="font-semibold text-fog">One purpose each.</strong> A payment corridor, an asset type, or a tool to build together.
          </p>
          <p>
            <strong className="font-semibold text-fog">Real-world focus.</strong> We invite people who move money for a living, not only people who
            write about it.
          </p>
        </Split>
      </Section>

      <Section tone="gray">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-16">
          <div className="min-w-0">
            <Eyebrow>Archive</Eyebrow>
            <h2 className="t-h2">Past events and recordings</h2>
          </div>
          <p className="t-lead min-w-0 text-ink-2 lg:pt-9">
            None yet. Recordings and notes from each session will be listed here once they happen.
          </p>
        </div>
      </Section>

      <CtaBand
        eyebrow="Host a session"
        title="Want to run a Gleo meetup?"
        body={`If you run a builder community or a fintech meetup and want a Gleo session, send a message to ${BRAND.xHandle}.`}
        actions={
          <>
            <ButtonLink href={BRAND.x}>Message us on X</ButtonLink>
            <ButtonLink href="/community" variant="line">
              Visit the community page
            </ButtonLink>
          </>
        }
      />
    </>
  );
}
