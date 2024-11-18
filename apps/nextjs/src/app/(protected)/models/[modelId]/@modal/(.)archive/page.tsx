"use client";
import { Button } from "@repo/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@repo/ui/dialog";
import { useRouter } from "next/navigation";

import { getBaseUrl } from "~/utils/getBaseUrl";

import ArchiveModelButton from "../../../_components/ArchiveModelButton/ArchiveModelButton";

interface ArchiveModelModalProps {
  params: {
    modelId: string;
  };
}

export default function ArchiveModelModal({ params }: ArchiveModelModalProps) {
  const router = useRouter();
  const modelId = Number(params.modelId);
  const modelUrl = `${getBaseUrl()}/models/${modelId}`;

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
            <DialogTitle>Archive Model</DialogTitle>
            <DialogDescription>Archive Modal</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => router.back()}>No</Button>
            <ArchiveModelButton modelId={modelId} />
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
