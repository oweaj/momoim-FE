import { clientAxios } from "@/lib/axios";
import { User } from "@/types/auth";

export const getUser = async (): Promise<User> => {
  const { data } = await clientAxios.get("/api/auths/user");
  return data.data;
};
