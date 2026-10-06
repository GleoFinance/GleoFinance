"use client";

import { useEffect, useState } from "react";
import type { AssetsSnapshot } from "@/lib/feeds/assets";

/** Fetches a JSON endpoint once and then every `everyMs`; null until the first answer. */
export function usePolled<T>(url: string, everyMs: number) {
  const [data, setData] = useState<T | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let cancelled = false;
    const load = () =>
      fetch(url, { cache: "no-store" })
        .then((r) => (r.ok ? (r.json() as Promise<T>) : Promise.reject(new Error(String(r.status)))))
        .then((d) => {
          if (!cancelled) {
            setData(d);
            setFailed(false);
          }
        })
        .catch(() => !cancelled && setFailed(true));
    load();
    const t = window.setInterval(load, everyMs);
    return () => {
      cancelled = true;
      window.clearInterval(t);
    };
  }, [url, everyMs]);
  return { data, failed };
}

/** Live USD price per asset symbol, from /api/assets. */
export function usePrices() {
  const { data, failed } = usePolled<AssetsSnapshot>("/api/assets", 60_000);
  const prices: Record<string, number> = {};
  for (const r of data?.rows ?? []) if (r.priceUsd) prices[r.symbol] = r.priceUsd;
  return { prices, ready: Boolean(data), failed };
}
