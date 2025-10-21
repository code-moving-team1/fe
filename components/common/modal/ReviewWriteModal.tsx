"use client";

import * as React from "react";
import BaseModal from "./BaseModal";

import MoverAvatar from "../../common/card/Mover/MoverAvatar";
import MoverName from "../../common/card/Mover/MoverName";
import CardDateInfo from "../../common/card/CardDateInfo";
import CardRouteInfo from "../../common/card/CardRouteInfo";
import { ServiceChip } from "../chip/presets";
import RatingStars from "../rating/RatingStars";

type MoveType = "small" | "family" | "office" | "normal" | "designated";

export interface ReviewWriteModalProps {
  trigger: React.ReactNode;
  moverName: string;
  moverAvatarSrc?: string;
  moveTypes?: MoveType[];
  fromAddress: string;
  toAddress: string;
  moveDateText: string;
  rating: number;
  onChangeRating: (n: number) => void;
  reviewText: string;
  onChangeReviewText: (v: string) => void;
  onSubmit: (content: string) => void;
  submitting?: boolean;
  className?: string;
}

export default function ReviewWriteModal(props: ReviewWriteModalProps) {
  const {
    trigger,
    moverName,
    moverAvatarSrc,
    moveTypes = [],
    fromAddress,
    toAddress,
    moveDateText,
    rating,
    onChangeRating,
    reviewText,
    onChangeReviewText,
    onSubmit,
    submitting = false,
    className,
  } = props;

  const renderServiceChip = () => {
    if (moveTypes.includes("small")) {
      return (
        <ServiceChip size="sm" iconSrc="/icons/ic_box.svg">
          소형이사
        </ServiceChip>
      );
    }
    if (moveTypes.includes("family")) {
      return (
        <ServiceChip size="sm" iconSrc="/icons/ic_box.svg">
          가정이사
        </ServiceChip>
      );
    }
    if (moveTypes.includes("office")) {
      return (
        <ServiceChip size="sm" iconSrc="/icons/ic_box.svg">
          사무실이사
        </ServiceChip>
      );
    }
    return null;
  };

  return (
    <BaseModal
      trigger={trigger}
      title="리뷰 쓰기"
      className={`max-w-md ${className || ""}`}
      showRouteInfo={false}
      showTextArea
      textAreaLabel="상세 후기를 작성해 주세요"
      minLength={10}
      confirmText="리뷰 등록"
      confirmLoading={submitting}
      validate={() => rating > 0}
      onConfirm={(value) => {
        onChangeReviewText(value);
        onSubmit(value);
      }}
    >
      <header>
        <div className="mb-2 flex items-center gap-2">
          {renderServiceChip()}
        </div>

        <div className="flex items-center justify-between">
          <MoverName MoverName={moverName} className="text-2xl font-semibold" />
          <MoverAvatar
            avatarUrl={moverAvatarSrc}
            size={56}
            className="h-14 w-14 rounded-xl"
          />
        </div>
      </header>

      <hr className="border-gray-200" />

      <section className="mb-4 grid grid-cols-3 items-start gap-6">
        <div className="col-span-2">
          <CardRouteInfo from={fromAddress} to={toAddress} showArrow />
        </div>

        <div className="justify-self-end overflow-hidden text-right text-ellipsis whitespace-nowrap">
          <CardDateInfo movingDate={moveDateText} />
        </div>
      </section>

      <section className="mb-2">
        <p className="mb-2 text-base font-semibold">평점을 선택해 주세요</p>
        <RatingStars
          value={rating}
          onChange={onChangeRating}
          size={28}
          gap={12}
          className="mt-1"
        />
      </section>
    </BaseModal>
  );
}
