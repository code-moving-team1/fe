// app/points/charge/page.tsx
"use client";

import { useState } from "react";
import { loadTossPayments } from "@tosspayments/payment-sdk";

export default function ChargePage() {
  const [loading, setLoading] = useState(false);

  const pay100 = async () => {
    setLoading(true);
    try {
      const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;
     if (!clientKey) {
       throw new Error("환경변수 NEXT_PUBLIC_TOSS_CLIENT_KEY가 설정되지 않았습니다.");
     }
      const toss = await loadTossPayments(clientKey);

      // 데모: 100원 고정 (= 100 포인트)
      const amount = 100;
      const orderId = `POINT_${Date.now()}`;
      const orderName = "포인트 충전 100원";

      await toss.requestPayment("카드", {
        amount,
        orderId,
        orderName,
        // 결제 후 리다이렉트
        successUrl: `${window.location.origin}/points/success`,
        failUrl: `${window.location.origin}/points/fail`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="mb-4 text-2xl font-semibold">포인트 충전</h1>
      <p className="mb-3 text-sm text-gray-600">테스트 결제 100원 = 100포인트 적립</p>
      <button
        onClick={pay100}
        disabled={loading}
        className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
      >
        {loading ? "결제창 여는 중..." : "100원 결제하기"}
      </button>
    </main>
  );
}
