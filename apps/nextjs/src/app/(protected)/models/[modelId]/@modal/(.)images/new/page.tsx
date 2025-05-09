"use client";
import type { ModelID } from "@repo/validators/ids.validators";

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

import CreateModelImageForm from "../../../../_components/CreateModelImageForm";

interface ArchiveModelModalProps {
  params: Promise<{ modelId: ModelID }>;
}

export default function ArchiveModelModal(props: ArchiveModelModalProps) {
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
            <DialogTitle>Upload Image</DialogTitle>
            <DialogDescription>
              Upload an image to model {modelId}
            </DialogDescription>
          </DialogHeader>
          <CreateModelImageForm modelId={modelId} />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
