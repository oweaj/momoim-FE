import { useEffect, useRef, useState } from "react";
import ReviewPostSection from "@/app/(main)/mypage/_components/ReviewPostSection";
import { format } from "date-fns";
import { useEditReview, useDeleteReview } from "@/queries/mypage/useReview";
import Stars from "../Star";
import { Modal } from "../modal/Modal";

interface Props {
  review: Review;
  typeData: Mypage | Detail;
  isWriter: boolean;
}

interface Review {
  title: string;
  comment: string;
  score: number;
  createdAt: string;
  reviewId: number;
}

interface Mypage {
  gatheringId: number;
  gatheringName: string;
  gatheringStatus: string;
}

interface Detail {
  writerId: number;
  writer: string;
  writerProfileImage: string;
}

export default function ReviewCard({ review, typeData, isWriter }: Props) {
  const reviewRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLTextAreaElement | null>(null);
  const [rating, setRating] = useState(review.score);
  const [longComment, setLongComment] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const timeAgo = (dateString: string) => {
    const givenDate = new Date(dateString);
    const currentDate = new Date();
    const differenceInMillis = Number(currentDate) - Number(givenDate);
    const differenceInDays = Math.floor(differenceInMillis / (24 * 60 * 60 * 1000));
    const differenceInHours = Math.floor(differenceInMillis / (60 * 60 * 1000));
    const differenceInMinutes = Math.floor(differenceInMillis / (60 * 1000));
    if (differenceInDays >= 1) return `${differenceInDays}일 전`;
    if (differenceInHours >= 1) return `${differenceInHours}시간 전`;
    return `${differenceInMinutes}분 전`;
  };

  const { mutate: edit } = useEditReview();
  const { mutate: remove } = useDeleteReview();

  const handleEditSubmit = () => {
    edit({
      gatheringId: review.reviewId,
      score: rating,
      title: review.title,
      comment: contentRef.current ? contentRef.current.value : "",
    });
  };

  const handleDeleteSubmit = () => {
    remove({ id: review.reviewId });
  };

  useEffect(() => {
    if (reviewRef.current) {
      // 이건 변화에 따라 useEffect로 계속 동적 관리해줘야할 수도 있다
      if (reviewRef.current.scrollHeight > reviewRef.current.clientHeight) {
        setLongComment(true);
      }
    }
  }, []);
  return (
    <div className="flex w-full max-w-[1100px] flex-col items-start gap-2 py-4 sm:items-center">
      <div className="flex w-full justify-between">
        <div className="text-lg font-bold text-gray-900">{review.title}</div>
        <div>
          <Stars score={review.score} />
        </div>
      </div>
      <div className="relative w-full">
        <div
          ref={reviewRef}
          className={`flex w-full flex-col justify-start overflow-y-hidden text-start transition-all duration-300 ${isExpanded ? "h-auto" : "h-24"}`}
        >
          {review.comment}
        </div>
        {isExpanded && <br />}
        {longComment && (
          <div
            className={`absolute bottom-0 flex h-20 w-full items-end justify-end ${!isExpanded && "bg-gradient-to-t from-white via-transparent to-transparent"} text-center`}
          >
            <button
              type="button"
              className="cursor-pointer font-bold text-main"
              onClick={() => {
                if (reviewRef.current) {
                  setIsExpanded(!isExpanded);
                }
              }}
            >
              {isExpanded ? "접기" : "펼치기"}
            </button>
          </div>
        )}
      </div>
      <div className="flex w-full justify-between text-xs text-gray-500 xs:text-sm">
        <div className="flex gap-2.5">
          <div className="hidden xs:block">{format(review?.createdAt, "yyyy년 MM월 dd일 hh:mm:ss")}</div>
          <div className="block xs:hidden">{format(review?.createdAt, "MM월 dd일 hh:mm")}</div>
          {isWriter && (
            <>
              <Modal
                size="w-full h-[55%]"
                title="리뷰 수정"
                triggerButton={<button type="button">수정</button>}
                content={
                  <ReviewPostSection
                    data={review.comment}
                    setRating={setRating}
                    rating={rating}
                    customRef={contentRef}
                  />
                }
                showFooter
                onSubmit={handleEditSubmit}
              />
              <button type="button" onClick={handleDeleteSubmit}>
                삭제
              </button>
            </>
          )}
        </div>
        <div className="flex gap-2.5">
          {typeData && "writer" in typeData && (
            <div className="max-w-20 overflow-hidden text-ellipsis whitespace-nowrap">{typeData?.writer}</div>
          )}
          <div>{timeAgo(review.createdAt)}</div>
        </div>
      </div>
    </div>
  );
}
