import type { PartID } from "@repo/validators/ids.validators";

import {
  type BaseModalProps,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@repo/ui/dialog";

import CreatePartModelForm from "~/components/forms/CreatePartModelForm";

interface CreatePartModelModalProps extends BaseModalProps {
  partId: PartID;
}

export default function CreatePartModelModal({
  isOpen,
  onOpenChange,
  partId,
}: CreatePartModelModalProps) {
  return (
    <Dialog onOpenChange={onOpenChange} open={isOpen}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Part to Model</DialogTitle>
            <DialogDescription>Add Part to model</DialogDescription>
          </DialogHeader>
          <CreatePartModelForm partId={partId} />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
