import { GATHERING_SORT_OPTIONS, LOCATIONS } from "@/constants/options";
import { Select } from "@/components/common/select/Select";
import { DatePicker } from "@/components/common/DatePicker";

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
  return (
    <div className="flex flex-col items-end justify-between gap-2 xs:flex-row xs:items-baseline">
      <div className="flex gap-2">
        {/* 지역 선택 */}
        <Select data={LOCATIONS} value={selectedLocation} onChange={onLocationChange} />

        {/* 날짜 선택 */}
        <DatePicker value={selectedDate} onChange={onDateChange} />
      </div>

      {/* 정렬 기준 */}
      <Select data={GATHERING_SORT_OPTIONS} value={selectedSort} onChange={onSortChange} />
    </div>
  );
}
