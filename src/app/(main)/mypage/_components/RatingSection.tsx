import React, { useState } from "react";
import EmptyStar from "@/assets/svg/empty-star.svg";
import Star from "@/assets/svg/star.svg";

export default function RatingSection({
  onRatingChange,
  score,
}: {
  onRatingChange?: (rating: number) => void;
  score: number;
}) {
  const [hoverRating, setHoverRating] = useState(score); // 드래그 중 표시할 별점
  const [isActive, setIsActive] = useState(true); // 점수 고정 여부

  // 별 렌더링
  const renderStars = (currentRating: number) => {
    return Array.from({ length: 5 }, (_, index) => {
      const starIndex = index + 1;
      if (currentRating >= starIndex) return <Star key={index} />;
      return <EmptyStar key={index} />;
    });
  };

  // 별점 계산 (1점 단위로 변경)
  const calculateRating = (clientX: number, rect: DOMRect) => {
    const offsetX = clientX - rect.left; // 클릭한 지점의 X좌표
    if (offsetX < 0 || offsetX > rect.width) return null; // 별 영역 밖이면 null 반환
    const starWidth = rect.width / 5;
    return Math.min(5, Math.max(0, Math.round(offsetX / starWidth))); // 1점 단위 계산
  };

  // 마우스 이동 - 별 영역 내부에서만 점수 계산
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isActive) return; // 고정된 상태라면 동작하지 않음
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const newRating = calculateRating(e.clientX, rect);
    if (newRating === null) return; // 별 외부 이동 무시
    setHoverRating(newRating);
  };

  // 마우스 클릭 - 별 영역 내부에서 점수 고정
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const newRating = calculateRating(e.clientX, rect);
    if (newRating === null) return; // 별 외부 클릭 무시
    if (isActive) {
      setIsActive(false); // 점수 해제
    } else {
      setIsActive(true); // 점수 고정
      if (onRatingChange) onRatingChange(newRating);
    }
  };

  return (
    <div
      className="flex w-[100px] cursor-pointer"
      role="button"
      tabIndex={0}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => !isActive && setHoverRating(0)}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleClick(e as unknown as React.MouseEvent<HTMLDivElement>);
        }
      }}
    >
      {renderStars(isActive ? score : hoverRating)}
    </div>
  );
}
