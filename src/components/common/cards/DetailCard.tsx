import { GatheringDetail } from "@/types/common/gatheringContent";
import Image from "next/image";
import { format } from "date-fns";
import DefaultProfile from "@/assets/svg/default-profile.svg";
import LocalIcon from "@/assets/svg/geography_map_solid.svg";
import Person from "@/assets/svg/person.svg";
import DetailCardMember from "@/app/(main)/gatherings/[id]/_component/DetailCardMember";
import { getCategory, getOnlinePlatform, getSubcategory } from "@/lib/getLabel";
import DefaultThumbnail from "@/assets/images/thumbnail.png";
import DetailCheckTime from "@/app/(main)/gatherings/[id]/_component/DetailCheckTime";
import Chip from "../Chip";

export default function DetailCard({ id, detailData }: { id: number; detailData: GatheringDetail }) {
  const data = detailData.gatheringContent;

  return (
    <div className="flex h-full w-full flex-wrap items-center gap-4 max-md:justify-center">
      <div className="flex h-56 w-60 items-center justify-center overflow-hidden rounded-[20px] border-2 border-solid border-gray-200 max-md:w-full">
        <Image
          src={data.image || DefaultThumbnail}
          className="h-full w-full rounded-xl object-cover"
          width={500}
          height={500}
          alt="모임 상세 이미지"
          priority={!data.image}
        />
      </div>
      <div className="flex flex-1 flex-col justify-between gap-3">
        <div className="w-full font-bold text-main">
          <span>{getCategory(data.category)}</span>
          <span className="text-gray-700"> ・ {getSubcategory(data.subCategory)}</span>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex w-full justify-start">
            <h2 className="text-[26px] font-bold transition-all sm:text-[32px]">{data.name}</h2>
          </div>
          <div className="flex w-full flex-col justify-start gap-1 text-sm text-gray-700">
            <div className="flex items-center gap-2 max-xs:gap-2">
              <LocalIcon />
              {data.location === "ONLINE" ? (
                <div className="flex-wrap">{getOnlinePlatform(data.address)}</div>
              ) : (
                <div className="flex-wrap">{data.address}</div>
              )}
            </div>
            <div className="flex items-center gap-1">
              <div>{format(data.nextGatheringAt, "yyyy년 MM월 dd일 HH:mm")}</div>
              <div>·</div>
              <div className="flex items-center">
                <div className="flex">
                  <Person />
                </div>
                {data.participantCount}/{data.capacity}
              </div>
            </div>
          </div>
          <div className="flex gap-2 text-sm">
            {[data.status, data.location, data.isPeriodic].map((each, idx) => {
              const key = `chip:${data?.id}:${idx}`;
              if (each === "OPEN") {
                const status = data?.capacity === data?.participantCount ? "CLOSED" : "OPEN";
                return <Chip key={key} each={status} />;
              }
              if (typeof each === "boolean") {
                return each ? <Chip key={key} each="REGULAR" /> : null;
              }
              return each ? <Chip key={key} each={each} /> : null;
            })}
          </div>
          <div className="flex w-full items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="relative flex h-[34px] w-[34px] items-center overflow-hidden rounded-full">
                {data.managerProfileImage === "DEFAULT_PROFILE_IMAGE" ? (
                  <DefaultProfile />
                ) : (
                  <Image
                    layout="fill"
                    objectFit="cover"
                    alt="managerProfileImage"
                    src={data.managerProfileImage || ""}
                  />
                )}
              </div>
              <div>{data.managerName}</div>
            </div>
            {data.managerId && (
              <DetailCardMember
                data={data}
                members={detailData.members}
                managerName={data.managerName}
                defaultView={false}
              />
            )}
          </div>
        </div>
      </div>
      <DetailCheckTime id={id} defaultView={false} />
    </div>
  );
}
