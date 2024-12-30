"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { Gathering } from "@/types/gathering";
import { useMoimList } from "@/queries/gatherings/useMoimList";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { EmptyState } from "@/components/common/EmptyState";
import { useRouter } from "next/navigation";
import { LOCATIONS } from "@/constants/gatherings";
import MoimCard from "@/components/common/cards/MoimCard";
import { MoimGridSkeleton } from "./skeletons/MoimGridSkeleton";

interface MoimGridProps {
  category: string;
  subCategory: string;
  location: string;
  gatheringDate?: Date;
  sortType?: string;
  sortOrder?: string;
}

export function MoimGrid({
  category,
  subCategory,
  location = LOCATIONS.ALL,
  gatheringDate,
  sortType,
  sortOrder,
}: MoimGridProps) {
  const observerTarget = useRef<HTMLDivElement>(null);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useMoimList(
    category,
    subCategory,
    location,
    gatheringDate,
    sortType,
    sortOrder,
  );
  const router = useRouter();

  useIntersectionObserver({
    target: observerTarget,
    onIntersect: () => fetchNextPage(),
    enabled: !!hasNextPage && !isFetchingNextPage,
  });

  // if (status === "pending") return <MoimGridSkeleton />;
  if (status === "error")
    return <EmptyState title="모임 목록을 불러오는데 실패했습니다." description="다시 시도해주세요." />;
  if (data?.pages[0].items.length === 0)
    return (
      <EmptyState
        title="조건에 맞는 모임이 없어요,"
        description="추천하는 모임을 찾아보세요!"
        actionText="추천탭 바로가기"
        onAction={() => router.push("/recommend")}
      />
    );

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data?.pages.map((page) =>
          page.items.map((gathering: Gathering) => (
            <motion.div key={gathering.gatheringId}>
              <MoimCard
                type="home"
                data={gathering}
                customOnClick={() => router.push(`/gatherings/${gathering.gatheringId}`)}
              />
            </motion.div>
          )),
        )}
      </div>

      <div ref={observerTarget} className={`${hasNextPage ? "visible" : "hidden"}`} />

      {isFetchingNextPage && <MoimGridSkeleton />}

      {/* <div className="my-4 text-center text-sm text-gray-500">
        {hasNextPage ? "더 많은 모임 불러오는 중..." : "모든 모임을 불러왔습니다"}
      </div> */}
    </>
  );
}
