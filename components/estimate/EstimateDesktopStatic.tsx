"use client";

import Calendar from "@/components/estimate/Calendar";
import MoveType from "@/components/estimate/MoveType";
import { Buttons } from "@/components/common/button";

export default function EstimateDesktopStatic({
  onOpenAddress,
  onSubmit,
  isSubmitDisabled,
  departure,
  destination,
}: {
  onOpenAddress: (type: "departure" | "destination") => void;
  onSubmit: () => void;
  isSubmitDisabled: boolean;
  departure: string | null | undefined;
  destination: string | null | undefined;
}) {
  return (
    <div className="hidden lg:block">
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
              onClick={() => onOpenAddress("departure")}
              className={`h-12 w-60 cursor-pointer rounded-xl border px-4 text-center ${
                departure
                  ? "border-red-500 font-medium text-red-500"
                  : "border-orange-500 text-orange-500"
              }`}
            >
              <span className="block w-full overflow-hidden text-ellipsis whitespace-nowrap">
                {departure || "출발지 선택하기"}
              </span>
            </button>
          </div>

          <div className="flex flex-col items-start">
            <span className="mb-1 text-sm font-semibold">도착지</span>
            <button
              type="button"
              onClick={() => onOpenAddress("destination")}
              className={`h-12 w-60 cursor-pointer rounded-xl border px-4 text-center ${
                destination
                  ? "border-red-500 font-medium text-red-500"
                  : "border-orange-500 text-orange-500"
              }`}
            >
              <span className="block w-full overflow-hidden text-ellipsis whitespace-nowrap">
                {destination || "도착지 선택하기"}
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-15 flex justify-end">
        <Buttons
          onClick={onSubmit}
          disabled={isSubmitDisabled}
          className="h-12 w-full rounded-2xl bg-orange-500 font-bold text-white hover:bg-orange-600 disabled:bg-gray-300"
        >
          견적 요청하기
        </Buttons>
      </div>
    </div>
  );
}
