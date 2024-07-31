import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@repo/ui/dialog";
import type { RepairPartID } from "@repo/validators/ids.validators";
import UpdateRepairPartForm from "./UpdateRepairPartForm";

interface UpdateRepairPartModalProps {
  repairPartId: RepairPartID;
}

export default function UpdateRepairPartModal({
  repairPartId,
}: UpdateRepairPartModalProps) {
  return (
    <Dialog open defaultOpen>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogClose />
          <DialogHeader>
            <DialogTitle>Update Repair Part</DialogTitle>
            <DialogDescription>
              Update repair part {repairPartId}
            </DialogDescription>
          </DialogHeader>
          <UpdateRepairPartForm repairPartId={repairPartId} />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
