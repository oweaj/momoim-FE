"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton({ home = false }: { home?: boolean }) {
  const router = useRouter();
  const handleBack = () => {
    return home ? router.push("/") : router.back();
  };

  return (
    <div>
      <button type="button" className="p-1 pl-0" onClick={handleBack} aria-label={home ? "홈으로 가기" : "뒤로 가기"}>
        <ArrowLeft className="h-6 w-6" />
      </button>
    </div>
  );
}
