"use client";

import { useParams } from "next/navigation";
import { useGetGatheringDetail } from "@/queries/gatherings-workspace/useGatheringDetail";
import { useEffect } from "react";
import Viewer from "./_component/DetailViewer";
import KaKaoMap from "./_component/KaKaoMap";

export default function GatheringDetailPage() {
  const params = useParams();
  const id = Number(params.id);
  const data = useGetGatheringDetail(id);
  const dataContent = data?.gatheringContent;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="w-full max-md:w-full">
      <div className="flex max-w-[56rem] flex-col gap-10">
        <Viewer content={dataContent?.description} />
        {dataContent?.location !== "ONLINE" && <KaKaoMap address={dataContent?.address} />}
      </div>
    </div>
  );
}
