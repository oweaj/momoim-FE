import { clientAxios, serverAxios } from "@/lib/axios";
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

// 모임 리뷰 조회
export const gatheringReviewsApi = async (id: number, { offset, limit }: { offset: number; limit: number }) => {
  const { data } = await serverAxios.get(`api/reviews/${id}`, { params: { offset, limit } });
  return {
    data: data.data,
    nextPage: data.data.length === limit ? offset / limit + 1 : null,
  };
};

export const gatheringReviewsApiClient = async (id: number, { offset, limit }: { offset: number; limit: number }) => {
  const { data } = await clientAxios.get(`api/reviews/${id}`, { params: { offset, limit } });
  return {
    data: data.data,
    nextPage: data.data.length === limit ? offset / limit + 1 : null,
  };
};

// 모임 리뷰통계
export const reviewsAverageApi = async (id: number) => {
  const { data } = await serverAxios.get(`api/reviews/${id}/statistic`);
  return data.data;
};

export const reviewsAverageApiClient = async ({ queryKey }: any) => {
  const { data } = await clientAxios.get(`api/reviews/${queryKey[2]}/statistic`);
  return data.data;
};
