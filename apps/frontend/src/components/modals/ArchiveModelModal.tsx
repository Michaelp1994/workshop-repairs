import type { ModelID } from "@repo/validators/ids.validators";

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

interface ArchiveModelModalProps extends BaseModalProps {
  modelId: ModelID;
}

function ArchiveModelModal({
  modelId,
  isOpen,
  onOpenChange,
}: ArchiveModelModalProps) {
  const utils = api.useUtils();
  const archiveMutation = api.models.archive.useMutation({
    async onSuccess(data) {
      await utils.models.getAll.invalidate();
      await utils.models.countAll.invalidate();
      await utils.models.getById.invalidate({
        id: modelId,
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
              Are you sure you wish to archive this item?
            </DialogDescription>
          </DialogHeader>
          This model will no longer be avaliable.
          <DialogFooter>
            <Button onClick={() => onOpenChange()}>No</Button>
            <Button
              onClick={() => archiveMutation.mutate({ id: modelId })}
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
  (props: Omit<ArchiveModelModalProps, "isOpen" | "onOpenChange">) => {
    const modal = useModal();
    return (
      <ArchiveModelModal
        isOpen={modal.visible}
        onOpenChange={() => modal.hide()}
        {...props}
      />
    );
  },
);
