"use client";

import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { DEFAULT_REVIEW_FORM_VALUES, ReviewFormData, reviewPostSchema } from "@/schemas/reviewPost";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { FormFieldWrapper } from "@/components/common/FormFieldWrapper";
import { useEffect, useState } from "react";
import { useEditReview, usePostReview } from "@/queries/reviews/useReview";
import { GatheringContent } from "@/types/common/gatheringContent";
import { Review } from "@/types/review";
import { Textarea } from "@/components/ui/textarea";
import RatingSection from "./RatingSection";

interface Props {
  data?: GatheringContent;
  reviewData?: Review;
  closeModal?: (value: boolean) => void;
}

interface Field {
  value: string;
  onChange: (value: string | null) => void;
}

export default function ReviewPostSection({ data, reviewData, closeModal }: Props) {
  const { mutate: post } = usePostReview();
  const { mutate: edit } = useEditReview();

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const reviewForm = useForm({
    resolver: zodResolver(reviewPostSchema),
    defaultValues: DEFAULT_REVIEW_FORM_VALUES,
  });

  const onSubmit = (values: ReviewFormData) => {
    if (data) {
      post({
        gatheringId: data?.gatheringId as number,
        score: values.score,
        title: data?.name as string,
        comment: values.comment,
      });
    }
    if (reviewData) {
      edit({
        gatheringId: reviewData.reviewId,
        score: values.score,
        title: reviewData.title,
        comment: values.comment,
      });
    }
    if (closeModal) closeModal(false);
  };

  const onCommentChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>, field: Field) => {
    field.onChange(e.target.value);
    setComment(e.target.value);
  };

  const onRatingChangeHandler = (changedScore: number) => {
    reviewForm.setValue("score", changedScore);
    if (setRating) setRating(changedScore);
  };

  useEffect(() => {
    if (data) {
      reviewForm.setValue("comment", comment);
      reviewForm.setValue("score", rating);
    }
    if (reviewData) {
      reviewForm.setValue("comment", reviewData.comment);
      reviewForm.setValue("score", reviewData.score);
      setComment(reviewData.comment);
      setRating(reviewData.score);
    }
  }, []);

  return (
    <Form {...reviewForm}>
      <form className="w-full" onSubmit={reviewForm.handleSubmit(onSubmit)}>
        <div className="flex w-full flex-col gap-6">
          <div className="flex w-full flex-col gap-2">
            <FormFieldWrapper
              control={reviewForm.control}
              name="score"
              label="모임이 얼마나 만족스러우셨나요?"
              placeholder=""
              customStyle="w-full"
              renderContent={() => <RatingSection score={rating || 0} onRatingChange={onRatingChangeHandler} />}
            />
          </div>
          <div className="flex w-full flex-col gap-2">
            <FormFieldWrapper
              control={reviewForm.control}
              name="comment"
              label="모임 후기를 남겨주세요!"
              placeholder=""
              formItemCustomStyle="w-full"
              customStyle="w-full"
              renderContent={(field) => (
                <Textarea
                  value={comment}
                  onChange={(e) => {
                    onCommentChangeHandler(e, field);
                  }}
                  spellCheck={false}
                  placeholder="남겨주신 리뷰는 프로그램 운영 및 다른 회원 분들께 큰 도움이 됩니다"
                  className="h-[120px] w-full resize-none rounded-xl border-2 border-solid border-gray-200 px-4 py-2 text-sm placeholder-gray-500 outline-none scrollbar-hide focus-visible:outline-none focus-visible:ring-0"
                />
              )}
            />
          </div>
          <div className="flex w-full gap-6">
            <Button
              variant="outline"
              className="w-1/2"
              type="button"
              onClick={() => {
                if (closeModal) closeModal(false);
              }}
            >
              취소
            </Button>
            <Button className="w-1/2" type="submit">
              등록하기
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
