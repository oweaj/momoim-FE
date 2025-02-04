import { clientAxios } from "@/lib/axios";
import { GatheringCreateFormData } from "@/types/category";
import { Pagination } from "@/types/pagination";

// 모임 조회
export const gatheringGetApi = async (page: Pagination) => {
  const { data } = await clientAxios.get(`api/gatherings/workspace?offset=${page.offset}&limit=${page.limit}`);
  return data.data;
};

// 모임 생성
export const gatheringCreateApi = async (formData: GatheringCreateFormData) => {
  const { data } = await clientAxios.post("/api/gatherings/workspace", formData);
  return data;
};

// 모임 수정
export const gatheringPatchApi = async ({
  formData,
  id,
}: {
  formData: GatheringCreateFormData;
  id: number;
}): Promise<number> => {
  await clientAxios.patch(`/api/gatherings/workspace/${id}`, formData);
  return id;
};

// 모임 삭제
export const gatheringDeleteApi = async (id: number) => {
  const data = await clientAxios.delete(`/api/gatherings/workspace/${id}/cancel`);
  return data;
};

// 모임 맴버 제외
export const gatheringMemberDeleteApi = async ({
  id,
  gatheringMemberId,
  memberName,
}: {
  id: number;
  gatheringMemberId: number;
  memberName: string;
}): Promise<{ id: number; memberName: string }> => {
  await clientAxios.delete(`/api/gatherings/workspace/member/${gatheringMemberId}`);
  return { id, memberName };
};
