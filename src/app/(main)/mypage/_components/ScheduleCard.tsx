"use client";

import { ScheduleData } from "@/types/common/scheduleData";
import Image from "next/image";
import { getCategory, getLocation, getSubcategory } from "@/lib/getLabel";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import thumbnail from "@/assets/images/thumbnail.png";

interface Props {
  data: ScheduleData;
}

export default function ScheduleCard({ data }: Props) {
  const router = useRouter();
  return (
    <button
      type="button"
      className="max-w-[375px]"
      onClick={() => {
        router.push(`/gatherings/${data?.gatheringId}`);
      }}
    >
      <div className="flex w-full items-center gap-2 py-2 sm:items-center">
        <div className="relative flex aspect-square h-[20%] w-[20%] items-center justify-center overflow-hidden rounded-[20px] border-2 border-solid border-gray-200 xs:h-20 xs:w-20">
          <Image
            alt="thumbnail"
            src={data?.gatheringImage ? data?.gatheringImage : thumbnail.src}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex h-24 min-w-0 flex-grow flex-col justify-center gap-1 pl-2">
          <div className="flex flex-col gap-2">
            <div className="text-start text-sm font-semibold text-main">{getCategory(data?.category)}</div>
            <div className="flex justify-between">
              <div className="overflow-hidden text-ellipsis whitespace-nowrap text-start text-lg font-bold">
                {data?.gatheringName}
              </div>
            </div>
            <div className="flex gap-1 text-xs text-gray-700">
              <div className="overflow-hidden text-ellipsis whitespace-nowrap">{getSubcategory(data?.subCategory)}</div>
              <div>·</div>
              <div className="max-w-11 overflow-hidden text-ellipsis whitespace-nowrap xs:max-w-full">
                {getLocation(data?.gatheringLocation)}
              </div>
              <div>·</div>
              <div className="text-main">{format(data?.nextGatheringAt, "MM월 dd일 hh:mm")}</div>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
