"use client";

import Tabs from "@/components/common/Tabs";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MypageTabs() {
  const path = usePathname();
  const [category, setCategory] = useState(`${path}`);
  const router = useRouter();

  const tabs = [
    {
      name: "나의 일정",
      value: "/mypage/schedules",
    },
    {
      name: "나의 모임",
      value: "/mypage/gatherings",
    },
    {
      name: "나의 리뷰",
      value: "/mypage/reviews",
    },
  ];

  const tabPrefetch = (pathValue: string) => {
    router.prefetch(pathValue);
  };

  useEffect(() => {
    setCategory(`${path}`);
  }, [path]);

  return (
    <Tabs
      tabs={tabs}
      selectedValue={category}
      onSelect={(value) => {
        setCategory(value);
        router.push(`${value}`);
      }}
      prefetch={tabPrefetch}
    />
  );
}
