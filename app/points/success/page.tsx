// app/points/success/page.tsx
"use client";

import { useEffect, useState } from "react";
import clientApi from "@/lib/api/axiosClient.client"; // baseURL: "/api", withCredentials: true

export default function SuccessPage() {
  const [msg, setMsg] = useState("결제 확인 중...");

  useEffect(() => {
    const url = new URL(window.location.href);
    const paymentKey = url.searchParams.get("paymentKey");
    const orderId = url.searchParams.get("orderId");
    const amount = Number(url.searchParams.get("amount") || "0");

    (async () => {
      try {
        // 백엔드에서 토스 결제 승인 + 포인트 적립
        await clientApi.post("/payments/toss/confirm", {
          paymentKey, orderId, amount,
        });
        setMsg("포인트가 충전되었습니다. (100원 → 100P)");
      } catch (e: any) {
        setMsg(`결제 승인 실패: ${e?.response?.data?.message ?? e?.message ?? "unknown"}`);
      }
    })();
  }, []);

  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="mb-4 text-2xl font-semibold">결제 결과</h1>
      <p>{msg}</p>
    </main>
  );
}
