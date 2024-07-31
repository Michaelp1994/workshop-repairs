import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@repo/ui/dialog";
import type { RepairID } from "@repo/validators/ids.validators";
import CreateRepairPartForm from "./CreateRepairPartForm";

interface CreateRepairPartModalProps {
  repairId: RepairID;
}

export default function CreateRepairPartModal({
  repairId,
}: CreateRepairPartModalProps) {
  return (
    <Dialog open defaultOpen>
      <DialogPortal>
        <DialogOverlay />

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Repair Part</DialogTitle>
            <DialogDescription>
              Add a repair part to repair {repairId}
            </DialogDescription>
          </DialogHeader>
          <CreateRepairPartForm repairId={repairId} />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
