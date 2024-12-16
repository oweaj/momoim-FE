"use client";

import { UseFormReturn } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { SignUpFormData } from "@/types/auth";
import Link from "next/link";
import { FormFieldWrapper } from "@/components/common/FormFieldWrapper";
import { FORM_LABELS } from "@/constants/formLabels";

interface StepOneProps {
  form: UseFormReturn<SignUpFormData>;
}

export function StepOne({ form }: StepOneProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  return (
    <>
      <h2 className="mb-8 text-center text-2xl font-bold">회원가입</h2>
      <FormFieldWrapper
        control={form.control}
        name="name"
        label={FORM_LABELS.name.label}
        placeholder={FORM_LABELS.name.placeholder}
      />
      <FormFieldWrapper
        control={form.control}
        name="email"
        label={FORM_LABELS.email.label}
        placeholder={FORM_LABELS.email.placeholder}
      />
      <FormFieldWrapper
        control={form.control}
        name="password"
        label={FORM_LABELS.password.label}
        renderContent={(field) => (
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder={FORM_LABELS.password.placeholder}
              {...field}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              aria-label="비밀번호 보기/숨기기 토글"
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
        )}
      />
      <FormFieldWrapper
        control={form.control}
        name="passwordConfirm"
        label={FORM_LABELS.passwordConfirm.label}
        renderContent={(field) => (
          <div className="relative">
            <Input
              type={showPasswordConfirm ? "text" : "password"}
              placeholder={FORM_LABELS.passwordConfirm.placeholder}
              {...field}
            />
            <button
              type="button"
              onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              aria-label="비밀번호 확인 보기/숨기기 토글"
            >
              {showPasswordConfirm ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
        )}
      />
      <div className="font-medium">
        이미 회원이신가요?
        <Link href="/login" className="pl-2 text-main underline">
          로그인
        </Link>
      </div>
    </>
  );
}
