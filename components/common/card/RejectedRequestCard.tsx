import Card from "./Card";
import CardHeaderCustomer from "./CardHeaderCustomer";
import CardRouteInfo from "./CardRouteInfo";
import CardDateInfo from "./CardDateInfo";
import CardPrice from "./CardPrice";
import { ServiceChip } from "../chip";

interface RejectedRequestCardProps {
  customerName: string;
  from: string;
  to: string;
  movingDate: string;
  moveType: string;
  requestType: string;
  price: number;
  className?: string;
}

export default function RejectedRequestCard({
  customerName,
  from,
  to,
  movingDate,
  moveType,
  requestType,
  price,
  className,
}: RejectedRequestCardProps) {
  return (
    <Card className={`w-md space-y-5 relative ${className || ""}`}>
      <div className="space-y-3">
        <div className="flex flex-wrap gap-3">
          <ServiceChip iconSrc="/icons/ic_box.svg" size="sm">
            소형이사
          </ServiceChip>
          <ServiceChip iconSrc="/icons/ic_document.svg" size="sm">
            지정 견적 요청
          </ServiceChip>
        </div>
      </div>

      <CardHeaderCustomer customerName={customerName} />

      <div className="flex justify-between text-sm font-bold">
        <CardRouteInfo from={from} to={to} />
        <CardDateInfo movingDate={movingDate} />
      </div>

      {/* 반려 오버레이 */}
      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center rounded-xl text-white">
        <p className="text-lg font-semibold">반려된 요청이에요</p>
      </div>
    </Card>
  );
}
