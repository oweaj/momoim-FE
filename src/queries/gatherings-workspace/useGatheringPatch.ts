import { gatheringPatchApi } from "@/api/gatherings";
import { toast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useGatheringPatch = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: gatheringPatchApi,
    onSuccess: (id: number) => {
      toast({
        title: "모임 수정",
        description: "모임이 수정되었습니다.",
        duration: 2000,
      });
      queryClient.invalidateQueries({ queryKey: ["gatheringDetail", id] });
      localStorage.removeItem("defaultContentData");
      router.push(`/gatherings/${id}`);
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
