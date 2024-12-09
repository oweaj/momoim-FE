"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import sectionSlider from "@/lib/sectionSlider";

interface Props {
  tags: Tag[];
}

interface Tag {
  name: string;
  value: string;
}

export default function Tags({ tags }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("sub");

  return (
    <div
      role="button"
      tabIndex={0}
      ref={containerRef}
      onMouseDown={(e) => {
        sectionSlider(e, containerRef);
      }}
      className="my-4 flex w-full cursor-grab gap-2 overflow-x-auto overflow-y-hidden whitespace-nowrap scrollbar-hide"
    >
      {tags?.map((tag) => {
        return (
          <Button
            key={tag.value}
            variant="secondary"
            type="button"
            onClick={() => {
              router.push(`${path}?sub=${tag.value}`);
            }}
            className={`${tag.value.includes(query as string) ? "bg-gray-300 font-bold text-main" : "bg-gray-100"} rounded-xl px-4 py-3 text-sm sm:text-base`}
          >
            {tag.name}
          </Button>
        );
      })}
    </div>
  );
}
