import type { ReactNode } from "react";

import { Button } from "@repo/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@repo/ui/dialog";

interface ArchiveModalProps {
  onCancel: () => void;
  onConfirm: () => void;
  title: ReactNode;
  description: ReactNode;
}

export default function ArchiveModal({
  onCancel,
  onConfirm,
  title,
  description,
}: ArchiveModalProps) {
  return (
    <Dialog defaultOpen onOpenChange={onCancel} open>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={onCancel}>No</Button>
            <Button onClick={onConfirm} variant="destructive">
              Yes, I am sure
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
