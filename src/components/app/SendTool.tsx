"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, CircleAlert, CircleCheck, Loader2 } from "lucide-react";
import { CHAIN, explorerAddress, explorerTx, shortAddress } from "@/config/brand";
import { USDG } from "@/config/assets.generated";
import { useWallet } from "@/components/wallet/WalletProvider";
import { Gate } from "@/components/app/Gate";
import { fmtUsdSmall, useNetwork } from "@/components/live/NetworkProvider";
import { checkAddress } from "@/lib/address";
import { formatUnits, parseUnits, tokenBalance, waitForReceipt } from "@/lib/pons";
import { rpc } from "@/lib/rpc";

type Asset = "ETH" | "USDG";
type Stage = "edit" | "review" | "wallet" | "pending" | "done" | "failed";
type Sent = { hash: string; asset: Asset; amount: string; to: string; at: number; status: "pending" | "confirmed" | "failed" };

const HISTORY_KEY = "gleo.sends.v1";
const decimalsOf = (a: Asset) => (a === "ETH" ? 18 : USDG.decimals);
const pad = (hex: string) => hex.replace(/^0x/, "").toLowerCase().padStart(64, "0");

function loadHistory(owner: string): Sent[] {
  try {
    const all = JSON.parse(window.localStorage.getItem(HISTORY_KEY) || "{}") as Record<string, Sent[]>;
    return all[owner.toLowerCase()] ?? [];
  } catch {
    return [];
  }
}
function saveHistory(owner: string, list: Sent[]) {
  try {
    const all = JSON.parse(window.localStorage.getItem(HISTORY_KEY) || "{}") as Record<string, Sent[]>;
    all[owner.toLowerCase()] = list.slice(0, 20);
    window.localStorage.setItem(HISTORY_KEY, JSON.stringify(all));
  } catch {
    // history is a convenience; the explorer has the record
  }
}

export function SendTool() {
  return (
    <Gate what="send a payment">
      <SendFormKeyed />
    </Gate>
  );
}

function SendFormKeyed() {
  const { address } = useWallet();
  return <SendForm key={address ?? "none"} />;
}

