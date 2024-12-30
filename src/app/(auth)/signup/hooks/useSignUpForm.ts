import { useSignUp } from "@/queries/auth/useSignUp";
import { DEFAULT_SIGNUP_VALUES, signUpSchema } from "@/schemas/auth";
import { DuplicateChecked, SignUpFormData } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const useSignUpForm = () => {
  const [step, setStep] = useState(1);
  const [duplicateChecked, setDuplicateChecked] = useState<DuplicateChecked>({
    name: false,
    email: false,
  });

  const { mutate: signUp } = useSignUp();

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: DEFAULT_SIGNUP_VALUES,
    mode: "onChange",
  });

  const handleSubmit = (values: SignUpFormData) => {
    if (step === 1) {
      const hasUncheckedFields = !duplicateChecked.name || !duplicateChecked.email;
      if (hasUncheckedFields) {
        form.trigger();
        return;
      }
      setStep(2);
      return;
    }
    signUp(values);
  };

  return {
    form,
    step,
    duplicateChecked,
    setDuplicateChecked,
    handleSubmit,
  };
};
