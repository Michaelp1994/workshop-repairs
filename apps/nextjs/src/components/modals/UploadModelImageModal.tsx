import type { ModelID } from "@repo/validators/ids.validators";

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

export default function UploadModelImageModal({
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
