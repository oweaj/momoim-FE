"use client";

import { useGetGatheringDetail } from "@/queries/gatherings-workspace/useGatheringDetail";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { GatheringCreateFormData } from "@/types/category";
import { Loader } from "lucide-react";
import { useLoading } from "@/hooks/useLoading";
import FormLayout from "../../_component/FormLayout";
import GatheringForm from "../../create/_component/GatheringForm";

export default function GatheringEditContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { data, isLoading } = useGetGatheringDetail(Number(id));
  const [initialData, setInitialData] = useState<Partial<GatheringCreateFormData | null>>(null);
  const { loading } = useLoading(isLoading);

  useEffect(() => {
    if (data && data.gatheringContent) {
      setInitialData(data.gatheringContent);
    }
  }, [data]);

  if (isLoading || !initialData || loading) {
    return (
      <div className="h-screen">
        <Loader className="absolute left-1/2 top-1/2 h-10 w-10 animate-spin text-main" />
      </div>
    );
  }

  return (
    <FormLayout title="모임 수정하기">
      <GatheringForm mode="edit" id={Number(id)} defaultData={initialData} />
    </FormLayout>
  );
}
