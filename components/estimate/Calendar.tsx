"use client";

import { useState } from "react";
import dayjs from "dayjs";
import { useEstimateStore } from "@/store/estimateStore";
import MobileCalendar from "./MobileCalendar";
import DesktopCalendarDropdown from "./DesktopCalendarDropdown";

export default function Calendar() {
  const { date, setDate } = useEstimateStore();
  const today = dayjs().startOf("day");

  const initialView = date
    ? dayjs(date).startOf("month")
    : today.startOf("month");
  const [view, setView] = useState(initialView);

  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

  const handlePick = (day: number) => {
    const selected = view.date(day).startOf("day");
    if (selected.isBefore(today) || selected.isSame(today)) return;
    setDate(selected.format("YYYY-MM-DD"));
  };

  const handlePrevMonth = () => setView((v) => v.subtract(1, "month"));
  const handleNextMonth = () => setView((v) => v.add(1, "month"));

  return (
    <>
      <div className="block lg:hidden">
        <MobileCalendar
          date={date}
          view={view}
          today={today}
          weekDays={weekDays}
          onPick={handlePick}
          onPrev={handlePrevMonth}
          onNext={handleNextMonth}
        />
      </div>

      <div className="relative hidden lg:block">
        <DesktopCalendarDropdown
          date={date}
          view={view}
          setView={setView}
          onPick={handlePick}
          today={today}
          weekDays={weekDays}
        />
      </div>
    </>
  );
}
