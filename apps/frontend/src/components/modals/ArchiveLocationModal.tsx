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
import { toast } from "@repo/ui/sonner";

import { api } from "~/trpc/client";
import displayMutationErrors from "~/utils/displayMutationErrors";

interface ArchiveLocationModalProps extends BaseModalProps {
  locationId: LocationID;
}

export default function ArchiveLocationModal({
  locationId,
  isOpen,
  onOpenChange,
}: ArchiveLocationModalProps) {
  const utils = api.useUtils();
  const archiveMutation = api.locations.archive.useMutation({
    async onSuccess(data) {
      await utils.locations.getAll.invalidate();
      await utils.locations.countAll.invalidate();
      await utils.locations.getById.invalidate({
        id: locationId,
      });
      toast.success(`${data.name} has been archived.`);
      onOpenChange();
    },
    onError(error) {
      displayMutationErrors(error);
    },
  });
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
            <Button
              onClick={() => archiveMutation.mutate({ id: locationId })}
              variant="destructive"
            >
              Yes, I am sure
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
