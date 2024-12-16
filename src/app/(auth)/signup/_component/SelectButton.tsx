import { cn } from "@/lib/utils";

interface SelectButtonProps {
  selected?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function SelectButton({ selected, children, onClick, className = "" }: SelectButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "box-border whitespace-nowrap px-5 py-3 font-medium leading-snug",
        "rounded-xl",
        "flex items-center justify-center",
        selected ? "bg-gray-250 text-main" : "bg-gray-100 text-gray-900 hover:border-gray-300",
        className,
      )}
    >
      {children}
    </button>
  );
}
