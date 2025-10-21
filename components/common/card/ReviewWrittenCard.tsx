// components/common/card/ReviewWrittenCard.tsx
"use client";

import Card from "./Card";
import CardRouteInfo from "./CardRouteInfo";
import CardDateInfo from "./CardDateInfo";
import CardPrice from "./CardPrice";
import MoverAvatar from "./Mover/MoverAvatar";
import MoverName from "./Mover/MoverName";
import { Buttons } from "../button";
import { ServiceChip } from "../chip";
import { useMemo } from "react";

interface ReviewWrittenCardProps {
  moverName: string;
  moverAvatarUrl?: string;
  serviceLabel: string;
  from: string;
  to: string;
  moveDate: string;
  price?: number | null;
  rating: number;
  comment: string;
  onEdit?: () => void;
  onDelete?: () => void;
  className?: string;
  moverDescription?: string;
}

export default function ReviewWrittenCard({
  moverName,
  moverAvatarUrl,
  serviceLabel,
  from,
  to,
  moveDate,
  price = null,
  rating,
  comment,
  onEdit,
  onDelete,
  className,
  moverDescription,
}: ReviewWrittenCardProps) {
  const safeRating = useMemo(() => {
    if (Number.isNaN(rating)) return 0;
    return Math.max(0, Math.min(5, Math.round(rating)));
  }, [rating]);

  return (
    <Card
      className={`flex flex-col justify-between border border-gray-200 bg-white p-6 shadow-sm ${className || ""}`}
      aria-label="내가 작성한 리뷰 카드"
    >
      <div className="flex items-center justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <MoverAvatar avatarUrl={moverAvatarUrl} size={80} />
          <div>
            <MoverName MoverName={moverName} />
            {typeof moverDescription === "string" &&
              moverDescription.trim() && (
                <p className="mt-1 text-sm text-gray-500">{moverDescription}</p>
              )}
            <div className="mt-2">
              <ServiceChip iconSrc="/icons/ic_box.svg" size="sm">
                {serviceLabel}
              </ServiceChip>
            </div>
          </div>
        </div>

        {price !== null && price !== undefined && (
          <div className="text-right">
            <CardPrice
              amount={price}
              showLabel={true}
              className="flex-col items-end [&>span:first-child]:text-base [&>span:first-child]:font-medium [&>span:first-child]:text-gray-500 [&>span:last-child]:text-3xl [&>span:last-child]:font-bold"
            />
          </div>
        )}
      </div>

      <div className="my-4 border-t border-gray-100" />

      <div className="flex items-center justify-between text-sm font-bold">
        <div className="flex items-center gap-8">
          <CardRouteInfo from={from} to={to} showArrow />
          <CardDateInfo movingDate={moveDate} />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <RatingStars value={safeRating} />
        <span className="text-sm font-medium text-gray-700">
          {safeRating}.0
        </span>
      </div>

      <p className="mt-2 text-sm leading-6 whitespace-pre-line text-gray-800">
        {comment}
      </p>

      {(onEdit || onDelete) && (
        <div className="mt-4 flex gap-2">
          {onEdit && (
            <Buttons size="figma" onClick={onEdit} aria-label="리뷰 수정">
              수정
            </Buttons>
          )}
          {onDelete && (
            <Buttons size="figma" onClick={onDelete} aria-label="리뷰 삭제">
              삭제
            </Buttons>
          )}
        </div>
      )}
    </Card>
  );
}

function RatingStars({ value }: { value: number }) {
  return (
    <div className="flex items-center" aria-label={`별점 ${value}점`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < value;
        return (
          <svg
            key={i}
            className="h-5 w-5 text-yellow-400"
            viewBox="0 0 20 20"
            fill={filled ? "currentColor" : "none"}
            stroke="currentColor"
            role="img"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={filled ? 0 : 1.5}
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.967 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118L10.5 13.86a1 1 0 0 0-1.175 0l-2.786 2.073c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.905 8.72c-.783-.57-.379-1.81.588-1.81h3.462a1 1 0 0 0 .95-.69l1.07-3.292Z"
            />
          </svg>
        );
      })}
    </div>
  );
}
