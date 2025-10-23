// app/reviews/Page.tsx
"use client";

import {
  useState,
  useMemo,
  useEffect,
  useRef,
  useCallback,
  type RefObject,
} from "react";
import { useWritableReviewCards } from "@/hooks/useWritableReviewCards";
import { useWrittenReviewCards } from "@/hooks/useWrittenReviewCards";
import { useCreateReview } from "@/hooks/useCreateReview";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import type { WrittenSort } from "@/hooks/useWrittenReviewCards";
import useMoverDescriptions from "@/hooks/useMoverDescriptions";
import ReviewCardSkeleton from "@/components/reviews/ReviewCardSkeleton";
import ReviewWriteCard from "@/components/common/card/ReviewWriteCard";
import ReviewWriteModal from "@/components/common/modal/ReviewWriteModal";
import ReviewWrittenCard from "@/components/common/card/ReviewWrittenCard";
import ReviewsHeader from "@/components/reviews/ReviewHeader";
import EmptyReviews from "@/components/reviews/EmptyReviews";
import { useQueryClient } from "@tanstack/react-query";

type TabKey = "writable" | "written";

export default function ReviewsPage() {
  const [active, setActive] = useState<TabKey>("writable");
  const [writtenSort, setWrittenSort] = useState<WrittenSort>("recent");
  const [writtenPage, setWrittenPage] = useState(1);
  const writtenPageSize = 10;

  return (
    <>
      <div className="border-t border-gray-200 bg-white md:-mt-px">
        <div className="mx-auto w-full max-w-6xl px-3 md:px-4">
          <ReviewsHeader
            active={active}
            onTab={setActive}
            showSort={active === "written"}
            sort={writtenSort}
            onChangeSort={(v) => {
              setWrittenSort(v as WrittenSort);
              setWrittenPage(1);
            }}
          />
        </div>
      </div>

      <section className="w-full bg-gray-50">
        <div className="mx-auto w-full max-w-6xl px-3 pt-4 pb-10 md:px-4 md:pt-6 md:pb-12">
          {active === "writable" ? (
            <WritableReviews />
          ) : (
            <WrittenReviews
              sort={writtenSort}
              page={writtenPage}
              pageSize={writtenPageSize}
              onChangePage={setWrittenPage}
              onGoWriteTab={() => setActive("writable")}
            />
          )}
        </div>
      </section>
    </>
  );
}
function WritableReviews() {
  const { items: allItems = [], isLoading } = useWritableReviewCards();
  const pageSize = 10;
  const [page, setPage] = useState(1);

  const visible = useMemo(
    () => allItems.slice(0, page * pageSize),
    [allItems, page],
  );
  const isEnd = visible.length >= allItems.length;

  const loadMore = useCallback(() => {
    if (!isLoading && !isEnd) setPage((p) => p + 1);
  }, [isLoading, isEnd]);

  const observerRef = useInfiniteScroll(loadMore, !isEnd);

  if (isLoading) return <ListSkeleton count={5} showPrice showButton />;
  if (!allItems.length) {
    return <EmptyReviews message="작성 가능한 리뷰가 없어요!" />;
  }

  return (
    <>
      <ul className="space-y-3 md:space-y-4">
        {visible.map((it: any) => (
          <li key={it.id}>
            <WritableItemRow it={it} />
          </li>
        ))}
      </ul>
      {!isEnd && <LoadMore refCb={observerRef} />}
    </>
  );
}
function WrittenReviews({
  sort,
  page,
  pageSize,
  onChangePage,
  onGoWriteTab,
}: {
  sort: WrittenSort;
  page: number;
  pageSize: number;
  onChangePage: (p: number) => void;
  onGoWriteTab: () => void;
}) {
  const { items: writtenItems, isLoading } = useWrittenReviewCards({
    page,
    pageSize,
    sort,
  });
  const { items: writableItems } = useWritableReviewCards();
  const { getDesc } = useMoverDescriptions({ writtenItems, writableItems });
  const [acc, setAcc] = useState<any[]>([]);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    if (!writtenItems) return;

    if (page === 1) {
      setAcc(writtenItems);
      setIsEnd((writtenItems?.length ?? 0) < pageSize);
    } else {
      setAcc((prev) => {
        const next = [...prev, ...(writtenItems ?? [])];
        const seen = new Set<string>();
        return next.filter((it) => {
          const key = String(it.reviewId ?? `${it.bookingId}-${it.moveDate}`);
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });
      });
      if ((writtenItems?.length ?? 0) < pageSize) setIsEnd(true);
    }
  }, [writtenItems, page, pageSize]);

  const loadMore = useCallback(() => {
    if (!isLoading && !isEnd && (writtenItems?.length ?? 0) >= pageSize) {
      onChangePage(page + 1);
    }
  }, [isLoading, isEnd, writtenItems, page, pageSize, onChangePage]);

  const observerRef = useInfiniteScroll(loadMore, !isEnd);

  if (isLoading && page === 1)
    return <ListSkeleton count={5} showPrice={false} showButton={false} />;

  if (!acc.length) {
    return (
      <EmptyReviews
        message="아직 등록된 리뷰가 없어요!"
        showWriteButton
        onAction={onGoWriteTab}
      />
    );
  }

  return (
    <>
      <ul className="space-y-3 md:space-y-4">
        {acc.map((it: any) => (
          <li key={it.reviewId ?? `${it.bookingId}-${it.moveDate}`}>
            <ReviewWrittenCard
              moverName={it.moverName}
              moverAvatarUrl={it.moverAvatarUrl}
              moverDescription={getDesc(it.moverId, it.moverDescription)}
              serviceLabel={it.serviceLabel}
              from={it.from}
              to={it.to}
              moveDate={it.moveDate}
              price={it.price ?? null}
              rating={it.rating ?? 0}
              comment={it.comment ?? ""}
            />
          </li>
        ))}
      </ul>
      {!isEnd && <LoadMore refCb={observerRef} />}
    </>
  );
}

function ListSkeleton({
  count,
  showPrice,
  showButton,
}: {
  count: number;
  showPrice?: boolean;
  showButton?: boolean;
}) {
  return (
    <ul className="space-y-3 md:space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <li key={i}>
          <ReviewCardSkeleton
            showPrice={!!showPrice}
            showButton={!!showButton}
          />
        </li>
      ))}
    </ul>
  );
}

type DivRef =
  | ((el: HTMLDivElement | null) => void)
  | RefObject<HTMLDivElement | null>;

function LoadMore({ refCb }: { refCb: DivRef }) {
  return (
    <>
      <div ref={refCb} className="h-6 md:h-8" />
      <div className="py-3 text-center text-gray-500 md:py-4">불러오는 중…</div>
    </>
  );
}

function WritableItemRow({ it }: { it: any }) {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const { mutate, isPending } = useCreateReview();
  const queryClient = useQueryClient();
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

  const moveTypes: Array<"small" | "family" | "office"> = [];
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
