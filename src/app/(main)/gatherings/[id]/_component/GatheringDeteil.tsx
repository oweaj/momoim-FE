"use client";

import DetailCard from "@/components/common/cards/DetailCard";
import { GatheringContent } from "@/types/common/gatheringContent";
import { useQuery } from "@tanstack/react-query";

export default function GatheringDeteil({ gatheringId }: { gatheringId: number }) {
  const { data } = useQuery<GatheringContent>({
    queryKey: ["gatheringDetail", gatheringId],
  });

  if (!data) {
    return <div>로딩중 표시하기</div>;
  }

  console.log(data);

  return (
    <div>
      <DetailCard data={data} />
    </div>
  );
}
