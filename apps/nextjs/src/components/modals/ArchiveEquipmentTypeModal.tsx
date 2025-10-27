import type { EquipmentTypeID } from "@repo/validators/ids.validators";

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

import ArchiveEquipmentTypeButton from "../ArchiveEquipmentTypeButton";

interface ArchiveEquipmentTypeModalProps extends BaseModalProps {
  equipmentTypeId: EquipmentTypeID;
}

export default function ArchiveEquipmentTypeModal({
  equipmentTypeId,
  onOpenChange,
  isOpen,
}: ArchiveEquipmentTypeModalProps) {
  return (
    <Dialog onOpenChange={onOpenChange} open={isOpen}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Archive</DialogTitle>
            <DialogDescription>
              Are you sure you wish to archive this Equipment Type?
            </DialogDescription>
          </DialogHeader>
          This Equipment Type will no longer be avaliable.
          <DialogFooter>
            <Button onClick={() => onOpenChange()}>No</Button>
            <ArchiveEquipmentTypeButton equipmentTypeId={equipmentTypeId}>
              Yes, I am sure
            </ArchiveEquipmentTypeButton>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
