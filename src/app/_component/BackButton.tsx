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
      <button type="button" className="p-1 pl-0" onClick={handleBack}>
        <ArrowLeft className="h-6 w-6" />
      </button>
    </div>
  );
}
