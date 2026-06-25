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

import CreateRepairPartForm from "../forms/CreateRepairPartForm";

interface CreateRepairPartModalProps extends BaseModalProps {
  repairId: string;
}

function CreateRepairPartModal({
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
            <DialogDescription>Add a part to {repairId}</DialogDescription>
          </DialogHeader>
          <CreateRepairPartForm repairId={repairId} />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}

export default NiceModal.create(
  (props: Omit<CreateRepairPartModalProps, "isOpen" | "onOpenChange">) => {
    const modal = useModal();
    return (
      <CreateRepairPartModal
        isOpen={modal.visible}
        onOpenChange={() => modal.hide()}
        {...props}
      />
    );
  },
);
