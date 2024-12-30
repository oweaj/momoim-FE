export function MoimCardSkeleton() {
  return (
    <div className="flex w-full animate-pulse flex-col items-center justify-center gap-4 bg-white">
      <div className="relative flex h-60 w-full items-center justify-center overflow-hidden rounded-[20px] border-2 border-solid border-gray-200 bg-gray-200" />
      <div className="flex w-full flex-col gap-2 px-2">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <div className="h-7 w-3/4 rounded-md bg-gray-200" />
            <div className="h-7 w-7 rounded-full bg-gray-200" />
          </div>
          <div className="flex gap-1">
            <div className="h-5 w-20 rounded-md bg-gray-200" />
            <div className="h-5 w-1">·</div>
            <div className="flex gap-0.5">
              <div className="h-5 w-20 rounded-md bg-gray-200" />
            </div>
            <div className="h-5 w-1">·</div>
            <div className="h-5 w-32 rounded-md bg-gray-200" />
          </div>
          <div className="flex gap-1">
            <div className="h-6 w-16 rounded-full bg-gray-200" />
            <div className="h-6 w-16 rounded-full bg-gray-200" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-2 w-full rounded-full bg-gray-200" />
          <div className="flex justify-end">
            <div className="h-5 w-24 rounded-md bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
