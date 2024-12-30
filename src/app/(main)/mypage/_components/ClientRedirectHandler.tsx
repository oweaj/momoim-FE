"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

export default function ClientRedirectHandler({ token }: { token: string | undefined }) {
  const router = useRouter();
  toast({
    title: "잘못된 접근",
    description: "로그인 후 이용가능합니다",
  });
  router.push("/");
  return null;
}
