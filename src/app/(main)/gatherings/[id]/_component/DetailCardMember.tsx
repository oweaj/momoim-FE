"use client";

import Image from "next/image";
import DefaultProfile from "@/assets/svg/default-profile.svg";
import { Members } from "@/types/common/members";
import clsx from "clsx";
import { Search, Ellipsis } from "lucide-react";
import { Modal } from "@/components/common/modal/Modal";
import { useState } from "react";
import MemberModal from "./MemberModal";

interface DetailMemberProps {
  members: Members[];
  managerName: string | undefined;
  defaultView: boolean;
}

export default function DetailCardMember({ members, managerName, defaultView }: DetailMemberProps) {
  const [memberOpen, setMemberOpen] = useState(false);

  return (
    <div className={clsx("flex gap-2.5", defaultView ? "max-blg:hidden" : "blg:hidden")}>
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
      <div className="flex items-center gap-2">
        <Ellipsis className="h-4 w-4" />
        <Modal
          open={memberOpen}
          action={setMemberOpen}
          title="맴버 리스트"
          size="max-xs:w-11/12"
          triggerButton={
            <button type="button">
              <Search className="h-5 w-5 text-gray-700" />
            </button>
          }
          content={<MemberModal members={members} managerName={managerName} setMemberOpen={setMemberOpen} />}
          showFooter={false}
        />
      </div>
    </div>
  );
}
