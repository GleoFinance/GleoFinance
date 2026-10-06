import { BRAND, CHAIN } from "@/config/brand";

/*
 * Practice receipts. Tools that would need a Gleo contract (tokenize,
 * anchors, lending, pools) run without one: each action is written out as a
 * plain-text message, signed with personal_sign (free, no transaction) and
 * kept in this browser. The signature proves which wallet took the action;
 * nothing moves on-chain.
 */

export type PracticeKind = "tokenize" | "anchors" | "lend" | "pools";

export type Receipt = {
  id: string;
  kind: PracticeKind;
  account: string;
  details: Record<string, string>;
  message: string;
  signature: string;
  at: number;
};

const KIND_TITLE: Record<PracticeKind, string> = {
  tokenize: "Tokenize",
  anchors: "Anchors",
  lend: "Lend and borrow",
  pools: "Pools",
};

/**
 * Domain written into the message. Only the project's own domain (and
 * localhost while developing) is ever named; a look-alike site cannot get a
 * receipt that claims to come from here.
 */
export function practiceDomain(host: string) {
  const h = host.toLowerCase();
  if (h === BRAND.domain || h === `www.${BRAND.domain}`) return h;
  if (/^(localhost|127\.0\.0\.1)(:\d{1,5})?$/.test(h)) return h;
  return BRAND.domain;
}

export function newNonce() {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

export function buildMessage(domain: string, kind: PracticeKind, account: string, details: Record<string, string>, nonce: string, issuedAt: string) {
  return [
    `${domain} practice receipt for ${BRAND.name}`,
    "",
    "PRACTICE ONLY. Nothing is sent on-chain and no funds move.",
    `Tool: ${KIND_TITLE[kind]}`,
    ...Object.entries(details).map(([k, v]) => `${k}: ${v}`),
    "",
    `Account: ${account}`,
    `Chain ID: ${CHAIN.id}`,
    `Nonce: ${nonce}`,
    `Issued At: ${issuedAt}`,
  ].join("\n");
}

/** Reads the fields back out of a signed message. */
export function parseMessage(message: string) {
  const lines = message.split("\n");
  const field = (name: string) => lines.find((l) => l.startsWith(`${name}: `))?.slice(name.length + 2) ?? null;
  return {
    domain: lines[0]?.split(" ")[0] ?? "",
    account: field("Account"),
    chainId: field("Chain ID"),
    nonce: field("Nonce"),
    issuedAt: field("Issued At"),
    practice: lines[2] === "PRACTICE ONLY. Nothing is sent on-chain and no funds move.",
  };
}
