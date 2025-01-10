"use client";

import ReviewCard from "@/components/common/cards/ReviewCard";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { GatheringContent } from "@/types/common/gatheringContent";
import { useEffect, useRef, useState } from "react";
import { useReview } from "@/queries/mypage/useReview";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useLoading } from "@/hooks/useLoading";
import UnreviewedCard from "../_components/UnreviewedCard";
import Tags from "../../../../components/common/Tags";
import EmptyStatePicker from "../_components/EmptyStatePicker";
import MyReviewsSkeleton from "../_components/skeletons/MyReviewsSkeleton";
import ClientRedirectHandler from "../_components/ClientRedirectHandler";

interface Review {
  reviewId: number;
  gatheringId: number;
  title: string;
  comment: string;
  gatheringName: string;
  gatheringStatus: string;
  score: number;
  createdAt: string;
}

export default function MyReview() {
  const observerTarget = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();
  const sub = searchParams.get("sub");
  const [subcategory, setSubcategory] = useState(sub || "un-review");

  const tags = [
    { name: "작성 가능한 리뷰", value: "un-review" },
    { name: "작성한 리뷰", value: "my-review" },
  ];

  const { data, isLoading, fetchNextPage, hasNextPage } = useReview(sub);

  const { loading } = useLoading(isLoading);
  useIntersectionObserver({
    target: observerTarget,
    onIntersect: fetchNextPage,
    enabled: !!hasNextPage,
  });

  if (loading) return <MyReviewsSkeleton />;

  return (
    <div className="flex flex-col gap-2">
      <Tags
        tags={tags}
        selectedValue={subcategory}
        onSelect={(value) => {
          setSubcategory(value);
          router.push(`${path}?sub=${value}`);
        }}
        prefetch={(value) => {
          router.prefetch(`${path}?sub=${value}`);
        }}
      />
      <div>
        {(!sub || sub === "un-review") &&
          (data?.pages && data.pages[0].data.length > 0
            ? data.pages.map((item, pageIndex) =>
                item.data.map((unreview: GatheringContent, idx: number) => {
                  const isLastElement = pageIndex === data.pages.length - 1 && idx === item.data.length - 1;
                  return (
                    <div key={`r:${unreview.gatheringId}`}>
                      <UnreviewedCard data={unreview} />
                      {!isLastElement && <hr className="my-[16px]" />}
                    </div>
                  );
                }),
              )
            : !isLoading && <EmptyStatePicker type="reviews" sub={sub} />)}
        {sub === "my-review" &&
          (data?.pages && data.pages[0].data.length > 0
            ? data.pages.map((item, pageIndex) =>
                item.data.map((review: Review, idx: number) => {
                  const r = {
                    title: review.title,
                    comment: review.comment,
                    score: review.score,
                    createdAt: review.createdAt,
                    reviewId: review.reviewId,
                  };
                  const t = {
                    gatheringId: review.gatheringId,
                    gatheringName: review.gatheringName,
                    gatheringStatus: review.gatheringStatus,
                  };
                  const isLastElement = pageIndex === data.pages.length - 1 && idx === item.data.length - 1;

                  return (
                    <div key={`r:${review.gatheringId}`}>
                      <ReviewCard review={r} typeData={t} isWriter />
                      {!isLastElement && <hr className="my-[16px]" />}
                    </div>
                  );
                }),
              )
            : !isLoading && <EmptyStatePicker type="reviews" sub={sub} />)}
        <div ref={observerTarget} />
      </div>
    </div>
  );
}
