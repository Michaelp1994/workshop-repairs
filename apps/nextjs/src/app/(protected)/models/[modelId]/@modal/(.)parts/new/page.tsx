"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@repo/ui/dialog";
import { useRouter } from "next/navigation";
import { use } from "react";

import CreateModelPartForm from "~/app/(protected)/models/_components/CreateModelPartForm";

interface CreateModelPartModalProps {
  params: Promise<{
    modelId: string;
  }>;
}

export default function CreateModelPartModal(props: CreateModelPartModalProps) {
  const params = use(props.params);
  const modelId = Number(params.modelId);
  const router = useRouter();
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
