// Field scenarios: worked examples of how a team could use Gleo. Every one is
// illustrative. The organisations are invented composites, not customers, and
// the numbers are example inputs, not results.

export type Scenario = {
  slug: string;
  title: string;
  who: string;
  area: "Payments" | "Tokenization" | "Ramps" | "Aid" | "DeFi";
  /** Search title (brand is appended) and meta description. */
  seoTitle: string;
  seoDescription: string;
  summary: string;
  problem: string[];
  setup: { title: string; body: string }[];
  flow: string[];
  watch: string[];
  tools: { href: string; label: string }[];
};

export const SCENARIOS: Scenario[] = [
  {
    slug: "freelancer-payroll",
    title: "Paying forty contractors in nine countries on the same afternoon",
    who: "A small design studio with a distributed team",
    area: "Payments",
    seoTitle: "Global Contractor Payroll in USDG: A Worked Example",
    seoDescription:
      "Worked example of global contractor payroll in USDG: forty people in nine countries paid within a block, with every payout traceable. Read the full scenario.",
    summary:
      "A studio replaces monthly wire batches with USDG payouts that land within a block, and lets each contractor pick a local cash-out route.",
    problem: [
      "The studio pays contractors once a month. Each wire costs a flat fee plus an exchange margin, and the slowest ones take four working days. Contractors in two countries regularly receive less than the invoice because an intermediary bank takes a cut on the way.",
      "Finance spends a day each month reconciling which payments arrived, which bounced, and which are still somewhere in between.",
    ],
    setup: [
      { title: "Treasury in USDG", body: "The studio keeps its payroll float as USDG in a company wallet it controls, topped up from its bank through an anchor." },
      { title: "One address per contractor", body: "Each contractor shares a Robinhood Chain address once. The studio checks it with a small test transfer before the first real payout." },
      { title: "Local exit", body: "Contractors who want local currency use an anchor in their country; the rest keep dollars on-chain." },
    ],
    flow: [
      "Finance exports the approved invoices with addresses and amounts.",
      "Each payout is sent from the company wallet; every one has its own transaction hash and explorer link.",
      "Contractors see the funds within a block and choose whether to hold, cash out or move them on.",
      "Reconciliation is a list of hashes, not a list of phone calls.",
    ],
    watch: [
      "Address hygiene matters: a wrong address cannot be recalled. The Send tool validates format and checksums, but a test transfer is still wise.",
      "Cash-out depends on anchor coverage in each country. Where none exists yet, contractors hold USDG until one does.",
      "Tax and employment rules do not change because the rail did. The studio still issues the same paperwork.",
    ],
    tools: [
      { href: "/send", label: "Send ETH or USDG" },
      { href: "/anchors", label: "Anchor directory" },
      { href: "/use-cases/payments", label: "Gleo for payments" },
    ],
  },
  {
    slug: "gold-savings-token",
    title: "Turning a vault of gold bars into a token people can save in",
    who: "A regional bullion dealer",
    area: "Tokenization",
    seoTitle: "How to Tokenize Gold: A Gold Savings Token Scenario",
    seoDescription:
      "How a bullion dealer could tokenize gold: one token per allocated gram, holder approval and clawback from day one, supply checked on-chain. Read the plan.",
    summary:
      "A dealer issues a token backed one-to-one by allocated gold, with holder approval and clawback switched on from day one.",
    problem: [
      "Customers want to save small amounts in gold, but the dealer can only sell whole bars or coins, and storage plus insurance make small holdings uneconomic.",
      "The dealer also has to prove, regularly and publicly, that what it sold is actually in the vault.",
    ],
    setup: [
      { title: "Asset definition", body: "One token equals one gram of allocated gold at a named vault. The dealer is the issuer and publishes the vault audit schedule." },
      { title: "Controls", body: "Holder approval is on, so only customers who passed the dealer's checks can hold the token. Freeze and clawback are on for court orders and lost-key recovery." },
      { title: "Supply discipline", body: "New tokens are minted only against new bars entering the vault, and burned when a customer redeems for physical metal." },
    ],
    flow: [
      "A customer passes the dealer's identity checks and is approved as a holder.",
      "They buy grams with USDG; the dealer mints against vault inventory and sends the tokens.",
      "Anyone can compare total supply on the explorer with the latest vault report.",
      "To redeem, the customer sends tokens back and collects metal; those tokens are burned.",
    ],
    watch: [
      "The token is only as good as the vault and the auditor. On-chain supply proves what was issued, not what is stored.",
      "Approval lists must be maintained: a customer who fails a later check can be frozen, and the reason recorded off-chain.",
      "Gleo's issuance contracts are not deployed yet. Today this whole flow can be rehearsed in the Tokenize console in practice mode.",
    ],
    tools: [
      { href: "/tokenize", label: "Tokenize console (practice)" },
      { href: "/use-cases/tokenization", label: "Gleo for tokenization" },
    ],
  },
  {
    slug: "cash-assistance-pilot",
    title: "Running a cash assistance pilot for 1,200 households",
    who: "A relief organisation working after a flood",
    area: "Aid",
    seoTitle: "Digital Cash Assistance Pilot for 1,200 Households",
    seoDescription:
      "A digital cash assistance pilot after a flood: weekly USDG to phone wallets, cash-out at local agents, outflows donors can check. Walk through each step.",
    summary:
      "An aid team sends weekly support to recipients' wallets and lets them collect cash at local agents, with every payment visible to donors.",
    problem: [
      "After a flood, banks in the area are closed and many recipients never had accounts. Carrying cash is risky for staff and recipients alike.",
      "Donors want to know that money reached people, not just that it left the organisation's account.",
    ],
    setup: [
      { title: "Recipient wallets", body: "Recipients get a simple phone wallet during registration. Staff help with backup words on the spot." },
      { title: "Agent network", body: "Local shops act as cash-out points through an anchor, paid a fixed fee per withdrawal agreed in advance." },
      { title: "Public ledger, private people", body: "Payments are public on-chain; the list linking addresses to names stays with the organisation." },
    ],
    flow: [
      "Each week the programme team sends a batch of USDG payments from one funding wallet.",
      "Recipients receive within a block and can spend, hold, or withdraw cash at an agent.",
      "Donors see the funding wallet's outflows on the explorer without seeing who the recipients are.",
      "At the end of the pilot, unused balances can be returned or redirected as the programme rules say.",
    ],
    watch: [
      "Phones get lost. A recovery process needs to be agreed before day one.",
      "Agent liquidity limits how much cash can leave a town per day; schedule payouts around it.",
      "Batch payouts as a single contract call need a Gleo contract that is not deployed yet; until then each payment is its own transfer.",
    ],
    tools: [
      { href: "/use-cases/aid", label: "Gleo for aid disbursements" },
      { href: "/send", label: "Send tool" },
      { href: "/anchors", label: "Anchors (practice)" },
    ],
  },
  {
    slug: "inventory-credit-line",
    title: "Borrowing against tokenized shares to fund inventory",
    who: "An online retailer ahead of its busy season",
    area: "DeFi",
    seoTitle: "Borrowing Against Tokenized Stocks to Fund Inventory",
    seoDescription:
      "Borrowing against tokenized stocks for six weeks instead of selling them: collateral, loan-to-value, risks and repayment. Rehearse the plan in practice mode.",
    summary:
      "A retailer that holds tokenized index shares borrows USDG against them for six weeks instead of selling, and repays from season revenue.",
    problem: [
      "Every autumn the retailer needs stock before it has sales. Its reserve sits in an index fund, and selling it means taxes and losing the position.",
      "A bank line takes weeks to arrange and asks for collateral the retailer cannot move quickly.",
    ],
    setup: [
      { title: "Collateral", body: "The retailer holds verified stock tokens on Robinhood Chain, the same ones listed in the Gleo asset explorer." },
      { title: "Market", body: "A lending market accepts those tokens with a conservative loan-to-value and a price feed for each one." },
      { title: "Plan", body: "Borrow well below the limit so a market drop does not trigger liquidation during the season." },
    ],
    flow: [
      "Supply the tokens to the market as collateral.",
      "Borrow USDG and pay suppliers, through an anchor if they want bank money.",
      "Watch the health factor weekly; add collateral or repay early if prices fall.",
      "Repay the loan plus interest from sales and withdraw the shares.",
    ],
    watch: [
      "Collateral prices move. A sharp drop can trigger liquidation and a penalty; the margin of safety is the whole plan.",
      "Stock tokens trade around the clock on-chain while the underlying market does not; prices can gap at the open.",
      "Gleo's lending market is not deployed. The Lend page lets you rehearse this exact plan in practice mode.",
    ],
    tools: [
      { href: "/lend", label: "Lend and borrow (practice)" },
      { href: "/assets", label: "Asset explorer" },
      { href: "/use-cases/defi", label: "Gleo for DeFi" },
    ],
  },
];

export const findScenario = (slug: string) => SCENARIOS.find((s) => s.slug === slug) ?? null;
