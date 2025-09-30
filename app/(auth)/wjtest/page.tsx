// app/(auth)/wjtest/page.tsx

"use client";

import dynamic from "next/dynamic";

import SendEstimateModal from "@/components/common/modal/SendEstimateModal";
// const SendEstimateModal = dynamic(
//   () => import("@/components/common/modal/SendEstimateModal"),
//   { ssr: false }, // ✅ 클라이언트에서만 렌더링
// );

export default function WjTestPage() {
  return (
    <div className="p-6">
      <h1 className="mb-6 text-xl font-bold">견적 보내기 테스트 페이지</h1>

      <SendEstimateModal
        trigger={
          <button className="rounded bg-orange-500 px-4 py-2 text-white">
            견적 보내기 모달 열기
          </button>
        }
        customerName="테스트 고객"
        moveRequestId={16} // ✅ 실제 테스트할 move-request id 넣기
        departure="서울"
        destination="부산"
        moveDate="2025-10-01"
        chips={[
          { label: "사무실 이사", iconSrc: "/assets/사무실이사.svg" },
          { label: "소형 이사", iconSrc: "/assets/소형이사.svg" },
        ]}
      />
    </div>
  );
}
