"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import NotFoundPageLogo from "@/assets/images/notFoundPage.png";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex w-[25rem] flex-col items-center justify-center gap-10">
        <h2 className="text-3xl font-semibold">페이지를 찾을 수 없습니다</h2>
        <Image src={NotFoundPageLogo} width={270} height={180} alt="Not-Found 이미지" />
        <div className="flex h-52 w-full flex-col items-center justify-center gap-6 rounded-lg bg-gray-100">
          <p className="text-xl font-semibold text-black">페이지 주소를 다시 확인해주세요</p>
          <div className="flex items-center gap-4">
            <Button onClick={() => router.replace("/")}>홈으로 이동</Button>
            <Button onClick={() => router.back()}>뒤로 돌아가기</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
