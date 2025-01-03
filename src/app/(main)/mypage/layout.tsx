import { Suspense } from "react";
import TopButton from "@/components/common/TopButton";

import UpperPart from "./_components/UpperPart";

export default function MyPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex w-full flex-col items-center gap-4">
      <UpperPart />
      <div className="flex w-full flex-col gap-4">
        <Suspense fallback={<div />}>{children}</Suspense>
      </div>
      <TopButton />
    </div>
  );
}
