import { gatheringDetailGetApiClient } from "@/api/gatherings/gatherings";
import { GatheringDetail } from "@/types/common/gatheringContent";
import { useQuery } from "@tanstack/react-query";

// 모임 상세 조회
export const useGetGatheringDetail = (id: number) => {
  const { data, isLoading } = useQuery<GatheringDetail>({
    queryKey: ["gatheringDetail", id],
    queryFn: gatheringDetailGetApiClient,
  });

  return { data, isLoading };
};
