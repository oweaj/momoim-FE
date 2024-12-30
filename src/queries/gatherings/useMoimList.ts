import { getMoimListClient, getMoimRecommendClient } from "@/api/gatherings/getMoimList";
import { MOIM_LIST_DEFAULT_CONFIG, PAGINATION_CONFIG } from "@/constants/config";
import { CATEGORIES, LOCATIONS } from "@/constants/gatherings";
import { useInfiniteQuery } from "@tanstack/react-query";
import { format } from "date-fns";

export const useMoimList = (
  category: string,
  subCategory: string,
  location: string,
  gatheringDate?: Date,
  sortType: string = MOIM_LIST_DEFAULT_CONFIG.SORT,
  sortOrder: string = MOIM_LIST_DEFAULT_CONFIG.ORDER,
) => {
  return useInfiniteQuery({
    queryKey: ["gatherings", category, subCategory, location, gatheringDate, sortType, sortOrder],
    queryFn: async ({ pageParam = 0 }) => {
      const params = {
        offset: pageParam,
        limit: PAGINATION_CONFIG.ITEMS_PER_PAGE,
        sortType,
        sortOrder,
        ...(location !== LOCATIONS.ALL && { location }),
        ...(gatheringDate && {
          gatheringDate: format(gatheringDate, "yyyy-MM-dd"),
        }),
      };

      let response;
      if (category === CATEGORIES.RECOMMEND) {
        response = await getMoimRecommendClient(params);
      } else {
        const apiParams = {
          ...params,
          ...(category !== CATEGORIES.ALL && { category: [category] }),
          ...(subCategory !== CATEGORIES.ALL && { subCategory: [subCategory] }),
        };
        response = await getMoimListClient(apiParams);
      }

      return {
        items: response.data,
        hasNext: response.data.length >= PAGINATION_CONFIG.ITEMS_PER_PAGE,
      };
    },
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.hasNext) return undefined;
      return allPages.length * PAGINATION_CONFIG.ITEMS_PER_PAGE;
    },
    initialPageParam: 0,
  });
};
