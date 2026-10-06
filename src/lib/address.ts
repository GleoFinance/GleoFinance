import { keccak_256 } from "@noble/hashes/sha3.js";

/** EIP-55 checksum form of a 0x address. */
export function toChecksum(address: string) {
  const lower = address.toLowerCase().replace(/^0x/, "");
  const hash = Array.from(keccak_256(new TextEncoder().encode(lower)), (b) => b.toString(16).padStart(2, "0")).join("");
  return `0x${[...lower].map((c, i) => (Number.parseInt(hash[i], 16) >= 8 ? c.toUpperCase() : c)).join("")}`;
}

export type AddressCheck = { ok: true; address: `0x${string}` } | { ok: false; reason: string };

/**
 * Validates what someone typed as a recipient. All-lowercase or all-uppercase
 * addresses carry no checksum and are accepted; mixed case must match EIP-55,
 * which catches most single-character typos.
 */
export function checkAddress(input: string): AddressCheck {
  const v = input.trim();
  if (!v) return { ok: false, reason: "Enter the recipient's address." };
  if (!/^0x[0-9a-fA-F]{40}$/.test(v)) return { ok: false, reason: "An address is 0x followed by 40 hexadecimal characters." };
  const body = v.slice(2);
  const mixed = body !== body.toLowerCase() && body !== body.toUpperCase();
  if (mixed && toChecksum(v) !== v) return { ok: false, reason: "The checksum does not match. One character is probably mistyped." };
  if (/^0x0{40}$/.test(v)) return { ok: false, reason: "That is the zero address. Funds sent there are lost." };
  return { ok: true, address: toChecksum(v) as `0x${string}` };
}
