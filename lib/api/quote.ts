// lib/api/quote.ts
import api from "@/lib/api/axiosClient";

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
  const res = await api.post(`/quote/move-requests/${moveRequestId}`, {
    price,
    comment,
    type,
  });
  return res.data;
}
