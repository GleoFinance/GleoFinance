"use client";

import { useState } from "react";

/** Busy flag and readable error around one async action. */
export function useAction() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);
  const run = async (fn: () => Promise<string | void>) => {
    setBusy(true);
    setError(null);
    setDone(null);
    try {
      const msg = await fn();
      if (msg) setDone(msg);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  };
  return { busy, error, done, run, setError };
}

export function Feedback({ error, done }: { error: string | null; done: string | null }) {
  if (error)
    return (
      <p role="alert" className="mt-3 text-[13.5px] text-down">
        {error}
      </p>
    );
  if (done) return <p className="mt-3 text-[13.5px] font-semibold text-sea-deep">{done}</p>;
  return null;
}

export const num = (v: string) => {
  const n = Number(v.replace(/,/g, ""));
  return Number.isFinite(n) ? n : NaN;
};

export const cleanDecimal = (v: string) => {
  const s = v.replace(/[^0-9.]/g, "");
  const dot = s.indexOf(".");
  return dot < 0 ? s : s.slice(0, dot + 1) + s.slice(dot + 1).replace(/\./g, "");
};
