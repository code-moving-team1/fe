import Card from "./Card";
import MoverAvatar from "./Mover/MoverAvatar";
import MoverName from "./Mover/MoverName";
import MoverDescription from "./Mover/MoverDescription";
import MoverStats from "./Mover/MoverStats";
import MoverMessage from "./Mover/MoverMessage";
import LikeCounter from "./Mover/LikeCounter";
import CardPrice from "./CardPrice";
import { Buttons } from "../button";
import { ServiceChip } from "../chip";

interface WaitingRequestCardProps {
  driverName: string;
  description: string;
  avatarUrl?: string;
  rating: number;
  reviewCount: number;
  careerYears: number;
  confirmedCount: number;
  price: number;
  likeCount: number;
  moveType: string;
  requestType: string;
  className?: string;
}

export default function WaitingRequestCard({
  driverName,
  description,
  avatarUrl,
  rating,
  reviewCount,
  careerYears,
  confirmedCount,
  price,
  likeCount,
  moveType,
  requestType,
  className,
}: WaitingRequestCardProps) {
  return (
    <Card className={`w-md space-y-4 ${className || ""}`}>
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

      <MoverMessage message="고객님의 물품을 안전하게 운송해 드립니다." />

      <div className="flex items-center gap-3">
        <MoverAvatar avatarUrl={avatarUrl} size={48} />
        <div>
          <MoverName MoverName={driverName} />
          <MoverStats
            rating={rating}
            reviewCount={reviewCount}
            careerYears={careerYears}
            confirmedCount={confirmedCount}
            className="mt-1"
          />
        </div>
        <LikeCounter count={likeCount} className="ml-auto" />
      </div>

      <div className="flex justify-between items-center pt-3 border-t border-gray-200">
        <span className="text-sm text-gray-500">견적 금액</span>
        <CardPrice amount={price} showLabel={false} />
      </div>

      <div className="flex gap-3 pt-3">
        <Buttons
          variant="outline"
          size="figma"
          state="active"
          className="w-1/2"
        >
          상세보기
        </Buttons>
        <Buttons size="figma" className="w-1/2">
          견적 확정하기
        </Buttons>
      </div>
    </Card>
  );
}
