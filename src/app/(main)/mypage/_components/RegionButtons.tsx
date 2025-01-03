import { REGIONS } from "@/constants/options";
import clsx from "clsx";
import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";

interface RegionProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  multiple?: boolean;
}

export default function RegionButtons<T extends FieldValues>({ form, multiple = false }: RegionProps<T>) {
  const regionList = REGIONS || [];
  const selectValue = form.watch("regions" as Path<T>) as string | string[];

  const handleMultiClick = (value: string) => {
    if (multiple) {
      let newValue;
      if (value === "ALL") {
        newValue = [value];
      } else {
        if (selectValue.includes("ALL")) {
          (selectValue as string[]).pop();
        }
        const currentValue = Array.isArray(selectValue) ? selectValue : [];
        newValue = currentValue.includes(value)
          ? currentValue.filter((sub) => sub !== value)
          : [...currentValue, value];
      }
      form.setValue("regions" as Path<T>, newValue as PathValue<T, Path<T>>);
    } else {
      form.setValue("regions" as Path<T>, value as PathValue<T, Path<T>>);
    }
    form.trigger("regions" as Path<T>);
  };

  const handleSubSelect = (sub: string) => {
    if (Array.isArray(selectValue)) {
      return selectValue.includes(sub);
    }
    return selectValue === sub;
  };

  return (
    <ul className="flex flex-wrap gap-4">
      {regionList.map((sub) => (
        <li key={sub.value}>
          <button
            type="button"
            className={clsx(
              "rounded-xl bg-gray-100 px-4 py-3 text-sm font-medium text-gray-700 transition-all sm:text-base",
              handleSubSelect(sub.value) && "bg-gray-250 text-main",
            )}
            onClick={() => handleMultiClick(sub.value)}
          >
            {sub.label}
          </button>
        </li>
      ))}
    </ul>
  );
}
