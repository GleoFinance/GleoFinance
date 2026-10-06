import type { Metadata } from "next";
import { BRAND } from "@/config/brand";
import { LongForm } from "@/components/ui";

export const metadata: Metadata = {
  title: "Code of conduct",
  description: "How we expect people to treat each other in every Gleo space, and how to report a problem.",
};

export default function CodeOfConductPage() {
  return (
    <LongForm
      title="Code of conduct"
      lead="The rules for every space Gleo runs: our X replies, events, repositories and calls."
      updated="October 5, 2026"
    >
      <p>
        We want people of every background and level of experience to feel able to ask questions, disagree and contribute. That only works if
        everyone treats each other with respect. This code applies to the {BRAND.name} team and to everyone who takes part in our spaces.
      </p>
      <h2>Contributing to open source</h2>
      <p>
        Review the work, not the person. Explain why a change is needed, assume the author acted in good faith, and accept that maintainers make
        the final call on what is merged. Credit others for their ideas and code.
      </p>
      <h2>Inclusion</h2>
      <p>
        We welcome contributors regardless of age, body, disability, ethnicity, gender identity and expression, experience, nationality, appearance,
        race, religion or sexual orientation. Use plain language and be patient with people working in a second language.
      </p>
      <h2>Not acceptable</h2>
      <ul>
        <li>Harassment, insults, threats or personal attacks.</li>
        <li>Sexual language or imagery, and unwelcome attention.</li>
        <li>Publishing someone&apos;s private information without permission.</li>
        <li>Promoting scams, fake contract addresses or impersonating the team.</li>
        <li>Repeatedly derailing discussions after being asked to stop.</li>
      </ul>
      <h2>Reporting a problem</h2>
      <p>
        Send a direct message to {BRAND.xHandle} on X. Include what happened, where, and links or screenshots if you have them. You will get a
        reply, and you can stay anonymous to the person you are reporting.
      </p>
      <h2>Confidentiality</h2>
      <p>Reports are seen only by the people handling them. We do not share the reporter&apos;s identity without consent.</p>
      <h2>Our responsibilities</h2>
      <p>
        The team will review every report and respond in proportion: a private note, a temporary mute, or removal from our spaces. We may remove
        comments, code or other contributions that break this code.
      </p>
      <h2>Scope</h2>
      <p>
        This code applies in all Gleo spaces and when someone represents Gleo elsewhere, for example at an event or in an official account.
      </p>
      <h2>Sources</h2>
      <p>This code draws on common practice in open-source communities, rewritten for Gleo.</p>
    </LongForm>
  );
}
