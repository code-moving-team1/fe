"use client";

import { useState } from "react";
import dayjs from "dayjs";
import { useEstimateStore } from "@/store/estimateStore";
import Image from "next/image";

export default function Calendar() {
  const { date, setDate } = useEstimateStore();
  const [open, setOpen] = useState(false);

  const [currentYear, setCurrentYear] = useState(dayjs().year());
  const [currentMonth, setCurrentMonth] = useState(dayjs().month());
  const firstDayOfMonth = dayjs(`${currentYear}-${currentMonth + 1}-01`).day();
  const daysInMonth = dayjs(
    `${currentYear}-${currentMonth + 1}-01`,
  ).daysInMonth();

  const handleDateClick = (day: number) => {
    const selected = dayjs(`${currentYear}-${currentMonth + 1}-${day}`).format(
      "YYYY-MM-DD",
    );
    setDate(selected);
  };

  const handleConfirm = () => {
    setOpen(false);
  };

  const handlePrevMonth = () => {
    const prev = dayjs(`${currentYear}-${currentMonth + 1}-01`).subtract(
      1,
      "month",
    );
    setCurrentYear(prev.year());
    setCurrentMonth(prev.month());
  };

  const handleNextMonth = () => {
    const next = dayjs(`${currentYear}-${currentMonth + 1}-01`).add(1, "month");
    setCurrentYear(next.year());
    setCurrentMonth(next.month());
  };

  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-80 cursor-pointer items-center justify-between rounded-xl border border-gray-300 px-4 py-2"
      >
        <div className="flex items-center gap-2">
          <Image
            src="/icons/ic_calendar.svg"
            alt="달력"
            width={20}
            height={20}
          />
          <span className="font-medium">
            {date ? dayjs(date).format("YYYY년 M월 D일") : "이사 예정일 선택"}
          </span>
        </div>

        <Image
          src="/icons/ic_chevron-down.svg"
          alt="드롭다운 화살표"
          width={25}
          height={25}
        />
      </button>

      {open && (
        <div className="absolute z-10 mt-2 w-80 rounded-lg border bg-white p-4 shadow-lg">
          <div className="mb-2 flex items-center justify-between">
            <button type="button" onClick={handlePrevMonth} className="px-2">
              ◀
            </button>
            <p className="font-semibold">
              {currentYear}.{String(currentMonth + 1).padStart(2, "0")}
            </p>
            <button type="button" onClick={handleNextMonth} className="px-2">
              ▶
            </button>
          </div>

          <div className="mb-1 grid grid-cols-7 text-center text-sm font-medium text-gray-500">
            {weekDays.map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2 text-center">
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const formatted = dayjs(
                `${currentYear}-${currentMonth + 1}-${day}`,
              ).format("YYYY-MM-DD");
              return (
                <button
                  type="button"
                  key={day}
                  onClick={() => handleDateClick(day)}
                  className={`rounded p-2 ${
                    date === formatted
                      ? "bg-red-500 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleConfirm}
            className="mt-4 w-full rounded-lg bg-red-500 py-2 text-white hover:bg-red-600"
          >
            선택완료
          </button>
        </div>
      )}
    </div>
  );
}
