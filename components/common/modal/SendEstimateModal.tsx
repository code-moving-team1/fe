// components/common/modal/SendEstimateModal.tsx
"use client";

import { useState } from "react";
import BaseModal from "@/components/common/modal/BaseModal";
import TextInput from "../input/TextInput";
import { ServiceChip } from "../chip";
import { ServiceChipProps } from "../chip/presets";
import CardHeader from "../card/CardHeaderCustomer";
import { useSendEstimate } from "@/hooks/useSendEstimate";
import { useQueryClient } from "@tanstack/react-query";

interface SendEstimateModalProps {
  trigger: React.ReactNode;
  customerName: string;
  moveRequestId: number;
  departure?: string;
  destination?: string;
  moveDate?: string;
  chips?: (Omit<ServiceChipProps, "iconSrc"> & {
    label: string;
    iconSrc: string;
  })[];
  onSent?: () => void;
  quoteType?: "NORMAL" | "DIRECT";
}

export default function SendEstimateModal({
  trigger,
  customerName,
  moveRequestId,
  departure,
  destination,
  moveDate,
  chips = [],
  onSent,
  quoteType = "NORMAL",
}: SendEstimateModalProps) {
  const [price, setPrice] = useState("");
  const sendEstimate = useSendEstimate();
  const qc = useQueryClient();
  const priceNum = Number(price);
  const isPriceValid = Number.isFinite(priceNum) && priceNum > 0;

  return (
    <BaseModal
      className="z-100"
      trigger={trigger}
      title="견적 보내기"
      departure={departure}
      destination={destination}
      moveDate={moveDate}
      textAreaLabel="코멘트를 입력해 주세요"
      minLength={10}
      validate={() => isPriceValid}
      confirmText={sendEstimate.isPending ? "전송 중..." : "견적 보내기"}
      confirmLoading={sendEstimate.isPending}
      onConfirm={async (comment) => {
        await sendEstimate.mutateAsync({
          moveRequestId,
          price: priceNum,
          comment,
          type: quoteType,
        });
        // ✅ 전송 후 목록들만 무효화 → 활성 쿼리는 자동 refetch
        await Promise.all([
          qc.invalidateQueries({ queryKey: ["move-requests"], exact: false }),
          qc.invalidateQueries({
            queryKey: ["requests", "direct"],
            exact: false,
          }),
        ]);
        onSent?.();
        setPrice("");
      }}
      extraFields={
        <TextInput
          id="estimatePrice"
          label="견적가를 입력해 주세요"
          placeholder="견적가 입력"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      }
    >
      <div className="flex flex-col gap-6">
        {chips.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {chips.map((chip, idx) => (
              <ServiceChip key={idx} iconSrc={chip.iconSrc} size="sm">
                {chip.label}
              </ServiceChip>
            ))}
          </div>
        )}
        <CardHeader customerName={customerName} className="text-lg" />
      </div>
    </BaseModal>
  );
}
