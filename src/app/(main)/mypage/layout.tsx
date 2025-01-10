import { Suspense } from "react";
import TopButton from "@/components/common/TopButton";
import ProfileBox from "./_components/ProfileBox";
import MypageTabs from "./_components/MypageTabs";

export default async function MyPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex w-full flex-col items-center gap-4">
      <div className="flex w-full flex-col">
        <ProfileBox />
        <MypageTabs />
      </div>
      <div className="flex w-full flex-col gap-4">
        <Suspense fallback={<div />}>{children}</Suspense>
      </div>
      <TopButton />
    </div>
  );
}
