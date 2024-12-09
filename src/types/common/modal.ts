export type ModalType = "apply" | "cancle" | "delete" | "member" | "review" | "profile";
type ModalOption = "size" | "trigger_btn" | "title" | "description" | "submit_btn";

const MODAL_SIZE = {
  sm: "max-w-[25rem] h-52",
  md: "max-w-[30rem] h-[40rem]",
  lg: "max-w-[60rem] max-lg:max-w-[40rem] max-sm:max-w-[30rem] max-2xl:h-[40rem] h-[45rem]",
};

export const MODAL_INFO: Record<ModalType, Partial<Record<ModalOption, string>>> = {
  apply: {
    size: MODAL_SIZE.sm,
    trigger_btn: "모임 신청 하기",
    description: "해당 모임을 신청하시겠습니까?",
    submit_btn: "확인",
  },
  cancle: {
    size: MODAL_SIZE.sm,
    trigger_btn: "모임 취소 하기",
    description: "참여한 모임을 취소하시겠습니까?",
    submit_btn: "확인",
  },
  delete: {
    size: MODAL_SIZE.sm,
    trigger_btn: "모임 삭제 하기",
    description: "정말 모임을 삭제하시겠습니까?",
    submit_btn: "확인",
  },
  member: {
    size: MODAL_SIZE.md,
    trigger_btn: "맴버 더보기",
    title: "맴버 리스트",
  },
  review: {
    size: MODAL_SIZE.md,
    title: "리뷰 작성",
    trigger_btn: "리뷰 작성 하기",
    submit_btn: "리뷰 등록",
  },
  profile: {
    size: MODAL_SIZE.lg,
    title: "프로필 수정",
    trigger_btn: "프로필 수정",
    submit_btn: "변경 내용 저장",
  },
};
