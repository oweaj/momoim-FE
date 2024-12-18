"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { HOME_CATEGORIES, SUB_CATEGORIES } from "@/constants/options";
import Tabs from "@/components/common/Tabs";
import Tags from "@/components/common/Tags";

export type Category = "ALL" | "RECOMMENDED" | "CULTURE" | "FOOD" | "SPORTS" | "HOBBY" | "TRAVEL" | "STUDY" | "MEETING";

interface MoimPageProps {
  initialCategory?: string;
}

export default function MoimPage({ initialCategory = "ALL" }: MoimPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [category, setCategory] = useState<Category>(() => {
    const pathSegments = pathname.split("/");
    const categoryFromPath = pathSegments[1]?.toUpperCase() || initialCategory;
    return categoryFromPath as Category;
  });
  const [subCategory, setSubCategory] = useState<string>(() => searchParams.get("subCategory") || "all");

  // URL 업데이트 함수
  const updateURL = (newCategory: string, newSubCategory: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newSubCategory !== "all") {
      params.set("subCategory", newSubCategory);
    } else {
      params.delete("subCategory");
    }

    const query = params.toString();
    router.push(`/${newCategory.toLowerCase()}${query ? `?${query}` : ""}`);
  };

  return (
    <>
      {/* Categories */}
      <Tabs
        tabs={HOME_CATEGORIES.map((cate) => ({
          name: cate.label,
          value: cate.value.toLowerCase(),
        }))}
        selectedValue={category.toLowerCase()}
        onSelect={(value) => {
          const newCategory = value.toUpperCase() as Category;
          setCategory(newCategory);
          updateURL(newCategory, "all");
          setSubCategory("all");
        }}
      />
      {/* Sub Categories */}
      {category !== "ALL" && category !== "RECOMMENDED" && SUB_CATEGORIES[category] && (
        <Tags
          tags={[
            { name: "전체", value: "all" }, // 공통 옵션 추가
            ...SUB_CATEGORIES[category].map((subCate) => ({
              name: subCate.label,
              value: subCate.value.toLowerCase(),
            })),
          ]}
          selectedValue={subCategory}
          onSelect={(value) => {
            setSubCategory(value);
            updateURL(category, value);
          }}
          className="mt-8"
        />
      )}
      {/* Filters */}
    </>
  );
}
