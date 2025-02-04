import { clientAxios } from "@/lib/axios";
import { Pagination } from "@/types/pagination";

export const getWishlist = async (page: Pagination) => {
  const { data } = await clientAxios.get(`api/wishlist?offset=${page.offset}&limit=${page.limit}`);
  return data.data;
};

export const postWishlist = async (id: number) => {
  const { data } = await clientAxios.post(`api/wishlist/${id}`);
  return data.data;
};

export const deleteWishlist = async (id: number) => {
  const { data } = await clientAxios.delete(`api/wishlist/${id}`);
  return data.data;
};
