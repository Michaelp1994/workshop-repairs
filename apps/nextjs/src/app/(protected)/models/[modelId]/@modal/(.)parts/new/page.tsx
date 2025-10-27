import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@repo/ui/dialog";
import { useNavigate } from "@tanstack/react-router";
import { use } from "react";

import CreateModelPartForm from "~/components/forms/CreateModelPartForm";

interface CreateModelPartModalProps {
  params: Promise<{
    modelId: string;
  }>;
}

export default function CreateModelPartModal(props: CreateModelPartModalProps) {
  const params = use(props.params);
  const modelId = Number(params.modelId);
  const navigate = useNavigate();
  return (
    <Dialog
      defaultOpen
      onOpenChange={() => {
        router.back();
      }}
      open
    >
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
