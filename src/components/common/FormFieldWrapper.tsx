import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface FormFieldWrapperProps {
  control: any;
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  formItemCustomStyle?: string;
  customStyle?: string;
  renderContent?: (field: any) => JSX.Element; // 커스텀 렌더링 지원
}

export function FormFieldWrapper({
  control,
  name,
  label,
  placeholder = "",
  type = "text",
  customStyle,
  formItemCustomStyle,
  renderContent,
}: FormFieldWrapperProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem data-testid={`${name}-section`} className={cn(formItemCustomStyle)}>
          <FormLabel className="text-base">{label}</FormLabel>
          <FormControl>
            {renderContent ? (
              renderContent(field)
            ) : (
              <Input spellCheck={false} className={customStyle} placeholder={placeholder} type={type} {...field} />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
