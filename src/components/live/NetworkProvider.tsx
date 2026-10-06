"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { NetworkSnapshot } from "@/lib/feeds/network";

export type { NetworkSnapshot };

type State = { snap: NetworkSnapshot | null; error: boolean };
const NetworkContext = createContext<State>({ snap: null, error: false });

/**
 * Polls /api/network (Robinhood Chain read through the site's server) every
 * twelve seconds while the tab is visible. Every "live" figure on the site
 * reads from this one snapshot.
 */
export function NetworkProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<State>({ snap: null, error: false });

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      if (document.visibilityState === "hidden") return;
      try {
        const res = await fetch("/api/network", { cache: "no-store" });
        const snap = (await res.json()) as NetworkSnapshot;
        if (!cancelled) setState({ snap: snap.ok ? snap : null, error: !snap.ok });
      } catch {
        if (!cancelled) setState((s) => ({ ...s, error: true }));
      }
    };
    load();
    const t = window.setInterval(load, 12_000);
    const onVisible = () => document.visibilityState === "visible" && load();
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      cancelled = true;
      window.clearInterval(t);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  return <NetworkContext.Provider value={state}>{children}</NetworkContext.Provider>;
}

export function useNetwork() {
  return useContext(NetworkContext);
}

/** "12s ago" that re-renders once a second. */
export function useAgo(ms: number | null | undefined) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(t);
  }, []);
  if (!ms) return "—";
  const s = Math.max(0, Math.round((now - ms) / 1000));
  if (s < 60) return `${s}s ago`;
  const m = Math.round(s / 60);
  if (m < 60) return `${m}m ago`;
  return `${Math.round(m / 60)}h ago`;
}

export const fmt = (n: number | null | undefined, digits = 0) =>
  n === null || n === undefined || !Number.isFinite(n)
    ? "—"
    : n.toLocaleString("en-US", { maximumFractionDigits: digits, minimumFractionDigits: digits });

/** Small dollar amounts with enough digits to be meaningful ($0.000012). */
export function fmtUsdSmall(n: number | null | undefined) {
  if (n === null || n === undefined || !Number.isFinite(n)) return "—";
  if (n >= 0.01) return `$${n.toFixed(n >= 1 ? 2 : 4)}`;
  if (n === 0) return "$0";
  const digits = Math.min(10, Math.max(2, -Math.floor(Math.log10(n)) + 1));
  return `$${n.toFixed(digits)}`;
}

export function fmtCompact(n: number | null | undefined) {
  if (n === null || n === undefined || !Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { notation: "compact", maximumFractionDigits: 2 });
}
