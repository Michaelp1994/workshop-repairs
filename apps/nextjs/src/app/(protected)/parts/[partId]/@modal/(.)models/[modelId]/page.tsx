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

import UpdatePartModelForm from "~/app/(protected)/parts/_components/UpdatePartModelForm";

interface UpdatePartModelModalProps {
  params: Promise<{
    modelId: string;
    partId: string;
  }>;
}

export default function UpdatePartModelModal(props: UpdatePartModelModalProps) {
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
            <DialogTitle>Update Model to Part</DialogTitle>
            <DialogDescription>Update Model to Part</DialogDescription>
          </DialogHeader>
          <UpdatePartModelForm modelId={modelId} partId={partId} />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
