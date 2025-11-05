"use client";

import { useEffect, useRef, useState } from "react";
import { useMe } from "@/hooks/useAuth";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { Spinner } from "@/components/common/spinner/Spinner";
import useMyQuotes from "@/hooks/useMyQuotes";
import useQuoteSort, { SortLabel } from "@/hooks/useQuoteSort";
import QuoteListItem from "@/components/sent/QuoteListItem";

type TabKey = "sent" | "rejected";

const CONTAINER = "mx-auto w-full max-w-6xl px-4";
const TABS: { key: TabKey; label: string }[] = [
  { key: "sent", label: "보낸 견적 조회" },
  { key: "rejected", label: "반려 요청" },
];

export default function SentEstimatesPage() {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState<TabKey>("sent");

  const [openSort, setOpenSort] = useState(false);
  const sortRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!openSort) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setOpenSort(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenSort(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openSort]);

  const { data: me, isLoading: meLoading } = useMe();
  const isMover = !!me && "career" in me;

  const {
    list: rawList,
    isLoading: dataLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNext,
  } = useMyQuotes(active);

  useEffect(() => setMounted(true), []);

  const { list, sortLabel, applySort } = useQuoteSort(rawList, active, {
    keepDays: 14,
  });

  const loadMoreRef = useInfiniteScroll(
    () => {
      fetchNext();
    },
    hasNextPage && mounted && isMover,
  );

  if (!mounted) {
    return (
      <div className={`${CONTAINER} pt-6 pb-12`}>
        <SkeletonGrid />
      </div>
    );
  }

  const showSkeleton = meLoading || dataLoading;

  return (
    <>
      <div className="-mt-px border-t border-gray-200 bg-white">
        <div
          className={`${CONTAINER} flex flex-wrap items-center justify-between gap-2 py-1 md:py-0`}
        >
          <nav className="flex flex-wrap items-center gap-6 md:gap-10">
            {TABS.map((t) => {
              const on = active === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => setActive(t.key)}
                  aria-current={on ? "page" : undefined}
                  className={`relative cursor-pointer py-4 text-[16px] font-semibold ${
                    on ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <span className="relative inline-block pb-2">
                    {t.label}
                    {on && (
                      <span className="absolute bottom-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-gray-900" />
                    )}
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="relative" ref={sortRef}>
            <button
              onClick={() => setOpenSort((v) => !v)}
              className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold ${
                openSort
                  ? "border-gray-400 bg-gray-100"
                  : "border-gray-300 bg-white"
              }`}
            >
              {sortLabel}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                className={`${openSort ? "rotate-180" : ""} transition-transform`}
              >
                <path
                  d="M6 9l6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {openSort && (
              <ul className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
                {(
                  [
                    "날짜순",
                    "오래된순",
                    "등록 최신순",
                    "가격 높은순",
                    "가격 낮은순",
                  ] as SortLabel[]
                ).map((label) => (
                  <li
                    key={label}
                    onClick={() => {
                      applySort(label);
                      setOpenSort(false);
                    }}
                    className={`cursor-pointer px-4 py-2 text-sm hover:bg-gray-100 ${
                      sortLabel === label ? "bg-red-50 text-red-600" : ""
                    }`}
                  >
                    {label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <section className="w-full bg-gray-50">
        <div className={`${CONTAINER} pt-6 pb-12`}>
          {showSkeleton ? (
            <SkeletonGrid />
          ) : !isMover ? (
            <div className="flex h-40 items-center justify-center text-gray-500">
              로그인 후 이용해 주세요.
            </div>
          ) : isError ? (
            <div className="flex h-40 items-center justify-center text-red-500">
              데이터를 불러오지 못했어요.
            </div>
          ) : list.length === 0 ? (
            <EmptyState active={active} />
          ) : (
            <>
              <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {list.map((item) => (
                  <li key={item.quoteId ?? item.id}>
                    <QuoteListItem item={item} />
                  </li>
                ))}
              </ul>

              {hasNextPage && <div ref={loadMoreRef} className="h-8 w-full" />}
              {isFetchingNextPage && (
                <div className="mt-6 flex justify-center">
                  <Spinner className="h-6 w-6 text-gray-400" />
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}

function SkeletonGrid() {
  return (
    <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <li
          key={i}
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
        >
          <div className="animate-pulse">
            <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-2.5 py-1">
              <div className="h-3 w-3 rounded-full bg-gray-200" />
              <div className="h-3.5 w-16 rounded bg-gray-200" />
            </div>
            <div className="mt-3 h-5 w-40 rounded bg-gray-200" />
            <div className="my-4 h-px w-full bg-gray-100" />
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="h-3 w-10 rounded bg-gray-100" />
                <div className="mt-2 h-4 w-24 rounded bg-gray-200" />
              </div>
              <div>
                <div className="h-3 w-10 rounded bg-gray-100" />
                <div className="mt-2 h-4 w-24 rounded bg-gray-200" />
              </div>
              <div className="flex w-full flex-col">
                <div className="ml-7 h-3 w-10 rounded bg-gray-100" />
                <div className="mt-2 flex justify-end">
                  <div className="h-4 w-32 rounded bg-gray-200" />
                </div>
              </div>
            </div>
            <div className="my-4 h-px w-full bg-gray-100" />
            <div className="flex items-center justify-between">
              <div className="h-3.5 w-14 rounded bg-gray-100" />
              <div className="h-6 w-28 rounded bg-gray-200" />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

function EmptyState({ active }: { active: TabKey }) {
  const title = active === "sent" ? "보낸 견적이 없어요" : "반려 요청이 없어요";
  const desc =
    active === "sent"
      ? "내가 보낸 견적이 여기 표시됩니다."
      : "반려 요청이 없습니다.";
  return (
    <div className="flex h-56 flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white">
      <p className="text-base font-semibold text-gray-900">{title}</p>
      <p className="mt-1 text-sm text-gray-500">{desc}</p>
    </div>
  );
}
