"use client";

import { useUser } from "@/queries/auth/useUser";
import { useEffect, useState } from "react";
import MypageTabs from "./MypageTabs";
import ProfileBox from "./ProfileBox";
import UpperPartSkeleton from "./skeletons/UpperPartSkeleton";

export default function UpperPart() {
  const { data, isLoading, error } = useUser();
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || isLoading) return <UpperPartSkeleton />;
  if (error) return <div>다시 로그인 해주세요</div>;

  return (
    <div className="flex w-full flex-col">
      {data && <ProfileBox data={data} />}
      <MypageTabs />
    </div>
  );
}
