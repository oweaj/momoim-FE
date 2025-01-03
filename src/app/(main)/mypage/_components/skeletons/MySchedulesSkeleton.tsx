"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function MySchedulesSkeleton() {
  return (
    <div className="pb-8">
      <div className="flex w-full flex-col gap-6 md:flex-row">
        <Skeleton className="h-[460px] w-full overflow-hidden rounded-3xl bg-gray-200 md:w-1/2" />
        <Skeleton className="h-[460px] w-full overflow-hidden rounded-3xl bg-gray-200 md:w-1/2" />
      </div>
    </div>
  );
}
