import { useQuery } from "@tanstack/react-query";
import { getScheduleApi } from "@/api/schedule";

export const useSchedule = (currentYear: number) => {
  return useQuery({
    queryKey: ["schedule", currentYear],
    queryFn: () => getScheduleApi(currentYear),
    staleTime: 0,
  });
};
