"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormFieldWrapper } from "@/components/common/FormFieldWrapper";
import { Eye, EyeOff } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/auth";
import { useLogin } from "@/queries/auth/useLogin";
import { FORM_LABELS } from "@/constants/formLabels";
import { AuthLayout } from "../_component/AuthLayout";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const { mutate: login } = useLogin();

  const onSubmit = (values: any) => {
    login(values);
  };

  return (
    <AuthLayout>
      <h2 className="mb-8 text-center text-2xl font-bold">로그인</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                >
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
            )}
          />
          <div className="flex flex-col gap-2">
            <Button type="submit" className="w-full">
              로그인
            </Button>
            <Button className="w-full p-0" variant="outline">
              <Link href="/signup" className="flex h-full w-full items-center justify-center">
                회원가입
              </Link>
            </Button>
          </div>
        </form>
      </Form>
    </AuthLayout>
  );
}
