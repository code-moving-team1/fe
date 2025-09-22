import Image from "next/image";

interface MoverStatsProps {
  rating: number;
  reviewCount: number;
  careerYears: number;
  confirmedCount: number;
  className?: string;
}

export default function MoverStats({
  rating,
  reviewCount,
  careerYears,
  confirmedCount,
  className = "",
}: MoverStatsProps) {
  return (
    <div
      className={`flex items-center gap-3 text-sm text-gray-600 ${className}`}
    >
      <div className="flex items-center gap-1">
        <Image
          src={"/icons/ic_star.svg"}
          alt="별"
          width={16}
          height={16}
          className=""
        />

        <span className="font-semibold">{rating.toFixed(1)}</span>
        <span className="text-gray-400">({reviewCount})</span>
      </div>

      <span className="text-gray-300">|</span>

      <span>
        경력 <span className="text-black font-medium">{careerYears}년</span>
      </span>

      <span className="text-gray-300">|</span>

      <span>
        <span className="text-black font-medium">{confirmedCount}건</span>{" "}
        <span className="text-gray-400">확정</span>
      </span>
    </div>
  );
}
