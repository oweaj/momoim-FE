import { gatheringDetailGetApi } from "@/api/gatherings";
import BackButton from "@/app/_component/BackButton";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
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

  await queryClient.prefetchQuery({
    queryKey: ["gatheringDetail", id],
    queryFn: () => gatheringDetailGetApi(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="justify-betwee flex gap-14">
        <div className="flex flex-1 flex-col gap-6">
          <BackButton />
          <GatheringDeteilContent id={id} />
          <DetailPageTab id={id} />
          {children}
        </div>
        <DetailCheckTime id={id} defaultView />
      </div>
    </HydrationBoundary>
  );
}
