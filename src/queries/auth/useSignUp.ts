import { useMutation } from "@tanstack/react-query";
import { signUpApi } from "@/api/auth";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

export const useSignUp = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: signUpApi,
    onSuccess: () => {
      toast({
        title: "회원가입 성공! 🎉",
        description: "로그인 후 서비스를 이용해보세요.",
        duration: 2000,
      });
      router.push("/login"); // 성공 시 로그인 페이지로 이동
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "회원가입 실패",
        description: error.response?.data?.message || "알 수 없는 오류가 발생했습니다.",
        duration: 2000,
      });
    },
  });
};
