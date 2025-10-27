import type {
  RepairCommentID,
  RepairID,
} from "@repo/validators/ids.validators";

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

import ArchiveRepairCommentButton from "~/components/ArchiveRepairCommentButton";

interface ArchiveCommentModalProps extends BaseModalProps {
  repairId: RepairID;
  repairCommentId: RepairCommentID;
}

export default function ArchiveCommentModal({
  repairCommentId,
  isOpen,
  onOpenChange,
}: ArchiveCommentModalProps) {
  return (
    <Dialog onOpenChange={onOpenChange} open={isOpen}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Archive Repair Comment</DialogTitle>
            <DialogDescription>
              Are you sure you wish to archive this comment?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => onOpenChange()}>No</Button>
            <ArchiveRepairCommentButton repairCommentId={repairCommentId}>
              Yes, I am sure
            </ArchiveRepairCommentButton>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
