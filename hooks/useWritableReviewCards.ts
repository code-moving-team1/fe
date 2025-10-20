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
    nickname?: string | null;
    averageRating?: number | null;
    totalReviews?: number | null;
    img?: string | null;
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

const fmtDate = (iso?: string) =>
  iso ? new Date(iso).toLocaleDateString("ko-KR") : "-";

/**
 * 작성 가능한 리뷰 카드 리스트 훅
 * - GET /bookings/reviewables (고객 로그인 필요)
 * - 백엔드에서 이미 mover, move, price 스냅샷 제공하므로 추가 조회 없이 매핑만 함
 */
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

      return {
        // 리스트 키 & 제출용
        id: row.bookingId,
        bookingId: row.bookingId,

        // 카드 표시용
        moverName: mover?.nickname || "이사업체",
        moverAvatarUrl: mover?.img || "",
        serviceLabel: SERVICE_LABEL[svc] ?? "이사",
        from: row.move?.from ?? "",
        to: row.move?.to ?? "",
        moveDate: fmtDate(row.serviceDate),
        price: row.price ?? 0,

        // (옵션) 추가 정보
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