function SendForm() {
  const { address, sendTransaction, refreshBalance } = useWallet();
  const { snap } = useNetwork();
  const [asset, setAsset] = useState<Asset>("USDG");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [balances, setBalances] = useState<{ ETH: bigint | null; USDG: bigint | null }>({ ETH: null, USDG: null });
  const [tick, setTick] = useState(0);
  const [gasRead, setGasRead] = useState<{ key: string; gas: { units: bigint; price: bigint } | null; error: string | null } | null>(null);
  const [codeRead, setCodeRead] = useState<{ address: string; contract: boolean } | null>(null);
  const [stage, setStage] = useState<Stage>("edit");
  const [error, setError] = useState<string | null>(null);
  const [hash, setHash] = useState<string | null>(null);
  const owner = address!;
  const [history, setHistory] = useState<Sent[]>(() => loadHistory(owner));

  useEffect(() => {
    let cancelled = false;
    rpc<string>("eth_getBalance", [owner, "latest"])
      .then((h) => !cancelled && setBalances((b) => ({ ...b, ETH: BigInt(h) })))
      .catch(() => {});
    tokenBalance(USDG.address, owner)
      .then((v) => !cancelled && setBalances((b) => ({ ...b, USDG: v })))
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [owner, tick]);

  const recipient = useMemo(() => checkAddress(to), [to]);
  const decimals = decimalsOf(asset);
  const value = parseUnits(amount.trim(), decimals);
  const tx = useMemo(() => {
    const value = parseUnits(amount.trim(), decimalsOf(asset));
    if (!recipient.ok || value === null || value === 0n) return null;
    return asset === "ETH"
      ? { to: recipient.address, data: "0x", value }
      : { to: USDG.address, data: `0xa9059cbb${pad(recipient.address)}${value.toString(16).padStart(64, "0")}`, value: 0n };
  }, [asset, recipient, amount]);
  const txKey = tx ? `${tx.to}|${tx.data}|${tx.value}` : "";

  // Is the recipient a contract? Sending to one is allowed but worth a warning.
  useEffect(() => {
    if (!recipient.ok) return;
    let cancelled = false;
    const target = recipient.address;
    rpc<string>("eth_getCode", [target, "latest"])
      .then((code) => !cancelled && setCodeRead({ address: target, contract: Boolean(code && code !== "0x") }))
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [recipient]);

  // Gas estimate for exactly this transfer, refreshed as the inputs change.
  useEffect(() => {
    if (!tx) return;
    const key = `${tx.to}|${tx.data}|${tx.value}`;
    let cancelled = false;
    const t = window.setTimeout(async () => {
      try {
        const [units, price] = await Promise.all([
          rpc<string>("eth_estimateGas", [{ from: owner, to: tx.to, data: tx.data, ...(tx.value ? { value: `0x${tx.value.toString(16)}` } : {}) }]),
          rpc<string>("eth_gasPrice"),
        ]);
        if (!cancelled) setGasRead({ key, gas: { units: BigInt(units), price: BigInt(price) }, error: null });
      } catch (e) {
        if (!cancelled) setGasRead({ key, gas: null, error: e instanceof Error ? e.message.slice(0, 160) : "The network could not estimate this transfer." });
      }
    }, 350);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, [tx, owner]);

  const fresh = gasRead && gasRead.key === txKey ? gasRead : null;
  const gas = fresh?.gas ?? null;
  const gasError = fresh?.error ?? null;
  const recipientIsContract = Boolean(recipient.ok && codeRead?.address === recipient.address && codeRead.contract);

  // Wallets add a margin to the estimate; budget 1.5x so "Max" never fails on gas.
  const feeWei = gas ? gas.units * gas.price : null;
  const feeBudget = feeWei !== null ? (feeWei * 3n) / 2n : null;
  const feeUsd = feeWei !== null && snap?.ethUsd ? (Number(feeWei) / 1e18) * snap.ethUsd : null;
  const balance = balances[asset];
  const ethShort = balances.ETH !== null && feeBudget !== null && balances.ETH < feeBudget + (asset === "ETH" ? (value ?? 0n) : 0n);
  const tokenShort = asset === "USDG" && balance !== null && value !== null && value > balance;
  const selfSend = recipient.ok && recipient.address.toLowerCase() === owner.toLowerCase();
  const toToken = recipient.ok && recipient.address.toLowerCase() === USDG.address.toLowerCase();

  const problem = !recipient.ok
    ? to
      ? recipient.reason
      : null
    : toToken
      ? "That is the USDG contract itself. Tokens sent to it cannot be recovered."
      : value === null && amount
        ? "Enter an amount like 25 or 0.5."
        : tokenShort
          ? `You hold ${formatUnits(balance!, decimals, 2)} USDG.`
          : ethShort
            ? asset === "ETH"
              ? "Not enough ETH for this amount plus the network fee."
              : "You need a little ETH on Robinhood Chain to pay the network fee."
            : gasError
              ? `The network rejected the estimate: ${gasError}`
              : null;
  const ready = Boolean(tx && gas && !problem && !toToken);

  const fillMax = () => {
    if (balance === null) return;
    if (asset === "USDG") return setAmount(formatUnits(balance, decimals, decimals).replace(/,/g, ""));
    const budget = feeBudget ?? 21000n * 10n ** 9n;
    const max = balance > budget ? balance - budget : 0n;
    setAmount(formatUnits(max, 18, 8).replace(/,/g, ""));
  };

  const submit = async () => {
    if (!tx) return;
    setError(null);
    setStage("wallet");
    try {
      // Re-check right before the wallet opens: balances and gas may have
      // moved since the review, and a dry run explains a revert in words.
      const [ethHex, tokenNow, unitsHex, priceHex] = await Promise.all([
        rpc<string>("eth_getBalance", [owner, "latest"]),
        asset === "USDG" ? tokenBalance(USDG.address, owner) : Promise.resolve(null),
        rpc<string>("eth_estimateGas", [{ from: owner, to: tx.to, data: tx.data, ...(tx.value ? { value: `0x${tx.value.toString(16)}` } : {}) }]),
        rpc<string>("eth_gasPrice"),
      ]);
      await rpc<string>("eth_call", [{ from: owner, to: tx.to, data: tx.data, ...(tx.value ? { value: `0x${tx.value.toString(16)}` } : {}) }, "latest"]);
      const feeNow = (BigInt(unitsHex) * BigInt(priceHex) * 3n) / 2n;
      const ethNow = BigInt(ethHex);
      if (asset === "USDG" && tokenNow !== null && tokenNow < (parseUnits(amount.trim(), decimals) ?? 0n)) throw new Error("Your USDG balance changed and no longer covers this amount.");
      if (ethNow < feeNow + (asset === "ETH" ? tx.value : 0n)) throw new Error("Your ETH balance changed and no longer covers the amount plus the network fee.");
      const h = await sendTransaction({ to: tx.to, data: tx.data, value: tx.value });
      setHash(h);
      const entry: Sent = { hash: h, asset, amount, to: recipient.ok ? recipient.address : to, at: Date.now(), status: "pending" };
      const list = [entry, ...loadHistory(owner)];
      saveHistory(owner, list);
      setHistory(list);
      setStage("pending");
      try {
        await waitForReceipt(h);
        const done = loadHistory(owner).map((s) => (s.hash === h ? { ...s, status: "confirmed" as const } : s));
        saveHistory(owner, done);
        setHistory(done);
        setStage("done");
      } catch (e) {
        const failed = loadHistory(owner).map((s) => (s.hash === h ? { ...s, status: "failed" as const } : s));
        saveHistory(owner, failed);
        setHistory(failed);
        setError(e instanceof Error ? e.message : "The transaction did not confirm.");
        setStage("failed");
      }
      setTick((n) => n + 1);
      refreshBalance();
    } catch (e) {
      setError(e instanceof Error ? e.message : "The wallet did not send the transaction.");
      setTick((n) => n + 1);
      setStage("review");
    }
  };

  const reset = () => {
    setStage("edit");
    setAmount("");
    setHash(null);
    setError(null);
  };

  const summary: [string, React.ReactNode][] = [
    ["From", <span key="f" className="break-all">{owner}</span>],
    ["To", <span key="t" className="break-all">{recipient.ok ? recipient.address : to}</span>],
    ["Amount", `${amount} ${asset}`],
    ["Network fee", feeWei !== null ? `${formatUnits(feeWei, 18, 8)} ETH (${fmtUsdSmall(feeUsd)})` : "—"],
    ["Network", `${CHAIN.name} · chain id ${CHAIN.id}`],
  ];

  return (
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(0,320px)]">
      <div className="min-w-0 border border-line bg-paper p-5 sm:p-6">
        {stage === "edit" ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (ready) setStage("review");
            }}
            className="space-y-5"
          >
            <fieldset>
              <legend className="label">Asset</legend>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {(["USDG", "ETH"] as Asset[]).map((a) => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => {
                      setAsset(a);
                      setAmount("");
                    }}
                    aria-pressed={asset === a}
                    className={`cursor-pointer border px-4 py-3 text-left ${asset === a ? "border-ink bg-sea-soft" : "border-line-2 hover:border-ink"}`}
                  >
                    <span className="block font-semibold">{a === "USDG" ? "USDG" : "ETH"}</span>
                    <span className="block text-[12.5px] text-ink-3">
                      {a === "USDG" ? "Global Dollar, 1 USDG = $1" : "Native gas token"} · {balances[a] === null ? "…" : formatUnits(balances[a]!, decimalsOf(a), a === "ETH" ? 6 : 2)}
                    </span>
                  </button>
                ))}
              </div>
            </fieldset>
            <div>
              <label htmlFor="send-to" className="label">
                Recipient address
              </label>
              <input
                id="send-to"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                spellCheck={false}
                autoComplete="off"
                placeholder="0x…"
                className="field mt-2 font-mono text-[14px]"
                data-testid="send-to"
              />
              {recipient.ok ? (
                <p className="mt-1.5 text-[12.5px] text-ink-3">
                  {selfSend ? "This is your own address. " : ""}
                  {recipientIsContract ? "This address is a contract. Make sure it can receive this asset. " : ""}
                  <a href={explorerAddress(recipient.address)} target="_blank" rel="noreferrer" className="underline">
                    Look it up on the explorer
                  </a>
                </p>
              ) : null}
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="send-amount" className="label">
                  Amount
                </label>
                <button type="button" onClick={fillMax} className="cursor-pointer text-[12.5px] font-semibold text-sea-deep">
                  Max
                </button>
              </div>
              <div className="relative mt-2">
                <input
                  id="send-amount"
                  value={amount}
                  inputMode="decimal"
                  onChange={(e) => {
                    const v = e.target.value.replace(/[^0-9.]/g, "");
                    const dot = v.indexOf(".");
                    setAmount(dot < 0 ? v : v.slice(0, dot + 1) + v.slice(dot + 1).replace(/\./g, "").slice(0, decimals));
                  }}
                  placeholder="0.00"
                  className="field pr-16 font-mono text-[20px]"
                  data-testid="send-amount"
                />
                <span className="absolute top-1/2 right-4 -translate-y-1/2 font-mono text-sm text-ink-3">{asset}</span>
              </div>
            </div>
            <div className="flex flex-wrap items-baseline justify-between gap-2 bg-paper-2 px-4 py-3 text-sm">
              <span className="text-ink-2">Estimated network fee</span>
              <span className="font-mono">
                {!tx ? "—" : gas ? `${formatUnits(feeWei!, 18, 8)} ETH · ${fmtUsdSmall(feeUsd)}` : gasError ? "unavailable" : "estimating…"}
              </span>
            </div>
            {problem ? (
              <p className="flex items-start gap-2 text-[13.5px] text-down" role="alert">
                <CircleAlert className="mt-0.5 size-4 shrink-0" /> {problem}
              </p>
            ) : null}
            <button type="submit" disabled={!ready} className="btn btn-ink h-12 w-full text-base" data-testid="send-review">
              Review payment
            </button>
          </form>
        ) : (
          <div>
            <p className="font-display text-[28px] leading-[1.2] tracking-[-0.02em]">
              {stage === "review" ? "Check the details" : stage === "wallet" ? "Confirm in your wallet" : stage === "pending" ? "Waiting for the block" : stage === "done" ? "Payment settled" : "Payment did not settle"}
            </p>
            <dl className="mt-5 divide-y divide-dashed divide-line-2 border-y border-dashed border-line-2">
              {summary.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[110px_minmax(0,1fr)] gap-3 py-3 text-[14px]">
                  <dt className="text-ink-3">{k}</dt>
                  <dd className="min-w-0 font-mono text-[13px]">{v}</dd>
                </div>
              ))}
            </dl>
            {error ? (
              <p className="mt-4 flex items-start gap-2 text-[13.5px] text-down" role="alert">
                <CircleAlert className="mt-0.5 size-4 shrink-0" /> {error}
              </p>
            ) : null}
            {hash ? (
              <a href={explorerTx(hash)} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1.5 font-mono text-[13px] font-semibold text-sea-deep underline" data-testid="send-tx">
                {shortAddress(hash, 10, 8)} on the explorer <ArrowUpRight className="size-3.5" />
              </a>
            ) : null}
            <div className="mt-6 flex flex-wrap gap-3">
              {stage === "review" ? (
                <>
                  <button type="button" onClick={submit} className="btn btn-accent h-11 px-6" data-testid="send-confirm">
                    Send {amount} {asset}
                  </button>
                  <button type="button" onClick={() => setStage("edit")} className="btn btn-line h-11 px-5">
                    Edit
                  </button>
                </>
              ) : stage === "wallet" || stage === "pending" ? (
                <span className="inline-flex items-center gap-2 text-sm text-ink-2">
                  <Loader2 className="size-4 animate-spin" /> {stage === "wallet" ? "Your wallet shows the same details." : "Usually under a second on this chain."}
                </span>
              ) : (
                <>
                  {stage === "done" ? (
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-up">
                      <CircleCheck className="size-4" /> Confirmed on {CHAIN.name}
                    </span>
                  ) : null}
                  <button type="button" onClick={reset} className="btn btn-ink h-11 px-5">
                    New payment
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      <aside className="min-w-0">
        <h2 className="label">Your recent payments</h2>
        {history.length ? (
          <ul className="mt-3 divide-y divide-line border-y border-line">
            {history.map((s) => (
              <li key={s.hash} className="py-3 text-[13.5px]">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-semibold">
                    {s.amount} {s.asset}
                  </span>
                  <span className={`text-[11px] font-semibold uppercase ${s.status === "confirmed" ? "text-up" : s.status === "failed" ? "text-down" : "text-ink-3"}`}>{s.status}</span>
                </div>
                <div className="mt-0.5 flex items-baseline justify-between gap-3 text-ink-3">
                  <span className="font-mono">to {shortAddress(s.to, 6, 4)}</span>
                  <a href={explorerTx(s.hash)} target="_blank" rel="noreferrer" className="underline underline-offset-4">
                    View transaction
                  </a>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-ink-3">Payments you send from this browser are listed here, with a link to each transaction.</p>
        )}
      </aside>
    </div>
  );
}
