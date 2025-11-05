// hooks/useMyQuotes.ts
"use client";

import { useEffect, useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchMyQuotes, fetchMyDirectRequests } from "@/lib/api/quote";

export type SentTabKey = "sent" | "rejected";

type ApiMeta = {
  page: number;
  totalPages: number;
};

type NormalQuoteApiRow = {
  quoteId?: number;
  id?: number;
  price?: number;
  status?: "PENDING" | "REJECTED" | "ACCEPTED";
  createdAt?: string;
  moveRequest?: {
    id: number;
    customerName?: string | null;
    departure?: string;
    destination?: string;
    moveDate?: string;
    serviceType?: "SMALL" | "FAMILY" | "OFFICE";
    status?: "PENDING" | "ACCEPTED" | "REJECTED" | "EXPIRED";
    updatedAt?: string;
    createdAt?: string;
  };
};

type DirectQuoteApiRow = {
  quoteId?: number;
  quote_id?: number;
  price?: number;
  status?: "PENDING" | "REJECTED" | "ACCEPTED";
  direct_request_status?: "PENDING" | "REJECTED" | "ACCEPTED";
  quoteStatus?: "PENDING" | "REJECTED" | "ACCEPTED";
  createdAt?: string;
  updatedAt?: string;
  moveRequest?: NormalQuoteApiRow["moveRequest"];
  move_request?: NormalQuoteApiRow["moveRequest"];
};

type PagedArray<T> =
  | {
      data?: T[];
      meta?: ApiMeta;
    }
  | T[];

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

function isObjectPaged<T>(
  input: PagedArray<T>,
): input is { data?: T[]; meta?: ApiMeta } {
  return typeof input === "object" && !Array.isArray(input);
}

function getMeta(meta: unknown): ApiMeta {
  const page =
    typeof (meta as ApiMeta | undefined)?.page === "number"
      ? (meta as ApiMeta).page
      : 1;
  const totalPages =
    typeof (meta as ApiMeta | undefined)?.totalPages === "number"
      ? (meta as ApiMeta).totalPages
      : 1;
  return { page, totalPages };
}

function mapNormalRow(row: NormalQuoteApiRow): QuoteListItem | null {
  const mr = row.moveRequest;
  if (!mr || typeof mr.id !== "number") return null;

  return {
    id: mr.id,
    quoteId: row.quoteId ?? row.id,
    customerName: mr.customerName ?? null,
    departure: mr.departure ?? "",
    destination: mr.destination ?? "",
    moveDate: mr.moveDate ?? "",
    serviceType: (mr.serviceType as QuoteListItem["serviceType"]) ?? "SMALL",
    moveRequestStatus: mr.status,
    myQuote: {
      myQuoteId: row.quoteId ?? row.id,
      price: row.price ?? 0,
      status: (row.status as QuoteListItem["myQuote"]["status"]) ?? "PENDING",
      type: "NORMAL",
      createdAt: row.createdAt ?? mr.updatedAt ?? mr.createdAt ?? "",
    },
  };
}

function mapDirectRow(row: DirectQuoteApiRow): QuoteListItem | null {
  const moveReq = row.moveRequest ?? row.move_request;
  if (!moveReq || typeof moveReq.id !== "number") return null;

  const statusFromApi =
    row.status ?? row.direct_request_status ?? row.quoteStatus ?? "REJECTED";

  const createdAt =
    row.createdAt ??
    row.updatedAt ??
    moveReq.updatedAt ??
    moveReq.createdAt ??
    "";

  const maybeQuoteId = row.quoteId ?? row.quote_id;

  return {
    id: moveReq.id,
    quoteId: maybeQuoteId,
    customerName: moveReq.customerName ?? null,
    departure:
      moveReq.departure ??
      (moveReq as Record<string, unknown>)["departureAddress"]?.toString() ??
      (moveReq as Record<string, unknown>)["departure_region"]?.toString() ??
      (moveReq as Record<string, unknown>)["departureRegion"]?.toString() ??
      "",
    destination:
      moveReq.destination ??
      (moveReq as Record<string, unknown>)["destinationAddress"]?.toString() ??
      (moveReq as Record<string, unknown>)["destination_region"]?.toString() ??
      (moveReq as Record<string, unknown>)["destinationRegion"]?.toString() ??
      "",
    moveDate:
      moveReq.moveDate ??
      (moveReq as Record<string, unknown>)["move_date"]?.toString() ??
      "",
    serviceType: (moveReq.serviceType ??
      (moveReq as Record<string, unknown>)[
        "service_type"
      ]) as QuoteListItem["serviceType"],
    moveRequestStatus: moveReq.status,
    myQuote: {
      myQuoteId: maybeQuoteId,
      price: row.price ?? 0,
      status: statusFromApi as QuoteListItem["myQuote"]["status"],
      type: "DIRECT",
      createdAt,
    },
  };
}
function dedupeByMoveRequestKeepLatest(
  items: QuoteListItem[],
): QuoteListItem[] {
  const byId = new Map<number, QuoteListItem>();
  for (const it of items) {
    const prev = byId.get(it.id);
    if (!prev) {
      byId.set(it.id, it);
      continue;
    }
    const a = new Date(prev.myQuote.createdAt || 0).getTime();
    const b = new Date(it.myQuote.createdAt || 0).getTime();
    if (b > a) byId.set(it.id, it);
  }
  return Array.from(byId.values());
}

