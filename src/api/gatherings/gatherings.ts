import { clientAxios, serverAxios } from "@/lib/axios";
import { Pagination } from "@/types/pagination";

// 내가 속한 모임 조회
export const gatheringJoinedApi = async (page: Pagination) => {
  const { data } = await clientAxios.get(`api/gatherings/join?offset=${page.offset}&limit=${page.limit}`);
  return data.data;
};

// 모임 상세 데이터
export const gatheringDetailGetApi = async (id: number) => {
  const { data } = await serverAxios.get(`/api/gatherings/${id}`);
  return data.data;
};

export const gatheringDetailGetApiClient = async ({ queryKey }: any) => {
  const { data } = await clientAxios.get(`/api/gatherings/${queryKey[1]}`);
  return data.data;
};

// 모임 참여
export const gatheringJoinApi = async (id: number) => {
  await clientAxios.post(`/api/gatherings/join/${id}`);
  return id;
};

// 모임 취소
export const gatheringJoinCancelApi = async (id: number) => {
  await clientAxios.delete(`/api/gatherings/join/${id}`);
  return id;
};
