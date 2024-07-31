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
import CreateRepairCommentForm from "./CreateRepairCommentForm";

interface CreateRepairCommentModalProps {
  repairId: RepairID;
}

export default function CreateRepairCommentModal({
  repairId,
}: CreateRepairCommentModalProps) {
  return (
    <Dialog open defaultOpen>
      <DialogPortal>
        <DialogOverlay />

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Repair Comment</DialogTitle>
            <DialogDescription>
              Add a Comment to repair {repairId}
            </DialogDescription>
          </DialogHeader>
          <CreateRepairCommentForm repairId={repairId} />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
