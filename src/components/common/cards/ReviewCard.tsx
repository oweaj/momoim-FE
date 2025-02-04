import { useEffect, useRef, useState } from "react";
import ReviewPostSection from "@/app/(main)/mypage/_components/ReviewPostSection";
import { format } from "date-fns";
import { useDeleteReview } from "@/queries/reviews/useReview";
import { Review } from "@/types/review";
import Stars from "../Star";
import { Modal } from "../modal/Modal";

interface Props {
  review: Review;
  typeData: Mypage | Detail;
  isWriter: boolean;
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
  const [longComment, setLongComment] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [reviewModal, setReviewModal] = useState(false);
  const [relativeTime, setRelativeTime] = useState("");

  useEffect(() => {
    const timeAgo = (dateString: string) => {
      const givenDate = new Date(dateString);
      const currentDate = new Date();
      const differenceInMillis = Number(currentDate) - Number(givenDate);

      const differenceInDays = Math.floor(differenceInMillis / (24 * 60 * 60 * 1000));
      const differenceInHours = Math.floor(differenceInMillis / (60 * 60 * 1000));
      const differenceInMinutes = Math.floor(differenceInMillis / (60 * 1000));
      if (!differenceInMinutes) return "방금 전";
      if (differenceInDays >= 1) return `${differenceInDays}일 전`;
      if (differenceInHours >= 1) return `${differenceInHours}시간 전`;
      return `${differenceInMinutes}분 전`;
    };
    setRelativeTime(timeAgo(review.createdAt));

    const interval = setInterval(() => {
      setRelativeTime(timeAgo(review.createdAt));
    }, 60000);
    return () => clearInterval(interval);
  }, [review.createdAt]);

  const { mutate: remove } = useDeleteReview();

  const handleDeleteSubmit = () => {
    remove({ id: review.reviewId });
  };

  useEffect(() => {
    if (reviewRef.current) {
      if (reviewRef.current.scrollHeight > reviewRef.current.clientHeight) {
        setLongComment(true);
      }
    }
  }, []);
  return (
    <div className="flex w-full flex-col items-start gap-2 py-4 sm:items-center">
      <div className="flex w-full justify-between">
        <div className="overflow-hidden text-ellipsis whitespace-nowrap text-lg font-bold text-gray-900">
          {review.title}
        </div>
        <div className="flex items-center justify-center">
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
          <div className="hidden xs:block">{format(review?.createdAt, "yyyy년 MM월 dd일 HH:mm:ss")}</div>
          <div className="block xs:hidden">{format(review?.createdAt, "MM월 dd일 HH:mm")}</div>
          {isWriter && (
            <>
              <Modal
                size="w-full"
                title="리뷰 수정"
                triggerButton={<button type="button">수정</button>}
                content={<ReviewPostSection reviewData={review} closeModal={setReviewModal} />}
                open={reviewModal}
                action={setReviewModal}
                showFooter={false}
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
          <div>{relativeTime}</div>
        </div>
      </div>
    </div>
  );
}
