import type { LocationID } from "@repo/validators/ids.validators";

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

import ArchiveLocationButton from "../ArchiveLocationButton";

interface ArchiveLocationModalProps extends BaseModalProps {
  locationId: LocationID;
}

export default function ArchiveLocationModal({
  locationId,
  isOpen,
  onOpenChange,
}: ArchiveLocationModalProps) {
  return (
    <Dialog onOpenChange={onOpenChange} open={isOpen}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Archive</DialogTitle>
            <DialogDescription>
              Are you sure you wish to archive this location?
            </DialogDescription>
          </DialogHeader>
          This location will no longer be avaliable.
          <DialogFooter>
            <Button onClick={() => onOpenChange()}>No</Button>
            <ArchiveLocationButton locationId={locationId}>
              Yes, I am sure
            </ArchiveLocationButton>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
