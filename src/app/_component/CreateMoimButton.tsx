"use client";

import { CATEGORIES } from "@/constants/gatherings";
import { useUser } from "@/queries/auth/useUser";
import { Plus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const CREATE_GATHERING_URL = "/gatherings/create";

const HOME_URLS = Object.values(CATEGORIES).map((category) => `/${category.toLowerCase()}`);

export default function CreateMoimButton() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: user, isLoading } = useUser();

  const isHomePage = HOME_URLS.includes(pathname);

  if (isLoading || !user || !isHomePage) return null;

  return (
    <button
      type="button"
      className="group fixed bottom-4 right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-main drop-shadow-[0_0_10px_rgba(0,0,0,0.2)] transition-all duration-300 ease-in-out hover:w-36 focus:outline-none focus:ring-2 focus:ring-main focus:ring-offset-2 xl:bottom-6 xl:right-6 xl:h-14 xl:w-14"
      onClick={() => router.push(CREATE_GATHERING_URL)}
    >
      <Plus className="h-5 w-5 text-white xl:h-6 xl:w-6" />
      <span className="w-0 overflow-hidden whitespace-nowrap font-semibold text-white transition-all duration-300 group-hover:w-24">
        모임 만들기
      </span>
    </button>
  );
}
