import { CATEGORIES } from "@/constants/gatherings";
import { clientAxios, serverAxios } from "@/lib/axios";
import { GatheringParams, GatheringResponse } from "@/types/gathering";

export const getMoimListServer = async (
  category: string,
  params: {
    offset: string;
    limit: string;
    sortType: string;
    sortOrder: string;
  },
) => {
  const baseParams = new URLSearchParams({
    ...params,
  });

  if (category !== CATEGORIES.ALL && category !== CATEGORIES.RECOMMEND) {
    baseParams.append("category", category);
  }

  const url =
    category === CATEGORIES.RECOMMEND ? `/api/gatherings/recommend?${baseParams}` : `/api/gatherings?${baseParams}`;

  return serverAxios.get(url);
};

export const getMoimListClient = async (params: GatheringParams): Promise<GatheringResponse> => {
  const { category, subCategory, ...restParams } = params;
  const queryParams = new URLSearchParams();

  category?.forEach((cat) => queryParams.append("category", cat));
  subCategory?.forEach((sub) => queryParams.append("subCategory", sub));

  Object.entries(restParams).forEach(([key, value]) => {
    if (value !== undefined) {
      queryParams.append(key, String(value));
    }
  });

  const { data } = await clientAxios.get<GatheringResponse>(`/api/gatherings?${queryParams.toString()}`);
  return data;
};

export const getMoimRecommendClient = async (
  params: Omit<GatheringParams, "category" | "subCategory">,
): Promise<GatheringResponse> => {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      queryParams.append(key, String(value));
    }
  });

  const { data } = await clientAxios.get<GatheringResponse>(`/api/gatherings/recommend?${queryParams.toString()}`);
  return data;
};
