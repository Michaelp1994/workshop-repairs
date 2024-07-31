import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@repo/ui/dialog";
import type { RepairImageID } from "@repo/validators/ids.validators";
import UpdateRepairImageForm from "./UpdateRepairImageForm";

interface UpdateRepairImageModalProps {
  repairImageId: RepairImageID;
}

export default function UpdateRepairImageModal({
  repairImageId,
}: UpdateRepairImageModalProps) {
  return (
    <Dialog open defaultOpen>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Repair Image</DialogTitle>
            <DialogDescription>
              Update repair image {repairImageId}
            </DialogDescription>
          </DialogHeader>
          <UpdateRepairImageForm repairImageId={repairImageId} />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
