import Card from "./Card";
import MoverMessage from "./Mover/MoverMessage";
import MoverAvatar from "./Mover/MoverAvatar";
import MoverName from "./Mover/MoverName";
import MoverStats from "./Mover/MoverStats";
import LikeCounter from "./Mover/LikeCounter";
import CardPrice from "./CardPrice";
import { ServiceChip } from "../chip";
import EstimateStatus from "./EstimateStatus";

interface EstimateHistoryCardProps {
  message: string;
  driverName: string;
  avatarUrl?: string;
  rating: number;
  reviewCount: number;
  careerYears: number;
  confirmedCount: number;
  liked: number;
  price: number;
  className?: string;
  status: "confirmed" | "waiting";
}

export default function EstimateHistoryCard({
  message,
  driverName,
  avatarUrl,
  rating,
  reviewCount,
  careerYears,
  confirmedCount,
  liked,
  price,
  className,
  status,
}: EstimateHistoryCardProps) {
  return (
    <Card className={`w-md space-y-4 border-none ${className || ""}`}>
      <div className="flex flex-wrap gap-2 items-center">
        <ServiceChip iconSrc="/icons/ic_box.svg" size="sm">
          사무실이사
        </ServiceChip>
        <ServiceChip iconSrc="/icons/ic_document.svg" size="sm">
          지정 견적 요청
        </ServiceChip>
        <EstimateStatus
          status={status}
          className={status === "waiting" ? "ml-19" : "ml-13"}
        />
      </div>

      <MoverMessage message={message} />

      <div className="border rounded-xl border-gray-300 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MoverAvatar avatarUrl={avatarUrl} size={40} />
          <div>
            <MoverName MoverName={driverName} className="text-sm" />
            <MoverStats
              rating={rating}
              reviewCount={reviewCount}
              careerYears={careerYears}
              confirmedCount={confirmedCount}
              className="mt-1"
            />
          </div>
        </div>
        <LikeCounter count={liked} className="mb-6" />
      </div>

      <div className="flex justify-end items-center pt-3">
        <CardPrice amount={price} />
      </div>
    </Card>
  );
}
