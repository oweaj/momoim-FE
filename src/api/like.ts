import { clientAxios } from "@/lib/axios";

export const postWishlist = async (id: number) => {
  const { data } = await clientAxios.post(`api/wishlist/${id}`);
  return data.data;
};

export const deleteWishlist = async (id: number) => {
  const { data } = await clientAxios.delete(`api/wishlist/${id}`);
  return data.data;
};
