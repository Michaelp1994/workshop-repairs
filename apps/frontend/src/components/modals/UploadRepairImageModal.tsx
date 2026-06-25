import type { RepairID } from "~/validators/ids.validators";

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

import CreateRepairImageForm from "../forms/CreateRepairImageForm";

interface ArchiveRepairModalProps extends BaseModalProps {
  repairId: RepairID;
}

function UploadRepairImageModal({
  repairId,
  onOpenChange,
  isOpen,
}: ArchiveRepairModalProps) {
  return (
    <Dialog onOpenChange={onOpenChange} open={isOpen}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Image</DialogTitle>
            <DialogDescription>
              Upload an image to repair {repairId}
            </DialogDescription>
          </DialogHeader>
          <CreateRepairImageForm repairId={repairId} />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}

export default NiceModal.create(
  (props: Omit<ArchiveRepairModalProps, "isOpen" | "onOpenChange">) => {
    const modal = useModal();
    return (
      <UploadRepairImageModal
        isOpen={modal.visible}
        onOpenChange={() => modal.hide()}
        {...props}
      />
    );
  },
);
