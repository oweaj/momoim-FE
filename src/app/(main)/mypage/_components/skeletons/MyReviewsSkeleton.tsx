"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useSearchParams } from "next/navigation";
import MyPageTagsSkeleton from "./MyPageTagsSkeleton";

export default function MyReviewsSkeleton() {
  const searchParams = useSearchParams();
  const sub = searchParams.get("sub");
  return (
    <div className="flex flex-col gap-2">
      <MyPageTagsSkeleton number={2} />
      <div>
        {(!sub || sub === "un-review") && (
          <div key="skel-1">
            <div className="max-w-[375px]">
              <div className="flex w-full items-center gap-2 py-2 sm:items-center">
                <Skeleton className="relative flex aspect-square h-[20%] w-[20%] items-center justify-center overflow-hidden rounded-xl bg-gray-200 xs:h-24 xs:w-24" />
                <div className="flex h-24 min-w-0 flex-grow flex-col justify-center gap-1 pl-2">
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between">
                      <Skeleton className="h-[28px] w-48 rounded-2xl bg-gray-200 px-2 py-1 sm:px-2 sm:py-1" />
                    </div>
                    <div className="flex gap-1 text-xs text-gray-700">
                      <Skeleton className="h-[28px] w-48 rounded-2xl bg-gray-200 px-2 py-1 sm:px-2 sm:py-1" />
                    </div>
                  </div>
                </div>
              </div>
              <Skeleton className="h-[48px] w-full rounded-md bg-gray-200" />
              <br />
            </div>
          </div>
        )}
        {sub === "my-review" && (
          <div key="skel-2">
            <div className="flex w-full flex-col items-start gap-2 py-4 sm:items-center">
              <div className="flex w-full justify-between">
                <div className="text-lg font-bold text-gray-900">
                  <Skeleton className="h-[28px] w-12 rounded-2xl bg-gray-200 px-2 py-1 sm:px-2 sm:py-1" />
                </div>
                <div>
                  <Skeleton className="h-[28px] w-24 rounded-2xl bg-gray-200 px-2 py-1 sm:px-2 sm:py-1" />
                </div>
              </div>
              <div className="relative w-full">
                <div className="flex w-full flex-col justify-start gap-1 overflow-y-hidden text-start transition-all duration-300">
                  <Skeleton className="h-4 w-full rounded-2xl bg-gray-200 px-2 py-1 sm:px-2 sm:py-1" />
                  <Skeleton className="h-4 w-full rounded-2xl bg-gray-200 px-2 py-1 sm:px-2 sm:py-1" />
                  <Skeleton className="h-4 w-full rounded-2xl bg-gray-200 px-2 py-1 sm:px-2 sm:py-1" />
                  <Skeleton className="h-4 w-full rounded-2xl bg-gray-200 px-2 py-1 sm:px-2 sm:py-1" />
                </div>
              </div>
              <div className="flex w-full justify-between text-xs text-gray-500 xs:text-sm">
                <div className="flex gap-2.5">
                  <Skeleton className="h-4 w-56 rounded-2xl bg-gray-200 px-2 py-1 sm:px-2 sm:py-1" />
                </div>
                <div className="flex gap-2.5">
                  <Skeleton className="h-4 w-12 rounded-2xl bg-gray-200 px-2 py-1 sm:px-2 sm:py-1" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
