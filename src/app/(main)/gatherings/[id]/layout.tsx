import { gatheringDetailGetApi } from "@/api/gatherings";
import BackButton from "@/app/_component/BackButton";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { gatheringReviewsApi, reviewsAverageApi } from "@/api/review";
import GatheringDeteilContent from "./_component/GatheringDeteil";
import DetailPageTab from "./_component/DetailPageTab";
import DetailCheckTime from "./_component/DetailCheckTime";

interface LayoutProps {
  children: React.ReactNode;
  params: {
    id: string;
  };
}

export default async function Layout({ children, params }: LayoutProps) {
  const queryClient = new QueryClient();
  const id = Number(params.id);

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["gatheringDetail", id],
      queryFn: () => gatheringDetailGetApi(id),
    }),
    queryClient.prefetchInfiniteQuery({
      queryKey: ["review", "gatheringReviews", id],
      queryFn: () => gatheringReviewsApi(id, { offset: 0, limit: 5 }),
      initialPageParam: 0,
    }),
    queryClient.prefetchQuery({
      queryKey: ["review", "average", id],
      queryFn: () => reviewsAverageApi(id),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="justify-betwee flex gap-14">
        <div className="flex flex-1 flex-col gap-6">
          <BackButton home />
          <GatheringDeteilContent id={id} />
          <DetailPageTab id={id} />
          {children}
        </div>
        <DetailCheckTime id={id} defaultView />
      </div>
    </HydrationBoundary>
  );
}
