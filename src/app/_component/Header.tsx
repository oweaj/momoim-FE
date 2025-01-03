"use client";

import React from "react";
import Logo from "@/assets/svg/logo.svg";
import Link from "next/link";
import dynamic from "next/dynamic";

const AuthSection = dynamic(() => import("./AuthSection"), {
  ssr: false, // 클라이언트에서만 렌더링하도록 설정
});

export default function Header() {
  return (
    <header className="fixed z-50 w-full bg-white">
      <nav className="layout-container flex h-[80px] items-center justify-between">
        <h1 className="flex items-center gap-6">
          <Link href="/" className="flex text-xl font-bold">
            <Logo aria-label="Website Logo" />
          </Link>
        </h1>
        <AuthSection />
      </nav>
    </header>
  );
}
