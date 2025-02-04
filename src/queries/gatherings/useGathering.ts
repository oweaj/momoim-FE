import { useInfiniteQuery } from "@tanstack/react-query";
import { Pagination } from "@/types/pagination";
import { getWishlist } from "@/api/wishlist/like";
import { gatheringGetApi } from "@/api/gatherings-workspace/gatherings-workspace";
import { gatheringJoinedApi } from "@/api/gatherings/gatherings";

const getMoim = async (sub: string, page: Pagination) => {
  if (sub === "my-gatherings") return gatheringJoinedApi(page);
  if (sub === "created") return gatheringGetApi(page);
  if (sub === "liked") return getWishlist(page);
  return {};
};

export const useGathering = (sub: string | null) => {
  return useInfiniteQuery({
    queryKey: ["gatherings", sub || "my-gatherings"],
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
