"use client";

import DetailCard from "@/components/common/cards/DetailCard";
import { useGetGatheringDetail } from "@/queries/gatherings-workspace/useGatheringDetail";

export default function GatheringDeteil({ id }: { id: number }) {
  const data = useGetGatheringDetail(id);
  if (!data) return null;

  return <DetailCard id={id} detailData={data} />;
}
