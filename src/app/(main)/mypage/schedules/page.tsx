"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { ScheduleData } from "@/types/common/scheduleData";
import { useSchedule } from "@/queries/mypage/useSchedule";
import ScheduleBox from "../_components/ScheduleBox";
import { MyPageCalendar } from "../_components/MyPageCalendar";
import MySchedulesSkeleton from "../_components/skeletons/MySchedulesSkeleton";
import ClientRedirectHandler from "../_components/ClientRedirectHandler";

export default function MySchedule() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentDate, setCurrentDate] = React.useState<Date | undefined>(new Date());

  const { data, isLoading, isFetching } = useSchedule(currentYear);

  if (isLoading || isFetching) return <MySchedulesSkeleton />;

  const customContent =
    data?.data.map((item: ScheduleData) => {
      const fullDate = format(item.nextGatheringAt, "yyyy/MM/dd").split("/");
      const [year, month, day] = fullDate;
      return { date: new Date(+year, +month - 1, +day), content: "exist" };
    }) || [];

  return (
    <div>
      <div className="flex w-full flex-col gap-6 md:flex-row">
        <MyPageCalendar
          className="flex-grow overflow-hidden md:w-1/2"
          mode="single"
          selected={currentDate}
          onSelect={setCurrentDate}
          onDateChange={(date) => {
            setSelectedDate(date);
          }}
          onYearChange={(year) => {
            setCurrentYear(year);
          }}
          formatters={{
            formatCaption: (date) => format(date, "yyyy년 MM월", { locale: ko }),
            formatWeekdayName: (day) => format(day, "EEEEE", { locale: ko }),
          }}
          currentMonth={currentMonth}
          setCurrentMonth={setCurrentMonth}
          customContent={customContent}
        />
        <ScheduleBox data={data?.data ? data?.data : []} date={selectedDate} />
      </div>
    </div>
  );
}
