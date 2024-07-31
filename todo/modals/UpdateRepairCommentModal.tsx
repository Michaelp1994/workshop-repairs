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
import UpdateRepairCommentForm from "./UpdateRepairCommentForm";

interface UpdateRepairCommentModalProps {
  repairCommentId: RepairID;
}

export default function UpdateRepairCommentModal({
  repairCommentId,
}: UpdateRepairCommentModalProps) {
  return (
    <Dialog open defaultOpen>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Repair Comment</DialogTitle>
            <DialogDescription>
              Update repair part {repairCommentId}
            </DialogDescription>
          </DialogHeader>
          <UpdateRepairCommentForm repairCommentId={repairCommentId} />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
