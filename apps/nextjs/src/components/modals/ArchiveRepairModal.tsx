import type { RepairID } from "@repo/validators/ids.validators";

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

import generateRepairSlug from "~/utils/generateRepairSlug";

import ArchiveRepairButton from "../ArchiveRepairButton";

interface ArchiveRepairModalProps extends BaseModalProps {
  repairId: RepairID;
}

export default function ArchiveRepairModal({
  isOpen,
  onOpenChange,
  repairId,
}: ArchiveRepairModalProps) {
  return (
    <Dialog onOpenChange={onOpenChange} open={isOpen}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Archive {generateRepairSlug(repairId)}</DialogTitle>
            <DialogDescription>
              Are you sure you wish to archive this repair?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => onOpenChange()}>No</Button>
            <ArchiveRepairButton repairId={repairId}>
              Yes, I am sure
            </ArchiveRepairButton>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
