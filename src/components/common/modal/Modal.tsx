"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import clsx from "clsx";
import { X } from "lucide-react";

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
        className={clsx("h-auto max-h-[90%] min-h-36 w-[25rem] gap-6 rounded-lg p-4", size)}
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-sm">{title || <VisuallyHidden>제목 없음</VisuallyHidden>}</DialogTitle>
            <DialogClose className="rounded-sm opacity-70 transition-opacity hover:opacity-100 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X className="h-5 w-5" onClick={() => action(false)} />
              <span className="sr-only">Close</span>
            </DialogClose>
          </div>
        </DialogHeader>
        <DialogDescription asChild className="text-base text-black scrollbar-hide">
          <div className="flex justify-center overflow-auto">{content}</div>
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
