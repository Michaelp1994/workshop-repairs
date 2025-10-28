import type { RepairID } from "@repo/validators/ids.validators";

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
import generateRepairSlug from "~/utils/generateRepairSlug";

interface ArchiveRepairModalProps extends BaseModalProps {
  repairId: RepairID;
}

function ArchiveRepairModal({
  isOpen,
  onOpenChange,
  repairId,
}: ArchiveRepairModalProps) {
  const utils = api.useUtils();
  const archiveMutation = api.repairs.archive.useMutation({
    async onSuccess() {
      await utils.repairs.getAll.invalidate();
      await utils.repairs.countAll.invalidate();
      toast.success("Repair has been archived.");
      onOpenChange();
    },
    onError(errors) {
      displayMutationErrors(errors);
    },
  });
  return (
    <Dialog onOpenChange={onOpenChange} open={isOpen}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Archive {generateRepairSlug(repairId)}</DialogTitle>
            <DialogDescription>
              Are you sure you wish to archive this repair?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => onOpenChange()}>No</Button>
            <Button
              onClick={() => archiveMutation.mutate({ id: repairId })}
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
  ({ isOpen, onOpenChange, ...props }: ArchiveRepairModalProps) => {
    const modal = useModal();
    return (
      <ArchiveRepairModal
        isOpen={modal.visible}
        onOpenChange={() => modal.hide()}
        {...props}
      />
    );
  },
);
