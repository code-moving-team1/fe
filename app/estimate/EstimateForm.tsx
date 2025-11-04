"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEstimateStore } from "@/store/estimateStore";
import AddressModal from "@/components/common/modal/AddressModal";
import clientApi from "@/lib/api/axiosClient.client";
import { useAlertModal } from "@/components/common/modal/AlertModal";
import EstimateMobileWizard from "@/components/estimate/EstimateMobileWizard";
import EstimateDesktopStatic from "@/components/estimate/EstimateDesktopStatic";

export default function EstimateForm() {
  const router = useRouter();
  const { alert, Modal } = useAlertModal();

  const {
    reset,
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
      alert({ message: "모든 정보를 입력해주세요." });
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
      await alert({
        title: "이사 요청 생성",
        message: "이사 요청이 완료되었습니다!",
      });
      reset();
      router.push("/myEstimates");
    } catch (err: any) {
      console.error("이사 요청 실패:", err?.response?.data || err);
      await alert({
        title: "이사 요청 실패",
        message: "이사 요청에 실패했습니다. 다시 시도해주세요.",
      });
    }
  };

  const isSubmitDisabled = !date || !departure || !destination || !moveType;

  return (
    <div className="mx-auto w-full max-w-[894px] space-y-8 rounded-4xl bg-white p-7 pb-12 shadow-md lg:w-[894px]">
      <EstimateMobileWizard
        currentStep={currentStep}
        canNext={canNext}
        onNext={handleNext}
        onPrev={handlePrev}
        onSubmit={handleSubmit}
        onOpenAddress={(t) => setModalType(t)}
        departure={departure}
        destination={destination}
      />

      <EstimateDesktopStatic
        onOpenAddress={(t) => setModalType(t)}
        onSubmit={handleSubmit}
        isSubmitDisabled={isSubmitDisabled}
        departure={departure}
        destination={destination}
      />

      {modalType && (
        <AddressModal
          type={modalType}
          onClose={() => setModalType(null)}
          open={modalType !== null}
          onOpenChange={(open) => !open && setModalType(null)}
        />
      )}
      <Modal />
    </div>
  );
}
