// app/requests/_NomalList.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { fetchMoveRequests, MoveRequestFilter } from "@/lib/api/moveRequest";
import { moveRequestsKey } from "@/lib/queries/requestKeys"; // 그대로 둠
import FilterBar from "@/components/filter/FilterBar";
import MoverRequest from "@/components/common/card/MoverRequestCard";
import SendEstimateModal from "@/components/common/modal/SendEstimateModal";
import { Spinner } from "@/components/common/spinner/Spinner";
import { formatDateSeoul } from "@/utils/formatDateSeoul";
import { Buttons } from "@/components/common/button";
import { PendingButton } from "@/components/common/button/Buttons";
import dayjs from "dayjs";

const fmtDate = (input?: string | number | null) => {
  if (!input) return "-";

  if (
    typeof input === "string" &&
    input.includes("년") &&
    input.includes("월")
  ) {
    return input;
  }

  const normalized =
    typeof input === "string" &&
    /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}(:\d{2})?$/.test(input)
      ? input.replace(" ", "T")
      : input;

  const d = dayjs(normalized as any);
  return d.isValid() ? d.format("YYYY.MM.DD") : "-";
};

export default function NormalList({
  initialFilters,
}: {
  initialFilters: MoveRequestFilter;
}) {
  const [filters, setFilters] = useState(initialFilters);
  const [selectedLabels, setSelectedLabels] = useState({
    from: "출발 지역",
    to: "도착 지역",
    service: "서비스",
    sort: "정렬",
  });

  // page/pageSize만 제외하고 나머지 필드를 queryKey에 사용(타입 안전, 필터 즉시 반영)
  const { page: _page, pageSize: _pageSize, ...keyFilters } = filters;

  // 필터 변경 시 1페이지부터 다시 조회
  const handleFilterChange = (next: MoveRequestFilter) => {
    setFilters({ ...next, page: 1 });
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    // queryKey에 keyFilters 포함 → 필터가 바뀌면 키가 바뀌고 즉시 refetch
    //             page는 pageParam으로만 관리
    queryKey: ["move-requests", keyFilters, _pageSize ?? 5],
    queryFn: ({ pageParam = 1 }) =>
      fetchMoveRequests({ ...filters, page: pageParam }),
    getNextPageParam: (last) => {
      const { page, totalPages } = last.meta;
      return page < totalPages ? page + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 30_000,
    // (선택) 필터 바뀔 때 이전 페이지 데이터 유지해 깜빡임 최소화
    placeholderData: (prev) => prev,
  });

  useEffect(() => {}, [filters]);

  const observerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const ob = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) fetchNextPage();
    });
    if (observerRef.current) ob.observe(observerRef.current);
    return () => ob.disconnect();
  }, [fetchNextPage, hasNextPage]);

  // 전체 리턴을 막고 리스트 영역만 로딩/에러 표시 (FilterBar는 항상 보이게)
  const isInitialLoading = isLoading && !data;
  const isInitialError = isError && !data;

  const requests = data?.pages.flatMap((p) => p.data) ?? [];

  return (
    // 컨테이너: 가운데 정렬 + 모바일 좌우 패딩, 데스크탑은 0
    <section className="container mx-auto max-w-[1100px] min-w-[412px] space-y-6 px-4 sm:px-6 lg:px-0">
      <div className="mb-2">
        <FilterBar
          filters={filters}
          selectedLabels={selectedLabels}
          onFilterChange={handleFilterChange} // 수정
          onLabelChange={setSelectedLabels}
        />
      </div>

      {isInitialError && (
        <p className="text-center text-red-500">데이터 로드 실패</p>
      )}

      {isInitialLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-28 animate-pulse rounded-2xl border border-zinc-200 bg-zinc-50"
            />
          ))}
        </div>
      ) : requests.length === 0 ? (
        <p className="text-center text-gray-400">요청이 없습니다.</p>
      ) : (
        requests.map((req) => (
          <div
            key={req.id}
            className="max-md:[&>div]:flex-col max-md:[&>div]:items-stretch max-md:[&>div]:gap-3 max-md:[&>div]:p-4 max-md:[&>div>div:last-child]:self-end"
          >
            <MoverRequest
              customerName={req.customerName || "고객님"}
              description={req.description?.trim()}
              from={req.departure}
              to={req.destination}
              movingDate={fmtDate(req.moveDate)}
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
              action={
                req.moveRequest ? (
                  req.moveRequest.status === "PENDING" ? (
                    <PendingButton className="w-full md:w-auto">
                      고객 확인 중
                    </PendingButton>
                  ) : req.moveRequest.status === "REJECTED" ? (
                    <Buttons
                      variant="outline"
                      size="lg"
                      className="w-full rounded-2xl border-green-400 bg-green-50 px-4 py-2 font-semibold text-green-600 md:w-auto"
                    >
                      다른 기사 선택됨
                    </Buttons>
                  ) : req.moveRequest.status === "ACCEPTED" ? (
                    <Buttons
                      variant="outline"
                      size="lg"
                      className="w-full rounded-2xl border-green-400 bg-green-50 px-4 py-2 font-semibold text-green-600 md:w-auto"
                    >
                      채택됨 🎉
                    </Buttons>
                  ) : req.moveRequest.status === "EXPIRED" ? (
                    <Buttons
                      variant="outline"
                      size="lg"
                      className="w-full rounded-2xl border-gray-400 bg-gray-100 px-4 py-2 font-semibold text-gray-600 md:w-auto"
                    >
                      만료됨
                    </Buttons>
                  ) : null
                ) : (
                  <SendEstimateModal
                    trigger={
                      <Buttons
                        variant="solid"
                        color="primary"
                        size="lg"
                        flat
                        className="w-full md:w-auto"
                      >
                        견적 보내기
                      </Buttons>
                    }
                    customerName={req.customerName || "고객님"}
                    moveRequestId={req.id}
                    departure={req.departure}
                    destination={req.destination}
                    moveDate={req.moveDate}
                    quoteType="NORMAL"
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
          </div>
        ))
      )}

      <div ref={observerRef} className="h-10" />
      {isFetchingNextPage && (
        <div className="mt-4 flex h-10 items-center justify-center">
          <Spinner className="h-5 w-5 border-orange-400 border-t-transparent" />
        </div>
      )}
    </section>
  );
}
