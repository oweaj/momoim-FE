"use client";

import { useGetGatheringDetail } from "@/queries/gatherings-workspace/useGatheringDetail";
import { leftTimeGenerator } from "@/lib/leftTimeGenerator";
import clsx from "clsx";
import DetailButton from "./DetailButton";
import DetailCardMember from "./DetailCardMember";
import GatheringCheckTime from "./GatheringCheckTime";

export default function DetailCheckTime({ id, defaultView }: { id: number; defaultView: boolean }) {
  const { data } = useGetGatheringDetail(id);
  if (!data) return null;

  const dataContent = data?.gatheringContent;
  const { hours, days } = leftTimeGenerator(dataContent?.nextGatheringAt as string);

  return (
    <div
      className={clsx(
        "sticky top-28 mt-[59px] flex h-56 w-full max-w-80 flex-col justify-between gap-6 max-blg:mt-2 max-blg:h-36 max-blg:max-w-full",
        defaultView ? "max-blg:hidden" : "blg:hidden",
      )}
    >
      {dataContent?.managerId && (
        <DetailCardMember
          data={dataContent}
          members={data.members}
          managerName={dataContent?.managerName}
          defaultView
        />
      )}
      <div className="w-full">
        <div className="text-gray-500">남은 시간</div>
        <GatheringCheckTime days={days} hours={hours} />
      </div>
      <DetailButton data={dataContent} managerName={dataContent?.managerName} members={data.members} />
    </div>
  );
}
