// Site map. The header menus, the mobile drawer, the footer and the sitemap
// all read from here, so a route is added in one place.

export type NavLink = { href: string; label: string; note?: string };
export type NavMenu = { label: string; links: NavLink[]; feature?: { href: string; title: string; body: string } };

export const MENUS: NavMenu[] = [
  {
    label: "Network",
    links: [
      { href: "/learn/intro", label: "What is Gleo", note: "The network in ten minutes" },
      { href: "/learn", label: "Learn", note: "Guides from first principles" },
      { href: "/blog", label: "Journal", note: "Notes from the team" },
      { href: "/about", label: "Mission", note: "Why Gleo exists" },
      { href: "/about/careers", label: "Careers", note: "Work on open money rails" },
    ],
    feature: { href: "/network", title: "Watch the chain live", body: "Block height, block time and what a transfer costs right now." },
  },
  {
    label: "Use cases",
    links: [
      { href: "/use-cases/payments", label: "Payments", note: "Move money between countries" },
      { href: "/use-cases/tokenization", label: "Asset tokenization", note: "Issue real-world assets on-chain" },
      { href: "/use-cases/ramps", label: "On and off-ramps", note: "Anchors between cash and tokens" },
      { href: "/use-cases/aid", label: "Aid disbursements", note: "Bulk payouts that reach people" },
      { href: "/use-cases/defi", label: "DeFi", note: "Lending, pools and exchange" },
      { href: "/use-cases/privacy", label: "Privacy", note: "Open by default, private on purpose" },
      { href: "/case-studies", label: "Field scenarios", note: "Worked examples, start to finish" },
      { href: "/products", label: "Products and tools", note: "Everything we ship, in one list" },
      { href: "/ecosystem", label: "Ecosystem", note: "What Gleo plugs into today" },
    ],
    feature: { href: "/use-cases", title: "All use cases", body: "Four jobs Gleo is built to do, and who each one is for." },
  },
  {
    label: "Build",
    links: [
      { href: "/developers", label: "Developers", note: "Docs map, RPC, chain details" },
      { href: "/smart-contracts", label: "Smart contracts", note: "Gleo Contracts on Robinhood Chain" },
      { href: "/grants", label: "Grants and funding", note: "Money for builders" },
      { href: "/institutions", label: "For institutions", note: "Issuance and settlement" },
      { href: "/fintechs", label: "For fintechs and wallets", note: "Payment rails for your product" },
    ],
    feature: { href: "/send", title: "Send a real payment", body: "Move ETH or USDG to any address from your own wallet." },
  },
  {
    label: "Community",
    links: [
      { href: "/community", label: "Community", note: "Where the conversation happens" },
      { href: "/events", label: "Events", note: "Meetups and office hours" },
      { href: "/faq", label: "FAQ", note: "Straight answers" },
      { href: "/press", label: "Press", note: "Announcements and media kit" },
    ],
  },
];

export const APP_LINKS: (NavLink & { status: "live" | "practice" })[] = [
  { href: "/send", label: "Send", note: "ETH or USDG to any address", status: "live" },
  { href: "/network", label: "Network", note: "Live Robinhood Chain readings", status: "live" },
  { href: "/assets", label: "Assets", note: "Tokenized assets already on-chain", status: "live" },
  { href: "/swap", label: "Swap $GLEO", note: "Through Pons, from launch", status: "live" },
  { href: "/tokenize", label: "Tokenize", note: "Issuer console with asset controls", status: "practice" },
  { href: "/anchors", label: "Anchors", note: "Cash in and cash out", status: "practice" },
  { href: "/lend", label: "Lend and borrow", note: "Money market", status: "practice" },
  { href: "/pools", label: "Pools", note: "Automated market maker", status: "practice" },
];

export const FOOTER: { title: string; links: NavLink[] }[] = [
  {
    title: "About",
    links: [
      { href: "/about", label: "Mission" },
      { href: "/about/team", label: "Team" },
      { href: "/about/careers", label: "Careers" },
      { href: "/about/roadmap", label: "Roadmap" },
      { href: "/brand", label: "Brand resources" },
      { href: "/press", label: "Press" },
      { href: "/blog", label: "Journal" },
    ],
  },
  {
    title: "Products",
    links: [
      { href: "/use-cases", label: "Use cases" },
      { href: "/case-studies", label: "Field scenarios" },
      { href: "/products", label: "Products and tools" },
      { href: "/institutions", label: "Institutions" },
      { href: "/fintechs", label: "Fintechs and wallets" },
    ],
  },
  {
    title: "Network",
    links: [
      { href: "/network", label: "Live network" },
      { href: "/assets", label: "Asset explorer" },
      { href: "/anchors", label: "Anchor directory" },
      { href: "/ecosystem", label: "Ecosystem" },
      { href: "/ecosystem/service-providers", label: "Service providers" },
      { href: "/learn", label: "Learn" },
    ],
  },
  {
    title: "Developers",
    links: [
      { href: "/developers", label: "Developer hub" },
      { href: "/smart-contracts", label: "Smart contracts" },
      { href: "/grants", label: "Grants and funding" },
      { href: "/enterprise-fund", label: "Enterprise fund" },
      { href: "/grants/bug-bounty", label: "Bug bounty" },
    ],
  },
  {
    title: "Connect",
    links: [
      { href: "/community", label: "Community" },
      { href: "/events", label: "Events" },
      { href: "/about/code-of-conduct", label: "Code of conduct" },
      { href: "/faq", label: "FAQ" },
    ],
  },
];

export const LEGAL: NavLink[] = [
  { href: "/brand-policy", label: "Brand policy" },
  { href: "/privacy-policy", label: "Privacy policy" },
  { href: "/terms-of-service", label: "Terms of service" },
];
