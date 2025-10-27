import type { RepairID, RepairPartID } from "@repo/validators/ids.validators";

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

import ArchiveRepairPartButton from "~/components/ArchiveRepairPartButton";

interface ArchiveRepairPartModalProps extends BaseModalProps {
  repairId: RepairID;
  repairPartId: RepairPartID;
}

export default function ArchiveRepairPartModal({
  isOpen,
  onOpenChange,
  repairPartId,
}: ArchiveRepairPartModalProps) {
  return (
    <Dialog onOpenChange={onOpenChange} open={isOpen}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Archive Repair Part</DialogTitle>
            <DialogDescription>
              Are you sure you wish to archive this repair part?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => onOpenChange()}>No</Button>
            <ArchiveRepairPartButton repairPartId={repairPartId}>
              Yes, I am sure
            </ArchiveRepairPartButton>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
