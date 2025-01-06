"use client";

import Image from "next/image";
import DefaultProfile from "@/assets/svg/default-profile.svg";
import { Members } from "@/types/common/members";
import clsx from "clsx";
import { Search, Ellipsis, Divide } from "lucide-react";
import { Modal } from "@/components/common/modal/Modal";
import { useState } from "react";
import { DetailContent } from "@/types/common/gatheringContent";
import MemberModal from "./MemberModal";

interface DetailMemberProps {
  data: DetailContent;
  members: Members[];
  managerName: string | undefined;
  defaultView: boolean;
}

export default function DetailCardMember({ data, members, managerName, defaultView }: DetailMemberProps) {
  const [memberOpen, setMemberOpen] = useState(false);

  return (
    <div className={clsx("flex gap-2.5", defaultView ? "max-blg:hidden" : "blg:hidden")}>
      <div className="flex items-center">
        <Modal
          open={memberOpen}
          action={setMemberOpen}
          title="맴버 리스트"
          size="max-xs:w-11/12"
          triggerButton={
            <div className="flex cursor-pointer items-center gap-2">
              <div className="flex gap-2.5">
                {members?.map((member, idx) => {
                  if (defaultView ? idx >= 6 : idx >= 4) return null;
                  return (
                    <div
                      key={member?.userId}
                      className="relative flex h-[34px] w-[34px] items-center overflow-hidden rounded-[50%]"
                    >
                      {member.profileImage === "DEFAULT_PROFILE_IMAGE" ? (
                        <DefaultProfile />
                      ) : (
                        <Image alt="member-image" layout="fill" objectFit="cover" src={member.profileImage} />
                      )}
                    </div>
                  );
                })}
              </div>
              {data?.participantCount > 6 && <Ellipsis className="h-4 w-4" />}
              <button type="button">
                <Search className="h-5 w-5 text-gray-700" />
              </button>
            </div>
          }
          content={<MemberModal members={members} managerName={managerName} setMemberOpen={setMemberOpen} />}
          showFooter={false}
        />
      </div>
    </div>
  );
}
