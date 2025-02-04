"use client";

import ReviewCard from "@/components/common/cards/ReviewCard";
import { EmptyState } from "@/components/common/EmptyState";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useGatheringReviews } from "@/queries/reviews/useReview";
import { GatheringReview } from "@/types/review";
import { useParams } from "next/navigation";
import { useRef } from "react";

interface ReviewsListType {
  review: GatheringReview;
  isWriter: boolean;
}

export default function ReviewList() {
  const params = useParams();
  const { id } = params;
  const observerTarget = useRef<HTMLDivElement>(null);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGatheringReviews(Number(id));

  useIntersectionObserver({
    target: observerTarget,
    onIntersect: () => fetchNextPage(),
    enabled: !!hasNextPage && !isFetchingNextPage,
  });

  if (!data || !data.pages.some((page) => page.data.length > 0)) {
    return <EmptyState description="해당 모임에 대해 작성된 리뷰가 없습니다." />;
  }

  return (
    <div>
      <ul className="flex flex-col gap-4">
        {data?.pages.map((page) =>
          page.data.map((el: ReviewsListType) => {
            const reviewData = {
              writerId: el.review.writerId,
              writer: el.review.writer,
              writerProfileImage: el.review.writerProfileImage,
            };
            return (
              <li
                key={`${page.nextPage}-${el.review.reviewId}`}
                className="relative after:mt-4 after:block after:h-[1px] after:w-full after:bg-gray-300 after:content-[''] last:after:hidden"
              >
                <ReviewCard review={el.review} typeData={reviewData} isWriter={el.isWriter} />
              </li>
            );
          }),
        )}
      </ul>
      <div ref={observerTarget} className={`${hasNextPage ? "visible" : "hidden"}`} />
    </div>
  );
}
