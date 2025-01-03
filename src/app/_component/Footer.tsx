"use client";

import Link from "next/link";
import Logo from "@/assets/svg/logo.svg";
import { usePathname } from "next/navigation";

const FOOTER_HIDDEN_ROUTES = ["/login", "/signup"];

export function Footer() {
  const pathname = usePathname();
  const shouldHideFooter = FOOTER_HIDDEN_ROUTES.some((route) => pathname.startsWith(route));

  if (shouldHideFooter) return null;

  return (
    <footer className="mt-28 bg-gray-100 text-sm">
      <div className="layout-container space-y-5 pb-12 pt-16">
        <Link href="/" className="inline-block" aria-label="홈으로 이동">
          <Logo aria-hidden="true" />
        </Link>

        <div className="flex flex-col space-y-2 text-gray-700">
          <p>
            모든 모임의 시작 - 관심사가 비슷한 사람들과 함께하는 새로운 모임 플랫폼. 취미 모임, 스터디, 동호회까지
            다양한 모임을 찾고 만들어보세요.
          </p>
          <span className="font-light">Copyright ©2024 MOMOIM. All Rights Reserved. Developed by Team 7</span>
        </div>

        <div className="border-t border-gray-300 pt-5 text-gray-600">
          <Link href="https://github.com/mo-moim" target="_blank" rel="noopener noreferrer" className="hover:underline">
            GitHub
          </Link>
        </div>
      </div>
    </footer>
  );
}
