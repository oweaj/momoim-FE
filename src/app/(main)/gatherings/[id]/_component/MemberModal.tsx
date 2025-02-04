import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Members } from "@/types/common/members";
import DefaultProfile from "@/assets/svg/default-profile.svg";
import { Crown } from "lucide-react";
import { Modal } from "@/components/common/modal/Modal";
import { Dispatch, SetStateAction, useState } from "react";
import { useGatheringMemberDelete } from "@/queries/gatherings-workspace/useGatheringMemberDelete";
import { useParams } from "next/navigation";
import { useUser } from "@/queries/auth/useUser";

interface MemberProps {
  members: Members[];
  managerName: string | undefined;
  setMemberOpen: Dispatch<SetStateAction<boolean>>;
}

export default function MemberModal({ members, managerName, setMemberOpen }: MemberProps) {
  const [open, setOpen] = useState<{ [key: number]: boolean }>({});
  const { mutate: gatheringMemberDelete } = useGatheringMemberDelete();
  const { data } = useUser();
  const params = useParams();

  const handleMutate = (gatheringMemberId: number, memberName: string, id: number) => {
    gatheringMemberDelete({ gatheringMemberId, memberName, id });
    setOpen((prev) => ({
      ...prev,
      [gatheringMemberId]: false,
    }));
    setMemberOpen(false);
  };

  const handleOpenModal = (gatheringMemberId: number) => {
    setOpen((prev) => ({
      ...prev,
      [gatheringMemberId]: true,
    }));
  };

  const handleOpenChange = (gatheringMemberId: number, isOpen: boolean) => {
    setOpen((prev) => ({
      ...prev,
      [gatheringMemberId]: isOpen,
    }));
  };

  return (
    <ul className="flex h-full max-h-[25rem] w-full flex-col gap-3">
      {members?.map(({ userId, name, profileImage, gatheringMemberId }) => {
        const isUserManager = data?.name === managerName;
        const isMemberManager = name === managerName;
        const isMember = name !== managerName;
        let modalContent;

        if (isUserManager && isMember) {
          modalContent = (
            <Modal
              open={open[gatheringMemberId] || false}
              action={(isOpen) => handleOpenChange(gatheringMemberId, isOpen)}
              size="max-sm:w-11/12"
              triggerButton={
                <Button
                  type="button"
                  className="h-10 w-full max-w-24"
                  onClick={() => handleOpenModal(gatheringMemberId)}
                >
                  맴버 제외
                </Button>
              }
              content={
                <div>
                  정말 <span className="text-lg font-bold text-main">{name}</span>님을 모임에서 제외하시겠습니까?
                </div>
              }
              onSubmit={() => handleMutate(gatheringMemberId, name, Number(params.id))}
            />
          );
        } else if (isMemberManager) {
          modalContent = (
            <div className="flex h-10 w-full max-w-24 items-center justify-center gap-[5px] rounded-md border border-gray-500 p-3 text-sm font-semibold">
              <Crown className="h-4 w-4 text-yellow-500" />
              <span className="whitespace-nowrap">모임장</span>
            </div>
          );
        }

        return (
          <li key={userId} className="flex items-center justify-between">
            <div className="flex w-full items-center gap-2">
              <div key={userId} className="relative flex h-[34px] w-[34px] items-center overflow-hidden rounded-[50%]">
                {profileImage === "DEFAULT_PROFILE_IMAGE" ? (
                  <DefaultProfile />
                ) : (
                  <Image src={profileImage} fill sizes="100%" className="object-cover" alt="member-image" />
                )}
              </div>
              <span className="w-3/4 overflow-hidden text-ellipsis whitespace-nowrap max-xs:w-36">{name}</span>
            </div>
            {modalContent}
          </li>
        );
      })}
    </ul>
  );
}
