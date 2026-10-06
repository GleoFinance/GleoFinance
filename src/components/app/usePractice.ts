"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import { useWallet } from "@/components/wallet/WalletProvider";
import { buildMessage, newNonce, practiceDomain, type PracticeKind, type Receipt } from "@/lib/practice";
import { recoverSigner } from "@/lib/verify";

const KEY = "gleo.practice.v1";
const EVENT = "gleo-practice";
const EMPTY: Receipt[] = [];
// Practice state lives only in this browser; both caps keep it bounded.
const MAX_TOTAL = 500;
const MAX_PER_TOOL = 200;

function isReceipt(v: unknown): v is Receipt {
  const r = v as Receipt;
  return (
    Boolean(r) &&
    typeof r.id === "string" &&
    typeof r.kind === "string" &&
    typeof r.account === "string" &&
    typeof r.message === "string" &&
    typeof r.signature === "string" &&
    typeof r.at === "number" &&
    Boolean(r.details) &&
    typeof r.details === "object" &&
    Object.values(r.details).every((x) => typeof x === "string")
  );
}
let cacheRaw: string | null = null;
let cacheList: Receipt[] = EMPTY;

function readAll(): Receipt[] {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(KEY);
  } catch {
    raw = null;
  }
  if (raw === cacheRaw) return cacheList;
  cacheRaw = raw;
  try {
    const parsed = raw ? (JSON.parse(raw) as unknown) : EMPTY;
    // Validate on read: one damaged entry must not break the tools.
    cacheList = Array.isArray(parsed) ? parsed.filter(isReceipt).slice(-MAX_TOTAL) : EMPTY;
  } catch {
    cacheList = EMPTY;
  }
  return cacheList;
}

function writeAll(list: Receipt[]) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(list.slice(-MAX_TOTAL)));
  } catch {
    throw new Error("This browser would not save the receipt (private window or storage blocked).");
  }
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(fn: () => void) {
  window.addEventListener(EVENT, fn);
  window.addEventListener("storage", fn);
  return () => {
    window.removeEventListener(EVENT, fn);
    window.removeEventListener("storage", fn);
  };
}

/**
 * Practice receipts of one tool for the connected wallet, oldest first, and
 * `record` to sign a new one. Recording throws with a readable message when
 * the wallet refuses or the signature does not match.
 */
export function usePractice(kind: PracticeKind) {
  const { address, signMessage } = useWallet();
  const all = useSyncExternalStore(subscribe, readAll, () => EMPTY);
  const receipts = useMemo(
    () => (address ? all.filter((r) => r.kind === kind && r.account.toLowerCase() === address.toLowerCase()) : EMPTY),
    [all, kind, address],
  );

  const record = useCallback(
    async (details: Record<string, string>) => {
      if (!address) throw new Error("Connect a wallet first.");
      const nonce = newNonce();
      const message = buildMessage(practiceDomain(window.location.host), kind, address, details, nonce, new Date().toISOString());
      const signature = await signMessage(message);
      if (recoverSigner(message, signature) !== address.toLowerCase()) throw new Error("That signature does not match the connected address.");
      const list = readAll();
      if (list.some((r) => r.id === nonce)) throw new Error("This receipt nonce was already used. Try again.");
      const mine = list.filter((r) => r.kind === kind && r.account.toLowerCase() === address.toLowerCase());
      if (mine.length >= MAX_PER_TOOL) throw new Error(`This tool keeps up to ${MAX_PER_TOOL} receipts per wallet. Clear them below to continue.`);
      const receipt: Receipt = { id: nonce, kind, account: address, details, message, signature, at: Date.now() };
      writeAll([...list, receipt]);
      // Best effort: the server re-checks the signature. The receipt stands on the local check either way.
      fetch("/api/practice/verify", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ message, signature }) }).catch(() => {});
      return receipt;
    },
    [address, kind, signMessage],
  );

  const clear = useCallback(() => {
    if (!address) return;
    writeAll(readAll().filter((r) => !(r.kind === kind && r.account.toLowerCase() === address.toLowerCase())));
  }, [address, kind]);

  return { receipts, record, clear, address };
}
