// hooks/useSendEstimate.ts
import { useMutation } from "@tanstack/react-query";
import { sendEstimateApi, SendEstimatePayload } from "@/lib/api/quote";

export function useSendEstimate() {
  return useMutation({
    mutationFn: (payload: SendEstimatePayload) => sendEstimateApi(payload),
    
    onSuccess: (data) => {
      console.log("견적 전송 성공 ✅", data);
      alert("견적이 성공적으로 전송되었습니다!");
    },
    onError: (error) => {
      console.error("견적 전송 실패 ❌", error);
      alert("견적 전송에 실패했습니다. 다시 시도해주세요.");
    },
  });
}
