// app/requests/_DirectList.tsx
"use client";

import { useRef } from "react";
import {
  useDirectRequests,
  useRejectDirectRequest,
  type DirectRow,
  type DirectListResponse,
} from "@/lib/queries/requests";
import ReceivedRequestCard from "@/components/common/card/ReceivedRequestCard";
import SendEstimateModal from "@/components/common/modal/SendEstimateModal";
import RejectRequestModal from "@/components/common/modal/RejectRequestModal";
import { Spinner } from "@/components/common/spinner/Spinner";
import { useQueryClient } from "@tanstack/react-query";
import { useAlertModal } from "@/components/common/modal/AlertModal";

const svcMap: Record<
  DirectRow["serviceType"],
  { label: string; iconSrc: string }
> = {
  SMALL: { label: "소형이사", iconSrc: "/icons/ic_box.svg" },
  FAMILY: { label: "가정이사", iconSrc: "/icons/ic_home.svg" },
  OFFICE: { label: "사무실이사", iconSrc: "/icons/ic_company.svg" },
} as const;

export default function DirectList() {
  const qc = useQueryClient();
  const { data, isLoading, isError } = useDirectRequests();
  const rejectMutation = useRejectDirectRequest();
  const { alert, Modal } = useAlertModal();

  const estimateTriggerRefs = useRef<Record<number, HTMLButtonElement | null>>(
    {},
  );
  const rejectTriggerRefs = useRef<Record<number, HTMLButtonElement | null>>(
    {},
  );

  if (isLoading)
    return (
      <div className="flex h-40 items-center justify-center">
        <Spinner className="h-8 w-8 border-orange-500 border-t-transparent" />
      </div>
    );
  if (isError)
    return <p className="text-center text-red-500">데이터 로드 실패</p>;

  const rows = data?.data ?? [];

  if (!rows.length)
    return <p className="text-center text-gray-400">요청이 없습니다.</p>;

  const invalidateDirectList = () =>
    qc.invalidateQueries({ queryKey: ["requests", "direct"], exact: false });

  const optimisticallyRemoveRow = (moveRequestId: number) => {
    const snapshots = qc.getQueriesData<DirectListResponse>({
      queryKey: ["requests", "direct"] as const,
    });
    for (const [key, snapshot] of snapshots) {
      if (!snapshot) continue;
      qc.setQueryData<DirectListResponse>(key, {
        ...snapshot,
        data: snapshot.data?.filter((r) => r.id !== moveRequestId) ?? [],
      });
    }
  };

  return (
    <section className="mx-auto max-w-5xl px-2">
      <div className="grid grid-cols-1 place-items-center gap-2 p-2 pt-0 sm:pt-[35px] lg:grid-cols-2">
        {rows.map((r) => {
          const chip = svcMap[r.serviceType];
          const isPending = r.direct_request_status === "PENDING";
          const customerName = r.customer_name
            ? `${r.customer_name}`
            : "고객님";
          return (
            <div key={r.direct_request_id} className="w-full">
              <ReceivedRequestCard
                className="w-full"
                key={r.direct_request_id}
                customerName={customerName}
                from={r.departure}
                to={r.destination}
                movingDate={new Date(r.moveDate).toLocaleDateString("ko-KR")}
                requestTime={new Date(
                  r.direct_request_created_at,
                ).toLocaleString("ko-KR")}
                requestType={
                  r.direct_request_status === "PENDING"
                    ? "지정 요청 (대기)"
                    : r.direct_request_status === "ACCEPTED"
                      ? "지정 요청 (수락)"
                      : r.direct_request_status === "REJECTED"
                        ? "지정 요청 (반려)"
                        : "지정 요청 (만료)"
                }
                chips={[
                  { label: chip.label, iconSrc: chip.iconSrc, size: "sm" },
                  {
                    label: "지정 견적",
                    iconSrc: "/icons/ic_document.svg",
                    size: "sm",
                  },
                ]}
                onSendQuote={() => estimateTriggerRefs.current[r.id]?.click?.()}
                onReject={() => rejectTriggerRefs.current[r.id]?.click?.()}
                sendDisabled={!isPending || rejectMutation.isPending}
                rejectDisabled={!isPending || rejectMutation.isPending}
              />
              <SendEstimateModal
                trigger={
                  <button
                    ref={(el) => {
                      estimateTriggerRefs.current[r.id] = el;
                    }}
                    className="hidden"
                  />
                }
                customerName={customerName}
                moveRequestId={r.id}
                departure={r.departure}
                destination={r.destination}
                moveDate={r.moveDate}
                quoteType="DIRECT"
                chips={[
                  { label: chip.label, iconSrc: chip.iconSrc, size: "sm" },
                  {
                    label: "지정 견적",
                    iconSrc: "/icons/ic_document.svg",
                    size: "sm",
                  },
                ]}
                onSent={() => {
                  optimisticallyRemoveRow(r.id);
                  invalidateDirectList();
                }}
              />
              <RejectRequestModal
                trigger={
                  <button
                    ref={(el) => {
                      rejectTriggerRefs.current[r.id] = el;
                    }}
                    className="hidden"
                  />
                }
                customerName={customerName}
                departure={r.departure}
                destination={r.destination}
                moveDate={r.moveDate}
                chips={[
                  { label: chip.label, iconSrc: chip.iconSrc, size: "sm" },
                  {
                    label: "지정 견적",
                    iconSrc: "/icons/ic_document.svg",
                    size: "sm",
                  },
                ]}
                pending={rejectMutation.isPending}
                onConfirm={async (comment) => {
                  await rejectMutation.mutateAsync({
                    directRequestId: r.direct_request_id,
                    comment,
                  });
                  optimisticallyRemoveRow(r.id);
                  invalidateDirectList();
                  await alert({
                    title: "반려 성공",
                    message: "반려 처리되었습니다.",
                  });
                }}
              />
            </div>
          );
        })}
      </div>
      <Modal />
    </section>
  );
}