type UseMyQuotesOptions = {
  pageSize?: number;
};

export function useMyQuotes(active: SentTabKey, options?: UseMyQuotesOptions) {
  const PAGE_SIZE = options?.pageSize ?? 20;

  const statusForTab: "PENDING" | "REJECTED" =
    active === "rejected" ? "REJECTED" : "PENDING";

  const quotesQ = useInfiniteQuery({
    queryKey: ["myQuotes", statusForTab, PAGE_SIZE],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await fetchMyQuotes({
        status: statusForTab,
        page: pageParam as number,
        pageSize: PAGE_SIZE,
      });
      return res as { data?: NormalQuoteApiRow[]; meta?: ApiMeta };
    },
    getNextPageParam: (last) => {
      const meta = getMeta(last?.meta);
      return meta.page < meta.totalPages ? meta.page + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 30_000,
  });

  const directsQ = useInfiniteQuery({
    queryKey: ["myDirectRequests", statusForTab, PAGE_SIZE],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await fetchMyDirectRequests({
        status: statusForTab,
        page: pageParam as number,
        pageSize: PAGE_SIZE,
      });
      return res as PagedArray<DirectQuoteApiRow> & { meta?: ApiMeta };
    },
    getNextPageParam: (last) => {
      if (!isObjectPaged(last)) return undefined;
      const meta = getMeta(last.meta);
      return meta.page < meta.totalPages ? meta.page + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 30_000,
    enabled: active === "rejected",
  });

  const normalized = useMemo(() => {
    const rowsA = (quotesQ.data?.pages ?? []).flatMap((p) => p?.data ?? []);
    const listA = rowsA
      .map(mapNormalRow)
      .filter((v): v is QuoteListItem => v !== null);

    const pagesB = directsQ.data?.pages ?? [];
    const rowsB: DirectQuoteApiRow[] = pagesB.flatMap((p) =>
      isObjectPaged<DirectQuoteApiRow>(p) ? (p.data ?? []) : p,
    );
    const listB = rowsB
      .map(mapDirectRow)
      .filter((v): v is QuoteListItem => v !== null);

    const merged = active === "rejected" ? [...listA, ...listB] : listA;

    return dedupeByMoveRequestKeepLatest(merged);
  }, [active, quotesQ.data?.pages, directsQ.data?.pages]);

  const isLoading =
    quotesQ.isLoading || (active === "rejected" && directsQ.isLoading);
  const isError =
    quotesQ.isError || (active === "rejected" && !!directsQ.isError);
  const error = (quotesQ.error ?? directsQ.error) as unknown;

  const hasNextPage =
    !!quotesQ.hasNextPage || (active === "rejected" && !!directsQ.hasNextPage);

  const isFetchingNextPage =
    quotesQ.isFetchingNextPage ||
    (active === "rejected" && !!directsQ.isFetchingNextPage);

  const fetchNext = () => {
    if (quotesQ.hasNextPage && !quotesQ.isFetchingNextPage) {
      void quotesQ.fetchNextPage();
    }
    if (
      active === "rejected" &&
      directsQ.hasNextPage &&
      !directsQ.isFetchingNextPage
    ) {
      void directsQ.fetchNextPage();
    }
  };

  useEffect(() => {
    if (directsQ.isError) {
      console.log("지정견적 로드 에러:", directsQ.error);
    }
  }, [directsQ.isError, directsQ.error]);

  return {
    list: normalized,
    isLoading,
    isError,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNext,
    refetch: () => {
      void quotesQ.refetch();
      if (active === "rejected") void directsQ.refetch();
    },
  };
}

export default useMyQuotes;
