import { clientAxios } from "@/lib/axios";
import { Pagination } from "@/types/pagination";

export const getMyMoimApi = async (page: Pagination) => {
  const { data } = await clientAxios.get(`api/gatherings/join?offset=${page.offset}&limit=${page.limit}`);
  return data.data;
};

export const getMyCreatedMoimApi = async (page: Pagination) => {
  const { data } = await clientAxios.get(`api/gatherings/workspace?offset=${page.offset}&limit=${page.limit}`);
  return data.data;
};

export const getMyLikedMoimApi = async (page: Pagination) => {
  const { data } = await clientAxios.get(`api/wishlist?offset=${page.offset}&limit=${page.limit}`);
  return data.data;
};
