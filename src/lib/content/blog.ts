// Journal posts. Every post is written by the Gleo team about Gleo itself;
// nothing here reports partnerships, volumes or milestones that did not happen.

export type PostCategory = "Network" | "Product" | "Developers" | "Policy";

export type Post = {
  slug: string;
  title: string;
  date: string; // ISO date
  category: PostCategory;
  summary: string;
  /** Body as sections; each paragraph is a string. */
  sections: { heading?: string; paragraphs: string[] }[];
};

export const POST_CATEGORIES: PostCategory[] = ["Network", "Product", "Developers", "Policy"];

export const POSTS: Post[] = [
  {
    slug: "why-gleo-runs-on-robinhood-chain",
    title: "Why Gleo runs on Robinhood Chain",
    date: "2026-10-05",
    category: "Network",
    summary: "Stock tokens, a regulated dollar and an EVM toolchain were already there. We chose to build on them instead of starting a new chain.",
    sections: [
      {
        paragraphs: [
          "When we sketched Gleo, the first question was whether it needed a ledger of its own. A new chain means recruiting validators, bootstrapping liquidity and convincing wallets to add it. None of that helps someone who simply wants to send money home on a Sunday.",
          "Robinhood Chain already had the pieces a payments and tokenization network needs: a dollar token with six decimals and hundreds of millions in circulation, tokenized shares issued through a single verified beacon, sub-second blocks and fees measured in fractions of a cent. It also speaks EVM, so every mainstream wallet can connect once the network is added.",
        ],
      },
      {
        heading: "What we build on top",
        paragraphs: [
          "Gleo is the layer that makes those pieces usable together: a payment tool that checks addresses and balances before you sign, an explorer that tells real stock tokens from look-alikes, and, once audited, contracts for issuance with built-in controls, anchors, lending and pools.",
          "Choosing an existing chain also keeps us honest. Every figure on our site that says Live is read from that chain, so anyone can check it on the public explorer.",
        ],
      },
    ],
  },
  {
    slug: "practice-mode-explained",
    title: "Practice mode, explained",
    date: "2026-10-02",
    category: "Product",
    summary: "Some Gleo tools need contracts that are not deployed yet. Here is exactly what they do in the meantime.",
    sections: [
      {
        paragraphs: [
          "Tokenizing an asset, running an anchor, lending and providing liquidity all need Gleo contracts. We have not deployed them, and we will not ask anyone to send funds to a contract that does not exist or has not been audited.",
          "So those screens run in practice mode. You can walk through the full flow, from configuring an asset's controls to opening a loan, and at the end your wallet signs a plain-text message describing what you did. That signature is free and sends no transaction.",
        ],
      },
      {
        heading: "Where practice data lives",
        paragraphs: [
          "The signed receipts stay in your browser. Clearing site data removes them. Nothing about them is real money, and every practice screen carries a lavender Practice tag so it cannot be mistaken for a live one.",
          "Tools that work with tokens that already exist, such as sending ETH or USDG, are live and move real funds from your wallet after you confirm.",
        ],
      },
    ],
  },
  {
    slug: "live-readings-and-design-targets",
    title: "Live readings and design targets",
    date: "2026-09-28",
    category: "Network",
    summary: "Why some numbers on our site update every few seconds and others carry a grey Design target tag.",
    sections: [
      {
        paragraphs: [
          "A payments network lives or dies by its numbers: how long a transfer takes, what it costs, how many can go through at once. It is tempting to print large figures on a landing page. We decided to split them in two.",
          "Live readings come from Robinhood Chain every few seconds through our server: the latest block, the average block time over the last 120 blocks, the gas price, and the dollar cost of a USDG transfer worked out from a real gas estimate and the ETH price from OKX.",
        ],
      },
      {
        heading: "Targets stay targets",
        paragraphs: [
          "Design targets describe what Gleo's payment layer is being built to reach, for example settlement under ten seconds end to end. They are labelled as targets and will stay labelled until we can measure them on our own traffic.",
          "If you ever see a Gleo figure without one of those two labels, tell us on X and we will fix it.",
        ],
      },
    ],
  },
  {
    slug: "introducing-gleo-token",
    title: "Introducing $GLEO",
    date: "2026-09-24",
    category: "Product",
    summary: "What the token is for, where its address will be published, and how to avoid fakes.",
    sections: [
      {
        paragraphs: [
          "$GLEO is the token of the Gleo network on Robinhood Chain. Its contract address is not published yet. Until it is, every Copy CA button on this site reads At launch and stays disabled.",
          "When the address goes live it will appear in the same three places at once: the pill next to Connect wallet in the navigation bar, the contract block in the footer, and our X account. Trust only an address you can find in all three.",
        ],
      },
      {
        heading: "Trading",
        paragraphs: [
          "Swaps open through Pons the moment the address is set. The swap page already connects your wallet and shows your ETH balance, and switches to live quotes without any further release.",
          "Nothing in this post is investment advice. Tokens can lose all of their value.",
        ],
      },
    ],
  },
  {
    slug: "asset-controls-design-notes",
    title: "Design notes: controls that travel with an asset",
    date: "2026-09-19",
    category: "Developers",
    summary: "Freeze, clawback and holder approval as properties of the token, and the limits we are putting on them.",
    sections: [
      {
        paragraphs: [
          "Regulated issuers need a way to comply with court orders, recover funds sent by mistake and keep tokens away from addresses they are not allowed to serve. If those powers live in a separate system, the token stops making sense the moment it leaves that system.",
          "Gleo's issuance contracts put the controls in the token itself. An issuer chooses, at creation, whether holders need approval, whether balances can be frozen and whether tokens can be clawed back. Those choices are visible on-chain to every holder before they accept the asset.",
        ],
      },
      {
        heading: "Limits on the issuer",
        paragraphs: [
          "A control that can be switched on later is a control nobody can rely on being off. Our draft makes each flag one-way: an issuer can give up a power, never add one after issuance. Every use of a control emits an event that explorers can show.",
          "You can try the issuer console now in practice mode. The contract design is open for review before any deployment.",
        ],
      },
    ],
  },
  {
    slug: "roadmap-notes-autumn-2026",
    title: "Roadmap notes, autumn 2026",
    date: "2026-09-15",
    category: "Policy",
    summary: "What we are building first, what waits for an audit, and what we are not promising.",
    sections: [
      {
        paragraphs: [
          "Our first quarter is about tools that are useful without new contracts: sending payments, reading the network and verifying tokenized assets. Those are live.",
          "Next come the contracts: issuance with asset controls, an anchor registry, a money market and pools. Each one ships only after an external audit, and each one keeps a practice version so people can learn the flow first.",
        ],
      },
      {
        heading: "What we are not promising",
        paragraphs: [
          "We are not announcing partners, volumes or dates we cannot control. The roadmap page lists every item as Planned until it ships, and we will move items, not quietly delete them, if plans change.",
        ],
      },
    ],
  },
];

