import { useRef } from "react";
import sectionSlider from "@/lib/sectionSlider";
import { cn } from "@/lib/utils";

interface Tag {
  name: string;
  value: string;
}

interface TagsProps {
  tags: Tag[];
  selectedValue: string;
  onSelect: (value: string) => void;
  className?: string;
  prefetch?: (value: string) => void;
}

export default function Tags({ tags, selectedValue, onSelect, className, prefetch }: TagsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      role="button"
      tabIndex={0}
      ref={containerRef}
      onMouseDown={(e) => {
        sectionSlider(e, containerRef);
      }}
      className={cn(
        "flex w-full cursor-grab gap-2 overflow-x-auto overflow-y-hidden whitespace-nowrap font-medium scrollbar-hide",
        className,
      )}
    >
      {tags?.map((tag) => (
        <button
          type="button"
          key={tag.value}
          onMouseEnter={() => {
            if (prefetch) prefetch(tag.value);
          }}
          onClick={() => onSelect(tag.value)}
          className={`${
            tag.value === selectedValue ? "bg-gray-250 text-main" : "bg-gray-100"
          } rounded-xl px-4 py-3 text-sm sm:text-base`}
        >
          {tag.name}
        </button>
      ))}
    </div>
  );
}
