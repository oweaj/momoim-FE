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
  onChange?: (value: string) => void;
}

export function Select({ size, data, value, placeholder, onChange }: SelectProps) {
  return (
    <SelectWrap value={value} onValueChange={onChange}>
      <SelectTrigger className={clsx("w-24 border-gray-400", size)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {data.map((select) => (
            <SelectItem key={select.value} value={select.value}>
              {select.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </SelectWrap>
  );
}
