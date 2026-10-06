import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_LINKS } from "@/config/nav";
import { AppFrame } from "@/components/app/AppFrame";
import { LiveFigures } from "@/components/live/LiveFigures";
import { Tag } from "@/components/ui";

export const metadata: Metadata = {
  title: "App",
  description: "Gleo's tools: send payments, read the network, explore tokenized assets, swap $GLEO, and practice issuance, anchors, lending and pools.",
};

export default function AppHome() {
  const live = APP_LINKS.filter((l) => l.status === "live");
  const practice = APP_LINKS.filter((l) => l.status === "practice");
  return (
    <AppFrame
      status="live"
      title="Gleo app"
      lead="Four tools work against the real chain today. Four more run in practice mode until Gleo's contracts are deployed: you sign each action, nothing is sent, and you can see exactly how the finished product will behave."
    >
      <div className="space-y-12">
        {[
          { title: "Live tools", note: "Real readings and real transactions from your wallet.", list: live, tone: "live" as const },
          { title: "Practice tools", note: "Full interface, signed receipts, no transactions.", list: practice, tone: "practice" as const },
        ].map((group) => (
          <section key={group.title}>
            <div className="flex flex-wrap items-baseline gap-3">
              <h2 className="font-display text-2xl font-semibold">{group.title}</h2>
              <p className="text-sm text-ink-3">{group.note}</p>
            </div>
            <ul className="mt-4 divide-y divide-line-2 border-y border-line-2">
              {group.list.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-4">
                    <span className="min-w-0">
                      <span className="flex items-center gap-2 text-[17px] font-semibold group-hover:underline">
                        {l.label} <Tag tone={group.tone} />
                      </span>
                      <span className="block text-[14.5px] text-ink-2">{l.note}</span>
                    </span>
                    <ArrowRight className="size-5 text-ink-3" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
        <LiveFigures />
      </div>
    </AppFrame>
  );
}
