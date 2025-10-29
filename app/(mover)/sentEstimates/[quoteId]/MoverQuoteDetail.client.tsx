// app/(mover)/sentEstimates/[quoteId]/MoverQuoteDetail.client.tsx
"use client";

import EstimateStatus from "@/components/common/card/EstimateStatus";
import { ServiceChip } from "@/components/common/chip";
import Image from "next/image";

type ServiceType = "SMALL" | "FAMILY" | "OFFICE";
type QuoteType = "NORMAL" | "DIRECT";
type QuoteStatus = "PENDING" | "ACCEPTED" | "REJECTED" | "EXPIRED";

type Detail = {
  id: number;
  price: number;
  comment: string | null;
  status: QuoteStatus;
  type: QuoteType;
  createdAt: string;
  moveRequest: {
    id: number;
    customerName?: string | null;
    serviceType: ServiceType;
    moveDate: string;
    departure: string;
    departureRegion?: string | null;
    destination: string;
    destinationRegion?: string | null;
    status?: string;
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

export default function MoverQuoteDetailClient({ detail }: { detail: Detail }) {
  console.log("[quote detail]", detail);
  const mr = detail.moveRequest;
  if (!mr) return null; // 혹은 적절한 fallback UI
  const svc = svcMap[mr.serviceType];
  const typ = typeMap[detail.type];

  const price = (detail.price ?? 0).toLocaleString("ko-KR");
  const createdAt = fmtDate(detail.createdAt);
  const moveDate = mr?.moveDate
    ? new Date(mr.moveDate).toLocaleString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "-";

  const isConfirmed = detail.status === "ACCEPTED";

  return (
    <section className="relative mx-auto max-w-[1120px] p-8">
      <h1 className="font-pretendard mb-[32px] text-[18px] font-bold lg:text-[24px]">
        견적 상세
      </h1>
      <div className="mx-auto h-[122px] max-w-[1120px] bg-[url('/assets/frame.svg')] bg-cover bg-center lg:h-[180px]" />

      <div className="mx-auto mt-12 grid max-w-[1120px] grid-cols-1 gap-8 px-6 lg:grid-cols-[minmax(0,720px)_320px]">
        <div>
          <div className="relative -mt-10 flex items-center gap-4">
            <div className="w-full">
              <div className="flex w-full items-center justify-between">
                <div className="mt-[20px] mb-[20px] flex gap-2">
                  <ServiceChip iconSrc={svc.icon} size="sm">
                    {svc.label}
                  </ServiceChip>
                  <ServiceChip iconSrc={typ.icon} size="sm">
                    {typ.label}
                  </ServiceChip>
                </div>
                <EstimateStatus
                  status={isConfirmed ? "confirmed" : "waiting"}
                />
              </div>
              <p className="text-[18px] font-extrabold text-zinc-900 md:text-[24px]">
                {detail.moveRequest?.customerName
                  ? `${detail.moveRequest.customerName} 고객님`
                  : "고객님"}
              </p>
            </div>
          </div>
          <div className="order-zinc-200 mt-[27px] mb-[27px] border border-zinc-200" />
          <div>
            <div className="flex items-center justify-start">
              <span className="mr-[61px] text-[16px] text-zinc-500 md:text-[20px]">
                견적가
              </span>
              <span className="text-[20px] font-bold text-zinc-900 md:text-[24px]">
                {price}원
              </span>
            </div>
            {detail.comment && (
              <p className="mt-4 text-[15px] whitespace-pre-wrap text-zinc-800">
                {detail.comment}
              </p>
            )}
          </div>
          <div className="order-zinc-200 mt-[27px] mb-[27px] border border-zinc-200" />
          <section>
            <h3 className="mb-3 text-[16px] font-semibold text-zinc-900 md:text-[20px]">
              견적 정보
            </h3>
            <div>
              <InfoRow label="견적 요청일" value={createdAt} />
              <InfoRow label="서비스" value={svc.label} />
              <InfoRow label="이용일" value={moveDate} />
              <InfoRow
                label="출발지"
                value={
                  mr
                    ? `${mr.departure}${
                        mr.departureRegion ? ` (${mr.departureRegion})` : ""
                      }`
                    : "-"
                }
              />
              <InfoRow
                label="도착지"
                value={
                  mr
                    ? `${mr.destination}${
                        mr.destinationRegion ? ` (${mr.destinationRegion})` : ""
                      }`
                    : "-"
                }
              />
              <InfoRow label="상태" value={koStatus(detail.status)} />
            </div>
          </section>
        </div>

        <aside className="flex w-full flex-col gap-4 lg:w-[320px]">
          <div className="w-full lg:p-6">
            <div className="text-[16px] font-bold md:text-[20px]">
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
    <div className="flex items-center justify-between px-1 py-2 md:justify-start">
      <span className="w-24 shrink-0 font-[16px] text-gray-400">{label}</span>
      <span className="font-[16px] text-zinc-900">{value}</span>
    </div>
  );
}

function koStatus(s: QuoteStatus) {
  switch (s) {
    case "PENDING":
      return "대기";
    case "ACCEPTED":
      return "채택됨";
    case "REJECTED":
      return "반려됨";
    case "EXPIRED":
      return "만료";
    default:
      return s;
  }
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
