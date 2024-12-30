import { clientAxios } from "@/lib/axios";
import { SignUpFormData, LoginFormData, LoginResponse } from "@/types/auth";

export const signUpApi = async (formData: SignUpFormData) => {
  const { data } = await clientAxios.post("/api/auths/signup", formData);
  return data;
};

export const loginApi = async (formData: LoginFormData) => {
  const { data } = await clientAxios.post<LoginResponse>("/api/auths/signin", formData);
  return data;
};
