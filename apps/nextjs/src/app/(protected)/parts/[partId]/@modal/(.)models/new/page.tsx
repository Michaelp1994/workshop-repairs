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

import CreatePartModelForm from "~/app/(protected)/parts/_components/CreatePartModelForm";

interface CreatePartModelModalProps {
  params: Promise<{
    partId: string;
  }>;
}

export default function CreatePartModelModal(props: CreatePartModelModalProps) {
  const params = use(props.params);
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
            <DialogTitle>Add Part to Model</DialogTitle>
            <DialogDescription>Add Part to model</DialogDescription>
          </DialogHeader>
          <CreatePartModelForm partId={partId} />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
