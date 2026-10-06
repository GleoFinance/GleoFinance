import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { BRAND, CHAIN, hasGithub } from "@/config/brand";
import { formatDate, postsByDate } from "@/lib/content/blog";
import { ButtonLink, CtaBand, Faq, PageHero, Rows, Section, SectionHead, Tag } from "@/components/ui";

export const metadata: Metadata = {
  title: "Community",
  description: "Where to talk to the Gleo team and other builders, resources to start with, and programs to grow with.",
};

export default function CommunityPage() {
  const posts = postsByDate().slice(0, 3);
  return (
    <>
      <PageHero
        title="A network is the people on it"
        lead="Gleo is young and the community is small. That is a good time to arrive: questions get answered by the people writing the code."
        art="people"
        actions={
          <ButtonLink href={BRAND.x} variant="accent">
            Follow {BRAND.xHandle}
          </ButtonLink>
        }
      />

      <Section tone="card">
        <SectionHead title="Talk with us" lead="One channel for now, so nothing gets lost. More open when there are enough people to keep them useful." />
        <ul className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <li className="min-w-0">
            <a href={BRAND.x} target="_blank" rel="noreferrer" className="flex h-full flex-col justify-between rounded-2xl bg-night p-7 text-fog hover:bg-night-2">
              <span className="flex items-center justify-between gap-3">
                <span className="font-display text-3xl font-semibold">X</span>
                <ArrowUpRight className="size-5" />
              </span>
              <span className="mt-10 block text-[15.5px] leading-relaxed text-fog-2">
                Announcements, contract addresses, grant rounds and direct messages. {BRAND.xHandle}
              </span>
            </a>
          </li>
          <li className="min-w-0 rounded-2xl border border-dashed border-line-2 p-7">
            <p className="flex flex-wrap items-center gap-2 font-display text-xl font-semibold">
              Chat server and forum <Tag tone="plan" />
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-2">
              A builder chat opens with the first grants round. Until then, X is the one place we answer.
            </p>
          </li>
        </ul>
      </Section>

      <Section>
        <SectionHead title="Resources to start with" />
        <div className="mt-8">
          <Rows
            numbered={false}
            items={[
              ...(hasGithub()
                ? [{ title: "Source code", body: "The public repository for this site and the Gleo tools.", href: BRAND.github }]
                : []),
              { title: "Developer hub", body: "Network details, public read-only endpoints and a map of the docs.", href: "/developers" },
              { title: "Network explorer", body: `Every block, transaction and token on ${CHAIN.name}, on Blockscout.`, href: CHAIN.explorer },
              { title: "Brand resources", body: "Logo files, colours and type for anyone writing about Gleo.", href: "/brand" },
            ]}
          />
        </div>
      </Section>

      <Section tone="night">
        <SectionHead dark title="Latest from the journal" action={<ButtonLink href="/blog" variant="fog">All posts</ButtonLink>} />
        <ul className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
          {posts.map((p) => (
            <li key={p.slug} className="min-w-0 border-t border-fog/20 pt-5">
              <p className="font-mono text-[12px] text-fog-2">
                {formatDate(p.date)} · {p.category}
              </p>
              <Link href={`/blog/${p.slug}`} className="mt-2 block font-display text-xl leading-snug font-semibold hover:underline">
                {p.title}
              </Link>
              <p className="mt-2 text-[15px] leading-relaxed text-fog-2">{p.summary}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <SectionHead title="Grow with Gleo" />
        <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-3">
          {[
            ["/grants", "Grants and funding", "Builder, research and marketing grants, opening in rounds."],
            ["/grants/bug-bounty", "Bug bounty", "Rewards for finding security problems. Open now."],
            ["/events", "Calls and office hours", "Regular sessions with the team, once the schedule starts."],
          ].map(([href, t, b]) => (
            <Link key={href} href={href} className="group min-w-0 border-l-2 border-sea pl-5">
              <span className="flex items-center gap-2 text-[18px] font-bold">
                {t} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="mt-2 block text-[15px] leading-relaxed text-ink-2">{b}</span>
            </Link>
          ))}
        </div>
      </Section>

      <Section tone="card">
        <SectionHead title="Common questions" action={<ButtonLink href="/faq" variant="line">Full FAQ</ButtonLink>} />
        <div className="mt-8">
          <Faq
            items={[
              { q: "Is there an official chat?", a: `Not yet. Anyone claiming to run an official Gleo group other than ${BRAND.xHandle} on X is not us.` },
              { q: "Will the team ever DM me first?", a: "No. We never message first, never ask for a seed phrase, and never ask you to send funds to verify anything." },
              { q: "How can I help?", a: "Try the tools, tell us what broke, and build something small. Good bug reports count as contributions." },
            ]}
          />
        </div>
      </Section>

      <CtaBand title="Say hello" body="Tell us what you are building or what you wish existed." actions={<ButtonLink href={BRAND.x} variant="fog">{BRAND.xHandle} on X</ButtonLink>} />
    </>
  );
}
