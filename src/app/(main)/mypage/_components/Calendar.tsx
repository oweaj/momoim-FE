"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  highlightedDates?: Date[];
  customContent?: { date: Date; content: React.ReactNode }[];
};

function IconLeft() {
  return (
    <div className="flex w-full items-center justify-end">
      <ChevronLeft className="h-6 w-6" />
    </div>
  );
}
function IconRight() {
  return (
    <div className="flex w-full items-center justify-start">
      <ChevronRight className="h-6 w-6" />
    </div>
  );
}
function HeadRow() {
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const today = new Date().getDay();
  return (
    <tr className="flex w-full justify-between bg-gray-100 px-5 py-6">
      {days.map((day) => {
        return (
          <th
            key={day}
            className={`w-6 rounded-md text-center text-base font-normal ${day === days[today] ? "text-main" : "text-muted-foreground"}`}
          >
            {day}
          </th>
        );
      })}
    </tr>
  );
}

const getModifiers = (customContent: { date: Date; content: React.ReactNode }[]) => {
  return customContent.reduce(
    (acc, { date }) => {
      const key = date.toISOString().split("T")[0];
      acc[key] = date;
      return acc;
    },
    {} as Record<string, Date>,
  );
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  highlightedDates = [],
  customContent = [],
  onDateChange,
  onYearChange,
  ...props
}: CalendarProps & { onDateChange?: (date: Date) => void; onYearChange?: (year: number) => void }) {
  const modifiers = getModifiers(customContent);
  const todayDate = new Date();
  const [selectedDate, setSelectedDate] = useState(todayDate);
  const [currentYear, setCurrentYear] = useState(todayDate.getFullYear());

  const renderDay = (date: Date) => {
    const key = date.toISOString().split("T")[0];
    const custom = customContent.find((item) => item.date.toISOString().split("T")[0] === key);

    const isSelected =
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear();

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const isPast = date < today;

    const isToday =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();

    let additional = "";

    if (isSelected) {
      additional = "rounded-full bg-main text-white";
    } else if (isToday) {
      additional = "rounded-full border-[#A9AAF9] border-2 text-main";
    } else if (custom?.content) {
      additional = isPast ? "text-gray-400" : " text-main";
    }

    return (
      <button
        type="button"
        onClick={() => {
          onDateChange?.(date);
          setSelectedDate(date);
        }}
      >
        <div className="flex h-14 w-6 flex-col items-center pb-6">
          <div className={cn("flex h-8 min-h-8 w-8 items-center justify-center text-center", additional)}>
            {date.getDate()}
          </div>
          {custom?.content && !isSelected && (
            <div className={`aspect-square w-2 rounded-full ${isPast ? "bg-gray-400" : "bg-main"}`} />
          )}
        </div>
      </button>
    );
  };

  const handleMonthChange = (date: Date) => {
    const newYear = date.getFullYear();
    if (newYear !== currentYear) {
      setCurrentYear(newYear);
      onYearChange?.(newYear);
    }
  };

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      onMonthChange={handleMonthChange}
      className={cn(className)}
      modifiers={{
        highlighted: Object.values(modifiers),
      }}
      modifiersClassNames={{
        highlighted: "text-main",
      }}
      classNames={{
        months: "w-full border overflow-hidden border-solid rounded-3xl flex flex-col sm:space-x-4 sm:space-y-0",
        month: "",
        caption: "pt-6 px-5 bg-gray-100 flex justify-center relative items-center text-gray-900 text-lg",
        caption_label: "text-lg font-semibold",
        nav: "space-x-1 flex items-center",
        nav_button: cn("h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"),
        nav_button_previous: "absolute left-4",
        nav_button_next: "absolute right-4",
        table: "w-full border-collapse",
        head_row: "flex w-full justify-between",
        head_cell: `text-muted-foreground rounded-md font-normal text-[0.8rem]`,
        row: "flex w-full mt-2 justify-between px-5 border-b border-gray-300 last:border-b-0",
        day: cn(` hover:bg-none flex flex-col justify-start rounded-full p-0 font-normal aria-selected:opacity-100`),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected: "text-primary-foreground hover:text-primary-foreground focus:text-primary-foreground",
        day_outside: "day-outside text-gray-500 aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft,
        IconRight,
        HeadRow,
        Day: ({ date }) => renderDay(date),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
