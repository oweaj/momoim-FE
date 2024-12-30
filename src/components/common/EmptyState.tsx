import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface EmptyStateProps {
  title?: string; // 메시지 타이틀
  description: string; // 설명 텍스트
  actionText?: string; // 버튼 텍스트 (옵션)
  onAction?: () => void; // 버튼 클릭 핸들러 (옵션)
  className?: string;
}

export function EmptyState({ title, description, actionText, onAction, className }: EmptyStateProps) {
  return (
    <div className={cn("flex min-h-96 flex-col items-center justify-center", className)}>
      <p className="text-gray-700">{title}</p>
      <p className="text-gray-700">{description}</p>
      {actionText && onAction && (
        <Button onClick={onAction} className="mt-6 w-[80%] max-w-80 font-semibold">
          {actionText}
        </Button>
      )}
    </div>
  );
}
