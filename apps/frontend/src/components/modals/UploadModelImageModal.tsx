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

import CreateModelImageForm from "../forms/CreateModelImageForm";

interface ArchiveModelModalProps extends BaseModalProps {
  modelId: ModelID;
}

function UploadModelImageModal({
  isOpen,
  modelId,
  onOpenChange,
}: ArchiveModelModalProps) {
  return (
    <Dialog onOpenChange={onOpenChange} open={isOpen}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Image</DialogTitle>
            <DialogDescription>
              Upload an image to model {modelId}
            </DialogDescription>
          </DialogHeader>
          <CreateModelImageForm modelId={modelId} />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}

export default NiceModal.create(
  (props: Omit<ArchiveModelModalProps, "isOpen" | "onOpenChange">) => {
    const modal = useModal();
    return (
      <UploadModelImageModal
        isOpen={modal.visible}
        onOpenChange={() => modal.hide()}
        {...props}
      />
    );
  },
);
