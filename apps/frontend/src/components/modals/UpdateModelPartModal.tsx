import type { ModelID, PartID } from "~/validators/ids.validators";

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

import UpdateModelPartForm from "~/components/forms/UpdateModelPartForm";

interface UpdateModelPartModalProps extends BaseModalProps {
  modelId: ModelID;
  partId: PartID;
}

function UpdateModelPartModal({
  isOpen,
  modelId,
  onOpenChange,
  partId,
}: UpdateModelPartModalProps) {
  return (
    <Dialog onOpenChange={onOpenChange} open={isOpen}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Part to Model</DialogTitle>
            <DialogDescription>Update Part to model</DialogDescription>
          </DialogHeader>
          <UpdateModelPartForm modelId={modelId} partId={partId} />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}

export default NiceModal.create(
  (props: Omit<UpdateModelPartModalProps, "isOpen" | "onOpenChange">) => {
    const modal = useModal();
    return (
      <UpdateModelPartModal
        isOpen={modal.visible}
        onOpenChange={() => modal.hide()}
        {...props}
      />
    );
  },
);
