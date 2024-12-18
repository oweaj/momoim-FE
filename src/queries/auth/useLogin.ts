import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginApi } from "@/api/auth";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "@/hooks/use-toast";
import { User } from "@/types/auth";

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      if (data.success) {
        // 쿠키 설정
        Cookies.set("accessToken", data.data.accessToken.token);
        Cookies.set("tokenExpiresAt", String(data.data.accessToken.expiredAt));

        // 유저 정보 업데이트
        const user: User = {
          email: data.data.email,
          name: data.data.name,
          profileImage: data.data.profileImage,
          regions: data.data.regions,
          interestCategories: data.data.interestCategories,
        };
        queryClient.setQueryData(["user"], user);

        router.push("/");
      }
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "로그인 실패",
        description: error.response?.data?.message || "알 수 없는 오류가 발생했습니다.",
        duration: 2000,
      });
    },
  });
};
