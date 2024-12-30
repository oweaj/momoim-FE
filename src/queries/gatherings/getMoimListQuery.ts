import { getMoimListServer } from "@/api/gatherings/getMoimList";
import { MOIM_LIST_DEFAULT_CONFIG, PAGINATION_CONFIG } from "@/constants/config";

export const getMoimListQuery = {
  initialGatheringsQuery: (category: string) => ({
    queryKey: [
      "gatherings",
      category,
      MOIM_LIST_DEFAULT_CONFIG.SUB_CATE,
      MOIM_LIST_DEFAULT_CONFIG.LOCATIONS,
      null,
      MOIM_LIST_DEFAULT_CONFIG.SORT,
      MOIM_LIST_DEFAULT_CONFIG.ORDER,
    ],
    initialPageParam: 0,
    queryFn: async () => {
      const initialData = await getMoimListServer(category, {
        offset: "0",
        limit: String(PAGINATION_CONFIG.ITEMS_PER_PAGE),
        sortType: MOIM_LIST_DEFAULT_CONFIG.SORT,
        sortOrder: MOIM_LIST_DEFAULT_CONFIG.ORDER,
      });

      return {
        items: initialData.data.data,
        hasNext: initialData.data.data.length >= PAGINATION_CONFIG.ITEMS_PER_PAGE,
      };
    },
  }),
};
