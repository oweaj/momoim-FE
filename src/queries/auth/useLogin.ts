import { useMutation } from "@tanstack/react-query";
import { loginApi } from "@/api/auth";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "@/hooks/use-toast";

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      if (data.success) {
        Cookies.set("accessToken", data.data.accessToken.token);
        Cookies.set("tokenExpiresAt", String(data.data.accessToken.expiredAt));
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
