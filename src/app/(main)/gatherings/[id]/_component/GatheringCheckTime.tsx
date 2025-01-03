export default function GatheringCheckTime({ days, hours }: { days: number; hours: number }) {
  if (!days && !hours) {
    return <span className="text-xl font-semibold text-main">모임 진행중</span>;
  }
  if (!days && hours > 0 && hours < 1) {
    return <span className="text-xl font-semibold text-main">곧 시작!</span>;
  }
  return (
    <div className="flex items-center gap-1">
      <span>
        <span className="text-[32px] font-bold">{days}</span>일
      </span>
      <span>
        <span className="text-[32px] font-bold">{hours}</span>
        시간
      </span>
    </div>
  );
}
