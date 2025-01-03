"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { GatheringContent } from "@/types/common/gatheringContent";
import Tags from "@/components/common/Tags";
import MoimCard from "@/components/common/cards/MoimCard";
import { useRef, useState } from "react";
import { useGathering } from "@/queries/mypage/useGathering";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import EmptyStatePicker from "../_components/EmptyStatePicker";
import MyGatheringsSkeleton from "../_components/skeletons/MyGatheringsSkeleton";
import ClientRedirectHandler from "../_components/ClientRedirectHandler";

export default function MyMoim() {
  const observerTarget = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();
  const sub = searchParams.get("sub");
  const [subcategory, setSubcategory] = useState(sub || "my-gatherings");

  const tags = [
    {
      name: "나의 모임",
      value: "my-gatherings",
    },
    {
      name: "내가 만든 모임",
      value: "created",
    },
    {
      name: "찜한 모임",
      value: "liked",
    },
  ];

  const { data, isLoading, error, fetchNextPage, hasNextPage } = useGathering(sub);

  useIntersectionObserver({
    target: observerTarget,
    onIntersect: fetchNextPage,
    enabled: !!hasNextPage,
  });

  if (isLoading) return <MyGatheringsSkeleton />;
  if (error) return <ClientRedirectHandler />;

  return (
    <div className="flex flex-col gap-2">
      <Tags
        tags={tags}
        selectedValue={subcategory}
        onSelect={(value) => {
          setSubcategory(value);
          router.push(`${path}?sub=${value}`);
        }}
      />
      <div className="w-full">
        {data?.pages && data.pages[0].data.length > 0 ? (
          data.pages.map((item) =>
            item.data.map((moim: GatheringContent, idx: number) => (
              <div key={moim.gatheringId}>
                <MoimCard
                  type="mypage"
                  data={moim}
                  customOnClick={() => {
                    router.push(`/gatherings/${moim.gatheringId}`);
                  }}
                />
                {idx !== item.data.length - 1 && <hr className="my-4 border-gray-300" />}
              </div>
            )),
          )
        ) : (
          <EmptyStatePicker type="gatherings" sub={sub} />
        )}
      </div>
      <div ref={observerTarget} />
    </div>
  );
}
