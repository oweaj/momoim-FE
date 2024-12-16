import {
  Select as SelectWrap,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import clsx from "clsx";

interface SelectProps {
  size?: string;
  data: readonly { value: string; label: string }[];
  value?: string;
  placeholder?: string;
  firstItem?: boolean;
  onChange?: (value: string) => void;
}

export function Select({ size, data, value, placeholder, firstItem, onChange }: SelectProps) {
  const firstItemFilter = firstItem ? data.slice(1) : data;

  return (
    <SelectWrap
      value={value}
      defaultValue={firstItem ? firstItemFilter[0].value : data[0].value}
      onValueChange={onChange}
    >
      <SelectTrigger className={clsx("w-24 border-gray-400", size)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {firstItem
            ? firstItemFilter.map((select) => (
                <SelectItem key={select.value} value={select.value}>
                  {select.label}
                </SelectItem>
              ))
            : data.map((select) => (
                <SelectItem key={select.value} value={select.value}>
                  {select.label}
                </SelectItem>
              ))}
        </SelectGroup>
      </SelectContent>
    </SelectWrap>
  );
}
