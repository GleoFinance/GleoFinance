/**
 * Typed rate-limit key for an IP address: "n4:<ipv4>" for IPv4 (kept whole),
 * "n6:<prefix>/64" for IPv6 (cut to its /64, since one subscriber is usually
 * handed a whole /64). Returns null for anything that does not parse as an
 * address, including "host:port" forms.
 */
export function networkKey(ip: string): string | null {
  const addr = ip.trim().toLowerCase().replace(/^\[|\]$/g, "").split("%")[0];
  const v4 = parseV4(addr);
  if (v4) return `n4:${v4}`;
  const mapped = addr.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
  if (mapped) {
    const inner = parseV4(mapped[1]);
    return inner ? `n4:${inner}` : null;
  }
  const groups = parseV6(addr);
  if (!groups) return null;
  return `n6:${groups.slice(0, 4).join(":")}::/64`;
}

/** Aggregate key for a network key: IPv4 /24 or IPv6 /48; anything else its own "ax:" bucket. */
export function aggregateKey(net: string): string {
  if (net.startsWith("n4:")) return `a4:${net.slice(3).split(".").slice(0, 3).join(".")}.0/24`;
  if (net.startsWith("n6:")) return `a6:${net.slice(3, -5).split(":").slice(0, 3).join(":")}::/48`;
  return `ax:${net}`;
}

function parseV4(addr: string): string | null {
  const m = addr.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (!m) return null;
  const parts = m.slice(1).map(Number);
  return parts.every((p) => p <= 255) ? parts.join(".") : null;
}

function parseV6(addr: string): string[] | null {
  if (!/^[0-9a-f:]+$/.test(addr) || !addr.includes(":")) return null;
  const halves = addr.split("::");
  if (halves.length > 2) return null;
  const left = halves[0] ? halves[0].split(":") : [];
  const right = halves.length === 2 && halves[1] ? halves[1].split(":") : [];
  if ([...left, ...right].some((g) => g.length === 0 || g.length > 4)) return null;
  const missing = 8 - left.length - right.length;
  if (halves.length === 1 ? missing !== 0 : missing < 1) return null;
  const groups = halves.length === 2 ? [...left, ...Array(missing).fill("0"), ...right] : left;
  return groups.map((g) => g.replace(/^0+(?=.)/, ""));
}
