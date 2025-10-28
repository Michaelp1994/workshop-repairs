import type { ModelID, PartID } from "@repo/validators/ids.validators";

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

import UpdatePartModelForm from "~/components/forms/UpdatePartModelForm";

interface UpdatePartModelModalProps extends BaseModalProps {
  modelId: ModelID;
  partId: PartID;
}

function UpdatePartModelModal({
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

export default NiceModal.create(
  (props: Omit<UpdatePartModelModalProps, "isOpen" | "onOpenChange">) => {
    const modal = useModal();
    return (
      <UpdatePartModelModal
        isOpen={modal.visible}
        onOpenChange={() => modal.hide()}
        {...props}
      />
    );
  },
);
