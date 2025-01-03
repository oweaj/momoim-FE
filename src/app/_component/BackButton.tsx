"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  const handleBack = () => router.back();

  return (
    <div>
      <button type="button" className="p-1" onClick={handleBack}>
        <ArrowLeft className="h-6 w-6" />
      </button>
    </div>
  );
}
