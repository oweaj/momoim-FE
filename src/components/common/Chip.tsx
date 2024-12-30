interface Props {
  each: string;
}

interface ChipStyle {
  font: string;
  fc: string;
  bg: string;
}

export default function Chip({ each }: Props) {
  const EACH_CHIP_STYLE: { [key: string]: ChipStyle } = {
    OPEN: {
      font: "모집 중",
      fc: "text-chipfc-open",
      bg: "bg-chipbg-open",
    },
    FULL: {
      font: "정원 초과",
      fc: "text-chipfc-full",
      bg: "bg-chipbg-full",
    },
    CLOSED: {
      font: "접수 마감",
      fc: "text-chipfc-closed",
      bg: "bg-chipbg-closed",
    },
    CANCELED: {
      font: "모임 취소",
      fc: "text-chipfc-canceled",
      bg: "bg-chipbg-canceled",
    },
    FINISHED: {
      font: "모임 종료",
      fc: "text-chipfc-finished",
      bg: "bg-chipbg-finished",
    },
    ONLINE: {
      font: "온라인",
      fc: "text-chipfc-online",
      bg: "bg-chipbg-online",
    },
    REGULAR: {
      font: "정기 모임",
      fc: "text-chipfc-regular",
      bg: "bg-chipbg-regular",
    },
  };

  const validKey = Object.keys(EACH_CHIP_STYLE).includes(each) ? each : "OFFLINE";

  if (validKey === "OFFLINE") return null;

  return (
    <div
      className={`rounded-2xl px-2 py-1 sm:px-2 sm:py-1 ${EACH_CHIP_STYLE[validKey].fc} ${EACH_CHIP_STYLE[validKey].bg}`}
    >
      {EACH_CHIP_STYLE[validKey].font}
    </div>
  );
}
