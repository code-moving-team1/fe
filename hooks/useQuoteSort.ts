// hooks/useQuoteSort.ts
"use client";

import { useMemo, useState } from "react";

export type SentTabKey = "sent" | "rejected";
export type SortLabel =
  | "이사일 빠른순"
  | "이사일 늦은순"
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

  const [sortLabel, setSortLabel] = useState<SortLabel>("등록 최신순");
  const [priceSort, setPriceSort] = useState<"asc" | "desc" | null>(null);

  const list = useMemo(() => {
    let base = (
      active === "rejected"
        ? rawList.filter((it) => it.myQuote.status === "REJECTED")
        : rawList.filter((it) => it.myQuote.status !== "REJECTED")
    ).slice();

    if (priceSort) {
      base.sort((a, b) =>
        priceSort === "asc"
          ? (a.myQuote.price ?? 0) - (b.myQuote.price ?? 0)
          : (b.myQuote.price ?? 0) - (a.myQuote.price ?? 0),
      );
    } else {
      if (sortLabel === "이사일 빠른순") {
        base.sort(
          (a, b) =>
            new Date(a.moveDate).getTime() - new Date(b.moveDate).getTime(),
        );
      } else if (sortLabel === "이사일 늦은순") {
        base.sort(
          (a, b) =>
            new Date(b.moveDate).getTime() - new Date(a.moveDate).getTime(),
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
      if (!isPastDate(it.moveDate)) return true;
      const status = it.myQuote.status;
      if (status === "ACCEPTED" || status === "REJECTED") {
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
