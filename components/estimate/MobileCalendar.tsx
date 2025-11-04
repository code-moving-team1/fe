"use client";

import dayjs from "dayjs";

export default function MobileCalendar({
  date,
  view,
  today,
  weekDays,
  onPick,
  onPrev,
  onNext,
}: {
  date: string | null;
  view: dayjs.Dayjs;
  today: dayjs.Dayjs;
  weekDays: string[];
  onPick: (day: number) => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const firstDayOfMonth = view.startOf("month").day();
  const daysInMonth = view.daysInMonth();

  return (
    <div className="w-full rounded-xl border border-gray-100 bg-white px-3 pt-4 pb-3">
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          aria-label="이전 달"
          onClick={onPrev}
          className="px-2 py-1"
        >
          <span className="text-xl">‹</span>
        </button>
        <p className="text-[18px] font-semibold">
          {view.year()}. {String(view.month() + 1).padStart(2, "0")}
        </p>
        <button
          type="button"
          aria-label="다음 달"
          onClick={onNext}
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

          const isToday = current.isSame(today);
          const isPast = current.isBefore(today);
          const disabled = isPast || isToday;
          const selected = date === formatted;

          return (
            <button
              key={day}
              type="button"
              onClick={() => onPick(day)}
              disabled={disabled}
              aria-pressed={selected}
              aria-current={isToday ? "date" : undefined}
              className={[
                "flex aspect-square w-full items-center justify-center rounded-full text-[14px] transition-colors",
                selected ? "bg-red-500 text-white" : "",
                isToday && !selected
                  ? "border border-red-400 font-semibold text-red-400"
                  : "",
                disabled
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
  );
}
