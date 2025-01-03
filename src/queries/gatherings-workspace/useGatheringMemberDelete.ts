import { gatheringMemberDeleteApi } from "@/api/gatherings";
import { toast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useGatheringMemberDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: gatheringMemberDeleteApi,
    onSuccess: (data) => {
      toast({
        title: "맴버 제외",
        description: `모임에서 ${data.memberName}님이 제외되었습니다.`,
        duration: 2000,
      });
      queryClient.invalidateQueries({ queryKey: ["gatheringDetail", data.id] });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "맴버 제외 실패",
        description: error.response?.data?.message || "알 수 없는 오류가 발생했습니다.",
        duration: 2000,
      });
    },
  });
};
