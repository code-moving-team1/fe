import React from "react";

interface CardRouteInfoProps {
  from: string;
  to: string;
  showArrow?: boolean;
  className?: string;
}

export default function CardRouteInfo({
  from,
  to,
  showArrow = true,
  className = "",
}: CardRouteInfoProps) {
  return (
    <div className={`mt-0 flex gap-2 sm:gap-5 ${className}`}>
      <div className="flex flex-col items-start">
        <p className="text-[14px] text-gray-400 sm:text-[16px]">출발지</p>
        <p className="text-[14px] font-bold break-keep sm:text-[18px]">
          {from}
        </p>
      </div>

      {showArrow && <div className="mt-4.5 flex items-center sm:mt-5.5">→</div>}

      <div className="flex flex-col items-start">
        <p className="text-[14px] text-gray-400 sm:text-[16px]">도착지</p>
        <p className="text-[14px] font-bold break-keep sm:text-[18px]">{to}</p>
      </div>
    </div>
  );
}
