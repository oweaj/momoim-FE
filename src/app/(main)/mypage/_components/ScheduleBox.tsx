"use client";

import { ScheduleData } from "@/types/common/scheduleData";
import { format } from "date-fns";
import { EmptyState } from "@/components/common/EmptyState";
import { useRouter } from "next/navigation";
import ScheduleCard from "./ScheduleCard";

interface Props {
  data: ScheduleData[];
  date: Date;
}

export default function ScheduleBox({ data, date }: Props) {
  const selected = format(date, "yyyy-MM-dd");
  const router = useRouter();

  const filteredElements = data
    .map((item, index) => {
      if (selected === format(item.nextGatheringAt, "yyyy-MM-dd")) {
        const isFirst =
          data.slice(0, index).filter((prev) => format(prev.nextGatheringAt, "yyyy-MM-dd") === selected).length === 0;
        return (
          <div key={`key:${item.gatheringId}`} className={isFirst ? "" : "border-t border-solid"}>
            <ScheduleCard data={item} />
          </div>
        );
      }
      return null;
    })
    .filter((element) => element !== null);

  return (
    <div className="flex h-auto flex-col gap-4 rounded-3xl border border-solid px-8 pb-6 pt-8 md:w-1/2">
      <div className="text-lg font-semibold">모임 일정 캘린더</div>
      {filteredElements.length > 0 ? (
        <div className="h-[350px] overflow-y-scroll scrollbar-hide">{filteredElements}</div>
      ) : (
        <EmptyState
          title="아직 일정이 없어요"
          description="지금 바로 모임에 참여해보세요!"
          actionText="모임 찾기"
          onAction={() => router.push("/all")}
          className="h-full min-h-0"
        />
      )}
    </div>
  );
}
