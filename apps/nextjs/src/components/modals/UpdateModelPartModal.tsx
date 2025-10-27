import type { ModelID, PartID } from "@repo/validators/ids.validators";

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

export default function UpdateModelPartModal({
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
