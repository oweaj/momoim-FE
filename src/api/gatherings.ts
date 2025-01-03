import { clientAxios, serverAxios } from "@/lib/axios";
import { GatheringCreateFormData } from "@/types/category";

export const gatheringCreateApi = async (formData: GatheringCreateFormData) => {
  const { data } = await clientAxios.post("/api/gatherings/workspace", formData);
  return data;
};

export const gatheringDetailGetApi = async (id: number) => {
  const { data } = await serverAxios.get(`/api/gatherings/${id}`);
  return data.data;
};

// 모임 상세 클라이언트 데이터
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

// 모임 수정
export const gatheringPatchApi = async (id: number | undefined) => {
  const { data } = await clientAxios.patch(`/api/gatherings/workspace/${id}`);
  return data;
};

// 모임 삭제

export const gatheringDeleteApi = async (id: number): Promise<number> => {
  await clientAxios.delete(`/api/gatherings/workspace/${id}/cancel`);
  return id;
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
