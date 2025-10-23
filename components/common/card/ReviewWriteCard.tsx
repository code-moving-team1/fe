// components/common/card/ReviewWriteCard.tsx
"use client";

import Card from "./Card";
import CardRouteInfo from "./CardRouteInfo";
import CardDateInfo from "./CardDateInfo";
import CardPrice from "./CardPrice";
import MoverAvatar from "./Mover/MoverAvatar";
import MoverName from "./Mover/MoverName";
import { Buttons } from "../button";
import { ServiceChip } from "../chip";

interface ReviewWriteCardProps {
  moverName: string;
  moverAvatarUrl?: string;
  serviceLabel: string;
  from: string;
  to: string;
  moveDate: string;
  price?: number | null;
  onWrite?: () => void;
  className?: string;
  moverDescription?: string;
}

export default function ReviewWriteCard({
  moverName,
  moverAvatarUrl,
  serviceLabel,
  from,
  to,
  moveDate,
  price = null,
  onWrite,
  className,
  moverDescription,
}: ReviewWriteCardProps) {
  return (
    <Card
      className={`flex w-full flex-col justify-between border border-gray-200 bg-white p-5 shadow-sm md:p-6 ${className || ""}`}
      aria-label="리뷰 작성 카드"
    >
      <div className="relative flex items-start justify-between gap-3 md:gap-4">
        <div className="flex min-w-0 flex-1 items-center gap-3 md:gap-4">
          <MoverAvatar avatarUrl={moverAvatarUrl} size={80} />
          <div className="min-w-0">
            <div className="min-w-0 truncate pr-2 font-semibold whitespace-nowrap text-gray-900 md:pr-0">
              <MoverName MoverName={moverName} />
            </div>

            {!!moverDescription && (
              <p className="mt-1 overflow-hidden text-sm text-ellipsis whitespace-nowrap text-gray-500">
                {moverDescription}
              </p>
            )}

            <div className="mt-2">
              <ServiceChip iconSrc="/icons/ic_box.svg" size="sm">
                {serviceLabel}
              </ServiceChip>
            </div>
          </div>
        </div>

        {price !== null && price !== undefined && (
          <div className="w-[140px] flex-none text-right whitespace-nowrap md:w-[180px]">
            <CardPrice
              amount={price}
              showLabel
              className="flex-col items-end [&>span:first-child]:text-[13px] [&>span:first-child]:font-medium [&>span:first-child]:text-gray-500 md:[&>span:first-child]:text-base [&>span:last-child]:text-2xl [&>span:last-child]:leading-tight [&>span:last-child]:font-extrabold md:[&>span:last-child]:text-3xl"
            />
          </div>
        )}
      </div>

      <div className="my-4 border-t border-gray-100" />

      <div className="flex flex-col gap-3 text-sm font-bold md:flex-row md:items-center md:justify-between md:text-sm">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-8">
          <CardRouteInfo from={from} to={to} showArrow />
          <CardDateInfo
            movingDate={moveDate}
            className="order-2 md:order-none"
          />
        </div>

        <div className="w-full md:w-auto">
          <Buttons
            size="figma"
            onClick={onWrite}
            aria-label="리뷰 작성하기"
            className="w-full md:w-auto"
          >
            리뷰 작성하기
          </Buttons>
        </div>
      </div>
    </Card>
  );
}
