import type { EquipmentTypeID } from "@repo/validators/ids.validators";

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

interface ArchiveEquipmentTypeModalProps extends BaseModalProps {
  equipmentTypeId: EquipmentTypeID;
}

function ArchiveEquipmentTypeModal({
  equipmentTypeId,
  onOpenChange,
  isOpen,
}: ArchiveEquipmentTypeModalProps) {
  const utils = api.useUtils();
  const archiveMutation = api.equipmentTypes.archive.useMutation({
    async onSuccess(data) {
      await utils.equipmentTypes.getAll.invalidate();
      await utils.equipmentTypes.countAll.invalidate();
      await utils.equipmentTypes.getById.invalidate({
        id: equipmentTypeId,
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
              Are you sure you wish to archive this Equipment Type?
            </DialogDescription>
          </DialogHeader>
          This Equipment Type will no longer be avaliable.
          <DialogFooter>
            <Button onClick={() => onOpenChange()}>No</Button>
            <Button
              onClick={() => archiveMutation.mutate({ id: equipmentTypeId })}
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
  (props: Omit<ArchiveEquipmentTypeModalProps, "isOpen" | "onOpenChange">) => {
    const modal = useModal();
    return (
      <ArchiveEquipmentTypeModal
        isOpen={modal.visible}
        onOpenChange={() => modal.hide()}
        {...props}
      />
    );
  },
);
