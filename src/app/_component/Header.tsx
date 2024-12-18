"use client";

import React from "react";
import Logo from "@/assets/svg/logo.svg";
import Link from "next/link";
import { useUser } from "@/queries/auth/useUser";
import AuthButtons from "./AuthButtons";
import ProfileButton from "./ProfileButton";

export default function Header() {
  const { data: user, isLoading } = useUser();

  const renderAuthSection = () => {
    if (isLoading) {
      return null;
    }
    return user ? <ProfileButton user={user} /> : <AuthButtons />;
  };

  return (
    <header className="fixed z-50 w-full bg-white">
      <nav className="mx-auto flex h-[80px] max-w-screen-xl items-center justify-between px-4">
        <h1 className="flex items-center gap-6">
          <Link href="/" className="flex text-xl font-bold">
            <Logo aria-label="Website Logo" />
          </Link>
        </h1>
        <ul className="flex items-center gap-4">{renderAuthSection()}</ul>
      </nav>
    </header>
  );
}
