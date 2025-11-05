// hooks/useQuoteSort.ts
"use client";

import { useMemo, useState } from "react";

export type SentTabKey = "sent" | "rejected";
export type SortLabel =
  | "날짜순"
  | "오래된순"
  | "등록 최신순"
  | "가격 높은순"
  | "가격 낮은순";

export type QuoteListItem = {
  id: number;
  quoteId?: number;
  customerName: string | null;
  departure: string;
  destination: string;
  moveDate: string;
  serviceType: "SMALL" | "FAMILY" | "OFFICE";
  moveRequestStatus?: "PENDING" | "ACCEPTED" | "REJECTED" | "EXPIRED";
  myQuote: {
    myQuoteId?: number;
    price: number;
    status: "PENDING" | "REJECTED" | "ACCEPTED";
    type: "NORMAL" | "DIRECT";
    createdAt: string;
  };
};

function isWithinKeepWindow(input: string | Date, days: number) {
  const d = typeof input === "string" ? new Date(input) : input;
  if (Number.isNaN(d.getTime())) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dd = new Date(d);
  dd.setHours(0, 0, 0, 0);
  const diffDays = Math.floor((today.getTime() - dd.getTime()) / 86400000);
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

type Options = {
  keepDays?: number;
};

export function useQuoteSort(
  rawList: QuoteListItem[],
  active: SentTabKey,
  options?: Options,
) {
  const keepDays = options?.keepDays ?? 14;

  const [sortLabel, setSortLabel] = useState<SortLabel>("날짜순");
  const [priceSort, setPriceSort] = useState<"asc" | "desc" | null>(null);

  const list = useMemo(() => {
    let base = (
      active === "rejected"
        ? rawList.filter((it) => it.myQuote.status === "REJECTED")
        : rawList.filter((it) => it.myQuote.status !== "REJECTED")
    ).slice();

    if (priceSort) {
      base.sort((a, b) => {
        const ap = a.myQuote.price ?? Number.NEGATIVE_INFINITY;
        const bp = b.myQuote.price ?? Number.NEGATIVE_INFINITY;
        return priceSort === "asc" ? ap - bp : bp - ap;
      });
    } else {
      if (sortLabel === "날짜순") {
        base.sort(
          (a, b) =>
            new Date(a.moveDate).getTime() - new Date(b.moveDate).getTime(),
        );
      } else if (sortLabel === "오래된순") {
        base.sort(
          (a, b) =>
            new Date(a.moveDate).getTime() - new Date(b.moveDate).getTime(),
        );
      } else if (sortLabel === "등록 최신순") {
        base.sort(
          (a, b) =>
            new Date(b.myQuote.createdAt || 0).getTime() -
            new Date(a.myQuote.createdAt || 0).getTime(),
        );
      }
    }

    base = base.filter((it) => {
      const past = isPastDate(it.moveDate);
      if (!past) return true;
      const status = it.myQuote.status;
      const isCompleted = status === "ACCEPTED";
      const isRejected = status === "REJECTED";
      if (isCompleted || isRejected) {
        return isWithinKeepWindow(it.moveDate, keepDays);
      }
      return false;
    });

    return base;
  }, [active, rawList, priceSort, sortLabel, keepDays]);

  const applySort = (label: SortLabel) => {
    setSortLabel(label);
    if (label === "가격 높은순") setPriceSort("desc");
    else if (label === "가격 낮은순") setPriceSort("asc");
    else setPriceSort(null);
  };

  return {
    list,
    sortLabel,
    setSortLabel,
    priceSort,
    setPriceSort,
    applySort,
  };
}

export default useQuoteSort;
