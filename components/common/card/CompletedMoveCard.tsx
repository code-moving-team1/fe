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
  chips?: {
    label: string;
    iconSrc: string;
  }[];
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
  chips,
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
      chips={chips}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 rounded-xl bg-black/50 text-white">
        <p className="text-lg font-semibold">채택된 견적이에요</p>
        <Buttons
          variant="outline"
          size="figma"
          state="active"
          className="rounded-lg border border-red-400 bg-white px-4 py-2 text-red-500"
        >
          견적 상세보기
        </Buttons>
      </div>
    </CustomerEstimateCard>
  );
}
