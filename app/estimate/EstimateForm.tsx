"use client";

import { useState } from "react";
import { useEstimateStore } from "@/store/estimateStore";
import AddressModal from "@/components/common/modal/AddressModal";
import Calendar from "@/components/estimate/Calendar";
import MoveType from "@/components/estimate/MoveType";
import { Buttons } from "@/components/common/button";

export default function EstimateForm() {
  const { date, departure, destination, moveType } = useEstimateStore();
  const [modalType, setModalType] = useState<
    "departure" | "destination" | null
  >(null);

  const handleSubmit = () => {
    const payload = { date, departure, destination, moveType };
    console.log("최종 견적 요청 데이터:", payload);

    // 나중에 서버 연결할 때:
    // fetch("/api/estimate", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(payload),
    // });
  };

  return (
    <div className="mx-auto w-full max-w-[894px] space-y-8 rounded-4xl bg-white p-7 pb-12 shadow-md lg:w-[894px]">
      <div className="mt-15 space-y-2 text-center">
        <h2 className="text-xl font-bold">
          이사 유형, 예정일과 지역을 선택해주세요
        </h2>
        <p className="text-sm text-gray-500">
          견적을 요청하면 최대 5개의 견적을 받을 수 있어요 :)
        </p>
      </div>

      <div className="mt-20">
        <h3 className="mb-2 text-lg font-bold">이사 유형</h3>
        <MoveType />
      </div>

      <div className="mt-12 flex items-center justify-between">
        <h3 className="mb-2 text-lg font-bold">이사 예정일</h3>
        <Calendar />
      </div>

      <div className="mt-15">
        <h3 className="mb-2 text-lg font-bold">이사 지역</h3>
        <div className="flex justify-end gap-6">
          <div className="flex flex-col items-start">
            <span className="mb-1 text-sm font-semibold">출발지</span>
            <button
              type="button"
              onClick={() => setModalType("departure")}
              className={`h-12 w-60 cursor-pointer rounded-xl border px-4 text-center ${
                departure
                  ? "border-red-500 font-medium text-red-500"
                  : "border-orange-500 text-orange-500"
              } truncate`}
            >
              {departure || "출발지 선택하기"}
            </button>
          </div>

          <div className="flex flex-col items-start">
            <span className="mb-1 text-sm font-semibold">도착지</span>
            <button
              type="button"
              onClick={() => setModalType("destination")}
              className={`h-12 w-60 cursor-pointer rounded-xl border px-4 text-center ${
                destination
                  ? "border-red-500 font-medium text-red-500"
                  : "border-orange-500 text-orange-500"
              } truncate`}
            >
              {destination || "도착지 선택하기"}
            </button>
          </div>
        </div>
      </div>

      {modalType && (
        <AddressModal
          type={modalType}
          onClose={() => setModalType(null)}
          open={modalType !== null}
          onOpenChange={(open) => {
            if (!open) setModalType(null);
          }}
        />
      )}

      <div className="mt-15 flex justify-end">
        <Buttons
          onClick={handleSubmit}
          disabled={!date || !departure || !destination || !moveType}
          className="h-12 w-full cursor-pointer rounded-2xl bg-orange-500 font-bold text-white hover:bg-orange-600 disabled:bg-gray-300"
        >
          견적 요청하기
        </Buttons>
      </div>
    </div>
  );
}
