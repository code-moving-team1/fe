import Card from "./Card";
import MoverAvatar from "./Mover/MoverAvatar";
import MoverName from "./Mover/MoverName";
import MoverDescription from "./Mover/MoverDescription";
import MoverStats from "./Mover/MoverStats";
import MoverMessage from "./Mover/MoverMessage";
import LikeCounter from "./Mover/LikeCounter";
import CardPrice from "./CardPrice";

interface CardHeaderMoverProps {
  driverName: string;
  description: string;
  avatarUrl?: string;
  className?: string;
  rating: number;
  reviewCount: number;
  careerYears: number;
  confirmedCount: number;
}

export default function CardHeaderMover({
  driverName,
  description,
  avatarUrl,
  className,
  rating,
  reviewCount,
  careerYears,
  confirmedCount,
}: CardHeaderMoverProps) {
  return (
    <Card className={`w-130 space-y-3 ${className || ""}`}>
      <div className="flex items-center gap-3 pb-2">
        <MoverAvatar size={80} />

        <div className="flex flex-col gap-y-2">
          <div>
            <MoverMessage message="고객님의 물품을 안전하게 운송해 드립니다." />
            <MoverDescription description={description} />
          </div>

          <div>
            <MoverName MoverName={driverName} className="text-base" />
            <MoverStats
              rating={rating}
              reviewCount={reviewCount}
              careerYears={careerYears}
              confirmedCount={confirmedCount}
              className="mt-1"
            />
          </div>
        </div>

        <LikeCounter count={136} className="ml-8 mt-22" />
      </div>
      <CardPrice amount={180000} className="justify-end mt-4" />
    </Card>
  );
}
