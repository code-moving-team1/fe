"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useWritableReviewCards } from "@/hooks/useWritableReviewCards";
import { useWrittenReviewCards } from "@/hooks/useWrittenReviewCards";
import { useCreateReview } from "@/hooks/useCreateReview";
import { useQueryClient, useQueries } from "@tanstack/react-query";
import ReviewWriteCard from "@/components/common/card/ReviewWriteCard";
import ReviewWriteModal from "@/components/common/modal/ReviewWriteModal";
import ReviewWrittenCard from "@/components/common/card/ReviewWrittenCard";
import { getMoverDetail } from "@/lib/api/mover";
import type { WrittenSort } from "@/hooks/useWrittenReviewCards";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

type TabKey = "writable" | "written";

const CONTAINER = "mx-auto w-full max-w-6xl px-4";
const TABS: { key: TabKey; label: string }[] = [
  { key: "writable", label: "작성 가능한 리뷰" },
  { key: "written", label: "내가 작성한 리뷰" },
];

export default function ReviewsPage() {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState<TabKey>("writable");
  useEffect(() => setMounted(true), []);

  const [writtenSort, setWrittenSort] = useState<WrittenSort>("recent");
  const [writtenPage, setWrittenPage] = useState(1);
  const writtenPageSize = 10;

  return (
    <>
      <div className="-mt-px border-t border-gray-200 bg-white">
        <div className={CONTAINER}>
          <nav className="flex items-center justify-between gap-12">
            <div className="flex gap-12">
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
            </div>

            {active === "written" && (
              <div className="flex items-center gap-2">
                <select
                  className="h-9 rounded-md border border-gray-300 bg-white px-3 text-sm"
                  value={writtenSort}
                  onChange={(e) => {
                    setWrittenSort(e.target.value as WrittenSort);
                    setWrittenPage(1);
                  }}
                >
                  <option value="recent">리뷰 등록 최신순</option>
                  <option value="oldest">리뷰 등록 오래된순</option>
                  <option value="rating_desc">평점 높은순</option>
                  <option value="rating_asc">평점 낮은순</option>
                </select>
              </div>
            )}
          </nav>
        </div>
      </div>

      <section className="w-full bg-gray-50">
        <div className={`${CONTAINER} pt-6 pb-12`}>
          {active === "writable" ? (
            <WritableReviews />
          ) : (
            <WrittenReviews
              sort={writtenSort}
              page={writtenPage}
              pageSize={writtenPageSize}
              onChangePage={setWrittenPage}
            />
          )}
        </div>
      </section>
    </>
  );
}

function SkeletonReviewCard() {
  return (
    <div className="animate-pulse rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <div className="h-[80px] w-[80px] rounded-2xl bg-gray-200" />
          <div className="mt-1 flex flex-col gap-2">
            <div className="h-5 w-[180px] rounded bg-gray-200" />
            <div className="h-4 w-[520px] rounded bg-gray-200" />
            <div className="mt-1 flex gap-2">
              <div className="h-7 w-[84px] rounded-full bg-gray-200" />
            </div>
          </div>
        </div>
        <div className="mt-5 ml-auto flex flex-col items-end">
          <div className="h-4 w-[60px] rounded bg-gray-200" />
          <div className="mt-2 h-7 w-[140px] rounded bg-gray-200" />
        </div>
      </div>

      <hr className="my-4 border-gray-200" />

      <div className="mt-4 flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div>
            <div className="mb-1 h-3 w-12 rounded bg-gray-200" />
            <div className="h-4 w-[150px] rounded bg-gray-200" />
          </div>
          <div className="mt-4 h-4 w-4 rounded bg-gray-200" />
          <div>
            <div className="mb-1 h-3 w-12 rounded bg-gray-200" />
            <div className="h-4 w-[150px] rounded bg-gray-200" />
          </div>
          <div>
            <div className="mb-1 h-3 w-12 rounded bg-gray-200" />
            <div className="h-5 w-[120px] rounded bg-gray-200" />
          </div>
        </div>

        <div className="flex flex-col items-end gap-3">
          <div className="h-10 w-[100px] rounded-lg bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

function SkeletonWrittenReviewCard() {
  return (
    <div className="animate-pulse rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <div className="h-[80px] w-[80px] rounded-2xl bg-gray-200" />
          <div className="mt-1 flex flex-col gap-2">
            <div className="h-5 w-[180px] rounded bg-gray-200" />
            <div className="h-4 w-[520px] rounded bg-gray-200" />
            <div className="mt-1 flex gap-2">
              <div className="h-7 w-[84px] rounded-full bg-gray-200" />
            </div>
          </div>
        </div>
      </div>

      <hr className="my-4 border-gray-200" />

      <div className="mt-4 flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div>
            <div className="mb-1 h-3 w-12 rounded bg-gray-200" />
            <div className="h-4 w-[150px] rounded bg-gray-200" />
          </div>
          <div className="mt-4 h-4 w-4 rounded bg-gray-200" />
          <div>
            <div className="mb-1 h-3 w-12 rounded bg-gray-200" />
            <div className="h-4 w-[150px] rounded bg-gray-200" />
          </div>
          <div>
            <div className="mb-1 h-3 w-12 rounded bg-gray-200" />
            <div className="h-5 w-[120px] rounded bg-gray-200" />
          </div>
        </div>
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-center gap-2">
          <div className="h-4 w-[150px] rounded bg-gray-200" />
          <div className="h-4 w-8 rounded bg-gray-200" />
        </div>

        <div className="mt-4 space-y-2">
          <div className="h-4 w-[80%] rounded bg-gray-200" />
          <div className="h-4 w-[70%] rounded bg-gray-200" />
          <div className="h-4 w-[60%] rounded bg-gray-200" />
        </div>
      </div>
    </div>
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

  if (isLoading)
    return (
      <ul className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <li key={i}>
            <SkeletonReviewCard />
          </li>
        ))}
      </ul>
    );

  if (!allItems.length)
    return (
      <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-gray-600">
        작성 가능한 리뷰가 없습니다.
      </div>
    );

  return (
    <>
      <ul className="space-y-4">
        {visible.map((it: any) => (
          <li key={it.id}>
            <WritableItemRow it={it} />
          </li>
        ))}
      </ul>

      {!isEnd && <div ref={observerRef} className="h-8" />}
      {!isEnd && page > 1 && (
        <div className="py-4 text-center text-gray-500">불러오는 중…</div>
      )}
    </>
  );
}

