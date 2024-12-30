import { EmptyState } from "@/components/common/EmptyState";
import { useRouter } from "next/navigation";

interface Props {
  type: string;
  sub: string | null | undefined;
}

export default function EmptyStatePicker({ sub, type }: Props) {
  const router = useRouter();
  if (type === "gatherings") {
    if (!sub || sub === "my-gatherings")
      return (
        <EmptyState
          title="아직 모임에 참여하지 않았어요"
          description="지금 바로 모임에 참여해보세요!"
          actionText="모임 찾기"
          onAction={() => router.push("/all")}
          className="h-full"
        />
      );
    if (sub === "created")
      return (
        <EmptyState
          title="아직 모임을 만들지 않았어요"
          description="지금 바로 모임을 만들어보아요!"
          actionText="모임 만들기"
          onAction={() => router.push("/gatherings/create")}
          className="h-full"
        />
      );
    if (sub === "liked")
      return (
        <EmptyState
          title="아직 찜한 모임이 없어요"
          description="마음에 드는 모임을 찾아보아요!"
          actionText="모임 찾기"
          onAction={() => router.push("/all")}
          className="h-full"
        />
      );
    return null;
  }
  if (type === "reviews") {
    if (!sub || sub === "un-review")
      return (
        <EmptyState
          title="리뷰를 작성할 모임이 없어요"
          description="지금 바로 모임에 참여해보세요!"
          actionText="모임 찾기"
          onAction={() => router.push("/all")}
        />
      );
    if (sub === "my-review")
      return (
        <EmptyState
          title="작성한 리뷰가 없어요"
          description="참여했던 모임의 리뷰를 작성해보세요!"
          actionText="나의 모임 목록 보기"
          onAction={() => router.push("/mypage/gatherings?sub=my-gatherings")}
        />
      );
    return null;
  }
  return null;
}
