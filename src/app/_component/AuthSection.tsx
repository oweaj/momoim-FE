import React from "react";
import { useUser } from "@/queries/auth/useUser";
import AuthButtons from "./AuthButtons";
import ProfileButton from "./ProfileButton";

export default function AuthSection() {
  const { data: user, isLoading } = useUser();

  if (isLoading) return null;

  return <ul className="flex items-center gap-4">{user ? <ProfileButton user={user} /> : <AuthButtons />}</ul>;
}
