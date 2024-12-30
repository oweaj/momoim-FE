import { UseFormReturn } from "react-hook-form";
import { GatheringCreateFormData } from "../category";

export interface FormFieldProps {
  form: UseFormReturn<GatheringCreateFormData>;
  field: {
    value: string;
    onChange: (value: string | null) => void;
  };
}
