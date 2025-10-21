"use client";

import { useQuery } from "@tanstack/react-query";
import clientApi from "@/lib/api/axiosClient.client";

type ReviewableRow = {
  bookingId: number | string;
  serviceDate: string;
  status: "COMPLETED";
  price: number | null;
  type: "NORMAL" | "DIRECT";
  mover?: {
    id: number;
    name?: string | null;
    averageRating?: number | null;
    totalReviews?: number | null;
    img?: string | null;
    introduction?: string | null;
    description?: string | null;
  } | null;
  move?: {
    from?: string | null;
    to?: string | null;
    serviceType?: "SMALL" | "FAMILY" | "OFFICE" | null;
  } | null;
};

const SERVICE_LABEL: Record<string, string> = {
  SMALL: "소형이사",
  FAMILY: "가정이사",
  OFFICE: "사무실이사",
};

const fmt = (iso?: string | Date) =>
  iso
    ? new Date(iso as any).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "-";

export function useWritableReviewCards(page = 1, pageSize = 10) {
  const q = useQuery({
    queryKey: ["writableReviews", page, pageSize],
    queryFn: async () => {
      const res = await clientApi.get("/bookings/reviewables", {
        params: { page, pageSize },
      });
      return res.data as {
        meta: {
          page: number;
          pageSize: number;
          total: number;
          totalPages: number;
        };
        data: ReviewableRow[];
      };
    },
    staleTime: 30_000,
  });

  const items =
    q.data?.data?.map((row) => {
      const svc = row.move?.serviceType ?? "SMALL";
      const mover = row.mover ?? undefined;

      const moverDescription = [mover?.introduction, mover?.description]
        .filter((v) => typeof v === "string" && v.trim().length > 0)
        .join(" ");

      return {
        id: row.bookingId,
        bookingId: row.bookingId,
        moverId: mover?.id,
        moverName: mover?.name || "기사이름",
        moverAvatarUrl: mover?.img || "",
        moverDescription,
        serviceLabel: SERVICE_LABEL[svc] ?? "이사",
        from: row.move?.from ?? "",
        to: row.move?.to ?? "",
        moveDate: fmt(row.serviceDate),
        price: row.price ?? 0,
        rating: mover?.averageRating ?? 0,
        reviewCount: mover?.totalReviews ?? 0,
        moveTypes: [String(svc).toLowerCase()],
      };
    }) ?? [];

  return {
    items,
    isLoading: q.isLoading,
    isError: q.isError,
    refetch: q.refetch,
    pageInfo: q.data?.meta,
  };
}
