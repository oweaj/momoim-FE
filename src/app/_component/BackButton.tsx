"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  const handleBack = () => router.back();

  return (
    <button type="button" className="py-1 pr-1" onClick={handleBack}>
      <ArrowLeft className="h-6 w-6" />
    </button>
  );
}
