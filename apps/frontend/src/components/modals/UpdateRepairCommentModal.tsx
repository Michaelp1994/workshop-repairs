import type { RepairCommentID, RepairID } from "~/validators/ids.validators";

import NiceModal, { useModal } from "@ebay/nice-modal-react";
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

import UpdateRepairCommentForm from "~/components/forms/UpdateRepairCommentForm";

interface RepairImagesModalProps extends BaseModalProps {
  repairId: RepairID;
  repairCommentId: RepairCommentID;
}

function UpdateRepairCommentModal({
  isOpen,
  onOpenChange,
  repairCommentId,
  repairId,
}: RepairImagesModalProps) {
  return (
    <Dialog onOpenChange={onOpenChange} open={isOpen}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Repair Comment</DialogTitle>
            <DialogDescription>
              Update repair comment for repair {repairId}
            </DialogDescription>
          </DialogHeader>
          <UpdateRepairCommentForm repairCommentId={repairCommentId} />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}

export default NiceModal.create(
  (props: Omit<RepairImagesModalProps, "isOpen" | "onOpenChange">) => {
    const modal = useModal();
    return (
      <UpdateRepairCommentModal
        isOpen={modal.visible}
        onOpenChange={() => modal.hide()}
        {...props}
      />
    );
  },
);
