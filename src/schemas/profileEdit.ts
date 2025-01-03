import { VALIDATION_ERRORS } from "@/constants/messages";
import { COMMON_CATEGORIES, SUB_CATEGORIES } from "@/constants/options";
import { SubCategoryValueKey } from "@/types/category";
import * as z from "zod";
import { ProfileData } from "@/types/profile";
import { REGION_VALUES } from "./auth";

const CATEGORY_VALUES = COMMON_CATEGORIES.map((category) => category.value) as [string, ...string[]];
const SUB_CATEGORIES_VALUES = Object.values(SUB_CATEGORIES)
  .flat()
  .map((sub) => sub.value) as [SubCategoryValueKey];

export const profileEditSchema = z.object({
  email: z.string().min(1, VALIDATION_ERRORS.email.required).email(VALIDATION_ERRORS.email.invalid),
  name: z.string().min(2, "닉네임은 2글자 이상이어야 합니다").max(10, "닉네임은 10글자 이하여야 합니다."),
  regions: z.array(z.enum(REGION_VALUES)).min(1, VALIDATION_ERRORS.stepTwo.regionRequired),
  selectedCategory: z.array(z.enum(CATEGORY_VALUES)).optional().nullable(),
  subCategory: z.array(z.enum(SUB_CATEGORIES_VALUES)).optional().nullable(),
  profileImage: z.string().optional().nullable(),
});

export type ProfileDataFormType = z.infer<typeof profileEditSchema>;

export const DEFAULT_PROFILE_EDIT_VALUES: ProfileData = {
  name: "",
  email: "",
  regions: ["ALL"],
  profileImage: null,
  subCategory: [],
  selectedCategory: [COMMON_CATEGORIES[0].value],
};
