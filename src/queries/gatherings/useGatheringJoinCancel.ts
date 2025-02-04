import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { gatheringJoinCancelApi } from "@/api/gatherings/gatherings";

export const useGatheringJoinCancel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: gatheringJoinCancelApi,
    onSuccess: (id: number) => {
      toast({
        title: "신청 모임 취소",
        description: "모임 신청이 되었습니다.",
        duration: 2000,
      });
      queryClient.invalidateQueries({ queryKey: ["gatheringDetail", id] });
      queryClient.invalidateQueries({ queryKey: ["gatherings"] });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "신청 모임 취소 실패",
        description: error.response?.data?.message || "알 수 없는 오류가 발생했습니다.",
        duration: 2000,
      });
    },
  });
};
