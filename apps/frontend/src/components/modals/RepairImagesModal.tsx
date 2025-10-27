import type { RepairID } from "@repo/validators/ids.validators";

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

import RepairImageCarousel from "../RepairImages/RepairImageCarousel";

interface RepairImagesModalProps extends BaseModalProps {
  repairId: RepairID;
}

export default function RepairImagesModal({
  isOpen,
  onOpenChange,
  repairId,
}: RepairImagesModalProps) {
  return (
    <Dialog onOpenChange={onOpenChange} open={isOpen}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Gallery</DialogTitle>
            <DialogDescription>
              Images associated with repair {repairId}
            </DialogDescription>
          </DialogHeader>
          <div className="p-10">
            <RepairImageCarousel repairId={repairId} />
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
