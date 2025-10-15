// app/(mover)/sentEstimates/page.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import CustomerEstimateCard from "@/components/common/card/CustomerEstimateCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchMyQuotes } from "@/lib/api/quote";
import type { MoveRequestItem, MoveRequestFilter } from "@/lib/api/moveRequest";
import { useMe } from "@/hooks/useAuth";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { Spinner } from "@/components/common/spinner/Spinner";
import CompletedMoveCard from "@/components/common/card/CompletedMoveCard";
import RejectedRequestCard from "@/components/common/card/RejectedRequestCard";

type QuoteStatus = "PENDING" | "REJECTED" | "ACCEPTED";

export type QuoteItem = {
  id: number;
  price: number;
  status: QuoteStatus;
  type?: "NORMAL" | "DIRECT";
  createdAt: string;
  moveRequest: {
    id: number;
    customerName?: string | null;
    departure: string;
    destination: string;
    moveDate: string;
    serviceType: "SMALL" | "FAMILY" | "OFFICE";
    status?: "PENDING" | "ACCEPTED" | "REJECTED" | "EXPIRED";
  };
};

type TabKey = "sent" | "rejected";
type SortLabel =
  | "날짜순"
  | "오래된순"
  | "등록 최신순"
  | "가격 높은순"
  | "가격 낮은순";

const CONTAINER = "mx-auto w-full max-w-6xl px-4";
const TABS: { key: TabKey; label: string }[] = [
  { key: "sent", label: "보낸 견적 조회" },
  { key: "rejected", label: "반려 요청" },
];
const SERVICE_LABEL: Record<string, string> = {
  SMALL: "소형이사",
  FAMILY: "가정이사",
  OFFICE: "사무실이사",
};

const KEEP_AFTER_MOVE_DAYS = 14;

function isWithinKeepWindow(input: string | Date, days: number) {
  const d = typeof input === "string" ? new Date(input) : input;
  if (Number.isNaN(d.getTime())) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dd = new Date(d);
  dd.setHours(0, 0, 0, 0);
  const diffDays = Math.floor(
    (today.getTime() - dd.getTime()) / (1000 * 60 * 60 * 24),
  );
  return diffDays <= days;
}

function isPastDate(input: string | Date) {
  const d = typeof input === "string" ? new Date(input) : input;
  if (Number.isNaN(d.getTime())) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dd = new Date(d);
  dd.setHours(0, 0, 0, 0);
  return dd < today;
}

