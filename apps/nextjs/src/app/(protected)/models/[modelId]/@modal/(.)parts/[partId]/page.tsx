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

import UpdateModelPartForm from "~/app/(protected)/models/_components/UpdateModelPartForm";

interface UpdateModelPartModalProps {
  params: Promise<{
    modelId: string;
    partId: string;
  }>;
}

export default function UpdateModelPartModal(props: UpdateModelPartModalProps) {
  const params = use(props.params);
  const modelId = Number(params.modelId);
  const partId = Number(params.partId);
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
            <DialogTitle>Update Part to Model</DialogTitle>
            <DialogDescription>Update Part to model</DialogDescription>
          </DialogHeader>
          <UpdateModelPartForm modelId={modelId} partId={partId} />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
