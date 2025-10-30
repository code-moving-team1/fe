"use client";
import EstimateHistoryCard from "@/components/common/card/EstimateHistoryCard";
import WaitingRequestCard from "@/components/common/card/WaitingRequestCard";
import { ServiceChip } from "@/components/common/chip";
import { MY_REQUESTS_KEYS } from "@/lib/queries/myRequests";
import { useQuotesByRequest } from "@/lib/queries/quotes";
import { acceptQuote } from "@/lib/quoteApi";
import { useEstimatesTabStore } from "@/store/estimatesTabStore";
import type {
  MoveRequest,
  QuoteWithMover,
  ServiceType,
  QuoteType,
} from "@/types/move";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

const toYears = (s?: string) => {
  if (!s) return 0;
  const m = s.match(/\d+/);
  return m ? Number(m[0]) : 0;
};

const svcLabel: Record<ServiceType, string> = {
  SMALL: "소형 이사",
  FAMILY: "가정 이사",
  OFFICE: "사무실 이사",
};

const serviceChipMap: Record<ServiceType, { label: string; iconSrc: string }> =
  {
    SMALL: { label: "소형이사", iconSrc: "/icons/ic_box.svg" },
    FAMILY: { label: "가정이사", iconSrc: "/icons/ic_home.svg" },
    OFFICE: { label: "사무실이사", iconSrc: "/icons/ic_company.svg" },
  };

const quoteTypeChipMap: Record<QuoteType, { label: string; iconSrc: string }> =
  {
    NORMAL: { label: "일반 견적", iconSrc: "/icons/ic_moving.svg" },
    DIRECT: { label: "지정 견적", iconSrc: "/icons/ic_document.svg" },
  };

const fmtDate = (iso?: string) =>
  iso ? new Date(iso).toLocaleDateString("ko-KR") : "-";

export default function QuotesClient({ requestId }: { requestId: number }) {
  const router = useRouter();
  const qc = useQueryClient();
  const setTab = useEstimatesTabStore((s) => s.setTab);

  const { data, isPending, error } = useQuotesByRequest(requestId);

  const mrFromCache = useMemo(() => {
    const act = qc.getQueryData<MoveRequest[]>(MY_REQUESTS_KEYS.active()) ?? [];
    const cls = qc.getQueryData<MoveRequest[]>(MY_REQUESTS_KEYS.closed()) ?? [];
    return [...act, ...cls].find((r) => r.id === requestId);
  }, [qc, requestId]);

  const { mutate: confirm, isPending: confirming } = useMutation({
    mutationFn: (quoteId: number) => acceptQuote(quoteId),
    onSuccess: async () => {
      await Promise.all([
        qc.invalidateQueries({ queryKey: ["quotes", "byRequest", requestId] }),
        qc.invalidateQueries({ queryKey: MY_REQUESTS_KEYS.active() }),
        qc.invalidateQueries({ queryKey: MY_REQUESTS_KEYS.closed() }),
      ]);
      setTab("confirmed");
      router.replace("/myEstimates?tab=confirmed");
    },
    onError: (e: any) => {
      alert(e?.response?.data?.message ?? "견적 확정 중 오류가 발생했습니다.");
    },
  });
  if (isPending) return <div className="p-6">견적 로딩…</div>;
  if (error)
    return (
      <div className="p-6 text-red-600">에러: {(error as any).message}</div>
    );

  const items = data ?? [];
  const hasAccepted = items.some((q) => q.status === "ACCEPTED");
  const mr = mrFromCache;
  if (!mr) return null;
  const svc = serviceChipMap[mr.serviceType];

  return (
    <div className="space-y-3">
      {mr && (
        <section className="border-b-1 border-gray-200 p-4">
          <div className="mb-5 flex justify-between sm:mb-7">
            <div>
              <h1 className="text-[20px] font-bold sm:text-[24px]">
                견적 정보
              </h1>
              <p className="text-[12px] text-gray-500 sm:text-[14px]">
                견적 신청일: {fmtDate(mr.createdAt)}
              </p>
            </div>
            <ServiceChip iconSrc={svc.iconSrc} size="sm">
              {svc.label}
            </ServiceChip>
          </div>

          <div className="gap-2.5 sm:grid sm:grid-cols-3">
            <InfoItem
              label="출발지"
              value={`${mr.departure} (${mr.departureRegion})`}
            />
            <InfoItem
              label="도착지"
              value={`${mr.destination} (${mr.destinationRegion})`}
            />
            <InfoItem label="이용일" value={fmtDate(mr.moveDate)} />
          </div>
        </section>
      )}
      <div className="grid grid-cols-1 place-items-center gap-2 p-2 pt-[35px] lg:grid-cols-2">
        {hasAccepted
          ? items.map((q) => <HistoryCard key={q.id} q={q} />)
          : items.map((q) => (
              <QuoteCard
                key={q.id}
                q={q}
                onConfirm={() => confirm(q.id)}
                confirming={confirming}
                requestId={Number(requestId)}
              />
            ))}
      </div>
      {!items?.length && (
        <div className="text-gray-500">아직 등록된 견적이 없습니다.</div>
      )}
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between sm:flex-col">
      <div className="text-[14px] text-gray-500">{label}</div>
      <div className="text-[14px] font-bold sm:text-[18px]">{value}</div>
    </div>
  );
}

function QuoteCard({
  q,
  onConfirm,
  confirming,
  requestId,
}: {
  q: QuoteWithMover;
  onConfirm: () => void;
  confirming: boolean;
  requestId?: number;
}) {
  const router = useRouter();
  const m = q.mover;

  const svc = q.moveRequest?.serviceType;
  const chips = [
    svc ? serviceChipMap[svc] : null,
    quoteTypeChipMap[q.type],
  ].filter(Boolean) as { label: string; iconSrc: string }[];

  return (
    <WaitingRequestCard
      // 기사 정보 (백엔드 조인 결과 사용)
      driverName={m.nickname}
      description={q.comment ?? ""}
      avatarUrl={m.img}
      rating={m.averageRating ?? 0}
      reviewCount={m.totalReviews ?? 0}
      careerYears={toYears(m.career)}
      confirmedCount={m._count?.bookings ?? 0}
      likeCount={m._count?.likes ?? 0}
      price={q.price}
      comment={q.comment ?? ""}
      moveType="-"
      requestType={q.type}
      className="w-full"
      onConfirm={onConfirm}
      confirmDisabled={q.status !== "PENDING"}
      confirmLoading={confirming}
      chips={chips}
      onViewDetail={() =>
        router.push(`/myEstimates/${requestId}/quotes/${q.id}`)
      }
    />
  );
}

function HistoryCard({ q }: { q: QuoteWithMover }) {
  const m = q.mover;
  return (
    <EstimateHistoryCard
      message={q.comment ?? ""}
      driverName={m.nickname}
      avatarUrl={m.img}
      rating={m.averageRating ?? 0}
      reviewCount={m.totalReviews ?? 0}
      careerYears={toYears(m.career)}
      confirmedCount={m._count?.bookings ?? 0}
      liked={m._count?.likes ?? 0}
      price={q.price}
      status={q.status === "ACCEPTED" ? "confirmed" : "waiting"}
      serviceType={q.moveRequest?.serviceType}
      quoteType={q.type}
      className="w-full"
    />
  );
}
