"use client";

import Calendar from "@/components/estimate/Calendar";
import MoveType from "@/components/estimate/MoveType";

type Step = 1 | 2 | 3;

export default function EstimateMobileWizard({
  currentStep,
  canNext,
  onNext,
  onPrev,
  onSubmit,
  onOpenAddress,
  departure,
  destination,
}: {
  currentStep: Step;
  canNext: boolean;
  onNext: () => void;
  onPrev: () => void;
  onSubmit: () => void;
  onOpenAddress: (type: "departure" | "destination") => void;
  departure: string | null | undefined;
  destination: string | null | undefined;
}) {
  const stepTitleMap: Record<Step, string> = {
    1: "이사 유형을 선택해주세요",
    2: "이사 예정일을 선택해주세요",
    3: "이사 지역을 선택해주세요",
  };

  return (
    <div className="lg:hidden">
      <div className="mt-15 space-y-2 text-center">
        <h2 className="text-xl font-bold">{stepTitleMap[currentStep]}</h2>
        <p className="text-sm text-gray-500">
          견적을 요청하면 최대 5개의 견적을 받을 수 있어요 :)
        </p>
        <div className="mt-2 flex items-center justify-center gap-3">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className={`flex h-6 w-6 items-center justify-center rounded-full border text-xs ${
                currentStep === n
                  ? "border-orange-500 bg-orange-500 text-white"
                  : "border-gray-300 text-gray-500"
              }`}
            >
              {n}
            </div>
          ))}
        </div>
      </div>

      {currentStep === 1 && (
        <div className="mt-20">
          <h3 className="mb-2 text-lg font-bold">이사 유형</h3>
          <MoveType />
        </div>
      )}

      {currentStep === 2 && (
        <div className="mt-12">
          <Calendar />
        </div>
      )}

      {currentStep === 3 && (
        <div className="mt-15">
          <h3 className="mb-2 text-lg font-bold">이사 지역</h3>
          <div className="flex flex-col gap-6">
            <div className="flex w-full flex-col items-start">
              <span className="mb-2 text-sm font-semibold">출발지</span>
              <button
                type="button"
                onClick={() => onOpenAddress("departure")}
                className={`h-12 w-full cursor-pointer rounded-xl border px-4 text-left ${
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
            <div className="flex w-full flex-col items-start">
              <span className="mb-2 text-sm font-semibold">도착지</span>
              <button
                type="button"
                onClick={() => onOpenAddress("destination")}
                className={`h-12 w-full cursor-pointer rounded-xl border px-4 text-left ${
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
      )}

      <div className="mt-10 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onPrev}
          disabled={currentStep === 1}
          className="flex-1 rounded-xl border border-gray-300 py-3 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 active:bg-gray-100 disabled:opacity-40"
        >
          이전
        </button>

        {currentStep < 3 ? (
          <button
            type="button"
            onClick={onNext}
            disabled={!canNext}
            className="flex-1 rounded-xl bg-gray-200 py-3 text-sm font-semibold text-gray-600 transition-colors enabled:bg-orange-500 enabled:text-white enabled:hover:bg-orange-600"
          >
            다음
          </button>
        ) : (
          <button
            type="button"
            onClick={onSubmit}
            disabled={!canNext}
            className="flex-1 rounded-xl bg-gray-200 py-3 text-sm font-semibold text-gray-600 transition-colors enabled:bg-orange-500 enabled:text-white enabled:hover:bg-orange-600"
          >
            견적 요청하기
          </button>
        )}
      </div>
    </div>
  );
}
