import { REGIONS, CATEGORIES } from "@/constants/options";

// 타입 추출: value만 가져오기
export type Region = (typeof REGIONS)[number]["value"];
export type Category = (typeof CATEGORIES)[number]["value"];

// 폼 데이터 타입
export interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  regions: Region[];
  interestCategories: Category[];
}

export interface LoginFormData {
  name: string;
  email: string;
}

export interface LoginResponse {
  success: boolean;
  data: {
    accessToken: {
      token: string;
      expiredAt: number;
    };
    email: string;
    name: string;
    profileImage: string;
    regions: string[];
    interestCategories: string[];
  };
}
