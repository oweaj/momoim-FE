import { Suspense } from "react";
import GatheringEditContent from "./_component/GatheringEdit";

export default function GatheringEdit() {
  return (
    <Suspense>
      <GatheringEditContent />
    </Suspense>
  );
}
