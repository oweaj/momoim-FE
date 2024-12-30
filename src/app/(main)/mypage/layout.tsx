import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { cookies } from "next/headers";
import TopButton from "@/components/common/TopButton";
import MypageTabs from "./_components/MypageTabs";
import ProfileBox from "./_components/ProfileBox";
import ClientRedirectHandler from "./_components/ClientRedirectHandler";

export default function MyPage({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken");

  if (!token) {
    return <ClientRedirectHandler token={token} />;
  }

  return (
    <div className="relative flex w-full flex-col items-center">
      <ProfileBox />
      <div className="flex w-full flex-col gap-4">
        <MypageTabs />
        {/* <HydrationBoundary state={dehydrate(new QueryClient())}> */}
        <Suspense fallback={<div />}>{children}</Suspense>
        {/* </HydrationBoundary> */}
      </div>
      <TopButton />
    </div>
  );
}
