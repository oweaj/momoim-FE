import { COMMON_CATEGORIES, SUB_CATEGORIES, REGIONS, LOCATIONS } from "@/constants/options";

const getSubcategory = (value: string): string | undefined => {
  const subcategory = Object.keys(SUB_CATEGORIES).find((sub) => {
    const items = SUB_CATEGORIES[sub as keyof typeof SUB_CATEGORIES];
    return items.some((item) => item.value === value);
  });

  if (subcategory) {
    const items = SUB_CATEGORIES[subcategory as keyof typeof SUB_CATEGORIES];
    const match = items.find((item) => item.value === value);
    return match?.label;
  }

  return undefined;
};

const getCategory = (value: string): string | undefined => {
  const match = COMMON_CATEGORIES.find((category) => category.value === value);
  return match?.label;
};

const getRegion = (value: string): string | undefined => {
  const match = REGIONS.find((region) => region.value === value);
  return match?.label;
};

const getLocation = (value: string): string | undefined => {
  const match = LOCATIONS.find((location) => location.value === value);
  return match?.label;
};

export { getSubcategory, getCategory, getRegion, getLocation };
