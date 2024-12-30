import { clientAxios } from "@/lib/axios";

export const getScheduleApi = async (year: number) => {
  const { data } = await clientAxios.get(`api/schedule?year=${year}`);
  return data.data;
};
