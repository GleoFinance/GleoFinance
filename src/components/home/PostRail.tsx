"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/** Horizontal rail with round previous/next buttons; the cards are passed in. */
export function PostRail({ children }: { children: React.ReactNode }) {
  const rail = useRef<HTMLUListElement>(null);
  const move = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };
  return (
    <div>
      <div className="mb-8 flex justify-end gap-1">
        <button
          type="button"
          aria-label="Previous posts"
          onClick={() => move(-1)}
          className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-ink transition-colors hover:bg-paper-2"
        >
          <ChevronLeft className="size-4" />
        </button>
        <button
          type="button"
          aria-label="Next posts"
          onClick={() => move(1)}
          className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-ink transition-colors hover:bg-paper-2"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
      <ul
        ref={rail}
        className="-mr-[var(--gutter)] flex snap-x snap-mandatory gap-6 overflow-x-auto pr-[var(--gutter)] pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </ul>
    </div>
  );
}
