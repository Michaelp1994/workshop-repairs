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
import { type ModelID } from "@repo/validators/ids.validators";

import ModelImageCarousel from "../ModelImages/ModelImageCarousel";

interface ModelImageGalleryModalProps extends BaseModalProps {
  modelId: ModelID;
}

function ModelImageGalleryModal({
  modelId,
  isOpen,
  onOpenChange,
}: ModelImageGalleryModalProps) {
  return (
    <Dialog onOpenChange={onOpenChange} open={isOpen}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Gallery</DialogTitle>
            <DialogDescription>
              Images associated with repair {modelId}
            </DialogDescription>
          </DialogHeader>
          <div className="p-10">
            <ModelImageCarousel modelId={modelId} />
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}

export default NiceModal.create(
  ({ isOpen, onOpenChange, ...props }: ModelImageGalleryModalProps) => {
    const modal = useModal();
    return (
      <ModelImageGalleryModal
        isOpen={modal.visible}
        onOpenChange={() => modal.hide()}
        {...props}
      />
    );
  },
);
