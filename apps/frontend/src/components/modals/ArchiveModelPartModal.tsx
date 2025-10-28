import type { ModelID, PartID } from "@repo/validators/ids.validators";

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
  partId: PartID;
}

function ArchiveModelPartModal({
  modelId,
  partId,
  isOpen,
  onOpenChange,
}: ArchiveModelModalProps) {
  const utils = api.useUtils();
  const archiveMutation = api.partsToModels.archive.useMutation({
    async onSuccess() {
      await utils.partsToModels.getByIds.invalidate({ modelId, partId });
      await utils.partsToModels.getAllPartsByModelId.invalidate();
      await utils.partsToModels.getAllModelsByPartId.invalidate();
      toast.success(`Connection has been archived.`);
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
          You will no longer be able to use this part on repairs for this model.
          <DialogFooter>
            <Button onClick={() => onOpenChange()}>No</Button>
            <Button
              onClick={() => archiveMutation.mutate({ modelId, partId })}
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
  ({ isOpen, onOpenChange, ...props }: ArchiveModelModalProps) => {
    const modal = useModal();
    return (
      <ArchiveModelPartModal
        isOpen={modal.visible}
        onOpenChange={() => modal.hide()}
        {...props}
      />
    );
  },
);
