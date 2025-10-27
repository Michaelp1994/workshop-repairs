import type { RepairID, RepairPartID } from "@repo/validators/ids.validators";

import {
  type BaseModalProps,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@repo/ui/dialog";

import UpdateRepairPartForm from "~/components/forms/UpdateRepairPartForm";

interface UpdateRepairPartModalProps extends BaseModalProps {
  repairId: RepairID;
  repairPartId: RepairPartID;
}

export default function UpdateRepairPartModal({
  isOpen,
  onOpenChange,
  repairPartId,
}: UpdateRepairPartModalProps) {
  return (
    <Dialog onOpenChange={onOpenChange} open={isOpen}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Repair Part</DialogTitle>
          </DialogHeader>
          <UpdateRepairPartForm repairPartId={repairPartId} />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
