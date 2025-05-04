"use client";
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
import { use } from "react";

import { BackButton } from "~/components/BackButton";

import ArchivePartButton from "../../../_components/ArchivePartButton";

interface ArchivePartModalProps {
  params: Promise<{
    partId: string;
  }>;
}

export default function ArchivePartModal(props: ArchivePartModalProps) {
  const params = use(props.params);
  const router = useRouter();
  const partId = Number(params.partId);

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
            <DialogTitle>Confirm Archive</DialogTitle>
            <DialogDescription>
              Are you sure you wish to archive this Part?
            </DialogDescription>
          </DialogHeader>
          This Part will no longer be avaliable.
          <DialogFooter>
            <BackButton>No</BackButton>
            <ArchivePartButton partId={partId}>
              Yes, I am sure
            </ArchivePartButton>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
