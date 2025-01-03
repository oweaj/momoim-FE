import { clientAxios } from "@/lib/axios";
import { User } from "@/types/auth";

export const getUser = async (): Promise<User> => {
  const { data } = await clientAxios.get("/api/auths/user");
  return data.data;
};

export const editUser = async ({ name, email, regions, profileImage, interestCategories }: User): Promise<User> => {
  const { data } = await clientAxios.put("/api/auths/user", {
    name,
    email,
    regions,
    profileImage,
    interestCategories,
  });
  return data.data;
};
