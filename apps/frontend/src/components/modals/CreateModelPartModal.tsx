import type { ModelID } from "~/validators/ids.validators";

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

import CreateModelPartForm from "~/components/forms/CreateModelPartForm";

interface CreateModelPartModalProps extends BaseModalProps {
  modelId: ModelID;
}

function CreateModelPartModal({
  isOpen,
  modelId,
  onOpenChange,
}: CreateModelPartModalProps) {
  return (
    <Dialog onOpenChange={onOpenChange} open={isOpen}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Part to Model</DialogTitle>
            <DialogDescription>Add Part to model</DialogDescription>
          </DialogHeader>
          <CreateModelPartForm modelId={modelId} />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}

export default NiceModal.create(
  (props: Omit<CreateModelPartModalProps, "isOpen" | "onOpenChange">) => {
    const modal = useModal();
    return (
      <CreateModelPartModal
        isOpen={modal.visible}
        onOpenChange={() => modal.hide()}
        {...props}
      />
    );
  },
);
