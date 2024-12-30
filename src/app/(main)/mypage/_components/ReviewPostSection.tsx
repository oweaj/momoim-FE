"use client";

import { useState } from "react";
import RatingSection from "./RatingSection";

interface Props {
  data: string;
  rating?: number;
  setRating: (number: number) => void;
  customRef: any;
}

export default function ReviewPostSection({ data, setRating, customRef, rating }: Props) {
  const [commentContent, setCommentContent] = useState(data);
  return (
    <div className="flex w-full flex-col gap-6 px-2">
      <div className="w-full">
        <div className="text-lg font-bold text-gray-900">모임이 얼마나 만족스러우셨나요?</div>
        <RatingSection score={rating || 0} onRatingChange={setRating} />
      </div>
      <div>
        <div className="text-lg font-bold text-gray-900">모임 후기를 남겨주세요!</div>
        <textarea
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          ref={customRef}
          spellCheck={false}
          placeholder="남겨주신 리뷰는 프로그램 운영 및 다른 회원 분들께 큰 도움이 됩니다"
          className="h-[90%] w-full resize-none rounded-xl border-2 border-solid border-gray-200 px-4 py-2 text-sm outline-none"
        />
      </div>
    </div>
  );
}
