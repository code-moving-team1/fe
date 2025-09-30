"use client";

import { useEffect, useState } from "react";
import {
  fetchMoveRequests,
  MoveRequestFilter,
  MoveRequestItem,
} from "@/lib/api/moveRequest";
import FilterBar from "@/components/filter/FilterBar";
import MoverRequest from "@/components/common/card/MoverRequestCard";
import api from "@/lib/api/axiosClient";
import { useMe } from "@/hooks/useAuth";

export default function MoverRequestPage() {
  const { data: me } = useMe();
  const [filters, setFilters] = useState<MoveRequestFilter>({
    page: 1,
    pageSize: 10,
  });
  const [requests, setRequests] = useState<MoveRequestItem[]>([]);
  const [quotedIds, setQuotedIds] = useState<number[]>([]);

  useEffect(() => {
    if (!me || !("career" in me)) return;
    const moverId = me.id;

    const load = async () => {
      try {
        const res = await fetchMoveRequests(filters);
        setRequests(res.data);

        // const quoteRes = await api.get(`/quote/mover/${moverId}`);
        // const myQuotedRequestIds = quoteRes.data.map(
        //   (q: any) => q.moveRequestId,
        // );
        // setQuotedIds(myQuotedRequestIds);
      } catch (err) {
        console.error("데이터 불러오기 실패:", err);
      }
    };
    load();
  }, [filters, me]);

  const handleQuote = async (id: number) => {
    try {
      await api.post(`/quote/move-requests/${id}`, {
        price: 150000,
        comment: "빠르고 안전한 이사 보장",
        type: "NORMAL",
      });
      alert("견적이 성공적으로 전송되었습니다.");
      setQuotedIds((prev) => [...prev, id]);
    } catch (err: any) {
      if (err.response?.status === 409) {
        alert("이미 견적을 보냈습니다.");
        setQuotedIds((prev) => [...prev, id]);
      } else {
        console.error("견적 전송 실패:", err);
        alert("견적 전송 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <main className="mx-auto max-w-[894px] p-8">
      <h1 className="mb-6 text-2xl font-bold">일반 이사 요청</h1>
      <div className="mb-6">
        <FilterBar onFilterChange={setFilters} />
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
              onClick={
                quotedIds.includes(req.id)
                  ? undefined
                  : () => handleQuote(req.id)
              }
            />
          ))
        )}
      </div>
    </main>
  );
}
