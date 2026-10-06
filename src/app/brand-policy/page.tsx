import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/config/brand";
import { LongForm } from "@/components/ui";

export const metadata: Metadata = {
  title: "Brand policy",
  description: "How the Gleo name, the $GLEO ticker and the Gleo mark may and may not be used.",
};

export default function BrandPolicyPage() {
  return (
    <LongForm title="Brand policy" updated="October 5, 2026" lead="How you may use the Gleo name, the $GLEO ticker and the Gleo mark.">
      <h2>Brand assets</h2>
      <p>
        &ldquo;Gleo&rdquo;, &ldquo;{BRAND.symbol}&rdquo; and the Gleo mark (the open globe with a dot) are the brand assets covered here. Official
        files are on the <Link href="/brand">brand resources</Link> page. Using them as described below does not need our permission.
      </p>
      <h2>Generally permitted</h2>
      <ul>
        <li>Writing about Gleo in news, reviews, research and tutorials.</li>
        <li>Saying that your product works with, supports or is built on Gleo, when that is true.</li>
        <li>Showing the official mark next to that statement, unaltered.</li>
      </ul>
      <h2>Generally prohibited</h2>
      <ul>
        <li>Using the name or mark in a way that suggests Gleo endorses, sponsors or runs your product when it does not.</li>
        <li>Naming a token, app, domain or social account so that people could mistake it for an official Gleo one.</li>
        <li>Using the brand to promote a token sale, airdrop or giveaway that Gleo has not announced on {BRAND.domain} and {BRAND.xHandle}.</li>
      </ul>
      <h2>Specific permitted use</h2>
      <p>
        Community groups may use &ldquo;Gleo&rdquo; in their name with a qualifier that makes the independence clear, such as &ldquo;Gleo builders
        Jakarta (community)&rdquo;, and must say they are not run by the Gleo team.
      </p>
      <h2>Specific prohibited use</h2>
      <p>
        No merchandise for sale, no use in paid advertising keywords that target the Gleo name, and no modified marks, without written permission.
      </p>
      <h2>Guidelines for the name</h2>
      <p>Write &ldquo;Gleo&rdquo; with a capital G. Write the token as &ldquo;{BRAND.symbol}&rdquo; or &ldquo;GLEO&rdquo;. Do not combine the name with other words into a new product name.</p>
      <h2>Guidelines for the mark</h2>
      <p>Use the files as provided. Keep clear space around the mark, keep its proportions, and do not change its colours beyond the ink and fog versions.</p>
      <h2>Permissions and reporting misuse</h2>
      <p>
        For anything not covered here, or to report someone pretending to be Gleo, send a direct message to <a href={BRAND.x}>{BRAND.xHandle}</a> on X.
      </p>
    </LongForm>
  );
}
