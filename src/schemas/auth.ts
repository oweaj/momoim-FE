import { VALIDATION_ERRORS } from "@/constants/messages";
import { CATEGORIES, REGIONS } from "@/constants/options";
import { SignUpFormData } from "@/types/auth";
import * as z from "zod";

export const REGION_VALUES = REGIONS.map((r) => r.value) as [string, ...string[]];
export const CATEGORY_VALUES = CATEGORIES.map((c) => c.value) as [string, ...string[]];

export const loginSchema = z.object({
  email: z.string().min(1, VALIDATION_ERRORS.email.required).email(VALIDATION_ERRORS.email.invalid),
  password: z
    .string()
    .min(1, VALIDATION_ERRORS.password.requirements)
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, VALIDATION_ERRORS.password.requirements),
});

export const signUpSchema = z
  .object({
    name: z.string().min(2, VALIDATION_ERRORS.name.min).max(10, VALIDATION_ERRORS.name.max),
    email: z.string().min(1, VALIDATION_ERRORS.email.required).email(VALIDATION_ERRORS.email.invalid),
    password: z
      .string()
      .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, VALIDATION_ERRORS.password.requirements),
    passwordConfirm: z.string().min(1, VALIDATION_ERRORS.password.confirmRequired),
    regions: z.array(z.enum(REGION_VALUES)).min(1, VALIDATION_ERRORS.stepTwo.regionRequired),
    interestCategories: z.array(z.enum(CATEGORY_VALUES)).min(1, VALIDATION_ERRORS.stepTwo.categoryRequired),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: VALIDATION_ERRORS.password.notMatch,
    path: ["passwordConfirm"],
  });

export type SignUpFormType = z.infer<typeof signUpSchema>;

// 회원가입 기본값
export const DEFAULT_SIGNUP_VALUES: SignUpFormData = {
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
  regions: ["ALL"],
  interestCategories: ["ALL"],
};
