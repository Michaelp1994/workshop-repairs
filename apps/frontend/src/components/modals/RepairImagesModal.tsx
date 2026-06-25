import type { RepairID } from "~/validators/ids.validators";

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

import RepairImageCarousel from "../RepairImages/RepairImageCarousel";

interface RepairImagesModalProps extends BaseModalProps {
  repairId: RepairID;
}

function RepairImagesModal({
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

export default NiceModal.create(
  (props: Omit<RepairImagesModalProps, "isOpen" | "onOpenChange">) => {
    const modal = useModal();
    return (
      <RepairImagesModal
        isOpen={modal.visible}
        onOpenChange={() => modal.hide()}
        {...props}
      />
    );
  },
);
