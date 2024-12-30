import { defaultChipStyle, labelStyle } from "@/types/common/chip";

interface Props {
  status: string;
  gatheringType: string;
  isPeriodic?: boolean;
}

export default function Chips({ status, gatheringType, isPeriodic }: Props) {
  return (
    <div className="flex gap-1 text-sm sm:text-base">
      <div className={`${defaultChipStyle} ${labelStyle[status].fc} ${labelStyle[status].bg}`}>
        {labelStyle[status].font}
      </div>
      <div className={`${defaultChipStyle} ${labelStyle[gatheringType].fc} ${labelStyle[gatheringType].bg}`}>
        {labelStyle[gatheringType].font}
      </div>
      {isPeriodic && (
        <div className={`${defaultChipStyle} ${labelStyle.REGULAR.fc} ${labelStyle.REGULAR.bg}`}>
          {labelStyle.REGULAR.font}
        </div>
      )}
    </div>
  );
}
