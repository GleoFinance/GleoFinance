import { Binoculars, Blocks, Eye, Globe2, MessagesSquare, ShieldCheck, Users } from "lucide-react";
import { BRAND, CHAIN } from "@/config/brand";
import { faqLd, pageMeta } from "@/lib/seo";
import { Glyph } from "@/components/glyph";
import { JsonLd } from "@/components/JsonLd";
import { ButtonLink, Container, CtaBand, Eyebrow, Faq, LinkTiles, PageHero, Section, SectionHead, Split } from "@/components/ui";
import { VALUES } from "./values";

export const metadata = pageMeta({
  path: "/about",
  title: "About Gleo: Our Mission for Borderless Payments",
  description:
    "The Gleo mission: money that crosses borders as cheaply as a message, and real assets anyone can hold. Read why we build on Robinhood Chain and how we work.",
  keywords: ["Gleo mission", "about Gleo", "borderless payments", "financial access"],
});

const PRINCIPLES = [
  { icon: Eye, title: "Open by default", body: "Anyone can read the ledger, check every live figure on this site and build on the same rails we use." },
  { icon: Blocks, title: "Useful before impressive", body: "We start with what works on the chain today and add contracts only after an external audit." },
  { icon: ShieldCheck, title: "Rules inside the asset", body: "Issuers get their controls inside the token itself, and holders can read those controls before they accept it." },
];

const VALUE_ICONS = [Binoculars, Globe2, MessagesSquare];

const FAQ = [
  { q: "Who can use Gleo?", a: "Anyone with an EVM wallet that can add Robinhood Chain. The live tools need no account and no sign-up." },
  { q: "Who does Gleo hire?", a: "People who care about the problem, wherever they live. Job descriptions are written around outcomes, not credentials." },
  { q: "How does Gleo treat its community?", a: "Every space we run follows our code of conduct, and reports are handled privately and promptly." },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={faqLd(FAQ)} />
      <PageHero
        eyebrow="About Gleo"
        title="The Gleo mission: money that crosses borders cheaply"
        lead={`The Gleo mission is to let a dollar, a share or a bond reach anyone with a phone, in seconds, at a cost nobody notices. ${BRAND.name} builds the payment and asset rails for that on ${CHAIN.name}, in the open.`}
        art="compass"
        crumbs={[{ name: "About", path: "/about" }]}
        actions={<ButtonLink href="/about/roadmap">See the Gleo roadmap</ButtonLink>}
      />

      <section className="bg-night py-16 text-fog lg:py-24">
        <Container>
          <div className="mx-auto max-w-[824px]">
            <Eyebrow>Our mission</Eyebrow>
            <h2 className="t-h2 text-balance">Why cheaper borders matter</h2>
            <div className="t-lead mt-8 space-y-5 text-fog/70">
              <p>
                Sending money abroad still costs the people who can least afford it the most. A family transfer can lose several percent to fees
                and exchange spread and take days to arrive. Small businesses wait on invoices that pass through three banks before they clear.
              </p>
              <p>
                Saving and investing are just as uneven. Many people cannot hold a share of a fund or a government bond because the product is not
                sold where they live. Public ledgers make both problems smaller, and Gleo exists to make them smaller still.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <Split eyebrow="What we focus on" title="Tools people can use this week" art="globe">
          <p>
            Gleo is a small team, so we pick work that pays off for real users quickly: checked payments, honest fee previews and a clear view of
            which tokenized assets on the chain are genuine.
          </p>
          <p>
            Builders who extend those rails can apply for support. Grants are milestone-based and open with each published round.
          </p>
          <div className="pt-2">
            <ButtonLink href="/grants">Explore Gleo grants and funding</ButtonLink>
          </div>
        </Split>
      </Section>

      <Section>
        <SectionHead
          eyebrow="Principles"
          title="What guides the work"
          lead="Three commitments shape every product decision at Gleo, from the payment screen to the contract design."
        />
        <ul className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-6">
          {PRINCIPLES.map((p) => (
            <li key={p.title} className="min-w-0">
              <Glyph icon={p.icon} size={96} />
              <h3 className="t-h3 mt-8">{p.title}</h3>
              <p className="mt-3 text-[16px] leading-relaxed text-ink-2">{p.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="gray">
        <SectionHead
          eyebrow="Transparency"
          title="Ways to hold Gleo to account"
          lead="We publish our plans and label progress honestly: live, practice, planned or target. These are the places to check us."
        />
        <div className="mt-12">
          <LinkTiles
            items={[
              { href: "/about/roadmap", title: "Roadmap", body: "Every item, quarter by quarter, marked Planned until it ships.", label: "Read the roadmap" },
              { href: "/blog", title: "Blog", body: "Decisions explained, including the ones we changed our minds about.", label: "Read the Gleo blog" },
              { href: "/network", title: "Live network", body: "Every live figure on the site, with where it was read from.", label: "Open the network panel" },
            ]}
          />
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow="Values" title="How the Gleo team works together" />
        <ul className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-6">
          {VALUES.map((v, i) => (
            <li key={v.title} className="min-w-0">
              <Glyph icon={VALUE_ICONS[i] ?? Users} size={96} />
              <h3 className="t-h3 mt-8">{v.title}</h3>
              <p className="mt-3 text-[16px] leading-relaxed text-ink-2">{v.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="gray">
        <SectionHead
          eyebrow="Fair access"
          title="Our commitments, day to day"
          lead="Commitments are only worth what they change. Here is what ours mean in practice."
        />
        <div className="mt-10 max-w-[900px]">
          <Faq items={FAQ} />
        </div>
      </Section>

      <CtaBand
        eyebrow="Careers"
        title="Help build Gleo"
        body="We are a small, remote team and we read every message sent to us on X."
        actions={
          <>
            <ButtonLink href="/about/careers">See careers at Gleo</ButtonLink>
            <ButtonLink href="/about/team" variant="line">
              Meet the Gleo team
            </ButtonLink>
          </>
        }
      />
    </>
  );
}
