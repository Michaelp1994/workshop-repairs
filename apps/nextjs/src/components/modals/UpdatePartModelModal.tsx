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

import UpdatePartModelForm from "~/components/forms/UpdatePartModelForm";

interface UpdatePartModelModalProps extends BaseModalProps {
  modelId: ModelID;
  partId: PartID;
}

export default function UpdatePartModelModal({
  isOpen,
  modelId,
  onOpenChange,
  partId,
}: UpdatePartModelModalProps) {
  return (
    <Dialog onOpenChange={onOpenChange} open={isOpen}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Model to Part</DialogTitle>
            <DialogDescription>Update Model to Part</DialogDescription>
          </DialogHeader>
          <UpdatePartModelForm modelId={modelId} partId={partId} />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
