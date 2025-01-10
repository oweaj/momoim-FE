import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { gatheringCreateApi } from "@/api/gatherings";

export const useGatheringCreate = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: gatheringCreateApi,
    onSuccess: () => {
      toast({
        title: "모임 생성",
        description: "모임이 생성되었습니다.",
        duration: 2000,
      });
      queryClient.invalidateQueries({ queryKey: ["gatherings"] });
      router.push("/");
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "모임 생성 실패",
        description: error.response?.data?.message || "알 수 없는 오류가 발생했습니다.",
        duration: 2000,
      });
    },
  });
};
