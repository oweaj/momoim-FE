"use client";

import { useRef } from "react";
import sectionSlider from "@/lib/sectionSlider";

interface Tab {
  name: string;
  value: string;
}

interface TabsProps {
  tabs: Tab[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

export default function Tabs({ tabs, selectedValue, onSelect }: TabsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <div
      role="button"
      tabIndex={0}
      onMouseDown={(e) => {
        sectionSlider(e, containerRef);
      }}
      ref={containerRef}
      className="flex w-full cursor-default gap-4 overflow-auto font-semibold text-gray-500 scrollbar-hide"
    >
      {tabs.map((tab) => {
        const isSelected = tab.value === selectedValue;
        return (
          <div key={tab.value} className="flex flex-col items-center">
            <button
              type="button"
              onClick={() => onSelect(tab.value)}
              className={`whitespace-nowrap p-4 text-sm sm:text-base ${isSelected && "text-gray-900"} w-auto`}
            >
              {tab.name}
            </button>
            {isSelected && <div className="h-0.5 w-full bg-gray-900" />}
          </div>
        );
      })}
    </div>
  );
}
