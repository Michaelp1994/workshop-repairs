import type { ClientID } from "@repo/validators/ids.validators";

import NiceModal, { useModal } from "@ebay/nice-modal-react";
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

interface ArchiveClientModalProps extends BaseModalProps {
  clientId: ClientID;
}

function ArchiveClientModal({
  clientId,
  isOpen,
  onOpenChange,
}: ArchiveClientModalProps) {
  const utils = api.useUtils();
  const archiveMutation = api.clients.archive.useMutation({
    async onSuccess(data) {
      await utils.clients.getAll.invalidate();
      await utils.clients.countAll.invalidate();
      await utils.clients.getById.invalidate({
        id: clientId,
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
              Are you sure you wish to archive this client?
            </DialogDescription>
          </DialogHeader>
          This client will no longer be avaliable.
          <DialogFooter>
            <Button onClick={() => onOpenChange()}>No</Button>
            <Button
              onClick={() => archiveMutation.mutate({ id: clientId })}
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

export default NiceModal.create(
  ({ isOpen, onOpenChange, ...props }: ArchiveClientModalProps) => {
    const modal = useModal();
    return (
      <ArchiveClientModal
        isOpen={modal.visible}
        onOpenChange={() => modal.hide()}
        {...props}
      />
    );
  },
);
