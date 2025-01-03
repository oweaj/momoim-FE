import * as z from "zod";

export interface ReviewFormData {
  score: number;
  comment: string;
}

export const reviewPostSchema = z.object({
  score: z.number().min(0, "평점은 0점 이상이어야 합니다").max(5, "평점은 5점 이하여야 합니다."),
  comment: z.string().min(1, "리뷰는 1글자 이상이어야 합니다").max(1000, "리뷰는 1000자 이하여야 합니다."),
});

export type ReviewType = z.infer<typeof reviewPostSchema>;

export const DEFAULT_REVIEW_FORM_VALUES: ReviewFormData = {
  score: 0,
  comment: "",
};