function WrittenReviews({
  sort = "recent",
  page = 1,
  pageSize = 10,
  onChangePage,
}: {
  sort?: WrittenSort;
  page?: number;
  pageSize?: number;
  onChangePage?: (p: number) => void;
}) {
  const { items: writtenItems, isLoading } = useWrittenReviewCards({
    page,
    pageSize,
    sort,
  });
  const { items: writableItems } = useWritableReviewCards();

  const descByMoverId = useMemo(() => {
    const map = new Map<string | number, string>();
    for (const w of writableItems ?? []) {
      if (
        w?.moverId &&
        typeof w.moverDescription === "string" &&
        w.moverDescription.trim()
      ) {
        map.set(w.moverId, w.moverDescription.trim());
      }
    }
    return map;
  }, [writableItems]);

  const missingDescIds = useMemo(() => {
    const ids: (string | number)[] = [];
    for (const it of writtenItems ?? []) {
      const hasWritten =
        typeof it.moverDescription === "string" && it.moverDescription.trim();
      if (!hasWritten && it?.moverId && !descByMoverId.has(it.moverId)) {
        ids.push(it.moverId);
      }
    }
    return Array.from(new Set(ids));
  }, [writtenItems, descByMoverId]);

  const detailQueries = useQueries({
    queries: missingDescIds.map((id) => ({
      queryKey: ["mover", id],
      queryFn: () => getMoverDetail(String(id)),
      staleTime: 5 * 60 * 1000,
    })),
  });

  const profileDescById = useMemo(() => {
    const map = new Map<string | number, string>();
    detailQueries.forEach((q, idx) => {
      const id = missingDescIds[idx];
      const d: any = q.data;
      const desc = [d?.introduction, d?.description]
        .filter((v) => typeof v === "string" && v.trim())
        .join(" ");
      if (desc) map.set(id, desc);
    });
    return map;
  }, [detailQueries, missingDescIds]);

  const [acc, setAcc] = useState<any[]>([]);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    if (!writtenItems) return;

    if (page === 1) {
      setAcc(writtenItems);
      setIsEnd(writtenItems.length < pageSize);
    } else {
      const next = [...acc, ...writtenItems];
      const seen = new Set<string>();
      const deduped = next.filter((it) => {
        const key = String(it.reviewId ?? `${it.bookingId}-${it.moveDate}`);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
      setAcc(deduped);
      if (writtenItems.length < pageSize) setIsEnd(true);
    }
  }, [writtenItems, page, pageSize]);

  const loadMore = useCallback(() => {
    if (!isLoading && !isEnd && (writtenItems?.length ?? 0) >= pageSize) {
      onChangePage?.(page + 1);
    }
  }, [isLoading, isEnd, writtenItems, page, pageSize, onChangePage]);

  const observerRef = useInfiniteScroll(loadMore, !isEnd);

  if (isLoading && page === 1)
    return (
      <ul className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <li key={i}>
            <SkeletonWrittenReviewCard />
          </li>
        ))}
      </ul>
    );

  if (!acc.length)
    return (
      <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-gray-600">
        아직 작성한 리뷰가 없습니다.
      </div>
    );

  return (
    <>
      <ul className="space-y-4">
        {acc.map((it: any) => {
          const mergedDesc =
            typeof it.moverDescription === "string" &&
            it.moverDescription.trim()
              ? it.moverDescription.trim()
              : (it.moverId &&
                  (descByMoverId.get(it.moverId) ||
                    profileDescById.get(it.moverId))) ||
                "";

          return (
            <li key={it.reviewId ?? `${it.bookingId}-${it.moveDate}`}>
              <ReviewWrittenCard
                moverName={it.moverName}
                moverAvatarUrl={it.moverAvatarUrl}
                moverDescription={mergedDesc}
                serviceLabel={it.serviceLabel}
                from={it.from}
                to={it.to}
                moveDate={it.moveDate}
                price={it.price ?? null}
                rating={it.rating ?? 0}
                comment={it.comment ?? ""}
              />
            </li>
          );
        })}
      </ul>

      {!isEnd && <div ref={observerRef} className="h-8" />}
      {!isEnd && page > 1 && isLoading && (
        <div className="py-4 text-center text-gray-500">불러오는 중…</div>
      )}
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
