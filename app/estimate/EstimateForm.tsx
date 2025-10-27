"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEstimateStore } from "@/store/estimateStore";
import AddressModal from "@/components/common/modal/AddressModal";
import Calendar from "@/components/estimate/Calendar";
import MoveType from "@/components/estimate/MoveType";
import { Buttons } from "@/components/common/button";
import clientApi from "@/lib/api/axiosClient.client";

export default function EstimateForm() {
  const router = useRouter();

  const { reset } = useEstimateStore();
  const {
    date,
    departure,
    departureRegion,
    destination,
    destinationRegion,
    moveType,
  } = useEstimateStore();

  const [modalType, setModalType] = useState<
    "departure" | "destination" | null
  >(null);
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  const serviceTypeMap: Record<string, string> = {
    소형이사: "SMALL",
    가정이사: "FAMILY",
    사무실이사: "OFFICE",
  };

  const stepTitleMap: Record<1 | 2 | 3, string> = {
    1: "이사 유형을 선택해주세요",
    2: "이사 예정일을 선택해주세요",
    3: "이사 지역을 선택해주세요",
  };

  const canNext =
    (currentStep === 1 && !!moveType) ||
    (currentStep === 2 && !!date) ||
    (currentStep === 3 &&
      !!departure &&
      !!departureRegion &&
      !!destination &&
      !!destinationRegion);

  const handleNext = () => {
    if (!canNext) return;
    if (currentStep < 3) setCurrentStep((s) => (s + 1) as 1 | 2 | 3);
  };
  const handlePrev = () =>
    setCurrentStep((s) => Math.max(1, s - 1) as 1 | 2 | 3);

  const handleSubmit = async () => {
    if (
      !date ||
      !departure ||
      !departureRegion ||
      !destination ||
      !destinationRegion ||
      !moveType
    ) {
      alert("모든 정보를 입력해주세요.");
      return;
    }

    const payload = {
      serviceType: serviceTypeMap[moveType] || "SMALL",
      moveDate: new Date(date).toISOString(),
      departure,
      departureRegion,
      destination,
      destinationRegion,
    };

    try {
      await clientApi.post("/move-requests", payload);
      alert("이사 요청이 완료되었습니다!");
      reset();
      router.push("/myEstimates");
    } catch (err: any) {
      console.error("이사 요청 실패:", err?.response?.data || err);
      alert("이사 요청에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const MobileWizard = () => (
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
                onClick={() => setModalType("departure")}
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
                onClick={() => setModalType("destination")}
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
          onClick={handlePrev}
          disabled={currentStep === 1}
          className="flex-1 rounded-xl border border-gray-300 py-3 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 active:bg-gray-100 disabled:opacity-40"
        >
          이전
        </button>

        {currentStep < 3 ? (
          <button
            type="button"
            onClick={handleNext}
            disabled={!canNext}
            className="flex-1 rounded-xl bg-gray-200 py-3 text-sm font-semibold text-gray-600 transition-colors enabled:bg-orange-500 enabled:text-white enabled:hover:bg-orange-600"
          >
            다음
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canNext}
            className="flex-1 rounded-xl bg-gray-200 py-3 text-sm font-semibold text-gray-600 transition-colors enabled:bg-orange-500 enabled:text-white enabled:hover:bg-orange-600"
          >
            견적 요청하기
          </button>
        )}
      </div>
    </div>
  );

  const DesktopStatic = () => (
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
              onClick={() => setModalType("departure")}
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
              onClick={() => setModalType("destination")}
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
          onClick={handleSubmit}
          disabled={!date || !departure || !destination || !moveType}
          className="h-12 w-full rounded-2xl bg-orange-500 font-bold text-white hover:bg-orange-600 disabled:bg-gray-300"
        >
          견적 요청하기
        </Buttons>
      </div>
    </div>
  );

  return (
    <div className="mx-auto w-full max-w-[894px] space-y-8 rounded-4xl bg-white p-7 pb-12 shadow-md lg:w-[894px]">
      <MobileWizard />
      <DesktopStatic />

      {modalType && (
        <AddressModal
          type={modalType}
          onClose={() => setModalType(null)}
          open={modalType !== null}
          onOpenChange={(open) => !open && setModalType(null)}
        />
      )}
    </div>
  );
}
