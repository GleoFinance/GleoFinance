import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_LINKS } from "@/config/nav";
import { AppFrame } from "@/components/app/AppFrame";
import { ToolGuide } from "@/components/app/ToolGuide";
import { LiveFigures } from "@/components/live/LiveFigures";
import { Tag } from "@/components/ui";
import { pageMeta } from "@/lib/seo";

const description =
  "The Gleo app on Robinhood Chain: send USDG, read live network stats, browse tokenized stocks, swap $GLEO and practice issuance, lending and pools. Start here.";

export const metadata = pageMeta({
  path: "/app",
  title: "Robinhood Chain Payment App and DeFi Practice Tools",
  description,
  keywords: ["Robinhood Chain payment app", "USDG wallet tools", "DeFi practice", "tokenized stocks app"],
});

export default function AppHome() {
  const live = APP_LINKS.filter((l) => l.status === "live");
  const practice = APP_LINKS.filter((l) => l.status === "practice");
  return (
    <AppFrame
      status="live"
      eyebrow="Gleo app"
      path="/app"
      crumb="App"
      description={description}
      title="The Gleo app for Robinhood Chain payments"
      lead={
        <p>
          The Gleo app brings Robinhood Chain payments, live chain data and tokenized stocks into one place. Four tools work against the
          real chain today. Four more run in practice mode until Gleo&apos;s contracts are deployed: you sign each step for free, no
          transaction is sent, and you see exactly how the finished tool will behave.
        </p>
      }
      guide={
        <ToolGuide
          eyebrow="Live and practice"
          title="What the two kinds of tool mean"
          lead="Every tool carries a label. It tells you whether your wallet will send a real transaction or only sign a free receipt."
          points={[
            { title: "Live tools", body: "Read real data from Robinhood Chain or send a real transaction that you confirm in your own wallet." },
            { title: "Practice tools", body: "Full interface, signed with personal_sign. Nothing is broadcast and no funds can move." },
            { title: "Receipts you can check", body: "Each practice receipt can be verified against your address, and is stored only in this browser." },
          ]}
          related={[
            { href: "/blog/practice-mode-explained", title: "Practice mode, explained", body: "Why the practice tools exist and what a signed receipt proves.", label: "Read the post" },
            { href: "/learn/intro", title: "What is Gleo?", body: "The network in ten minutes: payments, assets and DeFi on Robinhood Chain.", label: "Start with the basics" },
            { href: "/faq", title: "Gleo FAQ", body: "Wallets, fees, the contract address and practice mode, answered plainly.", label: "Read the FAQ" },
          ]}
        />
      }
    >
      <div className="space-y-12">
        {[
          { title: "Live tools", note: "Real readings and real transactions from your wallet.", list: live, tone: "live" as const },
          { title: "Practice tools", note: "Full interface, signed receipts, no transactions.", list: practice, tone: "practice" as const },
        ].map((group) => (
          <section key={group.title}>
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h2 className="font-display text-[28px] leading-[1.2] tracking-[-0.02em]">{group.title}</h2>
              <p className="text-[15px] text-ink-2">{group.note}</p>
            </div>
            <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {group.list.map((l) => (
                <li key={l.href} className="min-w-0">
                  <Link href={l.href} className="group flex h-full flex-col border border-line bg-paper p-6 transition-colors hover:border-ink">
                    <span className="flex flex-wrap items-center gap-2 text-[17px] font-semibold">
                      {l.label} <Tag tone={group.tone} />
                    </span>
                    <span className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-2">{l.note}</span>
                    <span className="mt-4 inline-flex items-center gap-2 text-[15px]">
                      <ArrowRight className="size-4" /> Open {l.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
        <section>
          <h2 className="sr-only">Live Robinhood Chain readings</h2>
          <LiveFigures />
        </section>
      </div>
    </AppFrame>
  );
}
