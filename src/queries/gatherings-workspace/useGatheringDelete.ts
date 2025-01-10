import { gatheringDeleteApi } from "@/api/gatherings";
import { toast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useGatheringDelete = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: gatheringDeleteApi,
    onSuccess: () => {
      toast({
        title: "모임 삭제",
        description: "해당 모임이 삭제되었습니다.",
        duration: 2000,
      });
      queryClient.invalidateQueries({ queryKey: ["gatherings"] });
      router.push("/");
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "모임 삭제 실패",
        description: error.response?.data?.message || "알 수 없는 오류가 발생했습니다.",
        duration: 2000,
      });
    },
  });
};