export const postsByDate = () => [...POSTS].sort((a, b) => b.date.localeCompare(a.date));
export const findPost = (slug: string) => POSTS.find((p) => p.slug === slug) ?? null;
export const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

/** Search titles and descriptions per post (title gets " — Gleo" appended). */
export const POST_SEO: Record<string, { title: string; description: string; keyword: string }> = {
  "why-gleo-runs-on-robinhood-chain": {
    keyword: "Robinhood Chain payments",
    title: "Why Gleo Builds on Robinhood Chain, Not a New Chain",
    description:
      "Robinhood Chain already had a dollar token, verified stock tokens and fast blocks. Here is why Gleo builds payments on it instead of launching its own chain.",
  },
  "practice-mode-explained": {
    keyword: "practice mode",
    title: "Practice Mode Explained: Signed Receipts, No Gas",
    description:
      "Some Gleo tools wait for audited contracts. Practice mode lets you walk the full flow and sign a free receipt, with no transaction and no funds at risk.",
  },
  "live-readings-and-design-targets": {
    keyword: "live network data",
    title: "Live Network Readings Versus Design Targets",
    description:
      "Why some Gleo figures refresh every few seconds from Robinhood Chain and others carry a Design target tag, and how to check any live network data yourself.",
  },
  "introducing-gleo-token": {
    keyword: "$GLEO token",
    title: "Introducing $GLEO, the Gleo Token on Robinhood Chain",
    description:
      "What the $GLEO token is for, the three places its contract address will appear at launch, and how to avoid fake tokens. Read this before you trade or swap.",
  },
  "asset-controls-design-notes": {
    keyword: "tokenized asset controls",
    title: "Tokenized Asset Controls: Freeze, Clawback, Approval",
    description:
      "Design notes on tokenized asset controls: freeze, clawback and holder approval set at creation, one-way afterwards, visible on-chain to every holder.",
  },
  "roadmap-notes-autumn-2026": {
    keyword: "Gleo roadmap",
    title: "Roadmap Notes, Autumn 2026: What Ships and What Waits",
    description:
      "Gleo roadmap notes for autumn 2026: which payment tools are live, which contracts wait for an external audit, and what we deliberately are not promising.",
  },
};
