"use client";

import ReviewCard from "@/components/common/cards/ReviewCard";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { GatheringContent } from "@/types/common/gatheringContent";
import { useRef, useState } from "react";
import { useReview } from "@/queries/mypage/useReview";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import UnreviewedCard from "../_components/UnreviewedCard";
import Tags from "../../../../components/common/Tags";
import EmptyStatePicker from "../_components/EmptyStatePicker";

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
    {
      name: "작성 가능한 리뷰",
      value: "un-review",
    },
    {
      name: "작성한 리뷰",
      value: "my-review",
    },
  ];

  const { data, isLoading, error, fetchNextPage, hasNextPage } = useReview(sub);

  useIntersectionObserver({
    target: observerTarget,
    onIntersect: fetchNextPage,
    enabled: !!hasNextPage,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <div className="flex flex-col gap-2">
      <Tags
        tags={tags}
        selectedValue={subcategory}
        onSelect={(value) => {
          setSubcategory(value);
          router.push(`${path}?sub=${value}`);
        }}
      />
      <div>
        {(!sub || sub === "un-review") &&
          (data?.pages && data.pages[0].data.length ? (
            data.pages.map((item) =>
              item.data.map((unreview: GatheringContent, idx: number) => {
                return (
                  <div key={`r:${unreview.gatheringId}`}>
                    <UnreviewedCard data={unreview} />
                    {item.data.length - 1 !== idx ? <hr className="my-[16px]" /> : <br />}
                  </div>
                );
              }),
            )
          ) : (
            <EmptyStatePicker type="review" sub={sub} />
          ))}
        {sub === "my-review" &&
          (data?.pages && data.pages[0].data.length ? (
            data.pages.map((item) =>
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
                return (
                  <div key={`r:${review.gatheringId}`}>
                    <ReviewCard review={r} typeData={t} isWriter />
                    {item.data.length - 1 !== idx ? <hr className="my-[16px]" /> : <br />}
                  </div>
                );
              }),
            )
          ) : (
            <EmptyStatePicker type="reviews" sub={sub} />
          ))}
        <div ref={observerTarget} />
      </div>
    </div>
  );
}
