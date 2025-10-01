// "use client";

// import * as React from "react";
// // alias가 @components 로 잡혀있다면 ↓ 그대로 사용
// import BaseModal from "../components/common/modal/BaseModal";
// // 만약 alias가 다르면: import BaseModal from "../components/common/modal/BaseModal";

// export default function Home() {
//   const [rating, setRating] = React.useState(0);

//   return (
//     <main className="p-10">
//       <h1 className="text-2xl font-bold mb-6">Modal / Rating Test</h1>

//       <BaseModal
//         trigger={
//           <button className="px-5 py-3 rounded-xl bg-[#F9502E] text-white">
//             리뷰 쓰기
//           </button>
//         }
//         title="리뷰 쓰기"
//         description="평점을 선택해 주세요"
//         rating={rating} // 선택값을 밖에서 보려면 전달
//         onChangeRating={(n) => {
//           setRating(n);
//           console.log("선택한 평점:", n);
//         }}
//       >
//         {/* 모달 내부(별점 섹션 아래로 들어감) */}
//         <div className="mt-4">
//           <p className="text-sm text-gray-500">선택한 평점: {rating}</p>

//           <textarea
//             className="mt-3 w-full h-40 rounded-xl border border-gray-200 p-4"
//             placeholder="최소 10자 이상 입력해주세요"
//           />

//           <div className="mt-4 text-right">
//             <button className="px-5 py-3 rounded-xl bg-[#F9502E] text-white">
//               리뷰 등록
//             </button>
//           </div>
//         </div>
//       </BaseModal>
//     </main>
//   );
// }

// "use client";

// import * as React from "react";
// import * as Dialog from "@radix-ui/react-dialog";
// import { Cross2Icon } from "@radix-ui/react-icons";
// import RatingStars from "../components/common/rating/RatingStars";

// interface BaseModalProps {
//   trigger: React.ReactNode;
//   title?: string;
//   description?: string;
//   children?: React.ReactNode;
//   className?: string;
//   className2?: string;

//   /** ⭐ 선택 값(선택사항: 부모가 제어하고 싶을 때) */
//   rating?: number;
//   /** ⭐ 변경 콜백(선택사항) */
//   onChangeRating?: (n: number) => void;
// }

// export default function BaseModal({
//   trigger,
//   title,
//   description,
//   children,
//   className,
//   className2,
//   rating,
//   onChangeRating,
// }: BaseModalProps) {
//   // 부모가 값을 주지 않으면 내부 상태 사용
//   const [innerRating, setInnerRating] = React.useState<number>(rating ?? 0);
//   React.useEffect(() => {
//     if (typeof rating === "number") setInnerRating(rating);
//   }, [rating]);

//   const handleRatingChange = (n: number) => {
//     onChangeRating?.(n);
//     if (typeof rating !== "number") setInnerRating(n);
//   };

//   return (
//     <Dialog.Root>
//       <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>

//       <Dialog.Portal>
//         <Dialog.Overlay className="fixed inset-0 bg-black/50" />

//         <Dialog.Content
//           className={`fixed left-1/2 top-1/2 w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-lg ${
//             className || ""
//           }`}
//         >
//           {/* 닫기 버튼 */}
//           <Dialog.Close asChild>
//             <button
//               className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
//               aria-label="Close"
//             >
//               <Cross2Icon className="w-5 h-5" />
//             </button>
//           </Dialog.Close>

//           {/* 제목/설명 */}
//           {title && (
//             <Dialog.Title className="text-lg font-bold mb-2">
//               {title}
//             </Dialog.Title>
//           )}
//           {description && (
//             <Dialog.Description className="text-gray-500 mb-4">
//               {description}
//             </Dialog.Description>
//           )}

//           {/* ⭐ 평점 선택 섹션 */}
//           <section className="mb-4">
//             <p className="mb-2 font-semibold">평점을 선택해 주세요</p>
//             <RatingStars
//               value={innerRating}
//               onChange={handleRatingChange}
//               size={32} // Figma 사이즈 맞게 조절
//             />
//           </section>

