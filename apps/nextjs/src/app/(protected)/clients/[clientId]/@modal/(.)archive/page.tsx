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

import ArchiveClientButton from "../../../_components/ArchiveClientButton";

interface ArchiveClientModalProps {
  params: Promise<{
    clientId: string;
  }>;
}

export default function ArchiveClientModal(props: ArchiveClientModalProps) {
  const params = use(props.params);
  const router = useRouter();
  const clientId = Number(params.clientId);

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
              Are you sure you wish to archive this client?
            </DialogDescription>
          </DialogHeader>
          This client will no longer be avaliable.
          <DialogFooter>
            <BackButton>No</BackButton>
            <ArchiveClientButton clientId={clientId}>
              Yes, I am sure
            </ArchiveClientButton>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
