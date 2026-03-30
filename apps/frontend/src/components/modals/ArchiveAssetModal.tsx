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

interface ArchiveAssetModalProps extends BaseModalProps {
  assetId: string;
}

function ArchiveAssetModal({
  assetId,
  isOpen,
  onOpenChange,
}: ArchiveAssetModalProps) {
  const utils = api.useUtils();
  const archiveMutation = api.assets.archive.useMutation({
    async onSuccess() {
      await utils.assets.getAll.invalidate();
      await utils.assets.countAll.invalidate();
      await utils.assets.getById.invalidate({
        id: assetId,
      });
      toast.success(`${assetId} has been archived.`);
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
              Are you sure you wish to archive this asset?
            </DialogDescription>
          </DialogHeader>
          This asset will no longer be avaliable.
          <DialogFooter>
            <Button onClick={() => onOpenChange()}>No</Button>
            <Button
              onClick={() => archiveMutation.mutate({ id: assetId })}
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
  (props: Omit<ArchiveAssetModalProps, "isOpen" | "onOpenChange">) => {
    const modal = useModal();
    return (
      <ArchiveAssetModal
        isOpen={modal.visible}
        onOpenChange={() => modal.hide()}
        {...props}
      />
    );
  },
);
