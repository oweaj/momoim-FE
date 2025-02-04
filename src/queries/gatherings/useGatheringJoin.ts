import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { gatheringJoinApi } from "@/api/gatherings/gatherings";

export const useGatheringJoin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: gatheringJoinApi,
    onSuccess: (id: number) => {
      toast({
        title: "모임 신청",
        description: "모임 신청이 되었습니다.",
        duration: 2000,
      });
      queryClient.invalidateQueries({ queryKey: ["gatheringDetail", id] });
      queryClient.invalidateQueries({ queryKey: ["gatherings"] });
    },
    onError: (error: any) => {
      if (error.response?.status === 403) {
        toast({
          title: "🖐️ 로그인 필요",
          description: "해당 서비스 이용은 로그인이 필요합니다.",
          duration: 2000,
        });
      } else {
        toast({
          variant: "destructive",
          title: "모임 신청 실패",
          description: error.response?.data?.message || "알 수 없는 오류가 발생했습니다.",
          duration: 2000,
        });
      }
    },
  });
};
