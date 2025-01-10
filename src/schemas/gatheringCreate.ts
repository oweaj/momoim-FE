import { COMMON_CATEGORIES, ONLINE_PLATFORM, SUB_CATEGORIES } from "@/constants/options";
import { GatheringCreateFormData, SubCategoryValueKey } from "@/types/category";
import { format } from "date-fns";
import * as z from "zod";

const CATEGORY_VALUES = COMMON_CATEGORIES.map((category) => category.value) as [string, ...string[]];
const SUB_CATEGORIES_VALUES = Object.values(SUB_CATEGORIES)
  .flat()
  .map((sub) => sub.value) as [SubCategoryValueKey];

const NextDate = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  today.setDate(today.getDate() + 1);
  return today;
};

export const gatheringCreateSchema = (isEdit: boolean) =>
  z
    .object({
      name: z.string().min(2, "모임 제목은 2글자 이상이어야 합니다").max(20, "모임 제목은 20글자 이하여야 합니다."),
      isPeriodic: z.boolean(),
      image: z.string().nullable(),
      category: z.enum(CATEGORY_VALUES, { message: "카테고리를 선택해주세요." }),
      subCategory: z.enum(SUB_CATEGORIES_VALUES, { message: "서브 카테고리를 선택해주세요." }),
      location: z.string().optional(),
      address: z.string().min(1, "모임할 주소는 필수입니다."),
      nextGatheringAt: isEdit
        ? z.string()
        : z.string().refine((data) => {
            const formDateValue = new Date(data);
            const nextDay = NextDate();
            return formDateValue >= nextDay;
          }, "생성될 모임 날짜는 내일부터 가능합니다."),
      capacity: z.number().min(2, "최소 인원은 2명 이상이어야 합니다.").max(50, "최대 인원은 50명 이하여야 합니다."),
      description: z.string().min(10, "모임 설명은 최소 10글자 이상이여야 합니다."),
      gatheringType: z.enum(["OFFLINE", "ONLINE"]),
      onlinePlatform: z.string().optional(),
    })
    .superRefine((data, ctx) => {
      if (data.gatheringType === "ONLINE" && !data.onlinePlatform) {
        ctx.addIssue({
          path: ["onlinePlatform"],
          code: z.ZodIssueCode.custom,
          message: "온라인 플랫폼 선택은 필수입니다.",
        });
      }
    });

export type GatheringCreateFormType = z.infer<ReturnType<typeof gatheringCreateSchema>>;

export const getDefaultData = (dataContent?: Partial<GatheringCreateFormData>): GatheringCreateFormData => {
  const gatheringType = dataContent?.location === "ONLINE" ? "ONLINE" : "OFFLINE";
  const onlineAddressCheck = ONLINE_PLATFORM.find(({ value }) => dataContent?.address === value);
  const nextGatheringAt = dataContent?.nextGatheringAt
    ? format(dataContent?.nextGatheringAt, "yyyy-MM-dd HH:mm:ss")
    : undefined;

  return {
    name: dataContent?.name || "",
    isPeriodic: dataContent?.isPeriodic || false,
    image: dataContent?.image || null,
    category: dataContent?.category || COMMON_CATEGORIES[0].value,
    subCategory: dataContent?.subCategory || "",
    location: dataContent?.location || "",
    address: dataContent?.address || "",
    nextGatheringAt: nextGatheringAt || "",
    capacity: Number(dataContent?.capacity) || 2,
    description: dataContent?.description || "",
    tags: [""],
    gatheringType,
    detailAddress: "",
    onlinePlatform: onlineAddressCheck?.value || "",
  };
};
