import { gatheringDetailGetApiClient } from "@/api/gatherings";
import { GatheringDetail } from "@/types/common/gatheringContent";
import { useQuery } from "@tanstack/react-query";

// 모임 상세 조회
export const useGetGatheringDetail = (id: number) => {
  const { data } = useQuery<GatheringDetail>({
    queryKey: ["gatheringDetail", id],
    queryFn: gatheringDetailGetApiClient,
  });

  return data;
};
