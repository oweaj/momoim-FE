export const VALIDATION_ERRORS = {
  name: {
    min: "닉네임은 2자 이상이어야 합니다.",
    max: "닉네임은 10자 이하여야 합니다.",
  },
  email: {
    required: "이메일을 입력해 주세요.",
    invalid: "올바른 이메일 형식이 아닙니다.",
  },
  password: {
    requirements: "8글자 이상, 영문, 숫자, 특수문자를 모두 포함해야 합니다.",
    confirmRequired: "비밀번호를 다시 한번 입력해 주세요.",
    notMatch: "비밀번호가 일치하지 않습니다",
  },
  stepTwo: {
    regionRequired: "활동 지역을 선택해 주세요.",
    categoryRequired: "관심 카테고리를 선택해 주세요.",
  },
} as const;
