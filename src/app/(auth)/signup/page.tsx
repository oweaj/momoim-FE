"use client";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { StepOne } from "./_component/StepOne";
import { StepTwo } from "./_component/StepTwo";
import { StepIndicator } from "./_component/StepIndicator";
import { useSignUpForm } from "./hooks/useSignUpForm";

export default function SignUp() {
  const { form, step, duplicateChecked, setDuplicateChecked, handleSubmit } = useSignUpForm();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {step === 1 ? (
          <StepOne checked={duplicateChecked} setChecked={setDuplicateChecked} form={form} />
        ) : (
          <StepTwo form={form} />
        )}
        <StepIndicator steps={2} currentStep={step} />
        <div className="space-y-4">
          <Button type="submit" className="h-12 w-full">
            {step === 1 ? "다음으로" : "확인"}
          </Button>
          {step === 2 && (
            <div className="text-center">
              다음에 할게요.
              <button type="button" onClick={form.handleSubmit(handleSubmit)} className="pl-2 text-gray-500 underline">
                건너뛰기
              </button>
            </div>
          )}
        </div>
      </form>
    </Form>
  );
}
