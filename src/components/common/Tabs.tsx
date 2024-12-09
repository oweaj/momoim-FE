"use client";

import sectionSlider from "@/lib/sectionSlider";
import { usePathname, useRouter } from "next/navigation";
import { useRef } from "react";

interface Props {
  tabs: Tab[];
}

interface Tab {
  name: string;
  value: string;
  path: string;
}

export default function Tabs({ tabs }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const path = usePathname();
  const currentId = path.split("/").pop()?.split("?")[0] ?? "";

  return (
    <div
      role="button"
      tabIndex={0}
      onMouseDown={(e) => {
        sectionSlider(e, containerRef);
      }}
      ref={containerRef}
      className="flex w-full gap-4 overflow-auto px-6 scrollbar-hide"
    >
      {tabs.map((tab) => {
        const isSelected = tab.value === currentId;
        return (
          <div key={tab.value} className="flex flex-col items-center">
            <button
              type="button"
              onClick={() => {
                router.push(tab.path);
              }}
              className={`whitespace-nowrap p-4 text-sm sm:text-base ${isSelected && "font-bold"} w-auto`}
            >
              {tab.name}
            </button>
            {isSelected && <div className="h-0.5 w-full bg-black" />}
          </div>
        );
      })}
    </div>
  );
}
