import { clientAxios } from "@/lib/axios";
import { GatheringCreateFormData } from "@/types/category";

export const gatheringCreateApi = async (formData: GatheringCreateFormData) => {
  const { data } = await clientAxios.post("/api/gatherings/workspace", formData);
  return data;
};
