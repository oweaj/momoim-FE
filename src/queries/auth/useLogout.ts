import { logoutApi } from "@/api/auth/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.clear();
      Cookies.remove("accessToken");
      window.location.href = "/";
    },
  });
};
