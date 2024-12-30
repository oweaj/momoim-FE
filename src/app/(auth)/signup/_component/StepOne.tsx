"use client";

import { UseFormReturn } from "react-hook-form";
import { useCallback, useEffect } from "react";
import { DuplicateChecked, DuplicateCheckType, SignUpFormData } from "@/types/auth";
import Link from "next/link";
import { FORM_LABELS } from "@/constants/formLabels";
import useDuplicateCheck from "../hooks/useDuplicateCheck";
import { DuplicateCheckField } from "./DuplicateCheckField";
import { PasswordField } from "./PasswordField";

interface StepOneProps {
  form: UseFormReturn<SignUpFormData>;
  checked: DuplicateChecked;
  setChecked: React.Dispatch<React.SetStateAction<DuplicateChecked>>;
}

export function StepOne({ form, checked, setChecked }: StepOneProps) {
  const { checkResults, checkDuplicateValue, resetCheckResult } = useDuplicateCheck();

  useEffect(() => {
    const subscription = form.watch((_, { name: fieldName }) => {
      if (fieldName === "name" || fieldName === "email") {
        const type = fieldName as DuplicateCheckType;
        setChecked((prev) => ({ ...prev, [type]: false }));
        resetCheckResult(type);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, setChecked, resetCheckResult]);

  const handleDuplicateCheck = useCallback(
    async (type: DuplicateCheckType) => {
      const value = form.getValues(type);
      const isAvailable = await checkDuplicateValue(type, value);
      setChecked((prev) => ({ ...prev, [type]: isAvailable }));
    },
    [form, checkDuplicateValue, setChecked],
  );

  const getDuplicateCheckMessage = (type: DuplicateCheckType) => {
    const value = form.getValues(type);
    if (!value || form.formState.errors[type]) return null;

    return !checked[type]
      ? { message: `${type === "name" ? "닉네임" : "이메일"} 중복 확인이 필요합니다.`, isError: true }
      : null;
  };

  return (
    <>
      <h2 className="mb-8 text-center text-2xl font-bold">회원가입</h2>
      <DuplicateCheckField
        type="name"
        control={form.control}
        result={checkResults.name}
        onCheck={() => handleDuplicateCheck("name")}
        isDisabled={!form.getValues("name") || !!form.formState.errors.name}
        label={FORM_LABELS.name.label}
        placeholder={FORM_LABELS.name.placeholder}
        duplicateMessage={getDuplicateCheckMessage("name")}
      />
      <DuplicateCheckField
        type="email"
        control={form.control}
        result={checkResults.email}
        onCheck={() => handleDuplicateCheck("email")}
        isDisabled={!form.getValues("email") || !!form.formState.errors.email}
        label={FORM_LABELS.email.label}
        placeholder={FORM_LABELS.email.placeholder}
        duplicateMessage={getDuplicateCheckMessage("email")}
      />
      <PasswordField
        control={form.control}
        name="password"
        label={FORM_LABELS.password.label}
        placeholder={FORM_LABELS.password.placeholder}
      />
      <PasswordField
        control={form.control}
        name="passwordConfirm"
        label={FORM_LABELS.passwordConfirm.label}
        placeholder={FORM_LABELS.passwordConfirm.placeholder}
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
