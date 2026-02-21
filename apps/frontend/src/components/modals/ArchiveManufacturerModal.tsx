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

interface ArchiveManufacturerModalProps extends BaseModalProps {
  slug: string;
}

function ArchiveManufacturerModal({
  slug,
  isOpen,
  onOpenChange,
}: ArchiveManufacturerModalProps) {
  const utils = api.useUtils();
  const archiveMutation = api.manufacturers.archive.useMutation({
    async onSuccess(data) {
      await utils.manufacturers.getAll.invalidate();
      await utils.manufacturers.countAll.invalidate();
      await utils.manufacturers.getBySlug.invalidate({
        slug,
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
              Are you sure you wish to archive this manufacturer?
            </DialogDescription>
          </DialogHeader>
          This manufacturer will no longer be avaliable.
          <DialogFooter>
            <Button onClick={() => onOpenChange()}>No</Button>
            <Button
              onClick={() => archiveMutation.mutate({ slug })}
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
  (props: Omit<ArchiveManufacturerModalProps, "isOpen" | "onOpenChange">) => {
    const modal = useModal();
    return (
      <ArchiveManufacturerModal
        isOpen={modal.visible}
        onOpenChange={() => modal.hide()}
        {...props}
      />
    );
  },
);
