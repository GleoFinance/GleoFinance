import Link from "next/link";
import { BRAND } from "@/config/brand";
import { pageMeta } from "@/lib/seo";
import { LongForm } from "@/components/ui";

export const metadata = pageMeta({
  path: "/about/code-of-conduct",
  title: "Community Code of Conduct and How to Report Abuse",
  description:
    "The Gleo community code of conduct: how we expect people to treat each other on X, at events and in code review, and how to report a problem in private.",
  keywords: ["community code of conduct", "report abuse", "Gleo community"],
});

export default function CodeOfConductPage() {
  return (
    <LongForm
      eyebrow="Community"
      title="Gleo community code of conduct"
      lead="This community code of conduct covers every space Gleo runs: replies on X, events, code repositories and calls. It also explains how to report a problem."
      updated="October 6, 2026"
      crumbs={[
        { name: "About", path: "/about" },
        { name: "Code of conduct", path: "/about/code-of-conduct" },
      ]}
    >
      <p>
        We want people of every background and level of experience to feel able to ask questions, disagree and contribute. That only works if
        everyone treats each other with respect. This code applies to the {BRAND.name} team and to everyone who takes part in our spaces.
      </p>
      <h2>Reviewing and contributing to code</h2>
      <p>
        Review the work, not the person. Explain why a change is needed, assume the author acted in good faith, and accept that maintainers make
        the final call on what is merged. Credit others for their ideas and code.
      </p>
      <h2>Everyone is welcome</h2>
      <p>
        We welcome contributors regardless of age, body, disability, ethnicity, gender identity and expression, experience, nationality, appearance,
        race, religion or sexual orientation. Use plain language and be patient with people working in a second language.
      </p>
      <h2>Behaviour we do not accept</h2>
      <ul>
        <li>Harassment, insults, threats or personal attacks.</li>
        <li>Sexual language or imagery, and unwelcome attention.</li>
        <li>Publishing someone&apos;s private information without permission.</li>
        <li>Promoting scams, fake contract addresses or impersonating the team.</li>
        <li>Repeatedly derailing discussions after being asked to stop.</li>
      </ul>
      <h2>How to report a problem</h2>
      <p>
        Send a direct message to {BRAND.xHandle} on X. Include what happened, where, and links or screenshots if you have them. You will get a
        reply, and you can stay anonymous to the person you are reporting.
      </p>
      <h2>Keeping reports confidential</h2>
      <p>Reports are seen only by the people handling them. We do not share the reporter&apos;s identity without consent.</p>
      <h2>What the team will do</h2>
      <p>
        The team will review every report and respond in proportion: a private note, a temporary mute, or removal from our spaces. We may remove
        comments, code or other contributions that break this code.
      </p>
      <h2>Where this code applies</h2>
      <p>
        This code applies in all Gleo spaces and when someone represents Gleo elsewhere, for example at an event or in an official account.
      </p>
      <h2>Where these rules come from</h2>
      <p>This code draws on common practice in open-source communities, rewritten for Gleo.</p>
      <p>
        Looking for somewhere to start? See the <Link href="/community">Gleo community channels</Link>, the{" "}
        <Link href="/events">upcoming Gleo events</Link> or the <Link href="/faq">answers to common questions</Link>.
      </p>
    </LongForm>
  );
}
