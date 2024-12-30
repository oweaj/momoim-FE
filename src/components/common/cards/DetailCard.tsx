import { leftTimeGenerator } from "@/lib/leftTimeGenerator";
import { GatheringContent } from "@/types/common/gatheringContent";
import { Members } from "@/types/common/members";
import Image from "next/image";
import Logo from "@/assets/svg/logo.svg";
import { format } from "date-fns";
import DefaultProfile from "../../../assets/svg/default-profile.svg";
import LocalIcon from "../../../assets/svg/geography_map_solid.svg";
import Person from "../../../assets/svg/person.svg";
import Chip from "../Chip";

interface Props {
  data: GatheringContent;
  members?: Members[];
  customButton?: React.ReactNode;
}

export default function DetailCard({ data, members, customButton }: Props) {
  return (
    <div className="flex flex-col items-center gap-4 p-4 blg:w-[1100px]">
      <div className="flex w-full flex-col items-center justify-center sm:flex-row">
        <div className="relative mx-2 flex h-60 w-full max-w-[375px] items-center justify-center overflow-hidden rounded-[20px] border-2 border-solid border-gray-200 sm:max-w-60">
          {data?.image ? <Image alt="thumbnail" src={data?.image} layout="fill" objectFit="contain" /> : <Logo />}
        </div>
        <div className="flex w-full items-center justify-center sm:justify-between">
          <div className="flex w-full max-w-[375px] flex-col gap-4 p-2 sm:max-w-full">
            <div className="w-full text-start font-bold text-main">{data?.category}</div>
            <div className="flex flex-col gap-1">
              <div className="flex w-full justify-start">
                <div className="text-overflow text-[26px] font-bold sm:text-[32px]">{data?.name}</div>
              </div>
              <div className="flex w-full justify-start gap-1 text-xs text-gray-700">
                <div className="overflow-hidden text-ellipsis whitespace-nowrap">{data?.subCategory}</div>
                <div>·</div>
                <div className="flex">
                  <div className="flex items-center">
                    <LocalIcon />
                  </div>
                  <div className="max-w-11 overflow-hidden text-ellipsis whitespace-nowrap xs:max-w-16 md:max-w-full">
                    {data?.location}
                  </div>
                </div>
                <div>·</div>
                <div>{format(data?.nextGatheringAt, "MM월 dd일 hh:mm")}</div>
                <div>·</div>
                <div className="flex">
                  <div className="flex">
                    <Person />
                  </div>
                  {data?.participantCount}/{data?.capacity}
                </div>
              </div>
              <div className="flex gap-1 text-sm">
                {[data?.status, data?.location, data?.isPeriodic].map((each, idx) => {
                  const key = `chip:${data?.id}:${idx}`;
                  if (typeof each === "boolean") {
                    return each ? <Chip key={key} each="REGULAR" /> : null;
                  }
                  return <Chip key={key} each={each} />;
                })}
              </div>
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1">
                <div className="relative flex h-8 w-8 items-center overflow-hidden rounded-full">
                  {data?.managerProfileImage ? (
                    <Image
                      layout="fill"
                      objectFit="contain"
                      alt="managerProfileImage"
                      src={data?.managerProfileImage}
                    />
                  ) : (
                    <DefaultProfile />
                  )}
                </div>
                <div>{data?.managerName}</div>
              </div>
              {/* 멤버창 컴포넌트 별도제작시 아래 div 대신 투입 - 1 */}
              <div className="flex gap-2.5 lg:hidden">
                <div className="flex gap-2.5">
                  {members?.map((member, idx) => {
                    if (idx >= 3) return null;
                    return (
                      <div key={member?.userId} className="relative flex h-[34px] w-[34px] items-center rounded-full">
                        {member.profileImage ? (
                          <Image alt="member-image" layout="fill" objectFit="contain" src={member.profileImage} />
                        ) : (
                          <DefaultProfile />
                        )}
                      </div>
                    );
                  })}
                </div>
                <button type="button">...</button>
              </div>
              {/* @@@ */}
            </div>
          </div>
          <div className="hidden h-full w-[318px] flex-col gap-6 px-4 lg:flex">
            {/* 멤버창 컴포넌트 제작시 아래 div 대신 투입 - 2 */}
            <div className="flex gap-2.5">
              <div className="flex gap-2.5">
                {members?.map((member, idx) => {
                  if (idx >= 5) return null;
                  return (
                    <div key={member?.userId} className="relative flex h-[34px] w-[34px] items-center rounded-[50%]">
                      {member.profileImage ? (
                        <Image alt="member-image" layout="fill" objectFit="contain" src={member.profileImage} />
                      ) : (
                        <DefaultProfile />
                      )}
                    </div>
                  );
                })}
              </div>
              <button type="button">...</button>
            </div>
            {/* @@@ */}
            <div className="hidden h-full justify-center lg:flex">
              <div className="w-full">
                <div className="text-gray-500">남은 시간</div>
                <div>
                  <span className="text-[32px] font-bold">
                    {leftTimeGenerator(data?.nextGatheringAt as string).days}
                  </span>
                  일{" "}
                  <span className="text-[32px] font-bold">
                    {leftTimeGenerator(data?.nextGatheringAt as string).hours}
                  </span>
                  시간
                </div>
              </div>
            </div>
            {customButton}
          </div>
        </div>
      </div>
      <div className="flex w-full max-w-[375px] flex-col items-center justify-center px-2 sm:max-w-full lg:hidden">
        <div className="w-full">
          <div className="text-gray-500">남은 시간</div>
          <div>
            <span className="text-[32px] font-bold">{leftTimeGenerator(data?.nextGatheringAt as string).days}</span>일{" "}
            <span className="text-[32px] font-bold">{leftTimeGenerator(data?.nextGatheringAt as string).hours}</span>
            시간
          </div>
        </div>
        {customButton}
      </div>
    </div>
  );
}
