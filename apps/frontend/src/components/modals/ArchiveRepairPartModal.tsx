import type { RepairID, RepairPartID } from "~/validators/ids.validators";

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

interface ArchiveRepairPartModalProps extends BaseModalProps {
  repairId: RepairID;
  repairPartId: RepairPartID;
}

function ArchiveRepairPartModal({
  isOpen,
  onOpenChange,
  repairPartId,
}: ArchiveRepairPartModalProps) {
  const utils = api.useUtils();
  const archiveMutation = api.repairParts.archive.useMutation({
    async onSuccess() {
      await utils.repairParts.getAll.invalidate();
      await utils.repairParts.countAll.invalidate();
      toast.success("Repair Part has been archived.");
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
            <DialogTitle>Archive Repair Part</DialogTitle>
            <DialogDescription>
              Are you sure you wish to archive this repair part?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => onOpenChange()}>No</Button>
            <Button
              onClick={() => archiveMutation.mutate({ id: repairPartId })}
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
  (props: Omit<ArchiveRepairPartModalProps, "isOpen" | "onOpenChange">) => {
    const modal = useModal();
    return (
      <ArchiveRepairPartModal
        isOpen={modal.visible}
        onOpenChange={() => modal.hide()}
        {...props}
      />
    );
  },
);
