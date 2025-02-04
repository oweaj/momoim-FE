"use client";

import { GatheringContent } from "@/types/common/gatheringContent";
import Image from "next/image";
import LocalIcon from "@/assets/svg/geography_map_solid.svg";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/common/modal/Modal";
import thumbnail from "@/assets/images/thumbnail.png";
import { useState } from "react";
import { getLocation, getSubcategory } from "@/lib/getLabel";
import { format } from "date-fns";
import ReviewPostSection from "./ReviewPostSection";

interface Props {
  data: GatheringContent;
}

export default function UnreviewedCard({ data }: Props) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="max-w-[375px]">
      <div className="flex w-full items-center gap-2 py-2 sm:items-center">
        <div className="relative flex aspect-square h-[20%] w-[20%] items-center justify-center overflow-hidden rounded-xl border-2 border-solid border-gray-200 xs:h-24 xs:w-24">
          <Image
            alt="thumbnail"
            src={data?.image ? data?.image : thumbnail.src}
            fill
            sizes="100%"
            className="object-cover"
            priority
          />
        </div>
        <div
          className={`flex h-24 min-w-0 flex-grow flex-col justify-center gap-1 pl-2 ${(data?.status === "CANCELED" || data?.status === "FINISHED") && "opacity-30"}`}
        >
          <div className="flex flex-col gap-1">
            <div className="flex justify-between">
              <div className="overflow-hidden text-ellipsis whitespace-nowrap text-start text-lg font-bold">
                {data?.name}
              </div>
            </div>
            <div className="flex gap-1 text-xs text-gray-700">
              <div className="overflow-hidden text-ellipsis whitespace-nowrap">{getSubcategory(data?.subCategory)}</div>
              <div>·</div>
              <div className="flex gap-0.5">
                <div className="flex w-4 items-start justify-center sm:w-6 sm:items-center">
                  <LocalIcon />
                </div>
                <div className="max-w-11 overflow-hidden text-ellipsis whitespace-nowrap xs:max-w-full">
                  {getLocation(data?.location)}
                </div>
              </div>
              <div>·</div>
              <div>{format(data?.nextGatheringAt, "MM월 dd일 HH:mm")}</div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="리뷰 쓰기"
        content={<ReviewPostSection data={data} closeModal={setModalOpen} />}
        size="w-[520px] p-6 overflow-auto scrollbar-hide"
        showFooter={false}
        open={modalOpen}
        action={setModalOpen}
        triggerButton={
          <Button variant="outline" className="w-full">
            리뷰 작성하기
          </Button>
        }
      />
    </div>
  );
}
