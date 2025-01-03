"use client";

import { GATHERING_DETAIL_TABS } from "@/constants/gatheringDetailTabs";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DetailPageTab({ id }: { id: number }) {
  const pathname = usePathname();

  return (
    <nav>
      <div className="flex gap-6">
        {GATHERING_DETAIL_TABS.map(({ name, path }) => {
          const defaultTab = GATHERING_DETAIL_TABS[0].path === path;
          const isActive = (defaultTab && pathname === `/gatherings/${id}`) || pathname.includes(path);
          return (
            <Link
              key={path}
              href={defaultTab ? `/gatherings/${id}` : `/gatherings/${id}/${path}`}
              className={clsx(
                "p-4 text-lg font-semibold text-gray-500",
                isActive && "border-b-2 border-gray-900 text-gray-900",
              )}
            >
              {name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
