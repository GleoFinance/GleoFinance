# Gleo

**Global Finance. No Borders.** Cross-border payments in seconds. Assets tokenized instantly. DeFi reimagined.

Gleo is a payments, asset tokenization and DeFi network built on [Robinhood Chain](https://robinhoodchain.blockscout.com) (chain id 4663). This repository holds the full website and app at [gleo.finance](https://gleo.finance).

## The problem

Sending money between countries still takes days, passes through several intermediaries and loses a few percent on the way. Real-world assets such as gold, shares and bonds sit in systems that close at weekends and do not talk to each other. Open finance exists, but most of it trades tokens with nothing behind them.

## The solution

Gleo puts three things on one ledger:

- **Payments** in USDG, a dollar token, that settle within a block for a fraction of a cent.
- **Tokenized assets** that carry their own rules: holder approval, freeze and clawback for regulated issuers.
- **Open markets** (lending, borrowing, pools) where those assets can be put to work, plus **anchors** that connect local cash to the chain.

## How it works

- The site reads Robinhood Chain through a small read-only relay (`/api/rpc`) with a method allowlist. Every "live" figure (block time, latest block, gas price, fee per transfer, USDG supply) comes from the chain, priced with the ETH rate from OKX.
- The **Send** tool builds a plain ETH transfer or a USDG `transfer(to, amount)`, validates the EIP-55 checksum, estimates the fee for that exact transfer, re-checks balances and dry-runs the call right before your wallet opens. Your wallet signs and sends it; the site never holds keys.
- The **Asset explorer** lists stock and fund tokens only when their contract proxies the chain's stock-token beacon, the symbol matches and the name ends in "Robinhood Token". Tokens that borrow a ticker are rejected (`npm run assets`).
- Tools that need Gleo contracts (tokenize, anchors, lend, pools) run in **practice mode**: each action is a `personal_sign` message (free, no transaction) naming this site, the chain, the action and a random nonce. Receipts stay in your browser and can be re-verified by `/api/practice/verify`.
- Performance figures for Gleo's own payment layer (under 10 s settlement, $0.0001 per payment, 4,000 tps, 180+ countries) are **design targets** and are labelled as such.

## What you can try

**Live now**
- Connect any EVM wallet; Robinhood Chain is added on connect.
- `/send` — send ETH or USDG to any address.
- `/network` — live chain readings and a payroll fee calculator.
- `/assets` — tokenized stocks, funds, USDG and WETH with live supply and prices.
- `/swap` — swap $GLEO through Pons (switches on automatically once the contract address is published).
- Copy the $GLEO contract address from the navbar or footer (shows "At launch" until then).

**Practice now, live later**
- `/tokenize` — issuer console with holder approval, freeze, clawback and mint.
- `/anchors` — cash-in and cash-out corridors with reference FX rates.
- `/lend` — supply and borrow at live prices with a health factor.
- `/pools` — constant-product pools seeded at live prices.

## Run it locally

Requirements: Node.js 20 or newer. Download the ZIP or fork the repository, then:

```bash
npm install
npm run build
npm start            # http://localhost:4880
```

`npm run dev` also works (port 4880). Optional environment variables, all names listed in `.env.example`:

| Variable | Purpose |
| --- | --- |
| `ROBINHOOD_RPC_URL` | Private RPC for server reads. Falls back to the public RPC. |
| `NEXT_PUBLIC_ROBINHOOD_RPC_URL` | Private RPC the browser may use as a fallback. Restrict it to your domain. |
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | WalletConnect project id from cloud.reown.com. Without it the option shows "Not configured on this site yet". |
| `TRUST_PROXY_HEADERS` | Set to `1` only when self-hosting behind your own proxy. The client address is then the rightmost `X-Forwarded-For` entry (the one your proxy appended). Not needed on Vercel. |
| `TRUSTED_PROXY_HOPS` | With `TRUST_PROXY_HEADERS=1`: which entry from the right to use when several of your proxies append (default `1`). |
| `CLIENT_IP_HEADER` | With `TRUST_PROXY_HEADERS=1`: read the address from this header instead (for example `x-real-ip`). Set it only if your proxy overwrites that header on every request. |

Without trusted headers (self-hosted, no proxy) all visitors share one larger relay budget, and when the relay answers 429 or fails, browsers read the public Robinhood Chain RPC directly for a minute, so pages and wallet flows keep working. Live figures (`/api/network`, `/api/assets`, prices, FX) are read and cached by the server and do not use any visitor's relay budget.

Put them in `.env.local` locally or in your host's environment settings. Nothing is required.

Other scripts: `npm run typecheck`, `npm run lint`, `npm run assets` (re-verify tokenized assets on-chain), `npm run brand` (regenerate logo, favicon and social images).

## Network in your wallet

| Field | Value |
| --- | --- |
| Network name | Robinhood Chain |
| Chain id | 4663 (0x1237) |
| RPC | https://rpc.mainnet.chain.robinhood.com |
| Currency | ETH |
| Explorer | https://robinhoodchain.blockscout.com |

## Project layout

```
src/app/               routes (marketing pages, app tools, API routes)
src/components/        header, footer, page blocks (ui.tsx), drawings (art.tsx)
src/components/app/    Send, network panel, asset table, practice tools
src/components/wallet/ wallet dialog, EIP-6963 discovery, WalletConnect
src/config/            brand.ts (single source for name and CA), nav, wallets, verified assets
src/lib/               RPC clients, feeds, practice receipts, signature recovery
scripts/               resolve-assets.mjs, make-brand.mjs
```

## Contracts and token

- **$GLEO** contract address: published at launch in `src/config/brand.ts`; the site shows "At launch" until then.
- USDG: `0x5fc5360D0400a0Fd4f2af552ADD042D716F1d168` (6 decimals). WETH: `0x0Bd7D308f8E1639FAb988df18A8011f41EAcAD73`.
- Gleo's own contracts (asset issuance with controls, money market, pools, anchor registry) are designed but **not deployed**; practice mode stands in for them.

## Security and status

- No custody: transactions are built in the browser and signed by your wallet.
- The RPC relay forwards read methods only; `eth_getLogs` needs numeric `fromBlock` and `toBlock` with a span of at most 20,000 blocks. API routes cap body size and rate-limit per network (IPv4 address or IPv6 /64) and per aggregate (IPv4 /24 or IPv6 /48, sixteen times the budget). Forwarded IP headers are trusted only on Vercel or with `TRUST_PROXY_HEADERS=1`. The in-memory limiter is capped at 10,000 keys; when full it evicts the lightest per-network entries from a random sample; aggregates are never evicted inside their window and may use at most 20% of the slots (beyond that, new aggregates go untracked rather than locking anyone out).
- Trade-offs: limits live in each server instance's memory and are best effort; users behind carrier-grade NAT may share an aggregate; when the relay is limited, browsers read the public RPC directly instead.
- Practice receipts are kept in the browser only and capped in size.
- Nothing here has been audited. Found a problem? See `/grants/bug-bounty` on the site and contact us on X.

## Contributing

Issues and pull requests are welcome. Keep changes small, run `npm run typecheck` and `npm run lint` before opening a pull request, and never commit environment files.

## License

MIT. See `LICENSE`.
