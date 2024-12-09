import React from "react";
import Logo from "@/assets/svg/logo.svg";
import Link from "next/link";
import AuthButtons from "./AuthButtons";

export default function Header() {
  return (
    <header className="fixed w-full bg-white">
      <nav className="mx-auto flex h-[80px] max-w-screen-xl items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex text-xl font-bold">
            <Logo aria-label="Website Logo" />
          </Link>
        </div>

        <ul className="flex items-center gap-4">
          <AuthButtons />
        </ul>
      </nav>
    </header>
  );
}
