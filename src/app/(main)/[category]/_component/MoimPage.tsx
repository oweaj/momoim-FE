"use client";

import { useCallback, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { HOME_CATEGORIES, SUB_CATEGORIES } from "@/constants/options";
import Tabs from "@/components/common/Tabs";
import Tags from "@/components/common/Tags";
import { CATEGORIES, SORTS } from "@/constants/gatherings";
import { format } from "date-fns";
import { MoimGrid } from "./MoimGrid";
import { Filters } from "./Filters";

type Category = keyof typeof CATEGORIES;

interface MoimPageProps {
  initialCategory?: string;
}

interface FilterState {
  category: Category;
  subCategory: string;
  location: string;
  gatheringDate?: Date;
  sortType: string;
}

export default function MoimPage({ initialCategory = CATEGORIES.ALL }: MoimPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [filters, setFilters] = useState<FilterState>(() => ({
    category: (pathname.split("/")[1]?.toUpperCase() || initialCategory) as Category,
    subCategory: searchParams.get("subCategory")?.toUpperCase() || CATEGORIES.ALL,
    location: CATEGORIES.ALL,
    gatheringDate: undefined,
    sortType: SORTS.UPDATE_AT,
  }));

  const updateURL = useCallback(
    (newFilters: FilterState) => {
      const params = new URLSearchParams();

      if (newFilters.subCategory !== CATEGORIES.ALL) {
        params.set("subCategory", newFilters.subCategory);
      }
      if (newFilters.location !== CATEGORIES.ALL) {
        params.set("location", newFilters.location);
      }
      if (newFilters.gatheringDate) {
        params.set("gatheringDate", format(newFilters.gatheringDate, "yyyy-MM-dd"));
      }
      if (newFilters.sortType !== SORTS.UPDATE_AT) {
        params.set("sortType", newFilters.sortType);
      }

      router.push(`/${newFilters.category.toLowerCase()}${params.toString() ? `?${params}` : ""}`);
    },
    [router],
  );

  return (
    <div className="flex flex-col gap-6">
      <Tabs
        tabs={HOME_CATEGORIES.map((cate) => ({
          name: cate.label,
          value: cate.value,
        }))}
        selectedValue={filters.category}
        onSelect={(value) => {
          const newFilters = {
            ...filters,
            category: value as Category,
            subCategory: CATEGORIES.ALL, // 카테고리 변경 시 서브카테고리 리셋
          };
          setFilters(newFilters);
          updateURL(newFilters);
        }}
      />
      {filters.category !== CATEGORIES.ALL &&
        filters.category !== CATEGORIES.RECOMMEND &&
        SUB_CATEGORIES[filters.category] && (
          <Tags
            tags={[
              { name: "전체", value: CATEGORIES.ALL },
              ...SUB_CATEGORIES[filters.category].map((subCate) => ({
                name: subCate.label,
                value: subCate.value,
              })),
            ]}
            selectedValue={filters.subCategory}
            onSelect={(value) => {
              const newFilters = {
                ...filters,
                subCategory: value,
              };
              setFilters(newFilters);
              updateURL(newFilters);
            }}
          />
        )}
      <Filters
        selectedLocation={filters.location}
        selectedDate={filters.gatheringDate}
        selectedSort={filters.sortType}
        onLocationChange={(value) => {
          const newFilters = {
            ...filters,
            location: value,
          };
          setFilters(newFilters);
          updateURL(newFilters);
        }}
        onDateChange={(date) => {
          const newFilters = {
            ...filters,
            gatheringDate: date,
          };
          setFilters(newFilters);
          updateURL(newFilters);
        }}
        onSortChange={(value) => {
          const newFilters = {
            ...filters,
            sortType: value,
          };
          setFilters(newFilters);
          updateURL(newFilters);
        }}
      />
      <MoimGrid
        category={filters.category}
        subCategory={filters.subCategory}
        location={filters.location}
        gatheringDate={filters.gatheringDate}
        sortType={filters.sortType}
      />
    </div>
  );
}
