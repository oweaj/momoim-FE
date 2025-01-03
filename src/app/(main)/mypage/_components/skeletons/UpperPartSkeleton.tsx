import { Skeleton } from "@/components/ui/skeleton";

export default function MyPageProfileBoxSkeleton() {
  return (
    <div className="flex w-full flex-col">
      <div className="my-6 w-full rounded-[20px] border-2 border-solid border-[#F0F1F6] p-8">
        <div>
          <div className="h-7 text-lg font-black">
            <Skeleton className="h-5 w-24 rounded-2xl bg-gray-200 px-2 py-1 sm:px-2 sm:py-1" />
          </div>
          <div className="flex flex-col items-start justify-start sm:flex-row sm:items-center sm:justify-between">
            <div className="my-6 flex w-full items-center">
              <Skeleton className="relative flex aspect-square w-[40%] max-w-32 items-center justify-center overflow-hidden rounded-xl border-2 border-solid border-gray-200 bg-gray-200 sm:w-32" />
              <div className="flex flex-col justify-center gap-2 p-6">
                <Skeleton className="h-5 w-48 rounded-2xl bg-gray-200 px-2 py-1 sm:px-2 sm:py-1" />
                <Skeleton className="h-5 w-48 rounded-2xl bg-gray-200 px-2 py-1 sm:px-2 sm:py-1" />
              </div>
            </div>
            <Skeleton className="h-[48px] w-full rounded-lg border-none bg-gray-200 px-[16px] py-[12px] font-bold sm:w-[100px]" />
          </div>
        </div>
      </div>
      <div className="flex w-full cursor-default gap-4 overflow-auto font-semibold text-gray-500 scrollbar-hide">
        <div className="flex h-[56px] w-[90px] items-center justify-center">
          <Skeleton className="h-5 w-16 rounded-2xl bg-gray-200 px-2 py-1 sm:px-2 sm:py-1" />
        </div>
        <div className="flex h-[56px] w-[90px] items-center justify-center">
          <Skeleton className="h-5 w-16 rounded-2xl bg-gray-200 px-2 py-1 sm:px-2 sm:py-1" />
        </div>
        <div className="flex h-[56px] w-[90px] items-center justify-center">
          <Skeleton className="h-5 w-16 rounded-2xl bg-gray-200 px-2 py-1 sm:px-2 sm:py-1" />
        </div>
      </div>
    </div>
  );
}
