import { useQuery } from "@tanstack/react-query";
import { getScheduleApi } from "@/api/schedule";

export const useSchedule = (year: number) => {
  return useQuery({
    queryKey: ["schedule", year],
    queryFn: async () => {
      const data = await getScheduleApi(year);
      return data;
    },
  });
};
