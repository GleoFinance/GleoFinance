// Single place to change project identity. Everything on the site reads from here.
//
// To publish the real contract address, replace the value of CA below. The
// navbar copy pill, the footer block, the swap page and every explorer link
// derive from it. Anything that is not 0x + 40 hex characters is treated as
// "not launched yet": the copy buttons read "At launch" and stay disabled,
// and the swap screen waits instead of quoting.

const CA = "0xxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

export const isAddress = (v: string): v is `0x${string}` => /^0x[0-9a-fA-F]{40}$/.test(v);

export const BRAND = {
  name: "Gleo",
  ticker: "GLEO",
  symbol: "$GLEO",
  domain: "gleo.finance",
  url: "https://gleo.finance",
  slogan: "Global Finance. No Borders.",
  tagline: "Cross-border payments in seconds. Assets tokenized instantly. DeFi reimagined.",
  description:
    "Gleo is a payments, asset tokenization and DeFi network on Robinhood Chain: send dollars across borders in seconds, issue real-world assets as tokens with built-in controls, and put them to work in open markets.",
  x: "https://x.com/gleofinance",
  xHandle: "@gleofinance",
  // Public source repository. "https://github.com/" is a placeholder: while it
  // stays like this, the GitHub link is hidden everywhere on the site.
  github: "https://github.com/GleoFinance/GleoFinance",
  ca: CA,
} as const;

export const hasGithub = () => /^https:\/\/github\.com\/[^/]+/.test(BRAND.github);

// Public endpoints are the default. An operator can point the site at a
// private RPC with ROBINHOOD_RPC_URL (server) / NEXT_PUBLIC_ROBINHOOD_RPC_URL
// (browser). Both are optional.
const PUBLIC_RPC = "https://rpc.mainnet.chain.robinhood.com";

export const CHAIN = {
  id: 4663,
  hex: "0x1237",
  name: "Robinhood Chain",
  nativeSymbol: "ETH",
  decimals: 18,
  publicRpc: PUBLIC_RPC,
  rpc: process.env.NEXT_PUBLIC_ROBINHOOD_RPC_URL || PUBLIC_RPC,
  /** Second public endpoint, used for reads only when the first one fails. */
  fallbackRpc: "https://robinhood-rpc.publicnode.com",
  explorer: "https://robinhoodchain.blockscout.com",
} as const;

/** RPC for server code: the private endpoint when set, else the public one. */
export function serverRpc() {
  return process.env.ROBINHOOD_RPC_URL || process.env.NEXT_PUBLIC_ROBINHOOD_RPC_URL || PUBLIC_RPC;
}

export const TOKEN = {
  get isLive() {
    return isAddress(BRAND.ca);
  },
  get explorerUrl() {
    return isAddress(BRAND.ca) ? explorerToken(BRAND.ca) : null;
  },
};

/**
 * Pons V2 launchpad and the Uniswap v4 contracts its graduated pools trade on.
 * Every address was checked with eth_getCode on Robinhood Chain mainnet.
 */
export const PONS = {
  factory: "0x7eD598BcEf8bd9Edd8C97A195C6d13f40801EC7e",
  memeHook: "0xE5e702641Ea86F4ae6cC3cDaeD2B886f976Be044",
  v4Quoter: "0x8Dc178eFB8111BB0973Dd9d722ebeFF267c98F94",
  universalRouter: "0x8876789976dEcBfCbBbe364623C63652db8C0904",
  permit2: "0x000000000022D473030F116dDEE9F6B43aC78BA3",
  /** Public launch page for a token. */
  page: (token: string) => `https://www.ponsfamily.com/launchpad/${token}`,
} as const;

export function explorerAddress(address: string) {
  return `${CHAIN.explorer}/address/${address}`;
}
export function explorerToken(address: string) {
  return `${CHAIN.explorer}/token/${address}`;
}
export function explorerTx(hash: string) {
  return `${CHAIN.explorer}/tx/${hash}`;
}
export function shortAddress(address: string, head = 6, tail = 4) {
  if (address.length <= head + tail + 2) return address;
  return `${address.slice(0, head)}…${address.slice(-tail)}`;
}
