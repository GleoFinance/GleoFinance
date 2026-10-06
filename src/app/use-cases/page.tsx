import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BRAND } from "@/config/brand";
import { ButtonLink, CtaBand, LinkTiles, PageHero, Section, SectionHead, Split } from "@/components/ui";

export const metadata: Metadata = {
  title: "Use cases",
  description: "What Gleo is built to do: cross-border payments, cash ramps, tokenized real-world assets, aid disbursement and open markets on Robinhood Chain.",
};

const JUMP = [
  { href: "/use-cases/payments", label: "Payments" },
  { href: "/use-cases/ramps", label: "On and off-ramps" },
  { href: "/use-cases/tokenization", label: "Tokenization" },
  { href: "/use-cases/aid", label: "Aid" },
  { href: "/use-cases/defi", label: "DeFi" },
  { href: "/use-cases/privacy", label: "Privacy" },
];

export default function UseCases() {
  return (
    <>
      <PageHero
        title="Jobs Gleo is built to do"
        lead={`Moving money between countries, getting cash in and out, putting real assets on a ledger and getting it to people who need it. ${BRAND.name} handles each one on the same network.`}
        art="compass"
        actions={
          <div className="flex flex-wrap gap-2">
            {JUMP.map((j) => (
              <Link key={j.href} href={j.href} className="rounded-full border border-line-2 bg-card px-3.5 py-1.5 text-sm font-medium hover:border-ink">
                {j.label}
              </Link>
            ))}
          </div>
        }
      />

      <Section>
        <Split title="Send across borders without the toll booths" art="globe">
          <p>
            A dollar sent from one country to another usually passes through several banks, each taking time and a fee. On Gleo the
            sender&apos;s wallet pays the recipient&apos;s wallet directly, and the transfer is final within a block.
          </p>
          <p>Remittances, supplier invoices, payroll and marketplace payouts all fit the same pattern.</p>
          <ButtonLink href="/use-cases/payments" variant="line">
            Payments in detail
          </ButtonLink>
        </Split>
      </Section>

      <section className="bg-night py-16 text-fog sm:py-24">
        <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-16">
          <h2 className="font-display text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.05] font-bold tracking-[-0.02em]">
            One shared playbook for every cash gateway
          </h2>
          <div className="min-w-0 space-y-4 text-[17px] leading-relaxed text-fog-2">
            <p>
              Anchors are the businesses that turn bank money or cash into tokens and back. Gleo asks every anchor to speak the same
              interface, so a wallet that works with one works with all of them.
            </p>
            <p>For a wallet team that means one integration, not one per country. For an anchor it means every Gleo wallet is a channel.</p>
            <Link href="/use-cases/ramps" className="inline-flex items-center gap-1.5 font-semibold text-fog hover:underline">
              How ramps work <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <Section tone="card">
        <Split title="Give real assets a ledger entry" art="token" reverse>
          <p>
            Gold, fund shares, bonds and property can be issued as tokens whose rules travel with them: who may hold them, and what the
            issuer can do when a court order or a lost key demands it.
          </p>
          <p>Tokenized stocks already trade on Robinhood Chain today, and the asset explorer lists the verified ones.</p>
          <ButtonLink href="/use-cases/tokenization" variant="line">
            Tokenization in detail
          </ButtonLink>
        </Split>
      </Section>

      <Section>
        <Split title="Aid that arrives, and can be shown to have arrived" art="fanout">
          <p>
            Relief teams can send support straight to recipients&apos; phones and let them collect cash at local agents. Every payment is on
            the public record, while the list of who received it stays private.
          </p>
          <ButtonLink href="/use-cases/aid" variant="line">
            Aid disbursements
          </ButtonLink>
        </Split>
      </Section>

      <Section tone="card">
        <SectionHead title="Keep exploring" lead="Where to go next depending on what you came for." />
        <div className="mt-10">
          <LinkTiles
            items={[
              { href: "/anchors", title: "Anchor directory", body: "Cash-in and cash-out gateways by region, and how a deposit works step by step.", tag: "practice" },
              { href: "/case-studies", title: "Field scenarios", body: "Four worked examples, from contractor payroll to borrowing against shares.", tag: "example" },
              { href: "/ecosystem/service-providers", title: "Service providers", body: "Firms that help teams integrate, audit and run Gleo in production." },
            ]}
          />
        </div>
      </Section>

      <CtaBand
        title="Not sure which one fits?"
        body="Tell us what you are moving and where. We read every message on X."
        actions={
          <>
            <ButtonLink href={BRAND.x} variant="fog">
              Message {BRAND.xHandle}
            </ButtonLink>
            <ButtonLink href="/faq" variant="line" className="border-fog/30 text-fog hover:border-fog">
              Read the FAQ
            </ButtonLink>
          </>
        }
      />
    </>
  );
}
