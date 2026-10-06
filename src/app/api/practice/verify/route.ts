import { NextResponse } from "next/server";
import { BRAND, CHAIN, isAddress } from "@/config/brand";
import { allow, badBody, clientIp, readJson, tooMany } from "@/lib/guard";
import { parseMessage } from "@/lib/practice";
import { recoverSigner } from "@/lib/verify";

export const dynamic = "force-dynamic";

const ALLOWED_DOMAINS = new Set([BRAND.domain, `www.${BRAND.domain}`]);

/**
 * Checks a practice receipt: who signed it, whether it names this site and
 * this chain, and whether it is marked as practice. Stateless; nothing is
 * stored. Local hosts count only outside production on Vercel.
 */
export async function POST(request: Request) {
  if (!allow("verify", clientIp(request), 60)) return tooMany();
  if (Number(request.headers.get("content-length") ?? 0) > 4096) return NextResponse.json({ error: "Body too large." }, { status: 413 });
  const body = await readJson<{ message?: unknown; signature?: unknown }>(request, 4096);
  const message = typeof body?.message === "string" ? body.message : "";
  const signature = typeof body?.signature === "string" ? body.signature : "";
  if (!message || !signature) return badBody();
  const parsed = parseMessage(message);
  const signer = recoverSigner(message, signature);
  const local = !process.env.VERCEL && /^(localhost|127\.0\.0\.1)(:\d{1,5})?$/.test(parsed.domain);
  const domainOk = ALLOWED_DOMAINS.has(parsed.domain) || local;
  const accountOk = Boolean(parsed.account && isAddress(parsed.account) && signer === parsed.account.toLowerCase());
  return NextResponse.json({
    valid: Boolean(signer) && accountOk && domainOk && parsed.chainId === String(CHAIN.id) && parsed.practice,
    signer,
    domainOk,
    accountOk,
    chainOk: parsed.chainId === String(CHAIN.id),
    practice: parsed.practice,
    issuedAt: parsed.issuedAt,
  });
}