function formatKoreanDate(input: string | Date) {
  const d = typeof input === "string" ? new Date(input) : input;
  if (Number.isNaN(d.getTime())) return "";
  const yoil = ["일", "월", "화", "수", "목", "금", "토"][d.getDay()];
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}년 ${m}월 ${day}일 (${yoil})`;
}

function formatAddress(address: string) {
  if (!address) return "";
  const parts = address.trim().split(/\s+/);
  const roadIdx = parts.findIndex((t) => /(로|길)$/.test(t));
  if (roadIdx !== -1) {
    const slice = parts.slice(0, roadIdx + 1);
    slice[roadIdx] = slice[roadIdx].replace(/\d.*$/, "");
    return slice.join(" ").trim();
  }
  let lastAdminIdx = -1;
  for (let i = 0; i < parts.length; i++) {
    if (/(시|도|군|구|읍|면|동|리)$/.test(parts[i])) lastAdminIdx = i;
  }
  if (lastAdminIdx !== -1) return parts.slice(0, lastAdminIdx + 1).join(" ");
  return parts.slice(0, Math.min(3, parts.length)).join(" ");
}

export default function SentEstimatesPage() {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState<TabKey>("sent");

  const [filters, setFilters] = useState<MoveRequestFilter>({
    page: 1,
    pageSize: 20,
    sort: { field: "moveDate", order: "asc" },
  });

  const [openSort, setOpenSort] = useState(false);
  const [sortLabel, setSortLabel] = useState<SortLabel>("날짜순");
  const [priceSort, setPriceSort] = useState<"asc" | "desc" | null>(null);

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

  type QuoteStatus = "PENDING" | "REJECTED" | "ACCEPTED";
  const PAGE_SIZE = 20;
  const statusForTab: QuoteStatus =
    active === "rejected" ? "REJECTED" : "PENDING";

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["myQuotes", statusForTab, PAGE_SIZE],
    queryFn: ({ pageParam = 1 }) =>
      fetchMyQuotes({
        status: statusForTab,
        page: pageParam,
        pageSize: PAGE_SIZE,
      }),
    getNextPageParam: (last) => {
      const { page, totalPages } = last.meta;
      return page < totalPages ? page + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 30_000,
    enabled: mounted && isMover,
  });

  useEffect(() => setMounted(true), []);

  const quotesRaw: QuoteItem[] =
    data?.pages.flatMap((p: { data: QuoteItem[] }) => p.data) ?? [];

  const all = quotesRaw.map((q) => ({
    id: q.moveRequest.id,
    customerName: q.moveRequest.customerName ?? null,
    departure: q.moveRequest.departure,
    destination: q.moveRequest.destination,
    moveDate: q.moveRequest.moveDate,
    serviceType: q.moveRequest.serviceType,
    moveRequestStatus: q.moveRequest.status,
    myQuote: {
      price: q.price,
      status: q.status,
      type: q.type ?? "NORMAL",
      createdAt: q.createdAt,
    },
  }));

  const mine = useMemo(() => all.filter((it) => it.myQuote != null), [all]);

  const list = useMemo(() => {
    const isRejectedTab = active === "rejected";

    let base = isRejectedTab
      ? mine.filter(
          (it: any) =>
            it.myQuote?.status === "REJECTED" ||
            it.moveRequestStatus === "REJECTED",
        )
      : mine.filter(
          (it: any) =>
            it.myQuote &&
            it.myQuote.status !== "REJECTED" &&
            it.moveRequestStatus !== "REJECTED",
        );

    if (priceSort) {
      base = [...base].sort((a, b) => {
        const ap = a.myQuote?.price ?? Number.NEGATIVE_INFINITY;
        const bp = b.myQuote?.price ?? Number.NEGATIVE_INFINITY;
        return priceSort === "asc" ? ap - bp : bp - ap;
      });
    }

    if (!priceSort) {
      if (sortLabel === "날짜순") {
        base = [...base].sort(
          (a, b) =>
            new Date(a.moveDate).getTime() - new Date(b.moveDate).getTime(),
        );
      } else if (sortLabel === "오래된순") {
        base = [...base].sort(
          (a, b) =>
            new Date(b.moveDate).getTime() - new Date(a.moveDate).getTime(),
        );
      } else if (sortLabel === "등록 최신순") {
        base = [...base].sort(
          (a, b) =>
            new Date(b.myQuote?.createdAt ?? 0).getTime() -
            new Date(a.myQuote?.createdAt ?? 0).getTime(),
        );
      }
    }

    base = base.filter((it) => {
      const past = isPastDate(it.moveDate);
      if (!past) return true;
      const status = it.myQuote?.status;
      const isCompleted = status === "ACCEPTED";
      const isRejected =
        status === "REJECTED" || it.moveRequestStatus === "REJECTED";
      if (isCompleted || isRejected) {
        return isWithinKeepWindow(it.moveDate, KEEP_AFTER_MOVE_DAYS);
      }
      return false;
    });

    return base;
  }, [active, mine, priceSort, sortLabel]);

  const applySort = (label: SortLabel) => {
    setSortLabel(label);
    setOpenSort(false);

    if (label === "가격 높은순") {
      setPriceSort("desc");
    } else if (label === "가격 낮은순") {
      setPriceSort("asc");
    } else {
      setPriceSort(null);
    }
  };

  const loadMoreRef = useInfiniteScroll(
    () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    hasNextPage && mounted && isMover,
  );

  if (!mounted) {
    return (
      <div className={`${CONTAINER} pt-6 pb-12`}>
        <div className="flex h-40 flex-col items-center justify-center text-gray-500">
          <Spinner className="mb-3 h-6 w-6 border-gray-400" /> <p>초기화 중…</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="-mt-px border-t border-gray-200 bg-white">
        <div className={CONTAINER}>
          <nav className="flex gap-12">
            {TABS.map((t) => {
              const on = active === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => setActive(t.key)}
                  aria-current={on ? "page" : undefined}
                  className={`relative cursor-pointer py-6 text-[17px] font-semibold ${
                    on ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <span className="relative inline-block pb-2">
                    {t.label}
                    {on && (
                      <span className="absolute bottom-0 left-1/2 h-[2px] w-10 -translate-x-1/2 rounded-full bg-gray-900" />
                    )}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      <section className="w-full bg-gray-50">
        <div className={`${CONTAINER} pt-6 pb-12`}>
          <div className="mb-4 flex justify-end">
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
                    ] as const
                  ).map((label) => (
                    <li
                      key={label}
                      onClick={() => applySort(label)}
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

          {meLoading ? (
            <div className="flex h-40 flex-col items-center justify-center text-gray-500">
              <Spinner className="mb-3 h-6 w-6 border-gray-400" />{" "}
              <p>사용자 확인 중…</p>
            </div>
          ) : !isMover ? (
            <div className="flex h-40 items-center justify-center text-gray-500">
              로그인 후 이용해 주세요.
            </div>
          ) : isLoading ? (
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
                        <div className="h-3 w-10 rounded bg-gray-100" />{" "}
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
                      <div className="h-3.5 w-14 rounded bg-gray-100" />{" "}
                      <div className="h-6 w-28 rounded bg-gray-200" />{" "}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : isError ? (
            <div className="flex h-40 items-center justify-center text-red-500">
              데이터를 불러오지 못했어요.
            </div>
          ) : list.length === 0 ? (
            <EmptyState active={active} />
          ) : (
            <>
              <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {list.map((item) => {
                  const serviceLabel =
                    SERVICE_LABEL[item.serviceType] ?? "이사";
                  const chips = [
                    { label: serviceLabel, iconSrc: "/icons/ic_box.svg" },
                    ...(item.myQuote?.type === "DIRECT"
                      ? [
                          {
                            label: "지정 견적 요청",
                            iconSrc: "/icons/ic_document.svg",
                          },
                        ]
                      : []),
                  ];
                  const name = item.customerName
                    ? `${item.customerName} 고객님`
                    : "고객님";

                  const isRejected = item.myQuote?.status === "REJECTED";
                  const isCompleted = item.myQuote?.status === "ACCEPTED";

                  const baseProps = {
                    customerName: name,
                    from: formatAddress(item.departure),
                    to: formatAddress(item.destination),
                    movingDate: formatKoreanDate(item.moveDate),
                    requestType: serviceLabel,
                    moveType: serviceLabel,
                    price: item.myQuote?.price ?? 0,
                  };

                  return (
                    <li key={item.id}>
                      {isRejected ? (
                        <RejectedRequestCard
                          {...baseProps}
                          chips={chips}
                          className="border border-gray-200 bg-white"
                        />
                      ) : isCompleted ? (
                        <CompletedMoveCard
                          {...baseProps}
                          chips={chips}
                          className="h-[265px] border border-gray-200 bg-white"
                        />
                      ) : (
                        <CustomerEstimateCard
                          {...baseProps}
                          className="border border-gray-200 bg-white transition-all duration-200 hover:scale-[1.01] hover:border-red-400 hover:shadow-[0_4px_12px_rgba(239,68,68,0.25)]"
                          chips={chips}
                        />
                      )}
                    </li>
                  );
                })}
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

function EmptyState({ active }: { active: TabKey }) {
  const title = active === "sent" ? "보낸 견적이 없어요" : "반려 요청이 없어요";
  const desc =
    active === "sent"
      ? "내가 보낸 견적이 여기 표시됩니다."
      : "없다구요 반려 요청";
  return (
    <div className="flex h-56 flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white">
      <p className="text-base font-semibold text-gray-900">{title}</p>
      <p className="mt-1 text-sm text-gray-500">{desc}</p>
    </div>
  );
}
