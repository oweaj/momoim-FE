"use client";

import { EmptyState } from "@/components/common/EmptyState";
import { useRouter } from "next/navigation";

export default function GatheringCommunity() {
  const router = useRouter();

  return (
    <div>
      <EmptyState
        title="채팅방 활성화 준비중입니다."
        description="맴버들의 채팅 커뮤니티는 잠시만 기다려주세요!"
        actionText="홈으로 가기"
        onAction={() => router.push("/")}
      />
    </div>
  );
}
