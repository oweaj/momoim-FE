"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ChevronDown } from "lucide-react";
import { GATHERING_SORT_OPTIONS, LOCATIONS } from "@/constants/options";
import { Select } from "@/components/common/select/Select";
import { ko } from "date-fns/locale";

interface FiltersProps {
  onLocationChange: (value: string) => void;
  onDateChange: (date: Date | undefined) => void;
  onSortChange: (value: string) => void;
  selectedLocation?: string;
  selectedDate?: Date;
  selectedSort?: string;
}

export function Filters({
  onLocationChange,
  onDateChange,
  onSortChange,
  selectedLocation,
  selectedDate,
  selectedSort,
}: FiltersProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [tempDate, setTempDate] = useState<Date | undefined>(selectedDate);

  const handleReset = () => {
    setTempDate(undefined);
    onDateChange(undefined);
    setIsCalendarOpen(false);
  };

  const handleConfirm = () => {
    onDateChange(tempDate);
    setIsCalendarOpen(false);
  };

  return (
    <div className="flex flex-col items-end justify-between gap-2 xs:flex-row xs:items-baseline">
      <div className="flex gap-2">
        {/* 지역 선택 */}
        <Select data={LOCATIONS} value={selectedLocation} onChange={onLocationChange} />

        {/* 날짜 선택 */}
        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="flex h-9 min-w-24 items-center justify-between whitespace-nowrap rounded-md border border-gray-400 bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
            >
              {selectedDate ? format(selectedDate, "yyyy년 MM월 dd일", { locale: ko }) : "모든 날짜"}
              <ChevronDown className="h-4 w-4 opacity-50" />
            </button>
          </PopoverTrigger>

          <PopoverContent className="w-auto rounded-md p-0 shadow-md" align="start">
            <Calendar
              mode="single"
              selected={tempDate}
              onSelect={(newDate) => {
                setTempDate(newDate ?? undefined);
              }}
              locale={ko}
              className="p-2"
            />
            <div className="flex w-full items-center justify-between gap-4 px-3 py-2">
              <Button variant="outline" size="sm" className="w-full" onClick={handleReset}>
                초기화
              </Button>
              <Button size="sm" className="w-full" onClick={handleConfirm}>
                확인
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* 정렬 기준 */}
      <Select data={GATHERING_SORT_OPTIONS} value={selectedSort} onChange={onSortChange} />
    </div>
  );
}
