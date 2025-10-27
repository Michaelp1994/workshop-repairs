import type { PartID } from "@repo/validators/ids.validators";

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

import ArchivePartButton from "../ArchivePartButton";

interface ArchivePartModalProps extends BaseModalProps {
  partId: PartID;
}

export default function ArchivePartModal({
  partId,
  isOpen,
  onOpenChange,
}: ArchivePartModalProps) {
  return (
    <Dialog onOpenChange={onOpenChange} open={isOpen}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Archive</DialogTitle>
            <DialogDescription>
              Are you sure you wish to archive this Part?
            </DialogDescription>
          </DialogHeader>
          This Part will no longer be avaliable.
          <DialogFooter>
            <Button onClick={() => onOpenChange()}>No</Button>
            <ArchivePartButton partId={partId}>
              Yes, I am sure
            </ArchivePartButton>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
