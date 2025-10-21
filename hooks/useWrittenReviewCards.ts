// hooks/useWrittenReviewCards.ts
"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import clientApi from "@/lib/api/axiosClient.client";

const svcLabel: Record<string, string> = {
  SMALL: "소형이사",
  FAMILY: "가정이사",
  OFFICE: "사무실이사",
};

export type WrittenSort = "recent" | "oldest" | "rating_desc" | "rating_asc";

const fmt = (iso?: string | Date) =>
  iso
    ? new Date(iso as any).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "-";

type FetchOpts = {
  page?: number;
  pageSize?: number;
  sort?: WrittenSort;
};

async function fetchMyReviews(opts: FetchOpts = {}) {
  const { page = 1, pageSize = 10, sort = "recent" } = opts;
  const res = await clientApi.get("/reviews/my", {
    withCredentials: true,
    params: { page, pageSize, sort },
  });
  const data = res.data?.data ?? res.data;
  return Array.isArray(data) ? data : [];
}
export interface WrittenReviewCardItem {
  reviewId?: string | number;
  bookingId?: string | number;
  moverId?: number | string;
  moverName: string;
  moverAvatarUrl?: string;
  moverDescription?: string;
  serviceLabel: string;
  from: string;
  to: string;
  moveDate: string;
  rating: number;
  comment: string;
  createdAt?: string;
}

export function useWrittenReviewCards(opts: FetchOpts = {}) {
  const { page = 1, pageSize = 10, sort = "recent" } = opts;

  const { data, isLoading, error } = useQuery({
    queryKey: ["writtenReviews", { page, pageSize, sort }],
    queryFn: () => fetchMyReviews({ page, pageSize, sort }),
    staleTime: 0,
    retry: 0,
  });

  const items: WrittenReviewCardItem[] = useMemo(() => {
    if (!data) return [];

    return data.map((r: any) => {
      const mover = r?.mover ?? r?.booking?.mover ?? null;
      const booking = r?.booking ?? null;
      const move = r?.move ?? null;

      const from = move?.from?.trim?.() || "-";
      const to = move?.to?.trim?.() || "-";
      const moveDate = fmt(booking?.serviceDate ?? move?.moveDate);
      const serviceKey: string | undefined =
        move?.serviceType ?? booking?.type ?? undefined;
      const serviceLabel =
        svcLabel[serviceKey as keyof typeof svcLabel] ?? "이사";
      const rating = Math.max(
        0,
        Math.min(5, Math.round(Number(r?.rating ?? 0) || 0)),
      );
      const comment = r?.content ?? "";

      const moverDescription = [mover?.introduction, mover?.description]
        .filter((v) => typeof v === "string" && v.trim().length > 0)
        .join(" ");

      return {
        reviewId: r?.reviewId,
        bookingId: booking?.id,
        moverId: mover?.id,
        moverName: mover?.name ?? "기사이름",
        moverAvatarUrl: mover?.img ?? "",
        moverDescription,
        serviceLabel,
        from,
        to,
        moveDate,
        rating,
        comment,
        createdAt: fmt(r?.createdAt),
      } as WrittenReviewCardItem;
    });
  }, [data]);

  return { items, isLoading, error };
}
