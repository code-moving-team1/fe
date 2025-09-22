import Card from "./Card";
import CardHeaderCustomer from "./CardHeaderCustomer";
import CardRouteInfo from "./CardRouteInfo";
import CardDateInfo from "./CardDateInfo";
import CardPrice from "./CardPrice";
import { ServiceChip } from "../chip";

interface CustomerEstimateCardProps {
  customerName: string;
  from: string;
  to: string;
  movingDate: string;
  moveType: string;
  requestType: string;
  price: number;
  className?: string;
  children?: React.ReactNode;
}

export default function CustomerEstimateCard({
  customerName,
  from,
  to,
  movingDate,
  moveType,
  requestType,
  price,
  className,
  children,
}: CustomerEstimateCardProps) {
  return (
    <Card className={`w-md space-y-5 ${className || ""}`}>
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

      <div className="flex justify-between items-center pt-3 border-t border-gray-200">
        <span className="font-bold text-sm">견적 금액</span>
        <CardPrice amount={price} className="" showLabel={false} />
      </div>

      {children && <>{children}</>}
    </Card>
  );
}
