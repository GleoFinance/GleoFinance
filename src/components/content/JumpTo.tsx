"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

/**
 * "Jump to" pill fixed at the bottom of long pages on wide screens. Opens a
 * list of the page's sections. Hidden below lg so it never covers content
 * on phones and tablets.
 */
export function JumpTo({ items }: { items: { id: string; label: string }[] }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onPointer);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);
  return (
    <div ref={root} className="fixed bottom-2 left-1/2 z-40 hidden w-[480px] -translate-x-1/2 lg:block">
      {open ? (
        <ul className="mb-2 overflow-hidden rounded-3xl border border-line bg-paper py-2 shadow-[0_12px_40px_-12px_rgba(15,15,15,0.35)]">
          {items.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} onClick={() => setOpen(false)} className="block px-7 py-2.5 text-[15px] hover:bg-paper-2">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-11 w-full cursor-pointer items-center justify-between rounded-full bg-sea pr-1.5 pl-7 text-[16px] text-ink"
      >
        Jump to…
        <span className="flex size-8 items-center justify-center rounded-full bg-ink text-fog">
          <ChevronDown className={`size-4 transition-transform ${open ? "rotate-180" : ""}`} />
        </span>
      </button>
    </div>
  );
}