//           {/* 나머지 컨텐츠(후기 텍스트 등) */}
//           {children}

//           {/* 하단 액션(예: 취소/등록 등) - 기존에 있던 것 유지 */}
//           <Dialog.Close asChild>
//             <button
//               className={`mt-4 px-4 py-2 bg-gray-200 rounded-lg ${className2 || ""}`}
//             >
//               닫기
//             </button>
//           </Dialog.Close>
//         </Dialog.Content>
//       </Dialog.Portal>
//     </Dialog.Root>
//   );
// }

// "use client";

// import { useState } from "react";
// import {
//   Chip,
//   RegionChip,
//   AddressChip,
//   ServiceChip,
//   SingleSelectChipGroup,
//   MultiSelectRegionGroup,
// } from "@/components/common/chip";

// export default function ChipsDemo() {
//   const [addr, setAddr] = useState<"road" | "jibun">("road");
//   const [regions, setRegions] = useState<string[]>([]);

//   return (
//     <main className="mx-auto max-w-4xl space-y-8 p-8">
//       <h1 className="text-2xl font-bold">Chips Demo</h1>

//       {/* 1) 주소 탭 */}
//       <section className="space-y-3">
//         <h2 className="font-semibold">chip/address</h2>
//         <SingleSelectChipGroup
//           options={[
//             { label: "도로명", value: "road" },
//             { label: "지번", value: "jibun" },
//           ]}
//           value={addr}
//           onChange={setAddr}
//         />
//       </section>

//       {/* 2) 지역 칩 */}
//       <section className="space-y-3">
//         <h2 className="font-semibold">chip/지역</h2>
//         <MultiSelectRegionGroup
//           options={[
//             { label: "서울", value: "서울" },
//             { label: "경기", value: "경기" },
//             { label: "인천", value: "인천" },
//             { label: "강원", value: "강원" },
//           ]}
//           values={regions}
//           onChange={setRegions}
//         />
//       </section>

//       {/* 3) 이사유형 칩(아이콘) */}
//       <section className="space-y-3">
//         <h2 className="font-semibold">chip/이사유형</h2>
//         <div className="flex flex-wrap gap-3 ">
//           <ServiceChip iconSrc="/icons/ic_box.svg">소형이사</ServiceChip>
//           <ServiceChip iconSrc="/icons/ic_document.svg">
//             지정 견적 요청
//           </ServiceChip>
//         </div>
//       </section>

//       {/* 4) 가장 기본 형태 */}
//       <section className="space-y-3">
//         <h2 className="font-semibold">Base</h2>
//         <div className="flex flex-wrap gap-3">
//           <Chip>기본</Chip>
//           <Chip variant="solid" color="primary">
//             프라이머리
//           </Chip>
//           <Chip variant="outline" color="primary">
//             아웃라인 프라이머리
//           </Chip>
//           <Chip variant="outline" color="neutral" selected>
//             선택됨(지역)
//           </Chip>
//         </div>
//       </section>
//     </main>
//   );
// }

"use client";
import * as React from "react";
import ReviewWriteModal from "@/components/common/modal/ReviewWriteModal";
import { Buttons } from "@/components/common/button";

export default function Home() {
  const [rating, setRating] = React.useState(0);
  const [text, setText] = React.useState("");

  return (
    <main className="p-10">
      <ReviewWriteModal
        trigger={<Buttons variant="solid">리뷰 쓰기</Buttons>}
        moverName="김코드"
        moverAvatarSrc="/assets/profile.svg"
        moveTypes={["small", "designated"]}
        fromAddress="서울시 중구"
        toAddress="경기도 수원시"
        moveDateText="2024년 07월 01일 (월)"
        rating={rating}
        onChangeRating={setRating}
        reviewText={text}
        onChangeReviewText={setText}
        onSubmit={() => alert(`rating=${rating}\ntext=${text}`)}
      />
    </main>
  );
}
