"use client";

import * as React from "react";
import BaseModal from "./BaseModal";

import MoverAvatar from "../../common/card/Mover/MoverAvatar";
import MoverName from "../../common/card/Mover/MoverName";
import CardDateInfo from "../../common/card/CardDateInfo";
import CardRouteInfo from "../../common/card/CardRouteInfo";
import { ServiceChip, DesignatedQuoteChip } from "../chip/presets";
import RatingStars from "../rating/RatingStars";

// moveTypes에 넣을 수 있는 값들 (둘 다 한 번에 표현 가능)
type MoveType = "small" | "family" | "office" | "normal" | "designated";

export interface ReviewWriteModalProps {
  trigger: React.ReactNode;
  moverName: string;
  moverAvatarSrc?: string;
  /** 칩 제어용: ["small" | "family" | "office" | "normal" | "designated"] */
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

  // ---- 칩 렌더 도우미 ----
  const renderServiceChip = () => {
    // 하나만 표시 (우선순위: small > family > office)
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

  const renderQuoteChip = () => {
    // 일반/지정 중 하나 표시 (우선순위: designated > normal)
    if (moveTypes.includes("designated")) {
      return (
        <DesignatedQuoteChip size="sm">지정 견적 요청</DesignatedQuoteChip>
      );
    }
    if (moveTypes.includes("normal")) {
      return (
        <ServiceChip size="sm" iconSrc="/icons/ic_document.svg">
          일반 견적
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
        {/* 칩 2개 영역: 서비스 유형 / 견적 유형 */}
        <div className="mb-2 flex items-center gap-2">
          {renderServiceChip()}
          {renderQuoteChip()}
        </div>

        <div className="flex items-center justify-between">
          <MoverName MoverName={moverName} />
          <MoverAvatar
            avatarUrl={moverAvatarSrc}
            size={56}
            className="h-14 w-14 rounded-xl"
          />
        </div>
      </header>

      <hr className="border-gray-200" />

      <section className="mb-4 grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <CardRouteInfo from={fromAddress} to={toAddress} showArrow />
        </div>
        <div>
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
