"use client";

import { FormFieldWrapper } from "@/components/common/FormFieldWrapper";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Control } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

interface PasswordFieldProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder: string;
}

export function PasswordField({ control, name, label, placeholder }: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormFieldWrapper
      control={control}
      name={name}
      label={label}
      renderContent={(field) => (
        <div className="relative">
          <Input type={showPassword ? "text" : "password"} placeholder={placeholder} {...field} />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            aria-label={`${label} 보기/숨기기 토글`}
          >
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </div>
      )}
    />
  );
}
