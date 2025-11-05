"use client";

import Link from "next/link";
import CardHeaderMover from "@/components/common/card/CardMover";

const SERVICE_LABELS: Record<string, string> = {
  SMALL: "소형이사",
  FAMILY: "가정이사",
  OFFICE: "사무실이사",
};

function toNum(v: unknown, fallback = 0) {
  if (typeof v === "number") return Number.isFinite(v) ? v : fallback;
  if (typeof v === "string") {
    const n = parseInt(v.replace(/[^\d\-]/g, ""), 10);
    return Number.isFinite(n) ? n : fallback;
  }
  return fallback;
}

function normalize(m: any) {
  
  const driverName =
    m.name?.length > 10 ? `${m.name.substring(0, 10)}…` : m.name;

  const introduction =
    m.introduction?.length > 30
      ? `${m.introduction.substring(0, 20)}…`
      : m.introduction;
  const description =
    m.description?.length > 30
      ? `${m.description.substring(0, 25)}…`
      : m.description;

  const avatarUrl = (m.img ?? m.avatarUrl ?? "/assets/profile_mover_detail.svg")
    .toString()
    .trim();

  const rating = toNum(m.averageRating ?? m.rating, 0);
  const reviewCount = toNum(m._count?.reviews ?? m.reviews, 0);

  const careerYears = toNum(
    m.careerYears ?? m.career ?? m.experienceYears ?? m.years,
    0,
  );

  const confirmedCount = toNum(m._count?.quotes ?? m.confirmedCount, 0);
  const likeCount = toNum(m._count?.likes ?? m.likes, 0);

  const raw =
    (Array.isArray(m?.services) && m.services) ||
    (Array.isArray(m?.moverServiceTypes) && m.moverServiceTypes) ||
    [];
  const services: string[] = (raw as any[])
    .map((s) => (typeof s === "string" ? s : s?.serviceType))
    .filter(Boolean)
    .map((code: string) => SERVICE_LABELS[code] ?? code);

  return {
    driverName,
    introduction,
    description,
    avatarUrl,
    rating,
    reviewCount,
    careerYears, // ← 카드에 넘길 값
    confirmedCount,
    likeCount,
    services,
  };
}

type GridProps = {
  items: any[];
  page: number;
  totalPages: number;
  isFetching?: boolean;
  onPrev: () => void;
  onNext: () => void;
};

export default function Grid({
  items,
  page,
  totalPages,
  isFetching = false,
  onPrev,
  onNext,
}: GridProps) {
  return (
    <div className="mt-6">
      {(!items || items.length === 0) && (
        <div className="rounded-xl border border-zinc-200 bg-white p-4 text-center text-zinc-500">
          조건에 맞는 기사님을 찾지 못했어요.
        </div>
      )}

      <div className="flex flex-col gap-3">
        {items?.map((m: any) => {
          const n = normalize(m);
          const id = (m as any).id;
          return (
            <Link
              key={id}
              href={`/movers/${id}`}
              className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm"
            >
              <CardHeaderMover
                driverName={n.driverName}
                introduction={n.introduction}
                description={n.description}
                avatarUrl={n.avatarUrl}
                rating={n.rating}
                reviewCount={n.reviewCount}
                careerYears={n.careerYears}
                confirmedCount={n.confirmedCount}
                likeCount={n.likeCount}
                services={n.services}
                showPrice={false}
                className=""
              />
            </Link>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        <button
          onClick={onPrev}
          disabled={page <= 1}
          className="h-9 min-w-9 rounded-md border border-zinc-200 bg-white px-3 disabled:opacity-50"
        >
          이전
        </button>
        <span className="text-sm text-zinc-600">
          {page} / {totalPages || 1}
        </span>
        <button
          onClick={onNext}
          disabled={page >= (totalPages || 1)}
          className="h-9 min-w-9 rounded-md border border-zinc-200 bg-white px-3 disabled:opacity-50"
        >
          다음
        </button>
      </div>

      {isFetching && (
        <div className="mt-2 text-center text-zinc-500">불러오는 중…</div>
      )}
    </div>
  );
}
