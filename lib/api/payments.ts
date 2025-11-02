// lib/api/payments.ts
import clientApi from "@/lib/api/axiosClient.client";

export type MyPaymentItem = {
  id: number;
  amount: number;
  status: "APPROVED" | "FAILED";
  approvedAt: string | null;
  orderId: string;
  method: string | null; // "카드" | "간편결제" 등
  easyPayProvider: string | null; // 카카오페이 등
  cardType: string | null; // "신용" 등
  receiptUrl: string | null;
  createdAt: string;
};

export async function fetchMyPayments(cursor?: number, limit = 20) {
  const { data } = await clientApi.get<{
    items: MyPaymentItem[];
    nextCursor?: number;
  }>("/payments/my", { params: { cursor, limit } });
  return data;
}
