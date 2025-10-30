// app/myEstimates/[requestId]/quotes/[quoteId]/QuoteDetail.client.tsx
"use client";

import Image from "next/image";
import { useMemo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { acceptQuote } from "@/lib/quoteApi";
import { MY_REQUESTS_KEYS } from "@/lib/queries/myRequests";
import LikeCounter from "@/components/common/card/Mover/LikeCounter";
import { ServiceChip } from "@/components/common/chip";
import type { QuoteType, ServiceType } from "@/types/move";
import MoverName from "@/components/common/card/Mover/MoverName";
import MoverStats from "@/components/common/card/Mover/MoverStats";

type Detail = {
  id: number;
  price: number;
  comment: string | null;
  status: "PENDING" | "ACCEPTED" | "REJECTED" | "EXPIRED";
  type: QuoteType;
  createdAt: string;
  mover?: {
    id: number;
    nickname: string;
    // API에서 null/undefined로 올 수 있으니 선택 + nullable
    career?: string | number | null;
    averageRating?: number | null;
    totalReviews?: number | null;
    confirmedCount?: number; // 없을 수 있음 → 그대로 optional
    img?: string | null;
    _count?: { likes?: number };
  } | null;
  moveRequest?: {
    serviceType: ServiceType;
    departure: string;
    departureRegion?: string;
    destination: string;
    destinationRegion?: string;
    moveDate: string;
  } | null;
};

const svcMap: Record<ServiceType, { label: string; icon: string }> = {
  SMALL: { label: "소형이사", icon: "/icons/ic_box.svg" },
  FAMILY: { label: "가정이사", icon: "/icons/ic_home.svg" },
  OFFICE: { label: "사무실이사", icon: "/icons/ic_company.svg" },
};

const typeMap: Record<QuoteType, { label: string; icon: string }> = {
  NORMAL: { label: "일반 견적", icon: "/icons/ic_document.svg" },
  DIRECT: { label: "지정 견적", icon: "/icons/ic_document.svg" },
};

const fmtDate = (iso?: string) =>
  iso ? new Date(iso).toLocaleDateString("ko-KR") : "-";

export default function QuoteDetailClient({
  requestId,
  detail,
}: {
  requestId: number;
  detail: Detail;
}) {
  const qc = useQueryClient();

  const m = detail.mover!;
  const mr = detail.moveRequest!;
  const svc = svcMap[mr.serviceType];
  const typ = typeMap[detail.type];
  const careerYears =
    typeof m?.career === "number"
      ? m.career
      : Number(String(m?.career ?? "").match(/\d+/)?.[0] ?? 0);

  const createdAt = useMemo(
    () => fmtDate(detail.createdAt),
    [detail.createdAt],
  );
  const price = useMemo(
    () => (detail.price ?? 0).toLocaleString("ko-KR"),
    [detail.price],
  );

  const { mutate: confirm, isPending: confirming } = useMutation({
    mutationFn: () => acceptQuote(detail.id),
    onSuccess: async () => {
      await Promise.all([
        qc.invalidateQueries({ queryKey: ["quotes", "byRequest", requestId] }),
        qc.invalidateQueries({ queryKey: MY_REQUESTS_KEYS.active() }),
        qc.invalidateQueries({ queryKey: MY_REQUESTS_KEYS.closed() }),
      ]);
      location.href = "/myEstimates?tab=confirmed";
    },
    onError: (e: any) => {
      alert(e?.response?.data?.message ?? "견적 확정 중 오류가 발생했습니다.");
    },
  });

  return (
    <section className="relative">
      <div className="mx-auto h-[112px] max-w-[1120px] bg-[url('/assets/frame.svg')] bg-cover bg-center lg:h-[180px]" />
      <div className="mx-auto grid max-w-[1120px] grid-cols-1 gap-8 px-6 lg:grid-cols-[minmax(0,720px)_320px]">
        <div>
          <div className="flex">
            <div className="relative -mt-12 h-[64px] w-[64px] overflow-hidden rounded-2xl bg-white shadow-md lg:-mt-16 lg:h-[112px] lg:w-[112px]">
              <Image
                src={m?.img || "/assets/profile_mover_detail.svg"}
                alt={`${m?.nickname ?? ""} 프로필`}
                width={112}
                height={112}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="mt-3 flex gap-2">
            <ServiceChip iconSrc={svc.icon} size="sm">
              {svc.label}
            </ServiceChip>
            <ServiceChip iconSrc={typ.icon} size="sm">
              {typ.label}
            </ServiceChip>
          </div>

          <div className="relative mt-3">
            <p className="text-[18px] font-extrabold text-zinc-900">
              {detail.comment ?? "고객님의 물품을 안전하게 운송해 드립니다."}
            </p>
            <div className="absolute top-0 right-0 hidden items-center gap-2 text-sm text-zinc-500 sm:flex">
              <LikeCounter count={m?._count?.likes ?? 0} />
            </div>
          </div>

          <div className="mt-2 flex items-center gap-3 text-[18px] text-zinc-600 sm:text-[24px]">
            <MoverName MoverName={m?.nickname} />
            <MoverStats
              rating={m?.averageRating ?? 0}
              reviewCount={m?.totalReviews ?? 0}
              careerYears={careerYears}
              confirmedCount={m?.confirmedCount ?? 0}
              className="mt-1"
            />
          </div>

          <div className="mt-6 flex items-center gap-6">
            <span className="text-[16px] text-zinc-500 sm:text-[20px]">
              견적가
            </span>
            <span className="text-[20px] font-bold text-zinc-900 sm:text-[24px]">
              {price}원
            </span>
          </div>

          <section className="mt-10">
            <h3 className="mb-3 text-[20px] font-semibold text-zinc-900">
              견적 정보
            </h3>
            <div className="text-[14px] text-zinc-800 sm:grid-cols-2">
              <InfoRow label="견적 요청일" value={createdAt} />
              <InfoRow label="서비스" value={svc.label} />
              <InfoRow
                label="이용일"
                value={new Date(mr.moveDate).toLocaleString("ko-KR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              />
              <InfoRow
                label="출발지"
                value={`${mr.departure}${mr.departureRegion ? ` (${mr.departureRegion})` : ""}`}
              />
              <InfoRow
                label="도착지"
                value={`${mr.destination}${mr.destinationRegion ? ` (${mr.destinationRegion})` : ""}`}
              />
            </div>
          </section>
        </div>
        <aside className="flex w-full flex-col gap-4 lg:w-[320px]">
          <div className="relative w-full lg:p-6">
            <div className="text-[16px] font-bold sm:text-[20px]">
              견적서 공유하기
            </div>
            <div className="mt-3 flex gap-3">
              <IconButton
                ariaLabel="링크 복사"
                src="/icons/share-clip.svg"
                onClick={copyCurrentUrl}
              />
              <IconButton
                ariaLabel="카카오"
                src="/icons/share-kakao.svg"
                onClick={shareToKakao}
              />
              <IconButton
                ariaLabel="페이스북"
                src="/icons/share-facebook.svg"
                onClick={shareToFacebook}
              />
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between px-1 py-2 sm:justify-start">
      <span className="w-25 font-[16px] text-gray-400">{label}</span>
      <span className="font-[16px] text-zinc-900">{value}</span>
    </div>
  );
}

function getCurrentUrl() {
  if (typeof window === "undefined") return "";
  return window.location.href;
}
async function copyCurrentUrl() {
  const url = getCurrentUrl();
  try {
    await navigator.clipboard.writeText(url);
    alert("링크가 복사되었습니다.");
  } catch {
    const ta = document.createElement("textarea");
    ta.value = url;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
    alert("링크가 복사되었습니다.");
  }
}
function openPopup(href: string) {
  if (typeof window === "undefined") return;
  window.open(href, "_blank", "width=600,height=700,noopener,noreferrer");
}
async function shareToKakao() {
  const url = encodeURIComponent(getCurrentUrl());
  await copyCurrentUrl();
  openPopup(`https://story.kakao.com/share?url=${url}`);
}
async function shareToFacebook() {
  const url = encodeURIComponent(getCurrentUrl());
  await copyCurrentUrl();
  openPopup(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
}

function IconButton({
  ariaLabel,
  src,
  onClick,
  size = 48,
}: {
  ariaLabel: string;
  src: string;
  onClick: () => void | Promise<void>;
  size?: number;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={() => void onClick()}
      className="relative overflow-hidden rounded-xl border-none p-0 shadow-sm transition hover:bg-zinc-50 active:scale-95"
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt=""
        fill
        sizes={`${size}px`}
        className="object-cover"
        aria-hidden
        priority={false}
      />
    </button>
  );
}
