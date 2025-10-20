// lib/api/quote.ts
import clientApi from "@/lib/api/axiosClient.client";
import {
  fetchMoveRequests,
  fetchMoveRequestsSentEstimates,
} from "@/lib/api/moveRequest";

export interface SendEstimatePayload {
  moveRequestId: number;
  price: number;
  comment: string;
  type: "NORMAL" | "DIRECT"; // 일반요청/지정요청
}

export async function sendEstimateApi({
  moveRequestId,
  price,
  comment,
  type,
}: SendEstimatePayload) {
  const res = await clientApi.post(`/quote/move-requests/${moveRequestId}`, {
    price,
    comment,
    type,
  });
  return res.data;
}

export async function fetchMyQuotes({
  status = "PENDING",
  page = 1,
  pageSize = 10,
}: {
  status?: "PENDING" | "REJECTED" | "ACCEPTED";
  page?: number;
  pageSize?: number;
}) {
  const res = await fetchMoveRequestsSentEstimates({
    page,
    pageSize,
    sort: { field: "createdAt", order: "desc" },
  });

  const all = (res.data ?? []).filter((it: any) => it.myQuote != null);

  const filtered =
    status === "REJECTED"
      ? all.filter((it: any) => it.myQuote?.status === "REJECTED")
      : all.filter((it: any) => it.myQuote?.status !== "REJECTED");

  const shaped = filtered.map((it: any) => ({
    id: it.id,
    price: it.myQuote.price,
    status: it.myQuote.status,
    type: it.myQuote.type ?? "NORMAL",
    createdAt: it.myQuote.createdAt ?? "",
    moveRequest: {
      id: it.id,
      customerName:
        it.customerName ?? it.customer?.name ?? it.customer?.nickname ?? null,
      departure: it.departure,
      destination: it.destination,
      moveDate: it.moveDate,
      serviceType: it.serviceType,
    },
  }));

  return { data: shaped, meta: res.meta };
}

export async function fetchMyDirectRequests({
  status = "PENDING",
  page = 1,
  pageSize = 20,
}: {
  status?: "PENDING" | "ACCEPTED" | "REJECTED" | "EXPIRED";
  page?: number;
  pageSize?: number;
}) {
  const res = await clientApi.get("/direct-quote-request/mover/rejected", {
    params: { status, page, pageSize },
  });
  return res.data;
}
