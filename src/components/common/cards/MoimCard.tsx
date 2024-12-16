// type 종류
// home | mypage

"use client";

import ProgressBar from "@/components/common/ProgressBar";
import { dateFormatter } from "@/lib/dateFormatter";
import { GatheringContent } from "@/types/common/gatheringContent";
import Image from "next/image";
import Logo from "@/assets/svg/logo.svg";
import LocalIcon from "../../../assets/svg/geography_map_solid.svg";
import Heart from "../Heart";
import Chip from "../Chip";

interface Props {
  type: string;
  data: GatheringContent;
  isWishList: boolean;
  likeTask?: () => void;
  customOnClick?: () => void;
}

export default function MoimCard({ type, data, customOnClick, isWishList, likeTask }: Props) {
  const handleClickToEnter = customOnClick || (() => {});
  const handleLike = likeTask || (() => {});

  if (type === "home") {
    return (
      <button
        type="button"
        className="flex max-w-[366px] flex-col items-center justify-center bg-white p-4"
        onClick={handleClickToEnter}
      >
        <div className="relative flex h-60 w-full items-center justify-center overflow-hidden rounded-[20px] bg-gray-100">
          {["CANCELED", "FINISHED", "CLOSED"].includes(data?.status as string) ? (
            <div className="absolute flex h-full w-full items-center justify-center bg-[rgba(0,0,0,0.4)] text-center text-white">
              {{
                CANCELED: "취소된 모임",
                CLOSED: "마감 되었어요",
                FINISHED: "종료된 모임",
              }[data?.status as string] || ""}
            </div>
          ) : null}
          {data?.image ? <Image alt="thumbnail" src={data?.image} layout="fill" objectFit="contain" /> : <Logo />}
        </div>
        <div
          className={`flex w-full flex-col gap-2 px-2 ${(data?.status === "CANCELED" || data?.status === "FINISHED" || (data?.status === "CLOSED" && type === "home")) && "opacity-30"}`}
        >
          <div>
            <div className="flex justify-between py-2">
              <div className="overflow-hidden text-ellipsis whitespace-nowrap text-lg font-bold">{data?.name}</div>
              <div className="pt-1">
                <Heart likeTask={handleLike} isWishList={isWishList} />
              </div>
            </div>
            <div className="flex gap-1 text-gray-700">
              <div className="overflow-hidden text-ellipsis whitespace-nowrap">{data?.subCategory}</div>
              <div>·</div>
              <div className="flex">
                <div className="flex items-center">
                  <LocalIcon />
                </div>
                <div className="max-w-24 overflow-hidden text-ellipsis whitespace-nowrap">{data?.location}</div>
              </div>
              <div>·</div>
              <div>{dateFormatter(data?.nextGatheringAt as string).simple}</div>
            </div>
            <div>
              <div className="flex gap-1 text-sm">
                {[data?.status, data?.gatheringType, data?.isPeriodic].map((each, idx) => {
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
      <button
        type="button"
        className="flex w-full max-w-[1100px] items-start gap-2 py-2 sm:items-center"
        onClick={handleClickToEnter}
      >
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
          {data?.image ? <Image alt="thumbnail" src={data?.image} layout="fill" objectFit="contain" /> : <Logo />}
        </div>
        <div
          className={`flex min-w-0 flex-grow flex-col justify-center gap-1 pl-2 ${(data?.status === "CANCELED" || data?.status === "FINISHED") && "opacity-30"}`}
        >
          <div className="flex flex-col gap-1">
            <div className="flex justify-between">
              <div className="overflow-hidden text-ellipsis whitespace-nowrap text-start text-lg font-bold">
                {data?.name}
              </div>
              <div className="pt-1">
                <Heart likeTask={handleLike} isWishList={isWishList} />
              </div>
            </div>
            <div className="flex gap-1 text-xs text-gray-700 sm:text-base">
              <div className="overflow-hidden text-ellipsis whitespace-nowrap">{data?.subCategory}</div>
              <div>·</div>
              <div className="flex">
                <div className="flex items-center">
                  <LocalIcon />
                </div>
                <div className="max-w-11 overflow-hidden text-ellipsis whitespace-nowrap xs:max-w-full">
                  {data?.location}
                </div>
              </div>
              <div>·</div>
              <div>{dateFormatter(data?.nextGatheringAt as string).simple}</div>
            </div>
            <div className="flex gap-1 text-sm">
              {[data?.status, data?.gatheringType, data?.isPeriodic].map((each, idx) => {
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
