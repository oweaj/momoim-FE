import { checkEmail, checkNickname } from "@/api/auth/check";
import { DuplicateCheckType } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";

export const useCheckDuplicateValue = () => {
  return useMutation({
    mutationFn: async (data: { type: DuplicateCheckType; value: string }) => {
      if (data.type === "name") return checkNickname(data.value);
      return checkEmail(data.value);
    },
  });
};
