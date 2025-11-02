// app/points/history/page.tsx
"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import Link from "next/link";
import { fetchMyPayments } from "@/lib/api/payments";

export default function PointsHistoryPage() {
  const q = useInfiniteQuery({
    queryKey: ["my-payments"],
    queryFn: ({ pageParam }) =>
      fetchMyPayments(pageParam as number | undefined, 20),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (last) => last.nextCursor ?? undefined,
  });

  const items = q.data?.pages.flatMap((p) => p.items) ?? [];

  return (
    <div className="mx-auto max-w-3xl p-4">
      <h1 className="mb-4 text-2xl font-semibold">결제 내역</h1>

      <div className="rounded border bg-white">
        <div className="grid grid-cols-12 border-b px-3 py-2 text-xs font-semibold text-gray-600">
          <div className="col-span-3">결제일시</div>
          <div className="col-span-2">금액</div>
          <div className="col-span-2">상태</div>
          <div className="col-span-3">수단</div>
          <div className="col-span-2">영수증</div>
        </div>

        {items.map((p) => (
          <div
            key={p.id}
            className="grid grid-cols-12 border-b px-3 py-3 text-sm"
          >
            <div className="col-span-3">
              {new Date(p.approvedAt ?? p.createdAt).toLocaleString()}
            </div>
            <div className="col-span-2">{p.amount.toLocaleString()}원</div>
            <div className="col-span-2">
              <span
                className={`rounded px-2 py-0.5 text-xs ${p.status === "APPROVED" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
              >
                {p.status}
              </span>
            </div>
            <div className="col-span-3 text-gray-700">
              {p.method}
              {p.easyPayProvider ? ` · ${p.easyPayProvider}` : ""}
              {p.cardType ? ` · ${p.cardType}` : ""}
            </div>
            <div className="col-span-2">
              {p.receiptUrl ? (
                <a
                  href={p.receiptUrl}
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  보기
                </a>
              ) : (
                <span className="text-gray-400">-</span>
              )}
            </div>
          </div>
        ))}

        <div className="p-3">
          <button
            onClick={() => q.fetchNextPage()}
            disabled={!q.hasNextPage || q.isFetchingNextPage}
            className="w-full rounded border px-3 py-2 text-sm disabled:opacity-50"
          >
            {q.isFetchingNextPage
              ? "불러오는 중..."
              : q.hasNextPage
                ? "더 보기"
                : "끝"}
          </button>
        </div>
      </div>

      <div className="mt-4">
        <Link href="/myEstimates" className="text-sm text-gray-600 underline">
          돌아가기
        </Link>
      </div>
    </div>
  );
}
