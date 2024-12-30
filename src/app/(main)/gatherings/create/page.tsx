import GatheringForm from "./_component/GatheringForm";
import BackButton from "../../../_component/BackButton";

export default function GetheringCreate() {
  return (
    <div className="mx-auto flex w-[708px] flex-col gap-12 rounded-lg pb-10 transition-all max-md:w-full">
      <div className="flex items-center gap-2 text-lg font-semibold">
        <BackButton />
        <h2>모임 만들기</h2>
      </div>
      <GatheringForm />
    </div>
  );
}
