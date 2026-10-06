import type { Metadata } from "next";
import { BRAND } from "@/config/brand";
import { ButtonLink, CtaBand, PageHero, Rows, Section, SectionHead, Split, Tag } from "@/components/ui";

export const metadata: Metadata = {
  title: "Events",
  description: "Planned Gleo community calls, builder office hours and meetups. No events are scheduled yet.",
};

export default function EventsPage() {
  return (
    <>
      <PageHero
        title="Where builders and backers meet"
        lead="Gleo events will be small and practical: working sessions with the team, not stages and lanyards. Nothing is scheduled yet; dates are announced on X."
        art="calendar"
        meta={<Tag tone="plan">No events scheduled yet</Tag>}
        actions={
          <ButtonLink href={BRAND.x} variant="accent">
            Get dates on X
          </ButtonLink>
        }
      />

      <Section tone="card">
        <SectionHead title="What the sessions will look like" />
        <div className="mt-10">
          <Rows
            items={[
              { title: "Monthly community call", meta: <Tag tone="plan" />, body: "Forty-five minutes: what shipped, what is next, and open questions from anyone who joins. Recorded and posted afterwards." },
              { title: "Builder office hours", meta: <Tag tone="plan" />, body: "Book a slot with an engineer to look at your integration, your contract or your payment flow, one team at a time." },
              { title: "Local meetups", meta: <Tag tone="plan" />, body: "Evenings in cities where people use Gleo to send money home, run by community members with our support." },
            ]}
          />
        </div>
      </Section>

      <Section>
        <Split art="people" title="How the meetups will work">
          <p>
            <strong className="text-ink">Small rooms.</strong> Twenty to forty people, so everyone can talk to everyone.
          </p>
          <p>
            <strong className="text-ink">A purpose for each one.</strong> A payment corridor, an asset type, or a tool to build together.
          </p>
          <p>
            <strong className="text-ink">Real-world focus.</strong> We invite the people who move money for a living, not only the people who write
            about it.
          </p>
        </Split>
      </Section>

      <Section tone="card">
        <SectionHead title="Past events" />
        <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-ink-2">
          None yet. Recordings and notes from each session will be listed here once they happen.
        </p>
      </Section>

      <CtaBand
        title="Want to host one?"
        body={`If you run a builder community or a fintech meetup and want a Gleo session, send a message to ${BRAND.xHandle}.`}
        actions={
          <ButtonLink href={BRAND.x} variant="fog">
            Message us
          </ButtonLink>
        }
      />
    </>
  );
}
