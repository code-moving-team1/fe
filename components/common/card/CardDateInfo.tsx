"use client";

import React from "react";
import dayjs from "dayjs";

interface CardDateInfoProps {
  movingDate: string;
  className?: string;
}

export default function CardDateInfo({
  movingDate,
  className = "",
}: CardDateInfoProps) {
  console.log("movingDate >>>", movingDate);

  const isFormattedKorean =
    movingDate?.includes("년") && movingDate?.includes("월");
  const formattedDate = isFormattedKorean
    ? movingDate
    : movingDate
      ? dayjs(movingDate.replace(" ", "T")).format("YYYY.MM.DD")
      : "-";

  return (
    <div className={`flex flex-col items-start ${className}`}>
      <p className="text-[14px] text-gray-400 sm:text-[16px]">이사일</p>
      <p className="text-[14px] font-bold sm:text-[18px]">{formattedDate}</p>
    </div>
  );
}
