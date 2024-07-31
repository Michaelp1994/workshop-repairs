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
import CreateRepairImageForm from "./CreateRepairImageForm";

interface CreateRepairImageModalProps {
  repairId: RepairID;
}

export default function CreateRepairImageModal({
  repairId,
}: CreateRepairImageModalProps) {
  return (
    <Dialog open defaultOpen>
      <DialogPortal>
        <DialogOverlay />

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Repair Image</DialogTitle>
            <DialogDescription>
              Add a repair part to repair {repairId}
            </DialogDescription>
          </DialogHeader>
          <CreateRepairImageForm repairId={repairId} />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
