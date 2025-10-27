import type { ModelID, PartID } from "@repo/validators/ids.validators";

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

import ArchiveModelPartButton from "~/components/ArchiveModelPartButton";

interface ArchiveModelModalProps extends BaseModalProps {
  modelId: ModelID;
  partId: PartID;
}

export default function ArchivePartModelModal({
  isOpen,
  onOpenChange,
  modelId,
  partId,
}: ArchiveModelModalProps) {
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
            <ArchiveModelPartButton modelId={modelId} partId={partId}>
              Yes, I am sure
            </ArchiveModelPartButton>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
