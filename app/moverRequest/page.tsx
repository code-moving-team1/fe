// app/moverRequest/page.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import {
  fetchMoveRequests,
  MoveRequestFilter,
  MoveRequestItem,
} from "@/lib/api/moveRequest";
import FilterBar from "@/components/filter/FilterBar";
import MoverRequest from "@/components/common/card/MoverRequestCard";
import api from "@/lib/api/axiosClient";
import { useMe } from "@/hooks/useAuth";
//우진수정 d8d0975
import SendEstimateModal from "@/components/common/modal/SendEstimateModal";
import { Spinner } from "@/components/common/spinner/Spinner";
import { useQueryClient } from "@tanstack/react-query";

import { useMoveRequests } from "@/hooks/useMoveRequests";
import { usePrefetchMoveRequests } from "@/hooks/usePrefetchMoveRequests";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

export default function MoverRequestPage() {
  const { data: me } = useMe();
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState<MoveRequestFilter>({
    page: 1,
    pageSize: 10,
  });
  // const [quotedIds, setQuotedIds] = useState<number[]>([]);

  usePrefetchMoveRequests(filters, !!me && "career" in me);

  // const quoteRes = await api.get(`/quote/mover/${moverId}`);
  // const myQuotedRequestIds = quoteRes.data.map(
  //   (q: any) => q.moveRequestId,
  // );
  // setQuotedIds(myQuotedRequestIds);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  } = useMoveRequests(filters, !!me && "career" in me);

  const observerRef = useInfiniteScroll(() => {
    if (hasNextPage) fetchNextPage();
  }, !!hasNextPage);

  const requests = data?.pages.flatMap((page) => page.data) ?? [];

  // 우진수정
  // const handleQuote = async (id: number) => {
  //   try {
  //     await api.post(`/quote/move-requests/${id}`, {
  //       price: 150000,
  //       comment: "빠르고 안전한 이사 보장",
  //       type: "NORMAL",
  //     });
  //     alert("견적이 성공적으로 전송되었습니다.");
  //     setQuotedIds((prev) => [...prev, id]);
  //   } catch (err: any) {
  //     if (err.response?.status === 409) {
  //       alert("이미 견적을 보냈습니다.");
  //       setQuotedIds((prev) => [...prev, id]);
  //     } else {
  //       console.error("견적 전송 실패:", err);
  //       alert("견적 전송 중 오류가 발생했습니다.");
  //     }
  //   }
  // };

  const [selectedLabels, setSelectedLabels] = useState({
    from: "출발 지역",
    to: "도착 지역",
    service: "서비스",
    sort: "정렬",
  });

  if (isLoading)
    return (
      <div className="flex h-40 items-center justify-center">
        <Spinner className="h-8 w-8 border-orange-500 border-t-transparent" />
      </div>
    );
  if (isError)
    return <p className="text-center text-red-500">데이터 로드 실패</p>;

  return (
    <main className="mx-auto max-w-[894px] p-8">
      <h1 className="mb-6 text-2xl font-bold">일반 이사 요청</h1>
      <div className="mb-6">
        <FilterBar
          filters={filters}
          selectedLabels={selectedLabels}
          onFilterChange={setFilters}
          onLabelChange={setSelectedLabels}
        />
      </div>

      <div className="space-y-6">
        {requests.length === 0 ? (
          <p className="text-center text-gray-400">요청이 없습니다.</p>
        ) : (
          requests.map((req) => (
            <MoverRequest
              key={req.id}
              customerName={req.customerName || "고객님"}
              description="빠르고 안전한 이사를 원해요"
              from={req.departure}
              to={req.destination}
              movingDate={new Date(req.moveDate).toLocaleDateString()}
              chips={[
                {
                  label:
                    req.serviceType === "SMALL"
                      ? "소형이사"
                      : req.serviceType === "FAMILY"
                        ? "가정이사"
                        : "사무실이사",
                  iconSrc: "/icons/ic_moving.svg",
                },
              ]}
              // isQuoted={quotedIds.includes(req.id)}
              action={
                req.myQuote ? (
                  req.myQuote.status === "PENDING" ? (
                    <div className="rounded border border-yellow-400 bg-yellow-50 px-4 py-2 font-semibold text-yellow-600">
                      고객 확인 중
                    </div>
                  ) : req.myQuote.status === "REJECTED" ? (
                    <div className="rounded border border-red-400 bg-red-50 px-4 py-2 font-semibold text-red-600">
                      다른 기사 선택됨
                    </div>
                  ) : req.myQuote.status === "ACCEPTED" ? (
                    <div className="rounded border border-green-400 bg-green-50 px-4 py-2 font-semibold text-green-600">
                      채택됨 🎉
                    </div>
                  ) : req.myQuote.status === "EXPIRED" ? (
                    <div className="rounded border border-gray-400 bg-gray-100 px-4 py-2 font-semibold text-gray-600">
                      만료됨
                    </div>
                  ) : null
                ) : (
                  <SendEstimateModal
                    trigger={
                      <button className="rounded bg-orange-500 px-4 py-2 text-white">
                        견적 보내기
                      </button>
                    }
                    customerName={req.customerName || "고객님"}
                    moveRequestId={req.id}
                    departure={req.departure}
                    destination={req.destination}
                    moveDate={req.moveDate}
                    chips={[
                      {
                        label:
                          req.serviceType === "SMALL"
                            ? "소형이사"
                            : req.serviceType === "FAMILY"
                              ? "가정이사"
                              : "사무실이사",
                        iconSrc: "/icons/ic_moving.svg",
                      },
                    ]}
                  />
                )
              }
            />
          ))
        )}
      </div>
      <div ref={observerRef} className="h-10" />
      {isFetchingNextPage && (
        <div className="mt-4 flex h-10 items-center justify-center">
          <Spinner className="h-5 w-5 border-orange-400 border-t-transparent" />
        </div>
      )}
    </main>
  );
}
