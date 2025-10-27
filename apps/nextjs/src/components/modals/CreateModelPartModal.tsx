import type { ModelID } from "@repo/validators/ids.validators";

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

import CreateModelPartForm from "~/components/forms/CreateModelPartForm";

interface CreateModelPartModalProps extends BaseModalProps {
  modelId: ModelID;
}

export default function CreateModelPartModal({
  isOpen,
  modelId,
  onOpenChange,
}: CreateModelPartModalProps) {
  return (
    <Dialog onOpenChange={onOpenChange} open={isOpen}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Part to Model</DialogTitle>
            <DialogDescription>Add Part to model</DialogDescription>
          </DialogHeader>
          <CreateModelPartForm modelId={modelId} />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
