import { useState } from "react";
import { useCheckDuplicateValue } from "@/queries/auth/useCheckDuplicateValue";
import { DuplicateCheckType, DuplicateCheckResults } from "@/types/auth";

export default function useDuplicateCheck() {
  const [checkResults, setCheckResults] = useState<DuplicateCheckResults>({
    name: null,
    email: null,
  });

  const { mutateAsync: checkValue } = useCheckDuplicateValue();

  const checkDuplicateValue = async (type: DuplicateCheckType, value: string) => {
    const fieldName = type === "name" ? "닉네임" : "이메일";

    try {
      await checkValue({ type, value });
      setCheckResults((prev) => ({
        ...prev,
        [type]: {
          isAvailable: true,
          message: `사용 가능한 ${fieldName}입니다.`,
        },
      }));
      return true;
    } catch (error) {
      setCheckResults((prev) => ({
        ...prev,
        [type]: {
          isAvailable: false,
          message: `이미 사용 중인 ${fieldName}입니다.`,
        },
      }));
      return false;
    }
  };

  const resetCheckResult = (type: DuplicateCheckType) => {
    setCheckResults((prev) => ({
      ...prev,
      [type]: null,
    }));
  };

  return {
    checkResults,
    checkDuplicateValue,
    resetCheckResult,
  };
}
