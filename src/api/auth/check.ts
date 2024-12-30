import { clientAxios } from "@/lib/axios";

export const checkNickname = async (name: string) => {
  const { data } = await clientAxios.post("/api/auths/check/nickname", { name });
  return data;
};

export const checkEmail = async (email: string) => {
  const { data } = await clientAxios.post("/api/auths/check/email", { email });
  return data;
};
