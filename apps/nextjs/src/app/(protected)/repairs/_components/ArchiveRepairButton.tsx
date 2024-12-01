"use client";
import type { RepairCommentID } from "@repo/validators/ids.validators";
import type { ReactNode } from "react";

import { Button } from "@repo/ui/button";
import { toast } from "@repo/ui/sonner";
import { useRouter } from "next/navigation";

import { api } from "~/trpc/client";
import displayMutationErrors from "~/utils/displayMutationErrors";

interface ArchiveRepairButtonProps {
  repairId: RepairCommentID;
  children: ReactNode;
}

export default function ArchiveRepairButton({
  repairId,
  children,
}: ArchiveRepairButtonProps) {
  const router = useRouter();
  const utils = api.useUtils();
  const archiveMutation = api.repairs.archive.useMutation({
    async onSuccess() {
      await utils.repairs.getAll.invalidate();
      await utils.repairs.countAll.invalidate();
      toast.success("Repair has been archived.");
      router.back();
    },
    onError(errors) {
      displayMutationErrors(errors);
    },
  });
  return (
    <Button
      onClick={() => archiveMutation.mutate({ id: repairId })}
      variant="destructive"
    >
      {children}
    </Button>
  );
}
