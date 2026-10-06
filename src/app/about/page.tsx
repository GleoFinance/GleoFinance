import type { Metadata } from "next";
import { BRAND } from "@/config/brand";
import { ButtonLink, CtaBand, Faq, LinkTiles, PageHero, Rows, Section, SectionHead, Split } from "@/components/ui";
import { VALUES } from "./values";

export const metadata: Metadata = {
  title: "Mission",
  description: "Why Gleo exists: money that moves across borders as easily as a message, and assets anyone can hold.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        tone="night"
        title="A network with one job: make borders cheap to cross"
        lead={`${BRAND.name} exists so that a dollar, a share or a bond can reach anyone with a phone, in seconds, at a cost nobody notices.`}
        art="compass"
      />

      <Section>
        <Split title="Why it matters" art="globe">
          <p>
            Sending money abroad still costs the people who can least afford it the most. A family transfer can lose several percent to fees and
            spread and take days to arrive. Small businesses wait on invoices that cross three banks.
          </p>
          <p>
            Saving and investing are just as uneven. Many people cannot hold a share of a fund or a government bond because the product is not
            sold where they live. Public ledgers make both problems smaller, and we want to make them smaller still.
          </p>
        </Split>
      </Section>

      <Section tone="card">
        <SectionHead title="What guides the work" lead="Three commitments shape every product decision, from the payment screen to the contract design." />
        <div className="mt-10">
          <Rows
            items={[
              { title: "Open by default", body: "Anyone can read the ledger, check our figures and build on the same rails we use." },
              { title: "Useful before impressive", body: "We start with what works on the chain today and add contracts only when they are audited." },
              { title: "Compliance built in, not bolted on", body: "Issuers get controls inside the asset itself, and holders can see those controls before they accept it." },
            ]}
          />
        </div>
      </Section>

      <Section>
        <SectionHead title="Holding ourselves to account" lead="We publish our plans and label progress honestly. These are the places to check us." />
        <div className="mt-10">
          <LinkTiles
            items={[
              { href: "/about/roadmap", title: "Roadmap", body: "Every item, quarter by quarter, marked Planned until it ships." },
              { href: "/blog", title: "Journal", body: "Decisions explained, including the ones we changed our minds about." },
              { href: "/network", title: "Live network", body: "Every live figure on the site, with where it was read from." },
            ]}
          />
        </div>
      </Section>

      <section className="bg-night py-16 text-fog sm:py-24">
        <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6">
          <SectionHead dark title="How we work together" />
          <ol className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <li key={v.title} className="min-w-0 border-t-2 border-sea pt-5">
                <p className="font-mono text-[12px] text-fog-2">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 font-display text-[1.45rem] leading-snug font-semibold">{v.title}</h3>
                <p className="mt-3 text-[15.5px] leading-relaxed text-fog-2">{v.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Section tone="card">
        <SectionHead title="Fair access, in practice" lead="Commitments are only worth what they change. Here is what ours mean day to day." />
        <div className="mt-10 max-w-4xl">
          <Faq
            items={[
              { q: "Who can use Gleo?", a: "Anyone with an EVM wallet that can add Robinhood Chain. The live tools need no account and no sign-up." },
              { q: "Who do we hire?", a: "People who care about the problem, wherever they live. We write job descriptions around outcomes, not credentials." },
              { q: "How do we treat the community?", a: "Every space we run follows our code of conduct, and reports are handled privately and promptly." },
            ]}
          />
        </div>
      </Section>

      <CtaBand
        title="Help build it"
        body="We are a small team and we read every message."
        actions={
          <>
            <ButtonLink href="/about/careers" variant="fog">
              Careers
            </ButtonLink>
            <ButtonLink href="/about/team" variant="line" className="border-fog/30 text-fog hover:border-fog">
              The team
            </ButtonLink>
          </>
        }
      />
    </>
  );
}
