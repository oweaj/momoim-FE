"use client";

import { UseFormReturn } from "react-hook-form";
import { SignUpFormData } from "@/types/auth";
import { REGIONS, CATEGORIES } from "@/constants/options";
import { FormFieldWrapper } from "@/components/common/FormFieldWrapper";
import { SelectButton } from "./SelectButton";

interface StepTwoProps {
  form: UseFormReturn<SignUpFormData>;
}

export function StepTwo({ form }: StepTwoProps) {
  const handleSelection = (value: string, currentValues: string[], onChange: (values: string[]) => void) => {
    if (value === "ALL") {
      onChange(["ALL"]);
    } else {
      const newValue = currentValues.filter((v) => v !== "ALL" && v !== value);
      if (!currentValues.includes(value)) {
        newValue.push(value);
      }
      if (newValue.length === 0) {
        newValue.push("ALL");
      }
      onChange(newValue);
    }
  };

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="mb-2 text-2xl font-bold">{form.getValues("name")} 님의 관심 카테고리</h2>
        <p className="text-gray-700">더 좋은 서비스를 제공하기 위해 몇가지 작성할게 있어요!</p>
      </div>

      <FormFieldWrapper
        control={form.control}
        name="regions"
        label="활동할 지역"
        renderContent={(field) => (
          <div className="flex flex-wrap justify-center gap-2">
            {REGIONS.map(({ value, label }) => (
              <SelectButton
                key={value}
                selected={field.value.includes(value)}
                onClick={() => handleSelection(value, field.value, field.onChange)}
              >
                {label}
              </SelectButton>
            ))}
          </div>
        )}
      />
      <FormFieldWrapper
        control={form.control}
        name="interestCategories"
        label="관심 카테고리"
        renderContent={(field) => (
          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORIES.map(({ value, label }) => (
              <SelectButton
                key={value}
                selected={field.value.includes(value)}
                onClick={() => handleSelection(value, field.value, field.onChange)}
              >
                {label}
              </SelectButton>
            ))}
          </div>
        )}
      />
    </div>
  );
}
