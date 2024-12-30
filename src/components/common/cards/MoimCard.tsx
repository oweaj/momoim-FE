// type 종류
// home | mypage

"use client";

import ProgressBar from "@/components/common/ProgressBar";
import { GatheringContent } from "@/types/common/gatheringContent";
import Image from "next/image";
import { getLocation, getSubcategory } from "@/lib/getLabel";
import { format } from "date-fns";
import thumbnail from "@/assets/images/thumbnail.png";
import LocalIcon from "../../../assets/svg/geography_map_solid.svg";
import Heart from "../Heart";
import Chip from "../Chip";

interface Props {
  type: string;
  data: GatheringContent;
  customOnClick?: () => void;
}

export default function MoimCard({ type, data, customOnClick }: Props) {
  const handleClickToEnter = customOnClick || (() => {});
  if (type === "home") {
    return (
      <button
        type="button"
        className="group flex w-full flex-col items-center justify-center gap-4 bg-white"
        onClick={handleClickToEnter}
      >
        <div className="relative flex h-60 w-full items-center justify-center overflow-hidden rounded-[20px] border-2 border-solid border-gray-200 bg-gray-100">
          {["CANCELED", "FINISHED", "CLOSED"].includes(data?.status as string) ? (
            <div className="absolute flex h-full w-full items-center justify-center bg-[rgba(0,0,0,0.4)] text-center text-white">
              {{
                CANCELED: "취소된 모임",
                CLOSED: "마감 되었어요",
                FINISHED: "종료된 모임",
              }[data?.status as string] || ""}
            </div>
          ) : null}
          <Image
            alt="thumbnail"
            src={data?.image || thumbnail.src}
            fill
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            loading="eager"
          />
        </div>
        <div
          className={`flex w-full flex-col gap-2 px-2 ${(data?.status === "CANCELED" || data?.status === "FINISHED" || (data?.status === "CLOSED" && type === "home")) && "opacity-30"}`}
        >
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <div className="overflow-hidden text-ellipsis whitespace-nowrap text-lg font-bold">{data?.name}</div>
              <div className="flex items-center justify-center">
                <Heart gatheringId={data?.gatheringId as number} isWishlist={data?.isWishlist} />
              </div>
            </div>
            <div className="flex gap-1 text-gray-700">
              <div className="overflow-hidden text-ellipsis whitespace-nowrap">{getSubcategory(data?.subCategory)}</div>
              <div>·</div>
              <div className="flex gap-0.5">
                <div className="flex items-center justify-center">
                  <LocalIcon />
                </div>
                <div className="max-w-24 overflow-hidden text-ellipsis whitespace-nowrap">
                  {getLocation(data?.location)}
                </div>
              </div>
              <div>·</div>
              <div>{format(data?.nextGatheringAt, "MM월 dd일 hh:mm")}</div>
            </div>
            <div>
              <div className="flex gap-1 text-sm">
                {[data?.status, data?.location, data?.isPeriodic].map((each, idx) => {
                  const key = `chip:${data?.gatheringId}:${idx}`;
                  if (typeof each === "boolean") {
                    return each ? <Chip key={key} each="REGULAR" /> : null;
                  }
                  return <Chip key={key} each={each} />;
                })}
              </div>
            </div>
          </div>
          <div>
            <div>
              <ProgressBar participantCount={data?.participantCount} capacity={data?.capacity} />
            </div>
            <div className="flex justify-end">
              <div>최대인원 {data?.capacity}명</div>
            </div>
          </div>
        </div>
      </button>
    );
  }

  if (type === "mypage") {
    return (
      <button type="button" className="flex w-full items-start gap-2 py-2 sm:items-center" onClick={handleClickToEnter}>
        <div className="relative flex aspect-square h-[30%] w-[30%] items-center justify-center overflow-hidden rounded-[20px] border-2 border-solid border-gray-200 sm:min-h-40 sm:w-40 sm:min-w-40">
          {["CANCELED", "FINISHED"].includes(data?.status as string) ? (
            <div className="absolute flex h-full w-full items-center justify-center bg-[rgba(0,0,0,0.4)] text-center text-white">
              {{
                CANCELED: "취소된 모임",
                CLOSED: "마감 되었어요",
                FINISHED: "종료된 모임",
              }[data?.status as string] || ""}
            </div>
          ) : null}
          <Image alt="thumbnail" src={data?.image ? data?.image : thumbnail.src} fill className="object-cover" />
        </div>
        <div
          className={`flex min-w-0 flex-grow flex-col justify-center gap-1 pl-2 ${(data?.status === "CANCELED" || data?.status === "FINISHED") && "opacity-30"}`}
        >
          <div className="flex flex-col gap-1">
            <div className="flex justify-between">
              <div className="overflow-hidden text-ellipsis whitespace-nowrap text-start text-lg font-bold">
                {data?.name}
              </div>
              <div className="flex items-center justify-center">
                <Heart gatheringId={data?.gatheringId as number} isWishlist={data?.isWishlist} />
              </div>
            </div>
            <div className="flex gap-1 text-xs text-gray-700 sm:text-base">
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
              <div>{format(data?.nextGatheringAt, "MM월 dd일 hh:mm")}</div>
            </div>
            <div className="flex gap-1 text-sm">
              {[data?.status, data?.location, data?.isPeriodic].map((each, idx) => {
                const key = `chip:${data?.gatheringId}:${idx}`;
                if (typeof each === "boolean") {
                  return each ? <Chip key={key} each="REGULAR" /> : null;
                }
                return <Chip key={key} each={each} />;
              })}
            </div>
          </div>
          <div>
            <div>
              <ProgressBar participantCount={data?.participantCount} capacity={data?.capacity} />
            </div>
            <div className="flex justify-end text-sm">
              <div>최대인원 {data?.capacity}명</div>
            </div>
          </div>
        </div>
      </button>
    );
  }
}
