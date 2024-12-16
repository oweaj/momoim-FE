"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { DEFAULT_SIGNUP_VALUES, signUpSchema } from "@/schemas/auth";
import { useSignUp } from "@/queries/auth/useSignUp";
import { StepOne } from "./_component/StepOne";
import { StepTwo } from "./_component/StepTwo";
import { StepIndicator } from "./_component/StepIndicator";
import { AuthLayout } from "../_component/AuthLayout";

export default function SignUp() {
  const [step, setStep] = useState(1);

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: DEFAULT_SIGNUP_VALUES,
  });

  const { mutate: signUp } = useSignUp();

  const onSubmit = (values: typeof DEFAULT_SIGNUP_VALUES) => {
    if (step === 1) {
      setStep(2);
      return;
    }
    signUp(values);
  };

  // 2step에서 1step으로 뒤로가기
  useEffect(() => {
    if (step === 2) {
      window.history.pushState(null, "", window.location.pathname);
    }
    const handlePopState = () => {
      if (step === 2) {
        setStep(1);
        window.history.pushState(null, "", window.location.pathname);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [step]);

  return (
    <AuthLayout>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {step === 1 ? <StepOne form={form} /> : <StepTwo form={form} />}
          <StepIndicator steps={2} currentStep={step} />
          <div className="space-y-4">
            <Button type="submit" className="h-12 w-full">
              {step === 1 ? "다음으로" : "확인"}
            </Button>
            {step === 2 && (
              <div className="text-center">
                다음에 할게요.
                <button type="button" onClick={form.handleSubmit(onSubmit)} className="pl-2 text-gray-500 underline">
                  건너뛰기
                </button>
              </div>
            )}
          </div>
        </form>
      </Form>
    </AuthLayout>
  );
}
