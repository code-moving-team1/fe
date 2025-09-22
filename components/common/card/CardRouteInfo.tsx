import React from "react";

interface CardRouteInfoProps {
  from: string;
  to: string;
  showArrow?: boolean;
}

export default function CardRouteInfo({
  from,
  to,
  showArrow = true,
}: CardRouteInfoProps) {
  return (
    <div className="flex gap-7 mt-1 text-sm font-bold">
      <div className="flex flex-col items-start">
        <p className="text-gray-400 text-xs">출발지</p>
        <p className="font-bold">{from}</p>
      </div>

      {showArrow && <div className="flex items-center mt-3">→</div>}

      <div className="flex flex-col items-start">
        <p className="text-gray-400 text-xs">도착지</p>
        <p className="font-bold">{to}</p>
      </div>
    </div>
  );
}
