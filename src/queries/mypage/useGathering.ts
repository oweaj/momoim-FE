import { useInfiniteQuery } from "@tanstack/react-query";
import { getMyCreatedMoimApi, getMyLikedMoimApi, getMyMoimApi } from "@/api/moim";
import { Pagination } from "@/types/pagination";

const getMoim = async (sub: string, page: Pagination) => {
  if (sub === "my-gatherings") return getMyMoimApi(page);
  if (sub === "created") return getMyCreatedMoimApi(page);
  if (sub === "liked") return getMyLikedMoimApi(page);
  return {};
};

export const useGathering = (sub: string | null) => {
  return useInfiniteQuery({
    queryKey: ["gatherings", sub],
    queryFn: async ({ pageParam = 0 }) => {
      const page: Pagination = {
        offset: pageParam * 12,
        limit: 12,
      };
      const data = await getMoim(sub || "my-gatherings", page);
      return { data, nextPage: data.length === 12 ? pageParam + 1 : null };
    },
    getNextPageParam: (lastPage) => (lastPage.nextPage !== null ? lastPage.nextPage : undefined),
    initialPageParam: 0,
    staleTime: 0,
  });
};
