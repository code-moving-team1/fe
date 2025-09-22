import React from "react";

interface CardDateInfoProps {
  movingDate: string;
}

export default function CardDateInfo({ movingDate }: CardDateInfoProps) {
  return (
    <div className="text-sm">
      <p className="font-medium text-gray-400">이사일</p>
      <p className="font-bold">{movingDate}</p>
    </div>
  );
}
