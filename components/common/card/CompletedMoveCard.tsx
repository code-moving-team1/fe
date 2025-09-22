import CustomerEstimateCard from "./CustomerEstimateCard";
import { Buttons } from "../button";

interface CompletedMoveCardProps {
  customerName: string;
  from: string;
  to: string;
  movingDate: string;
  moveType: string;
  requestType: string;
  price: number;
  className?: string;
}

export default function CompletedMoveCard({
  customerName,
  from,
  to,
  movingDate,
  moveType,
  requestType,
  price,
  className,
}: CompletedMoveCardProps) {
  return (
    <CustomerEstimateCard
      customerName={customerName}
      from={from}
      to={to}
      movingDate={movingDate}
      moveType={moveType}
      requestType={requestType}
      price={price}
      className={`relative ${className || ""}`}
    >
      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center rounded-xl text-white space-y-3">
        <p className="text-lg font-semibold">이사 완료된 견적이에요</p>
        <Buttons
          variant="outline"
          size="figma"
          state="active"
          className="px-4 py-2 border border-red-400 text-red-500 rounded-lg bg-white"
        >
          견적 상세보기
        </Buttons>
      </div>
    </CustomerEstimateCard>
  );
}
