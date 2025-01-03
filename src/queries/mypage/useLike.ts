import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { deleteWishlist, postWishlist } from "@/api/like";

interface HeartParams {
  id: number;
  isLike: boolean;
}

export const useLike = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: HeartParams) => (params.isLike ? postWishlist(params.id) : deleteWishlist(params.id)),
    onSuccess: (_, variables) => {
      toast({
        title: variables.isLike ? "찜하기 완료" : "찜하기 취소",
        description: variables.isLike ? "모임을 찜하셨어요!" : "모임 찜하기를 취소하셨어요",
        duration: 3000,
      });
      queryClient.invalidateQueries({ queryKey: ["gatherings"] });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "작업 실패",
        description: error.response?.data?.message || "알 수 없는 오류가 발생했습니다.",
        duration: 2000,
      });
      queryClient.invalidateQueries({ queryKey: ["gatherings"] });
    },
  });
};
