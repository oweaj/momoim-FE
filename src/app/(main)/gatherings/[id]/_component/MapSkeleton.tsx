import { Skeleton } from "@/components/ui/skeleton";

export default function MapSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-100">
      <Skeleton className="h-[300px] w-full bg-gray-100" />
      <div className="p-5">
        <Skeleton className="h-6 bg-gray-100" />
      </div>
    </div>
  );
}
