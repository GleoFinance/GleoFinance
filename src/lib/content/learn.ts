// Learn articles. Plain explanations written for Gleo; each one ends by
// pointing at the part of the site where the idea can be tried.

export type LearnTopic = "Foundations" | "Payments" | "DeFi" | "Network";

export type Article = {
  slug: string;
  title: string;
  topic: LearnTopic;
  minutes: number;
  summary: string;
  sections: { heading?: string; paragraphs: string[] }[];
  tryIt?: { href: string; label: string };
};

export const ARTICLES: Article[] = [
  {
    slug: "blockchain-basics",
    title: "Blockchain basics",
    topic: "Foundations",
    minutes: 5,
    summary: "A shared ledger that many computers keep in step, and why that matters for money.",
    sections: [
      {
        paragraphs: [
          "A blockchain is a ledger: a list of who owns what and who paid whom. What makes it unusual is who keeps it. Instead of one bank holding the book, many independent computers hold a copy and agree on every new page before it is added.",
          "Each page is called a block. A block lists a batch of transactions and carries a fingerprint of the block before it. Change an old entry and its fingerprint no longer matches, so every later block exposes the edit. That chain of fingerprints is where the name comes from.",
        ],
      },
      {
        heading: "Accounts and keys",
        paragraphs: [
          "Nobody opens an account by filling in a form. An account is a pair of keys: a private key that only you hold and a public address derived from it. Signing a transaction with the private key proves the instruction came from the owner of the address, and anyone can check that proof without seeing the key.",
          "This is why losing a private key matters so much, and why a wallet asks you to confirm every signature. The key is the account.",
        ],
      },
      {
        heading: "Why finance cares",
        paragraphs: [
          "A ledger that nobody owns can be read by everyone and written to by anyone who follows the rules. Payments settle on the same book the recipient reads, so there is no overnight reconciliation between two banks. Assets issued on it can move between companies that have never signed an agreement with each other.",
          "Gleo runs on Robinhood Chain, an EVM network. The ideas above apply to it directly: addresses start with 0x, fees are paid in ETH, and every transfer can be looked up on the public explorer.",
        ],
      },
    ],
    tryIt: { href: "/network", label: "Watch blocks arrive on the network panel" },
  },
  {
    slug: "cross-border-payments-on-chain",
    title: "Sending money abroad, block by block",
    topic: "Payments",
    minutes: 6,
    summary: "Why sending money abroad is slow today, and what changes when both sides read the same ledger.",
    sections: [
      {
        heading: "The old route",
        paragraphs: [
          "A transfer from one country to another usually passes through several banks. Each keeps its own records, each holds a balance with the next one in line, and each settles on its own schedule. Money is pre-funded in accounts abroad so it can be released on arrival, and the cost of tying up that money ends up in the fee.",
          "Weekends, holidays and cut-off times add days. Every hop adds a charge and a chance of a returned payment.",
        ],
      },
      {
        heading: "The on-chain route",
        paragraphs: [
          "On a public ledger the sender and the recipient look at the same book. A dollar token such as USDG moves from one address to another in a single transaction. When the block that contains it is final, the recipient holds the money; there is no second ledger to reconcile against.",
          "The chain runs around the clock, so there is no cut-off. The fee is the cost of the computation, paid in the network's native token, not a percentage of the amount sent.",
        ],
      },
      {
        heading: "Where cash comes in",
        paragraphs: [
          "Most people still earn and spend in local currency. Anchors are the businesses that swap cash for tokens at the edges: a remittance shop, an exchange or a bank that takes local money on one side and pays out on the other. The on-chain leg in the middle is the fast, cheap part.",
          "Gleo's payment tools focus on that middle leg today and on making anchors easy to plug in next.",
        ],
      },
    ],
    tryIt: { href: "/send", label: "Send USDG or ETH to any address" },
  },
  {
    slug: "anchors-basics",
    title: "Anchors: where cash meets the ledger",
    topic: "Payments",
    minutes: 5,
    summary: "The businesses that turn local money into tokens and back, and what a good one looks like.",
    sections: [
      {
        paragraphs: [
          "An anchor is a regulated business that accepts deposits in one form and issues the equivalent in another. Deposit cash or a bank transfer, receive a dollar token in your wallet. Send the token back, receive cash or a bank payment.",
          "Anchors carry the obligations the ledger cannot: identity checks, licences, local banking relationships and customer support.",
        ],
      },
      {
        heading: "One standard, many doors",
        paragraphs: [
          "If every anchor exposes its own custom flow, every wallet has to integrate each one separately. A shared interface for deposits, withdrawals, quotes and status updates means a wallet integrates once and reaches all of them.",
          "Gleo's anchor directory is designed around that idea: each listing describes the corridors it serves, the methods it accepts, its fees and its limits in the same format.",
        ],
      },
      {
        heading: "What to look for",
        paragraphs: [
          "A trustworthy anchor publishes its fees before you commit, tells you which licence it operates under, settles within a stated time and redeems tokens at par. Gleo will list anchors only after checking those points; until then the directory runs in practice mode.",
        ],
      },
    ],
    tryIt: { href: "/anchors", label: "Try a practice deposit and withdrawal" },
  },
  {
    slug: "lending-and-borrowing-markets",
    title: "Lending and borrowing markets",
    topic: "DeFi",
    minutes: 6,
    summary: "How a money market prices loans by itself, and what keeps it solvent.",
    sections: [
      {
        heading: "Pools instead of loan officers",
        paragraphs: [
          "An on-chain money market collects deposits from lenders into a pool. Borrowers draw from the pool after posting collateral worth more than the loan. A smart contract keeps the books: who supplied what, who owes what, and the interest accruing every block.",
          "The interest rate moves with demand. When most of the pool is lent out, borrowing gets more expensive and supplying pays more, which draws new deposits and discourages new loans.",
        ],
      },
      {
        heading: "Collateral and health",
        paragraphs: [
          "Each loan has a health figure: the value of the collateral, discounted for risk, divided by the debt. Above one the loan is safe. If prices move and the figure falls below one, anyone may repay part of the debt and receive the collateral at a small discount. That process, liquidation, is what keeps lenders whole.",
          "Tokenized assets such as stock tokens can serve as collateral once there is a reliable price for them, which is the job of an oracle.",
        ],
      },
    ],
    tryIt: { href: "/lend", label: "Open a practice loan" },
  },
  {
    slug: "oracles",
    title: "Oracles: prices the chain can trust",
    topic: "DeFi",
    minutes: 4,
    summary: "A smart contract cannot look outside the chain. Oracles bring the outside world in.",
    sections: [
      {
        paragraphs: [
          "Contracts only see what is on the ledger. They cannot check the price of gold or whether a market is open. An oracle is a service that publishes such facts on-chain, usually signed by several independent reporters so that no single one can move the number.",
          "Good oracles report how fresh each value is. A lending market should refuse to act on a price that has not been updated for hours, and a well-written contract checks that timestamp every time.",
        ],
      },
      {
        heading: "Two kinds of price",
        paragraphs: [
          "Some prices come from reporters who watch traditional markets. Others are read from trading pools on the chain itself, averaged over time so that one large trade cannot distort them. Both have a place; the first suits assets that trade mostly off-chain, the second suits tokens whose main market is on-chain.",
        ],
      },
    ],
    tryIt: { href: "/assets", label: "See last traded prices of tokenized assets" },
  },
  {
    slug: "smart-contract-basics",
    title: "Smart contract basics",
    topic: "Foundations",
    minutes: 5,
    summary: "Programs that live on the ledger and move value according to rules everyone can read.",
    sections: [
      {
        paragraphs: [
          "A smart contract is a program stored at an address on the chain. Anyone can call it, and every node runs the same code to reach the same result. Because the code is public and runs the same way for everyone, its rules can be checked before money is put into it.",
          "A token is itself a smart contract: it keeps a table of balances and a function that moves amounts between them when the owner signs.",
        ],
      },
      {
        heading: "What contracts cannot do",
        paragraphs: [
          "Contracts cannot reach outside the chain, cannot keep secrets in their storage, and cannot be fixed quietly after deployment unless they were built to be upgradable. Each of those limits shapes how financial products are designed on-chain.",
          "Gleo Contracts are written in Solidity for Robinhood Chain. None are deployed yet; the tools that depend on them run in practice mode until they are audited.",
        ],
      },
    ],
    tryIt: { href: "/smart-contracts", label: "Read the Gleo Contracts plan" },
  },
  {
    slug: "stablecoins",
    title: "Stablecoins",
    topic: "Payments",
    minutes: 4,
    summary: "Tokens that track a currency, and the reserve behind them.",
    sections: [
      {
        paragraphs: [
          "A stablecoin is a token designed to hold a steady value, usually one US dollar. The most common kind is backed by reserves: for every token in circulation the issuer holds a dollar or a short-term government bill, and redeems tokens for dollars on request.",
          "USDG, the dollar token Gleo's payment tools use on Robinhood Chain, has six decimals. Its total supply is read live on Gleo's network panel straight from the contract.",
        ],
      },
      {
        heading: "Questions worth asking",
        paragraphs: [
          "Who holds the reserve, and who audits it? Can the issuer freeze an address? How quickly are redemptions paid? The answers decide whether a stablecoin is suitable for payroll, remittances or a lending market.",
        ],
      },
    ],
    tryIt: { href: "/network", label: "See USDG supply read from the chain" },
  },
  {
    slug: "federated-byzantine-agreement",
    title: "Federated Byzantine agreement, explained",
    topic: "Network",
    minutes: 6,
    summary: "A way for independent organisations to agree on one ledger without mining or staking.",
    sections: [
      {
        heading: "The problem",
        paragraphs: [
          "A network of computers has to agree on the order of transactions even when some members are offline or dishonest. Computer scientists call dishonest members Byzantine, after an old puzzle about generals passing messages.",
        ],
      },
      {
        heading: "Agreement through trusted sets",
        paragraphs: [
          "In federated Byzantine agreement each participant names the other participants it trusts, called its quorum slice. A statement is accepted once enough overlapping slices have agreed to it. Nobody needs permission from a central authority to join; they only need others to include them.",
          "Because agreement comes from voting rounds rather than from burning energy or locking up stake, the approach is fast and cheap to run. Its safety depends on the slices overlapping: if groups of participants trust no one in common, the network could split.",
        ],
      },
      {
        heading: "Where Gleo fits",
        paragraphs: [
          "Gleo does not run its own consensus. It inherits finality from Robinhood Chain, whose blocks arrive in a fraction of a second. The federated model is the design reference for how Gleo plans to coordinate anchors and asset issuers: each one names the others it accepts.",
        ],
      },
    ],
    tryIt: { href: "/learn/intro", label: "Back to the Gleo overview" },
  },
];

export const findArticle = (slug: string) => ARTICLES.find((a) => a.slug === slug) ?? null;
export const LEARN_TOPICS: LearnTopic[] = ["Foundations", "Payments", "DeFi", "Network"];
