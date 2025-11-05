// components/sent/QuoteListItem.tsx
import CustomerEstimateCard from "@/components/common/card/CustomerEstimateCard";
import CompletedMoveCard from "@/components/common/card/CompletedMoveCard";
import RejectedRequestCard from "@/components/common/card/RejectedRequestCard";

function formatKoreanDate(input: string | Date) {
  const d = typeof input === "string" ? new Date(input) : input;
  if (Number.isNaN(d.getTime())) return "";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}년 ${m}월 ${day}일`;
}

function formatAddress(address: string) {
  if (!address) return "";
  const parts = address.trim().split(/\s+/);
  const guIdx = parts.findIndex((t) => /구$/.test(t));
  if (guIdx !== -1) return parts.slice(0, guIdx + 1).join(" ");
  const cityOrGunIdx = parts.findIndex((t) => /(시|군)$/.test(t));
  if (cityOrGunIdx !== -1) return parts.slice(0, cityOrGunIdx + 1).join(" ");
  return parts.slice(0, Math.min(3, parts.length)).join(" ");
}

const SERVICE_LABEL: Record<string, string> = {
  SMALL: "소형이사",
  FAMILY: "가정이사",
  OFFICE: "사무실이사",
};

export default function QuoteListItem({ item }: { item: any }) {
  const serviceLabel = SERVICE_LABEL[item.serviceType] ?? "이사";
  const name = item.customerName ?? "고객님";

  const chips = [
    { label: serviceLabel, iconSrc: "/icons/ic_box.svg" },
    ...(item.myQuote.type === "DIRECT"
      ? [{ label: "지정 견적 요청", iconSrc: "/icons/ic_document.svg" }]
      : []),
  ];

  const isRejected = item.myQuote.status === "REJECTED";
  const isCompleted = item.myQuote.status === "ACCEPTED";

  const baseProps = {
    customerName: name,
    from: formatAddress(item.departure),
    to: formatAddress(item.destination),
    movingDate: formatKoreanDate(item.moveDate),
    requestType: serviceLabel,
    moveType: serviceLabel,
    price: item.myQuote.price ?? 0,
  };

  if (isRejected) {
    return (
      <RejectedRequestCard
        {...baseProps}
        chips={chips}
        className="h-[285px] border border-gray-200 bg-white"
      />
    );
  }

  if (isCompleted) {
    return (
      <CompletedMoveCard
        {...baseProps}
        {...(item.quoteId ? { quoteId: item.quoteId } : {})}
        chips={chips}
        className="border border-gray-200 bg-white md:h-[285px]"
      />
    );
  }

  return (
    <CustomerEstimateCard
      {...baseProps}
      className="border border-gray-200 bg-white transition-all duration-200 hover:scale-[1.01] hover:border-red-400 hover:shadow-[0_4px_12px_rgba(239,68,68,0.25)]"
      chips={chips}
    />
  );
}
