"use client";

import { Skeleton } from "@/components/ui/skeleton";
import MyPageTagsSkeleton from "./MyPageTagsSkeleton";

export default function MyGatheringsSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <MyPageTagsSkeleton number={3} />
      <div className="flex w-full items-start gap-2 py-2 sm:items-center">
        <Skeleton className="relative flex aspect-square h-[30%] w-[30%] items-center justify-center overflow-hidden rounded-[20px] bg-gray-200 sm:min-h-40 sm:w-40 sm:min-w-40" />
        <div className="flex min-w-0 flex-grow flex-col justify-center gap-1 pl-2">
          <div className="flex flex-col gap-1">
            <div className="flex justify-between">
              <Skeleton className="h-[28px] w-[100PX] rounded-2xl bg-gray-200 px-2 py-1 sm:px-2 sm:py-1" />
              <Skeleton className="h-[28px] w-[28PX] rounded-2xl bg-gray-200 px-2 py-1 sm:px-2 sm:py-1" />
            </div>
            <div className="flex gap-1 text-xs text-gray-700 sm:text-base">
              <Skeleton className="h-[28px] w-48 rounded-2xl bg-gray-200 px-2 py-1 sm:px-2 sm:py-1" />
            </div>
            <div className="flex gap-1 text-sm">
              <Skeleton className="h-[28px] w-[52px] rounded-2xl bg-gray-200 px-2 py-1 sm:px-2 sm:py-1" />
              <Skeleton className="h-[28px] w-[52px] rounded-2xl bg-gray-200 px-2 py-1 sm:px-2 sm:py-1" />
              <Skeleton className="h-[28px] w-[52px] rounded-2xl bg-gray-200 px-2 py-1 sm:px-2 sm:py-1" />
            </div>
          </div>
          <div>
            <div>
              <Skeleton className="my-2 h-[6px] w-full rounded-lg bg-gray-200" />
            </div>
            <div className="flex justify-end text-sm">
              <Skeleton className="h-[28px] w-20 rounded-2xl bg-gray-200 px-2 py-1 sm:px-2 sm:py-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
