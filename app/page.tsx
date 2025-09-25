"use client";

import { useEstimateStore } from "@/store/estimateStore";

export default function Home() {
  const { date, departure, destination, moveType } = useEstimateStore();

  return (
    <main className="mt-5 ml-15 p-4">
      <h1 className="text-xl font-bold">Zustand 테스트</h1>
      <p>선택된 날짜: {date ?? "없음"}</p>
      <p>출발지: {departure || "없음"}</p>
      <p>도착지: {destination || "없음"}</p>
      <p>이사 유형: {moveType || "없음"}</p>
    </main>
  );
}
