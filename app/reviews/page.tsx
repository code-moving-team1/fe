"use client";

import { useState, useEffect, useRef } from "react";
import { useWritableReviewCards } from "@/hooks/useWritableReviewCards";
import { useWrittenReviewCards } from "@/hooks/useWrittenReviewCards";
import { useCreateReview } from "@/hooks/useCreateReview";
import { useQueryClient } from "@tanstack/react-query";
import ReviewWriteCard from "@/components/common/card/ReviewWriteCard";
import ReviewWriteModal from "@/components/common/modal/ReviewWriteModal";
import ReviewWrittenCard from "@/components/common/card/ReviewWrittenCard"; // ✅ 추가

type TabKey = "writable" | "written";

const CONTAINER = "mx-auto w/full max-w-6xl px-4".replace("/", "/"); // (same string; keep as-is)
const TABS: { key: TabKey; label: string }[] = [
  { key: "writable", label: "작성 가능한 리뷰" },
  { key: "written", label: "내가 작성한 리뷰" },
];

export default function ReviewsPage() {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState<TabKey>("writable");
  useEffect(() => setMounted(true), []);

  return (
    <>
      <div className="-mt-px border-t border-gray-200 bg-white">
        <div className={CONTAINER}>
          <nav className="flex gap-12">
            {TABS.map((t) => {
              const on = active === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => setActive(t.key)}
                  aria-current={on ? "page" : undefined}
                  className={`relative cursor-pointer py-6 text-[17px] font-semibold ${
                    on ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <span className="relative inline-block pb-2">
                    {t.label}
                    {on && (
                      <span className="absolute bottom-0 left-1/2 h-[2px] w-24 -translate-x-1/2 rounded-full bg-gray-900" />
                    )}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      <section className="w-full bg-gray-50">
        <div className={`${CONTAINER} pt-6 pb-12`}>
          {active === "writable" ? <WritableReviews /> : <WrittenReviews />}
        </div>
      </section>
    </>
  );
}

function WritableReviews() {
  const { items, isLoading } = useWritableReviewCards();

  if (isLoading) return <div className="p-6">불러오는 중…</div>;

  return (
    <ul className="space-y-4">
      {items.map((it: any) => (
        <li key={it.id}>
          <WritableItemRow it={it} />
        </li>
      ))}
    </ul>
  );
}

function WrittenReviews() {
  const { items, isLoading } = useWrittenReviewCards();

  if (isLoading) return <div className="p-6">불러오는 중…</div>;
  if (!items.length)
    return (
      <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-gray-600">
        아직 작성한 리뷰가 없습니다.
      </div>
    );

  return (
    <ul className="space-y-4">
      {items.map((it: any) => (
        <li key={it.reviewId ?? `${it.bookingId}-${it.moveDate}`}>
          {/* ✅ ReviewWrittenCard로 교체 */}
          <ReviewWrittenCard
            moverName={it.moverName}
            moverAvatarUrl={it.moverAvatarUrl}
            serviceLabel={it.serviceLabel}
            from={it.from}
            to={it.to}
            moveDate={it.moveDate}
            price={it.price ?? null}
            rating={it.rating ?? 0}
            comment={it.comment ?? ""} // ← 훅에서 comment로 정리
          />
        </li>
      ))}
    </ul>
  );
}

function WritableItemRow({ it }: { it: any }) {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const { mutate, isPending } = useCreateReview();
  const queryClient = useQueryClient();
  const chips: ("small" | "designated")[] = [];

  if (it.serviceLabel === "소형이사") {
    chips.push("small");
  } else {
    chips.push("designated");
  }

  const bookingId = it.bookingId ?? it.id;

  const handleSubmit = (content: string) => {
    mutate(
      { bookingId, rating, content: content.trim() },
      {
        onSuccess: async () => {
          setRating(0);
          setReviewText("");
          await queryClient.invalidateQueries({
            predicate: (q) =>
              q.queryKey?.includes?.("writableReviews") ||
              q.queryKey?.includes?.("writtenReviews"),
          });
          alert("리뷰가 등록되었습니다");
        },
        onError: () => {
          alert("리뷰 등록에 실패했어요. 잠시 후 다시 시도해 주세요.");
        },
      },
    );
  };

  return (
    <>
      <ReviewWriteCard
        moverName={it.moverName}
        moverAvatarUrl={it.moverAvatarUrl}
        serviceLabel={it.serviceLabel}
        from={it.from}
        to={it.to}
        moveDate={it.moveDate}
        price={it.price}
        onWrite={() => triggerRef.current?.click()}
      />

      <ReviewWriteModal
        trigger={
          <button
            ref={triggerRef}
            type="button"
            style={{ display: "none" }}
            aria-hidden
            tabIndex={-1}
          />
        }
        moverName={it.moverName}
        moverAvatarSrc={it.moverAvatarUrl}
        moveTypes={["small", "designated"]}
        fromAddress={it.from}
        toAddress={it.to}
        moveDateText={it.moveDate}
        rating={rating}
        onChangeRating={setRating}
        reviewText={reviewText}
        onChangeReviewText={setReviewText}
        onSubmit={handleSubmit}
        submitting={isPending}
      />
    </>
  );
}
