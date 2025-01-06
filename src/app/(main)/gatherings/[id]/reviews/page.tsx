import ReviewAverage from "./_component/ReviewAverage";
import ReviewList from "./_component/ReviewList";

export default function GatheringReviews() {
  return (
    <div className="flex flex-col gap-12">
      <ReviewAverage />
      <ReviewList />
    </div>
  );
}
