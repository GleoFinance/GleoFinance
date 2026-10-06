"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

/**
 * Filterable card grid: a sidebar of category checkboxes (with counts) and an
 * optional search box, cards rendered by the server and passed in with their
 * category and searchable text.
 */
export function FilterGrid({
  items,
  label = "Filter by",
  searchable = false,
  searchLabel = "Search",
}: {
  items: { key: string; category: string; text: string; node: React.ReactNode }[];
  label?: string;
  searchable?: boolean;
  searchLabel?: string;
}) {
  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const i of items) counts.set(i.category, (counts.get(i.category) ?? 0) + 1);
    return [...counts.entries()];
  }, [items]);
  const [picked, setPicked] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const shown = items.filter((i) => (picked.length === 0 || picked.includes(i.category)) && (!q || i.text.toLowerCase().includes(q)));
  const toggle = (c: string) => setPicked((p) => (p.includes(c) ? p.filter((x) => x !== c) : [...p, c]));

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[294px_minmax(0,1fr)] lg:gap-6">
      <div className="min-w-0">
        {searchable ? (
          <label className="flex h-11 items-center gap-3 rounded-full border border-ink px-5">
            <Search className="size-4 shrink-0" aria-hidden="true" />
            <span className="sr-only">{searchLabel}</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={searchLabel}
              className="min-w-0 flex-1 bg-transparent text-[16px] outline-none"
            />
          </label>
        ) : null}
        <p className={`${searchable ? "mt-8" : ""} text-[16px] font-semibold`}>{label}</p>
        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3 lg:block lg:space-y-3">
          {categories.map(([c, n]) => (
            <li key={c}>
              <label className="flex cursor-pointer items-center gap-3 text-[14px] text-ink-2">
                <input type="checkbox" checked={picked.includes(c)} onChange={() => toggle(c)} className="size-5 shrink-0 accent-[#0f0f0f]" />
                {c} <span className="text-[10px] text-ink-3">({n})</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className="min-w-0">
        <p className="mb-5 text-[13px] font-semibold" aria-live="polite">
          {shown.length} {shown.length === 1 ? "result" : "results"}
        </p>
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {shown.map((i) => (
            <li key={i.key} className="min-w-0">
              {i.node}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
