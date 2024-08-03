import type { PartID } from "@repo/validators/ids.validators";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@repo/ui/dialog";

import AddPartModelForm from "./AddPartModelForm";

interface AddPartModelModalProps {
  partId: PartID;
}

export default function AddPartModelModal({ partId }: AddPartModelModalProps) {
  return (
    <Dialog
      defaultOpen
      onOpenChange={() => {
        closeModal();
      }}
      open
    >
      <DialogPortal>
        <DialogOverlay />

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Part to Model</DialogTitle>
            <DialogDescription>
              Add a Comment to repair {partId}
            </DialogDescription>
          </DialogHeader>
          <AddPartModelForm partId={partId} />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
