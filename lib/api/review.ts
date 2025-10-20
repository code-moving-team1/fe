// lib/api/review.ts

import clientApi from "./axiosClient.client";

export type CreateReviewPayload = {
  rating: number;
  content: string;
};

export async function createReview(
  bookingId: string | number,
  data: CreateReviewPayload,
) {
  const url = `/reviews/bookings/${bookingId}`;
  console.log("[createReview] POST", clientApi.defaults.baseURL + url, data);
  const res = await clientApi.post(url, data, { withCredentials: true });
  return res.data;
}

export async function fetchWritableReviews(params?: {
  page?: number;
  pageSize?: number;
}) {
  const page = params?.page ?? 1;
  const pageSize = params?.pageSize ?? 10;

  const res = await clientApi.get(`/bookings/reviewables`, {
    params: { page, pageSize },
    withCredentials: true,
  });

  return res.data;
}

export async function fetchMyReviews() {
  const candidates = [
    { url: "/reviews/me", config: {} },
    { url: "/reviews/mine", config: {} },
    { url: "/reviews", config: { params: { mine: true } } },
  ] as const;

  for (const c of candidates) {
    try {
      const res = await clientApi.get(c.url, c.config);
      if (Array.isArray(res.data) || res.data?.data) {
        return (res.data?.data ?? res.data) as any[];
      }
    } catch (e) {}
  }
  return [];
}
