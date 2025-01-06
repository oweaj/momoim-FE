import { Modal } from "@/components/common/modal/Modal";
import { Button } from "@/components/ui/button";
import { useUser } from "@/queries/auth/useUser";
import { useGatheringDelete } from "@/queries/gatherings-workspace/useGatheringDelete";
import { useGatheringJoin } from "@/queries/gatherings/useGatheringJoin";
import { useGatheringJoinCancel } from "@/queries/gatherings/useGatheringJoinCancel";
import { DetailContent } from "@/types/common/gatheringContent";
import { Members } from "@/types/common/members";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DetailButton({
  data,
  managerName,
  members,
}: {
  data: DetailContent;
  managerName: string | undefined;
  members: Members[];
}) {
  const { data: user } = useUser();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { mutate: gatheringJoin } = useGatheringJoin();
  const { mutate: gatheringDelete } = useGatheringDelete();
  const { mutate: gatheringJoinCancel } = useGatheringJoinCancel();

  const handleMutate = (mutate: any) => {
    if (data.id) {
      mutate(data.id);
      setOpen(false);
    }
  };

  const isMember = members.some((member) => member.name === user?.name);
  const gatheringEditPage = () => {
    router.push(`/gatherings/edit?id=${data.id}`);
  };

  if (user?.name !== managerName && isMember) {
    return (
      <Modal
        open={open}
        action={setOpen}
        size="max-xs:w-11/12"
        triggerButton={
          <Button type="button" className="w-full">
            취소 하기
          </Button>
        }
        content={
          <div className="flex flex-col items-center justify-center gap-1">
            <div>
              참여한 모임을 <span className="text-lg font-bold text-red-600">취소</span> 하시겠습니까?
            </div>
          </div>
        }
        onSubmit={() => handleMutate(gatheringJoinCancel)}
      />
    );
  }

  if (data.capacity === data.participantCount) {
    return (
      <Button type="button" className="w-full" disabled>
        인원 마감
      </Button>
    );
  }

  if (user?.name !== managerName && !isMember) {
    return (
      <Modal
        open={open}
        action={setOpen}
        size="max-xs:w-11/12"
        triggerButton={
          <Button type="button" className="w-full">
            신청 하기
          </Button>
        }
        content={
          <div className="flex flex-col items-center justify-center gap-1">
            <div>
              해당 모임에 <span className="text-lg font-bold text-main">신청</span> 하시겠습니까?
            </div>
          </div>
        }
        onSubmit={() => handleMutate(gatheringJoin)}
      />
    );
  }

  return (
    <div>
      {user?.name === managerName && (
        <div className="flex gap-2">
          <Button type="button" className="w-full" onClick={() => gatheringEditPage()}>
            수정 하기
          </Button>
          <Modal
            open={open}
            action={setOpen}
            size="max-xs:w-11/12"
            triggerButton={
              <Button type="button" className="w-full">
                삭제 하기
              </Button>
            }
            content={
              <div className="flex flex-col items-center justify-center gap-1">
                <div>
                  정말 모임을 <span className="text-lg font-bold text-red-600">삭제</span> 하시겠습니까?
                </div>
                <span className="text-sm text-gray-700">해당 모임에 대한 모든 정보가 삭제됩니다.</span>
              </div>
            }
            onSubmit={() => handleMutate(gatheringDelete)}
          />
        </div>
      )}
    </div>
  );
}
