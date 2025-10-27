import type { RepairID } from "@repo/validators/ids.validators";

import {
  type BaseModalProps,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@repo/ui/dialog";

import generateRepairSlug from "~/utils/generateRepairSlug";

import CreateRepairPartForm from "../forms/CreateRepairPartForm";

interface CreateRepairPartModalProps extends BaseModalProps {
  repairId: RepairID;
}

export default function CreateRepairPartModal({
  isOpen,
  onOpenChange,
  repairId,
}: CreateRepairPartModalProps) {
  return (
    <Dialog onOpenChange={onOpenChange} open={isOpen}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Repair Part</DialogTitle>
            <DialogDescription>
              Add a part to {generateRepairSlug(repairId)}
            </DialogDescription>
          </DialogHeader>
          <CreateRepairPartForm repairId={repairId} />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
