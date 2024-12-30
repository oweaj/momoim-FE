import { clientAxios } from "@/lib/axios";
import { Pagination } from "@/types/pagination";

export const getReviewsApi = async (type: string, page: Pagination) => {
  const { data } = await clientAxios.get(`api/reviews/${type}?offset=${page.offset}&limit=${page.limit}`);
  return data.data;
};

export const postReviewApi = async (gatheringId: number, score: number, title: string, comment: string) => {
  const { data } = await clientAxios.post(`api/reviews`, {
    gatheringId,
    score,
    title,
    comment,
  });
  return data;
};

export const deleteReviewApi = async (id: number) => {
  const { data } = await clientAxios.delete(`api/reviews/${id}`);
  return data;
};

export const patchReviewApi = async (id: number, score: number, title: string, comment: string) => {
  const { data } = await clientAxios.patch(`api/reviews/${id}`, {
    score,
    title,
    comment,
  });
  return data;
};
