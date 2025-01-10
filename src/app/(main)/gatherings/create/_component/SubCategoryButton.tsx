import { SUB_CATEGORIES } from "@/constants/options";
import { CategoryKey } from "@/types/category";
import clsx from "clsx";
import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";

interface SubCategoryProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  category: CategoryKey;
  multiple?: boolean;
}

export default function SubCategoryButton<T extends FieldValues>({
  form,
  category,
  multiple = false,
}: SubCategoryProps<T>) {
  const subCategoryList = SUB_CATEGORIES[category] || [];
  const selectValue = form.watch("subCategory" as Path<T>) as string | string[];

  const handleMultiClick = (value: string) => {
    if (multiple) {
      const currentValue = Array.isArray(selectValue) ? selectValue : [];
      const newValue = currentValue.includes(value)
        ? currentValue.filter((sub) => sub !== value)
        : [...currentValue, value];

      form.setValue("subCategory" as Path<T>, newValue as PathValue<T, Path<T>>);
    } else {
      form.setValue("subCategory" as Path<T>, value as PathValue<T, Path<T>>);
    }
    form.trigger("subCategory" as Path<T>);
  };

  const handleSubSelect = (sub: string) => {
    if (Array.isArray(selectValue)) {
      return selectValue.includes(sub);
    }
    return selectValue === sub;
  };

  return (
    <ul id="subCategory-section" className="flex flex-wrap gap-4">
      {subCategoryList.map((sub) => (
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
