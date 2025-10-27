import type { ModelID } from "@repo/validators/ids.validators";

import { Button } from "@repo/ui/button";
import {
  type BaseModalProps,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@repo/ui/dialog";

import ArchiveModelButton from "../ArchiveModelButton";

interface ArchiveModelModalProps extends BaseModalProps {
  modelId: ModelID;
}

export default function ArchiveModelModal({
  modelId,
  isOpen,
  onOpenChange,
}: ArchiveModelModalProps) {
  return (
    <Dialog onOpenChange={onOpenChange} open={isOpen}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Archive</DialogTitle>
            <DialogDescription>
              Are you sure you wish to archive this item?
            </DialogDescription>
          </DialogHeader>
          This model will no longer be avaliable.
          <DialogFooter>
            <Button onClick={() => onOpenChange()}>No</Button>
            <ArchiveModelButton modelId={modelId}>
              Yes, I am sure
            </ArchiveModelButton>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
