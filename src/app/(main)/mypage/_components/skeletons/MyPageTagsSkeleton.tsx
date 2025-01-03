import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  number: number;
}

export default function MyPageTagsSkeleton({ number }: Props) {
  return (
    <div className="flex w-full gap-2 overflow-x-auto overflow-y-hidden whitespace-nowrap font-medium scrollbar-hide">
      {Array.from({ length: number }, (_, idx) => (
        <Skeleton key={idx} className="h-[44px] w-20 rounded-xl bg-gray-200 px-4 py-3 text-sm sm:text-base" />
      ))}
    </div>
  );
}
