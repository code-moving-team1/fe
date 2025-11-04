"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import type { SortBy } from "@/lib/api/mover";

const SORTS: SortBy[] = ["reviews", "rating", "quotes"];
const LABEL: Record<SortBy, string> = {
  reviews: "리뷰 많은 순",
  rating: "평점 높은 순",
  quotes: "확정 견적 많은 순",
};

export default function SortMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const current = (sp.get("sort") as SortBy) || "reviews";

  const setSort = (v: SortBy) => {
    const next = new URLSearchParams(sp.toString());
    next.set("sort", v);
    next.set("page", "1");
    router.replace(`${pathname}?${next.toString()}`, { scroll: false });
  };

  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 items-center gap-2 rounded-[18px] border border-zinc-200 bg-white px-4"
      >
        {LABEL[current]}
        <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden>
          <path
            d="M5 7l5 5 5-5"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-40 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow">
          {SORTS.map((s) => {
            const active = s === current;
            return (
              <button
                key={s}
                onClick={() => setSort(s)}
                className={[
                  "block w-full px-4 py-2 text-left text-sm",
                  active
                    ? "bg-zinc-50 font-semibold text-zinc-900"
                    : "text-zinc-700 hover:bg-zinc-50",
                ].join(" ")}
              >
                {LABEL[s]}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
