import type { ManufacturerID } from "@repo/validators/ids.validators";

import { Button } from "@repo/ui/button";
import {
  type BaseModalProps,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@repo/ui/dialog";

import ArchiveManufacturerButton from "~/components/ArchiveManufacturerButton";

interface ArchiveManufacturerModalProps extends BaseModalProps {
  manufacturerId: ManufacturerID;
}

export default function ArchiveManufacturerModal({
  manufacturerId,
  isOpen,
  onOpenChange,
}: ArchiveManufacturerModalProps) {
  return (
    <Dialog onOpenChange={onOpenChange} open={isOpen}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Archive</DialogTitle>
            <DialogDescription>
              Are you sure you wish to archive this manufacturer?
            </DialogDescription>
          </DialogHeader>
          This manufacturer will no longer be avaliable.
          <DialogFooter>
            <Button onClick={() => onOpenChange()}>No</Button>
            <ArchiveManufacturerButton manufacturerId={manufacturerId}>
              Yes, I am sure
            </ArchiveManufacturerButton>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
