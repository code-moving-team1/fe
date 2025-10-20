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

const fmt = (iso?: string | Date) =>
  iso ? new Date(iso as any).toLocaleDateString("ko-KR") : "-";
async function fetchMyReviews() {
  const res = await clientApi.get("/reviews/my", { withCredentials: true });
  const data = res.data?.data ?? res.data;
  return Array.isArray(data) ? data : [];
}
export interface WrittenReviewCardItem {
  reviewId?: string | number;
  bookingId?: string | number;

  moverName: string;
  moverAvatarUrl?: string;
  serviceLabel: string;

  from: string;
  to: string;
  moveDate: string;

  rating: number;
  comment: string;

  createdAt?: string;
}

export function useWrittenReviewCards() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["writtenReviews"],
    queryFn: fetchMyReviews,
    staleTime: 0,
    retry: 0,
  });

  const items: WrittenReviewCardItem[] = useMemo(() => {
    if (!data) return [];

    return data.map((r: any) => {
      const mover = r?.mover ?? null;
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

      return {
        reviewId: r?.reviewId,
        bookingId: booking?.id,
        moverName: mover?.nickname ?? "이사업체",
        moverAvatarUrl: mover?.img ?? "",
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
