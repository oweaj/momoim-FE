import { getMoimListQuery } from "@/queries/gatherings/getMoimListQuery";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Suspense } from "react";
import { MoimGridSkeleton } from "./_component/skeletons/MoimGridSkeleton";
import MoimPage from "./_component/MoimPage";

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const queryClient = new QueryClient();
  const upperCategory = params.category.toUpperCase();

  await queryClient.prefetchInfiniteQuery(getMoimListQuery.initialGatheringsQuery(upperCategory));

  return (
    <Suspense
      fallback={
        <div className="flex flex-col gap-6">
          <div className="h-10 w-full animate-pulse rounded-md bg-gray-200" />
          <div className="h-8 w-full animate-pulse rounded-md bg-gray-200" />
          <MoimGridSkeleton />
        </div>
      }
    >
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MoimPage initialCategory={params.category.toUpperCase()} />
      </HydrationBoundary>
    </Suspense>
  );
}
