import type { RepairCommentID } from "@repo/validators/ids.validators";
import type { ReactNode } from "react";

import { Button } from "@repo/ui/button";
import { toast } from "@repo/ui/sonner";
import { useRouter } from "next/navigation";

import { api } from "~/trpc/client";
import displayMutationErrors from "~/utils/displayMutationErrors";

interface ArchiveRepairCommentButtonProps {
  repairCommentId: RepairCommentID;
  children: ReactNode;
}

export default function ArchiveRepairCommentButton({
  repairCommentId,
  children,
}: ArchiveRepairCommentButtonProps) {
  const router = useRouter();
  const utils = api.useUtils();
  const archiveMutation = api.repairComments.archive.useMutation({
    async onSuccess() {
      await utils.repairComments.getAllByRepairId.invalidate();
      await utils.repairComments.countAll.invalidate();
      toast.success("Repair Comment has been archived.");
      router.back();
    },
    onError(errors) {
      displayMutationErrors(errors);
    },
  });
  return (
    <Button
      onClick={() => archiveMutation.mutate({ id: repairCommentId })}
      variant="destructive"
    >
      {children}
    </Button>
  );
}
