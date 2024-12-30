"use client";

import * as React from "react";
import { CalendarDays } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface DatePickerFieldProps {
  value: Date;
  onChange: (value: Date | string) => void;
}

export function DateTimePicker({ field }: { field: DatePickerFieldProps }) {
  const [date, setDate] = React.useState<Date>(field.value);
  const [isOpen, setIsOpen] = React.useState(false);

  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      field.onChange(selectedDate);
    }
  };

  const handleTimeChange = (type: "hour" | "minute" | "ampm", value: string) => {
    if (date) {
      const newDate = new Date(date);
      if (type === "hour") {
        newDate.setHours((parseInt(value, 10) % 12) + (newDate.getHours() >= 12 ? 12 : 0));
      } else if (type === "minute") {
        newDate.setMinutes(parseInt(value, 10));
      } else if (type === "ampm") {
        const currentHours = newDate.getHours();
        newDate.setHours(value === "PM" ? currentHours + 12 : currentHours - 12);
      }
      setDate(newDate);
      const formatDate = format(newDate, "yyyy-MM-dd hh:mm:ss");
      field.onChange(formatDate);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-full justify-start border-gray-500 text-left font-normal", !date && "text-muted-foreground")}
        >
          <CalendarDays className="mr-1 h-4 w-4" />
          {date ? (
            format(date, "yyyy/MM/dd hh:mm aa")
          ) : (
            <span className="font-medium text-gray-700">모임 날짜와 시간을 선택해주세요.</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="p-5 sm:flex">
          <Calendar mode="single" selected={date} onSelect={handleDateSelect} initialFocus />
          <div className="flex flex-col divide-y sm:h-[300px] sm:flex-row sm:divide-x sm:divide-y-0">
            <ScrollArea className="w-64 px-2 sm:w-auto">
              <div className="flex p-2 sm:flex-col">
                {hours.reverse().map((hour) => (
                  <Button
                    key={hour}
                    size="icon"
                    variant={date && date.getHours() % 12 === hour % 12 ? "default" : "ghost"}
                    className="aspect-square shrink-0 sm:w-full"
                    onClick={() => handleTimeChange("hour", hour.toString())}
                  >
                    {hour}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>
            <ScrollArea className="w-64 px-2 sm:w-auto">
              <div className="flex p-2 sm:flex-col">
                {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
                  <Button
                    key={minute}
                    size="icon"
                    variant={date && date.getMinutes() === minute ? "default" : "ghost"}
                    className="aspect-square shrink-0 sm:w-full"
                    onClick={() => handleTimeChange("minute", minute.toString())}
                  >
                    {minute}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>
            <ScrollArea className="">
              <div className="flex p-2 sm:flex-col">
                {["AM", "PM"].map((ampm) => (
                  <Button
                    key={ampm}
                    size="icon"
                    variant={
                      date && ((ampm === "AM" && date.getHours() < 12) || (ampm === "PM" && date.getHours() >= 12))
                        ? "default"
                        : "ghost"
                    }
                    className="aspect-square shrink-0 sm:w-full"
                    onClick={() => handleTimeChange("ampm", ampm)}
                  >
                    {ampm}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
