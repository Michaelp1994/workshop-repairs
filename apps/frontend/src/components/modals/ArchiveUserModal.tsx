import type { UserID } from "@repo/validators/ids.validators";

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

interface ArchiveUserModalProps extends BaseModalProps {
  userId: UserID;
}

function ArchiveUserModal({
  userId,
  onOpenChange,
  isOpen,
}: ArchiveUserModalProps) {
  const utils = api.useUtils();
  const archiveMutation = api.users.archive.useMutation({
    async onSuccess(data) {
      await utils.users.getAll.invalidate();
      await utils.users.countAll.invalidate();
      await utils.users.getById.invalidate({
        id: userId,
      });
      toast.success(`${data.firstName} ${data.lastName} has been archived.`);
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
              Are you sure you wish to archive this user?
            </DialogDescription>
          </DialogHeader>
          This user will no longer be avaliable.
          <DialogFooter>
            <Button onClick={() => onOpenChange()}>No</Button>
            <Button
              onClick={() => archiveMutation.mutate({ id: userId })}
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
  ({ isOpen, onOpenChange, ...props }: ArchiveUserModalProps) => {
    const modal = useModal();
    return (
      <ArchiveUserModal
        isOpen={modal.visible}
        onOpenChange={() => modal.hide()}
        {...props}
      />
    );
  },
);
