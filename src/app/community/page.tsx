import Link from "next/link";
import { BadgeDollarSign, Bug, CalendarDays, MessagesSquare } from "lucide-react";
import { BRAND, CHAIN, hasGithub } from "@/config/brand";
import { formatDate, postsByDate } from "@/lib/content/blog";
import { faqLd, pageMeta } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Glyph } from "@/components/glyph";
import { PostCover } from "@/components/content/PostCover";
import { ButtonLink, CtaBand, Faq, PageHero, Rows, Section, SectionHead, Tag, TextLink } from "@/components/ui";

export const metadata = pageMeta({
  path: "/community",
  title: "Payments Builder Community on Robinhood Chain",
  description:
    "Meet the people building Gleo payments on Robinhood Chain: where to talk to the team, resources to start with, safety tips and programs. Follow along on X.",
  keywords: ["payments builder community", "crypto payments community", "Robinhood Chain builders", "Gleo community", "web3 developer community", "stablecoin builders"],
});

const FAQ = [
  { q: "Is there an official Gleo chat?", a: `Not yet. Anyone claiming to run an official Gleo group other than ${BRAND.xHandle} on X is not us.` },
  { q: "Will the team ever message me first?", a: "No. We never message first, never ask for a seed phrase, and never ask you to send funds to verify anything." },
  { q: "How can I help the project?", a: "Try the tools, tell us what broke, and build something small. A good bug report counts as a contribution." },
];

const GROW = [
  { icon: BadgeDollarSign, href: "/grants", title: "Grants and funding", body: "Builder, research and marketing grants that open in rounds.", cta: "See grant programs" },
  { icon: Bug, href: "/grants/bug-bounty", title: "Bug bounty", body: "Rewards for finding security problems. Open to reports now.", cta: "Read the bounty rules" },
  { icon: CalendarDays, href: "/events", title: "Calls and office hours", body: "Regular sessions with the team once the schedule starts.", cta: "See planned events" },
];

export default function CommunityPage() {
  const posts = postsByDate().slice(0, 3);
  return (
    <>
      <PageHero
        eyebrow="Community"
        title="A payments builder community that is just getting started"
        lead={
          <p>
            The Gleo community is small, and that makes it a good time to arrive: questions about building payments on {CHAIN.name} are answered
            by the people writing the code.
          </p>
        }
        art="people"
        actions={<ButtonLink href={BRAND.x}>Follow {BRAND.xHandle} on X</ButtonLink>}
      />

      <Section tone="gray">
        <SectionHead
          eyebrow="Join the conversation"
          title="Talk with the Gleo team"
          lead="One channel for now, so nothing gets lost. More will open once there are enough people to keep them useful."
        />
        <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          <li className="min-w-0">
            <a href={BRAND.x} target="_blank" rel="noreferrer" className="flex h-full flex-col border border-ink bg-night p-8 text-fog transition-colors hover:bg-night-2 lg:p-10">
              <span className="font-display text-[28px] leading-tight">X (formerly Twitter)</span>
              <span className="mt-4 flex-1 text-[16px] leading-relaxed text-fog/70">
                Announcements, contract addresses, grant rounds and direct messages, all at {BRAND.xHandle}.
              </span>
              <span className="mt-8 inline-flex items-center gap-2 text-[16px]">Open {BRAND.xHandle} on X</span>
            </a>
          </li>
          <li className="flex min-w-0 flex-col border border-dashed border-line-2 bg-paper p-8 lg:p-10">
            <span className="flex flex-wrap items-center gap-3">
              <Glyph icon={MessagesSquare} size={48} />
              <span className="text-[18px] font-semibold">Builder chat and forum</span>
              <Tag tone="plan" />
            </span>
            <p className="mt-4 text-[16px] leading-relaxed text-ink-2">A builder chat opens with the first grants round. Until then, X is the only place we answer.</p>
          </li>
        </ul>
      </Section>

      <Section>
        <SectionHead eyebrow="Resources" title="Resources for new builders" />
        <div className="mt-10">
          <Rows
            numbered={false}
            items={[
              ...(hasGithub() ? [{ title: "Source code", body: "The public repository for this site and the Gleo tools.", href: BRAND.github }] : []),
              { title: "Developer hub", body: "Network settings, read-only public endpoints and a map of the technical pages.", href: "/developers" },
              { title: "Network explorer", body: `Every block, transaction and token on ${CHAIN.name}, on Blockscout.`, href: CHAIN.explorer },
              { title: "Brand resources", body: "Logo files, colours and type for anyone writing about Gleo.", href: "/brand" },
            ]}
          />
        </div>
      </Section>

      <Section tone="night">
        <SectionHead dark eyebrow="The journal" title="Latest news from the Gleo team" />
        <ul className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-6">
          {posts.map((p) => (
            <li key={p.slug} className="min-w-0">
              <Link href={`/blog/${p.slug}`} className="group block">
                <PostCover title={p.title} category={p.category} />
                <p className="mt-4 text-[12px] text-fog-2">
                  {formatDate(p.date)} • {p.category}
                </p>
                <h3 className="mt-2 text-[16px] leading-[1.6] font-semibold group-hover:underline">{p.title}</h3>
              </Link>
            </li>
          ))}
        </ul>
        <TextLink href="/blog" dark className="mt-10">
          Read every journal post
        </TextLink>
      </Section>

      <Section tone="sand">
        <SectionHead eyebrow="Grow" title="Programs for community members" />
        <ul className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-6">
          {GROW.map((g) => (
            <li key={g.href} className="min-w-0">
              <Glyph icon={g.icon} />
              <h3 className="t-h3 mt-8">{g.title}</h3>
              <p className="mt-3 text-[16px] leading-relaxed text-ink-2">{g.body}</p>
              <TextLink href={g.href} className="mt-4">
                {g.cta}
              </TextLink>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <JsonLd data={faqLd(FAQ)} />
        <SectionHead eyebrow="Stay safe" title="Community questions and safety" />
        <div className="mt-10">
          <Faq items={FAQ} />
        </div>
        <TextLink href="/faq" className="mt-8">
          Read the full Gleo FAQ
        </TextLink>
      </Section>

      <CtaBand
        eyebrow="Say hello"
        title="Tell us what you are building"
        body="Or tell us what you wish existed. Every message to the team gets read."
        actions={
          <>
            <ButtonLink href={BRAND.x}>Message {BRAND.xHandle}</ButtonLink>
            <ButtonLink href="/about/code-of-conduct" variant="line">
              Code of conduct
            </ButtonLink>
          </>
        }
      />
    </>
  );
}
