import Card from "./Card";
import CardHeaderCustomer from "./CardHeaderCustomer";
import CardRouteInfo from "./CardRouteInfo";
import CardDateInfo from "./CardDateInfo";
import CardPrice from "./CardPrice";
import { ServiceChip } from "../chip";
import { ServiceChipProps } from "../chip/presets";

interface CustomerEstimateCardProps {
  customerName: string;
  from: string;
  to: string;
  movingDate: string;
  requestType: string;
  price: number;
  className?: string;
  moveType: string;
  children?: React.ReactNode;
  chips?: (Omit<ServiceChipProps, "iconSrc"> & {
    label: string;
    iconSrc: string;
  })[];
}

export default function CustomerEstimateCard({
  customerName,
  from,
  to,
  movingDate,
  requestType,
  moveType,
  price,
  className,
  children,
  chips = [],
}: CustomerEstimateCardProps) {
  return (
    <Card className={`w-full space-y-5 ${className || ""}`}>
      <div className="space-y-3">
        {chips.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {chips.map((chip, idx) => (
              <ServiceChip key={idx} iconSrc={chip.iconSrc} size="sm">
                {chip.label}
              </ServiceChip>
            ))}
          </div>
        )}
      </div>

      <CardHeaderCustomer customerName={customerName} />

      <div className="flex flex-col gap-2 text-sm font-semibold md:flex-row md:items-start md:justify-between md:text-xs md:font-medium">
        <div className="order-1 min-w-0 md:order-0 md:flex-1">
          <CardRouteInfo from={from} to={to} />
        </div>

        <div className="order-2 md:order-0 md:shrink-0">
          <CardDateInfo movingDate={movingDate} />
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-gray-200 pt-3">
        <span className="text-sm font-bold">견적 금액</span>
        <CardPrice amount={price} className="" showLabel={false} />
      </div>

      {children && <>{children}</>}
    </Card>
  );
}
