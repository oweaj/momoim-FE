"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ClientRedirectHandler() {
  const router = useRouter();
  useEffect(() => {
    // 미들웨어 작업하기 전까지
    router.push("/");
  }, []);
  return <div />;
}
