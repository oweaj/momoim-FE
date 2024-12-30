"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import clsx from "clsx";

interface ModalProps {
  size?: string;
  title?: string;
  open?: boolean;
  action?: (open: boolean) => void;
  triggerButton: React.ReactNode;
  content: React.ReactNode;
  showFooter?: boolean;
  onSubmit?: () => void;
}

export function Modal({ size, title, open, action, triggerButton, content, showFooter = true, onSubmit }: ModalProps) {
  if (!action) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={action}>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent
        className={clsx("h-1/5 min-h-36 w-[25rem] gap-6 rounded-lg p-4", size)}
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-start text-sm">{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription asChild className="text-base text-black scrollbar-hide">
          <div className="flex justify-center overflow-y-auto">{content}</div>
        </DialogDescription>
        {showFooter && (
          <DialogFooter className="flex w-full flex-row items-center justify-center gap-2 sm:gap-0">
            <Button type="button" variant="outline" className="w-full" onClick={() => action(false)}>
              취소
            </Button>
            <Button type="submit" onClick={onSubmit} className="w-full">
              확인
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
