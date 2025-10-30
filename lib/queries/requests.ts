"use client";

import {
  keepPreviousData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import api from "@/lib/api/axiosClient.client";
import {
  fetchMoveRequests,
  type MoveRequestResponse,
  type MoveRequestFilter,
} from "@/lib/api/moveRequest";

export function useNormalRequests(params?: {
  pageSize?: number;
  enabled?: boolean;
  accessToken?: string;
  extraFilters?: Omit<MoveRequestFilter, "page" | "pageSize">;
}) {
  const pageSize = params?.pageSize ?? 5;
  const enabled = params?.enabled ?? true;
  const extraFilters = params?.extraFilters ?? {};

  return useInfiniteQuery({
    queryKey: ["requests", "normal", { pageSize, extraFilters }],
    queryFn: ({ pageParam = 1 }) =>
      fetchMoveRequests(
        {
          page: Number(pageParam),
          pageSize: Number(pageSize),
          status: ["ACTIVE"],
          ...extraFilters,
        },
        params?.accessToken,
      ),
    getNextPageParam: (last) => {
      const { page, totalPages } = last.meta;
      return page < totalPages ? page + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 30_000,
    enabled,
  });
}

export type DirectRow = {
  id: number;
  departure: string;
  destination: string;
  departureRegion?: string;
  destinationRegion?: string;
  moveDate: string;
  serviceType: "SMALL" | "FAMILY" | "OFFICE";

  direct_request_id: number;
  direct_request_status: "PENDING" | "ACCEPTED" | "REJECTED" | "EXPIRED";
  direct_request_created_at: string;
  customer_name?: string;
};

export type DirectListResponse = {
  meta: { page: number; pageSize: number; total: number; totalPages: number };
  data: DirectRow[];
};

export function useDirectRequests(params?: {
  page?: number;
  pageSize?: number;
  sort?: "move-date" | "requested";
  enabled?: boolean;
}) {
  const page = Number(params?.page ?? 1);
  const pageSize = Number(params?.pageSize ?? 5);
  const sort = params?.sort ?? "move-date";
  const enabled = params?.enabled ?? true;

  return useQuery({
    queryKey: ["requests", "direct", { page, pageSize, sort }],
    queryFn: async () => {
      const { data } = await api.get<DirectListResponse>(
        "/move-requests/direct",
        {
          params: { page, pageSize, sort },
        },
      );
      return {
        ...data,
        data: data.data.filter((r) => r.direct_request_status === "PENDING"),
      };
    },
    staleTime: 30_000,
    // keepPreviousData: true,
    placeholderData: keepPreviousData, // ✅ v5 방식
    enabled,
  });
}

type DirectRejectParams = { directRequestId: number; comment: string };

export function useRejectDirectRequest() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ directRequestId, comment }: DirectRejectParams) => {
      const { data } = await api.post(
        `/direct-quote-request/${directRequestId}/rejected`,
        { comment },
      );
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["requests", "direct"], exact: false });
    },
  });
}
