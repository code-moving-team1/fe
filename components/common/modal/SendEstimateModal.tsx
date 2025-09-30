// components/common/modal/SendEstimateModal.tsx
"use client";

import { useState } from "react";
import BaseModal from "@/components/common/modal/BaseModal";
import TextInput from "../input/TextInput";
import { ServiceChip } from "../chip";
import { ServiceChipProps } from "../chip/presets";
import CardHeader from "../card/CardHeaderCustomer";
import { useSendEstimate } from "@/hooks/useSendEstimate";

interface SendEstimateModalProps {
  trigger: React.ReactNode;
  customerName: string;
  moveRequestId: number; // ✅ API에 맞게 변경
  departure?: string;
  destination?: string;
  moveDate?: string;
  chips?: (Omit<ServiceChipProps, "iconSrc"> & {
    label: string;
    iconSrc: string;
  })[];
}

export default function SendEstimateModal({
  trigger,
  customerName,
  moveRequestId,
  departure,
  destination,
  moveDate,
  chips = [],
}: SendEstimateModalProps) {
  const [price, setPrice] = useState("");
  const [comment, setComment] = useState("");
  const sendEstimate = useSendEstimate();

  return (
    <BaseModal
      trigger={trigger}
      title="견적 보내기"
      departure={departure}
      destination={destination}
      moveDate={moveDate}
      textAreaLabel="코멘트를 입력해 주세요"
      confirmText="견적 보내기"
      onConfirm={() => {
        if (!price || !comment) return;
        sendEstimate.mutate({
          moveRequestId,
          price: Number(price),
          comment,
          type: "NORMAL",
        });
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
        <textarea
          className="w-full rounded border p-2"
          placeholder="코멘트를 입력해주세요 (최소 10자)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          // 우리 텍스트Area 컴포넌트로 변경예정
        />
      </div>
    </BaseModal>
  );
}

// "use client";

// import BaseModal from "@/components/common/modal/BaseModal";
// import TextArea from "@/components/common/input/TextArea";
// import CardDateInfo from "../card/CardDateInfo";
// import CardRouteInfo from "../card/CardRouteInfo";
// import CardHeader from "../card/CardHeaderCustomer";
// import { ServiceChip } from "../chip";
// import { ServiceChipProps } from "../chip/presets";
// import TextInput from "../input/TextInput";

// interface SendEstimateModalProps {
//   trigger: React.ReactNode;
//   customerName: string;
//   departure?: string;
//   destination?: string;
//   moveDate?: string;
//   className?: string;
//   chips?: (Omit<ServiceChipProps, "iconSrc"> & {
//     label: string;
//     iconSrc: string;
//   })[];
// }

// export default function SendEstimateModal({
//   trigger,
//   customerName,
//   departure,
//   destination,
//   moveDate,
//   className,
//   chips = [],
// }: SendEstimateModalProps) {
//   return (
//     <BaseModal
//       trigger={trigger}
//       title="견적 보내기"
//       departure={departure}
//       destination={destination}
//       moveDate={moveDate}
//       textAreaLabel="코멘트를 입력해 주세요"
//       confirmText="견적 보내기"
//       extraFields={
//         <TextInput
//           id="estimatePrice"
//           label="견적가를 입력해 주세요"
//           placeholder="견적가 입력"
//           type="number"
//         />
//       }
//     >
//       <div className="flex flex-col gap-6">
//         <div className="space-y-3">
//           {chips.length > 0 && (
//             <div className="flex flex-wrap gap-3">
//               {chips.map((chip, idx) => (
//                 <ServiceChip key={idx} iconSrc={chip.iconSrc} size="sm">
//                   {chip.label}
//                 </ServiceChip>
//               ))}
//             </div>
//           )}
//         </div>

//         <div className="flex flex-col gap-3 space-y-2 text-lg">
//           <CardHeader customerName={customerName} className="text-lg" />
//         </div>
//       </div>
//     </BaseModal>
//   );
// }
