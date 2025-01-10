"use client";

import ProgressBar from "@/components/common/ProgressBar";
import Stars from "@/components/common/Star";
import { scoreMapping } from "@/constants/scoreMapping";
import { useReviewAverage } from "@/queries/mypage/useReview";
import { useParams } from "next/navigation";

export default function ReviewAverage() {
  const params = useParams();
  const id = Number(params.id);
  const { data } = useReviewAverage(id);
  if (!data) return null;

  // 총 리뷰개수
  const { averageScore, ...reviewScore } = data;
  const arrayReviewScore = Object.entries(reviewScore).reverse();
  const totalReview = Object.values(reviewScore).reduce((total, count) => total + count, 0);

  return (
    <div className="flex h-52 w-full items-center justify-center rounded-lg bg-gray-100 max-sm:p-4 max-xs:h-auto">
      <div className="flex w-full max-w-[35rem] items-center justify-center gap-10 max-sm:gap-4 max-xs:flex-col max-xs:gap-6">
        <div className="flex flex-1 flex-col items-center justify-center gap-4">
          <p className="text-5xl font-semibold">
            {data.averageScore} <span className="text-gray-500">/ 5</span>
          </p>
          <Stars score={data.averageScore} />
        </div>
        <div className="flex w-full flex-1 flex-col gap-1">
          {arrayReviewScore.map(([key, value]) => {
            const scoreAlphabet = key.replace("ScoreCount", "");
            const textScore = `${scoreMapping[scoreAlphabet]}점`;
            return (
              <div key={key} className="flex gap-4">
                <span className="min-w-10 font-medium text-gray-900">{textScore}</span>
                <ProgressBar capacity={totalReview} participantCount={value} />
                <span className="min-w-10 text-gray-500">{value}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
