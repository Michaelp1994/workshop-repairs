import type { RepairCommentID, RepairID } from "~/validators/ids.validators";

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

interface ArchiveCommentModalProps extends BaseModalProps {
  repairId: RepairID;
  repairCommentId: RepairCommentID;
}

function ArchiveCommentModal({
  repairCommentId,
  isOpen,
  onOpenChange,
}: ArchiveCommentModalProps) {
  const utils = api.useUtils();
  const archiveMutation = api.repairComments.archive.useMutation({
    async onSuccess() {
      await utils.repairComments.getAllByRepairId.invalidate();
      await utils.repairComments.countAll.invalidate();
      toast.success("Repair Comment has been archived.");
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
            <DialogTitle>Archive Repair Comment</DialogTitle>
            <DialogDescription>
              Are you sure you wish to archive this comment?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => onOpenChange()}>No</Button>
            <Button
              onClick={() => archiveMutation.mutate({ id: repairCommentId })}
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
  (props: Omit<ArchiveCommentModalProps, "isOpen" | "onOpenChange">) => {
    const modal = useModal();
    return (
      <ArchiveCommentModal
        isOpen={modal.visible}
        onOpenChange={() => modal.hide()}
        {...props}
      />
    );
  },
);
