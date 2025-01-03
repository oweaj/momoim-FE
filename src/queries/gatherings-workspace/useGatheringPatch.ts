import { gatheringPatchApi } from "@/api/gatherings";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";

export const useGatheringPatch = () => {
  return useMutation({
    mutationFn: gatheringPatchApi,
    onSuccess: () => {
      toast({
        title: "모임 수정",
        description: "모임이 수정되었습니다.",
        duration: 2000,
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "모임 수정 실패",
        description: error.response?.data?.message || "알 수 없는 오류가 발생했습니다.",
        duration: 2000,
      });
    },
  });
};
