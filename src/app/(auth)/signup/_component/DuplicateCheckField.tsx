import { FormFieldWrapper } from "@/components/common/FormFieldWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { DuplicateCheckResult, DuplicateCheckType, SignUpFormData } from "@/types/auth";
import { Control } from "react-hook-form";

interface DuplicateCheckFieldProps {
  type: DuplicateCheckType;
  control: Control<SignUpFormData>;
  result: DuplicateCheckResult | null;
  onCheck: () => Promise<void>;
  isDisabled: boolean;
  label: string;
  placeholder: string;
  duplicateMessage?: { message: string; isError: boolean } | null;
}

export function DuplicateCheckField({
  type,
  control,
  result,
  onCheck,
  isDisabled,
  label,
  placeholder,
  duplicateMessage,
}: DuplicateCheckFieldProps) {
  return (
    <FormFieldWrapper
      control={control}
      name={type}
      label={label}
      renderContent={(field) => (
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              {...field}
              placeholder={placeholder}
              onKeyDown={(e) => {
                if (e.key === " ") e.preventDefault();
              }}
            />
            <Button type="button" onClick={onCheck} disabled={isDisabled} variant="outlineMain">
              중복 확인
            </Button>
          </div>
          {(result?.message || duplicateMessage?.message) && (
            <p
              className={cn(
                "text-sm font-medium text-destructive",
                result?.isAvailable ? "text-green-600" : "text-destructive",
              )}
            >
              {result?.message || duplicateMessage?.message}
            </p>
          )}
        </div>
      )}
    />
  );
}
