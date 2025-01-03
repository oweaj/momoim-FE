import * as React from "react";
import { ko } from "date-fns/locale";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface DatePickerProps {
  value?: Date;
  onChange: (date?: Date) => void;
  placeholder?: string;
  showTimePicker?: boolean;
  triggerClassName?: string;
  customTrigger?: React.ReactNode;
}

export function DatePicker({
  value,
  onChange,
  placeholder = "모든 날짜",
  showTimePicker = false,
  triggerClassName,
  customTrigger,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [tempDate, setTempDate] = React.useState<Date | undefined>(value);

  // 팝오버가 닫힐 때 임시 값을 원래 값으로 복원
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open && tempDate !== value) {
      setTempDate(value);
    }
  };

  // 시간 변경 처리
  const handleTimeChange = (type: "hour" | "minute" | "ampm", timeValue: string) => {
    if (!tempDate) return;

    const newDate = new Date(tempDate);
    if (type === "hour") {
      newDate.setHours((parseInt(timeValue, 10) % 12) + (newDate.getHours() >= 12 ? 12 : 0));
    } else if (type === "minute") {
      newDate.setMinutes(parseInt(timeValue, 10));
    } else if (type === "ampm") {
      const currentHours = newDate.getHours();
      newDate.setHours(timeValue === "PM" ? currentHours + 12 : currentHours - 12);
    }

    setTempDate(newDate);
    onChange(newDate);
  };

  // 초기화/확인 버튼 핸들러
  const handleReset = () => {
    setTempDate(undefined);
    onChange(undefined);
    setIsOpen(false);
  };

  const handleConfirm = () => {
    onChange(tempDate);
    setIsOpen(false);
  };

  const defaultTrigger = (
    <button
      type="button"
      className={cn(
        "flex h-9 min-w-24 items-center justify-between whitespace-nowrap",
        "rounded-md border border-gray-400 bg-transparent",
        "px-3 py-2 text-sm",
        "ring-offset-background focus:outline-none focus:ring-1 focus:ring-ring",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "[&>span]:line-clamp-1",
        triggerClassName,
      )}
    >
      {tempDate ? format(tempDate, showTimePicker ? "yyyy년 MM월 dd일 hh:mm aa" : "yyyy년 MM월 dd일") : placeholder}
      <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
    </button>
  );

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>{customTrigger || defaultTrigger}</PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className={cn(showTimePicker && "sm:flex")}>
          <Calendar mode="single" selected={tempDate} onSelect={(date) => setTempDate(date)} initialFocus locale={ko} />

          {showTimePicker && (
            <div className="flex flex-col divide-y sm:h-[274px] sm:flex-row sm:divide-x sm:divide-y-0">
              <ScrollArea className="w-64 px-2 sm:w-auto">
                <div className="flex p-2 sm:flex-col">
                  {Array.from({ length: 12 }, (_, i) => i + 1)
                    .reverse()
                    .map((hour) => (
                      <Button
                        key={hour}
                        size="icon"
                        variant={tempDate && new Date(tempDate).getHours() % 12 === hour % 12 ? "main" : "ghost"}
                        className="aspect-square shrink-0 font-medium sm:w-full"
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
                      variant={tempDate && new Date(tempDate).getMinutes() === minute ? "main" : "ghost"}
                      className="aspect-square shrink-0 font-medium sm:w-full"
                      onClick={() => handleTimeChange("minute", minute.toString())}
                    >
                      {minute.toString().padStart(2, "0")}
                    </Button>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" className="sm:hidden" />
              </ScrollArea>

              <ScrollArea className="w-64 px-2 sm:w-auto">
                <div className="flex p-2 sm:flex-col">
                  {["AM", "PM"].map((ampm) => (
                    <Button
                      key={ampm}
                      size="icon"
                      variant={
                        tempDate &&
                        ((ampm === "AM" && new Date(tempDate).getHours() < 12) ||
                          (ampm === "PM" && new Date(tempDate).getHours() >= 12))
                          ? "main"
                          : "ghost"
                      }
                      className="aspect-square shrink-0 font-medium sm:w-full"
                      onClick={() => handleTimeChange("ampm", ampm)}
                    >
                      {ampm}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}
        </div>
        <div className="flex justify-between gap-2 px-3 py-2">
          <Button variant="outline" size="sm" className="w-full" onClick={handleReset}>
            초기화
          </Button>
          <Button size="sm" className="w-full" onClick={handleConfirm}>
            확인
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
