// components/reviews/WritableItemRow.tsx
"use client";

import { useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateReview } from "@/hooks/useCreateReview";
import ReviewWriteCard from "@/components/common/card/ReviewWriteCard";
import ReviewWriteModal from "@/components/common/modal/ReviewWriteModal";

type MoveType = "small" | "family" | "office";

type WritableItem = {
  id?: string | number;
  bookingId?: string | number;
  moverName: string;
  moverAvatarUrl?: string;
  moverDescription?: string;
  serviceLabel: string; // "소형이사" | "가정이사" | "사무실이사"
  from: string;
  to: string;
  moveDate: string;
  price?: number;
};

export default function WritableItemRow({ it }: { it: WritableItem }) {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const { mutate, isPending } = useCreateReview();
  const queryClient = useQueryClient();

  const bookingId = String(it.bookingId ?? it.id ?? "");

  const handleSubmit = (content: string) => {
    mutate(
      { bookingId, rating, content: content.trim() },
      {
        onSuccess: async () => {
          setRating(0);
          setReviewText("");
          await queryClient.invalidateQueries({
            // writableReviews / writtenReviews 모두 갱신
            predicate: (q) =>
              (q.queryKey as any)?.includes?.("writableReviews") ||
              (q.queryKey as any)?.includes?.("writtenReviews"),
          });
          alert("리뷰가 등록되었습니다");
        },
        onError: () => {
          alert("리뷰 등록에 실패했어요. 잠시 후 다시 시도해 주세요.");
        },
      },
    );
  };

  const moveTypes: MoveType[] = [];
  if (it.serviceLabel === "소형이사") moveTypes.push("small");
  else if (it.serviceLabel === "가정이사") moveTypes.push("family");
  else if (it.serviceLabel === "사무실이사") moveTypes.push("office");

  return (
    <>
      <ReviewWriteCard
        moverName={it.moverName}
        moverAvatarUrl={it.moverAvatarUrl}
        moverDescription={it.moverDescription}
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
        moveTypes={moveTypes}
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
