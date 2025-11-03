"use client";

import { useState } from "react";
import dayjs from "dayjs";
import { useEstimateStore } from "@/store/estimateStore";
import Image from "next/image";

export default function Calendar() {
  const { date, setDate } = useEstimateStore();

  const today = dayjs().startOf("day");

  const initialView = date
    ? dayjs(date).startOf("month")
    : today.startOf("month");
  const [view, setView] = useState(initialView);

  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

  const firstDayOfMonth = view.day();
  const daysInMonth = view.daysInMonth();

  const handleDateClick = (day: number) => {
    const selected = view.date(day).startOf("day");
    if (selected.isBefore(today)) return;
    setDate(selected.format("YYYY-MM-DD"));
  };

  const handlePrevMonth = () => setView((v) => v.subtract(1, "month"));
  const handleNextMonth = () => setView((v) => v.add(1, "month"));

  return (
    <>
      <div className="block lg:hidden">
        <div className="w-full rounded-xl border border-gray-100 bg-white px-3 pt-4 pb-3">
          <div className="mb-3 flex items-center justify-between">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="px-2 py-1"
            >
              <span className="text-xl">‹</span>
            </button>
            <p className="text-[18px] font-semibold">
              {view.year()}. {String(view.month() + 1).padStart(2, "0")}
            </p>
            <button
              type="button"
              onClick={handleNextMonth}
              className="px-2 py-1"
            >
              <span className="text-xl">›</span>
            </button>
          </div>

          <div className="mb-2 grid grid-cols-7 text-center text-[12px] font-medium text-gray-500">
            {weekDays.map((d) => (
              <div
                key={d}
                className="flex aspect-square items-center justify-center"
              >
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const current = view.date(day).startOf("day");
              const formatted = current.format("YYYY-MM-DD");

              const isPast = current.isBefore(today);
              const isToday = current.isSame(today);
              const isSelected = date === formatted;

              return (
                <button
                  type="button"
                  key={day}
                  onClick={() => handleDateClick(day)}
                  disabled={isPast}
                  className={[
                    "flex aspect-square w-full items-center justify-center rounded-full text-[14px] transition-colors",
                    isSelected ? "bg-red-500 text-white" : "",
                    !isSelected && isToday ? "border border-red-400" : "",
                    isPast
                      ? "cursor-not-allowed text-gray-300"
                      : "hover:bg-gray-100 active:bg-gray-200",
                  ].join(" ")}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="relative hidden lg:block">
        <DesktopCalendarDropdown
          date={date}
          view={view}
          setView={setView}
          onPick={(day) => {
            const selected = view.date(day).startOf("day");
            if (selected.isBefore(today)) return;
            setDate(selected.format("YYYY-MM-DD"));
          }}
          today={today}
          weekDays={weekDays}
        />
      </div>
    </>
  );
}

function DesktopCalendarDropdown({
  date,
  view,
  setView,
  onPick,
  today,
  weekDays,
}: {
  date: string | null;
  view: dayjs.Dayjs;
  setView: (updater: (v: dayjs.Dayjs) => dayjs.Dayjs) => void;
  onPick: (day: number) => void;
  today: dayjs.Dayjs;
  weekDays: string[];
}) {
  const [open, setOpen] = useState(false);

  const firstDayOfMonth = view.day();
  const daysInMonth = view.daysInMonth();

  const handleConfirm = () => setOpen(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
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
        <>
          <div className="fixed inset-0 z-0" onClick={() => setOpen(false)} />
          <div className="absolute z-10 mt-2 w-80 rounded-lg border bg-white p-4 shadow-lg">
            <div className="mb-2 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setView((v) => v.subtract(1, "month"))}
                className="px-2"
              >
                ◀
              </button>
              <p className="font-semibold">
                {view.year()}.{String(view.month() + 1).padStart(2, "0")}
              </p>
              <button
                type="button"
                onClick={() => setView((v) => v.add(1, "month"))}
                className="px-2"
              >
                ▶
              </button>
            </div>

            <div className="mb-1 grid grid-cols-7 text-center text-sm font-medium text-gray-500">
              {weekDays.map((d) => (
                <div key={d}>{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2 text-center">
              {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}

              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const current = view.date(day).startOf("day");
                const formatted = current.format("YYYY-MM-DD");

                const isPast = current.isBefore(today);
                const isToday = current.isSame(today);
                const isSelected = date === formatted;

                return (
                  <button
                    type="button"
                    key={day}
                    onClick={() => onPick(day)}
                    disabled={isPast}
                    className={[
                      "rounded p-2 transition-colors",
                      isSelected ? "bg-red-500 text-white" : "",
                      !isSelected && isToday ? "border border-red-400" : "",
                      isPast
                        ? "cursor-not-allowed text-gray-300"
                        : "hover:bg-gray-100",
                    ].join(" ")}
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
        </>
      )}
    </div>
  );
}
