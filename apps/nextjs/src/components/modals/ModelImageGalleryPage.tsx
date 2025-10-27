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

export default function ModelImageGalleryModal({
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
