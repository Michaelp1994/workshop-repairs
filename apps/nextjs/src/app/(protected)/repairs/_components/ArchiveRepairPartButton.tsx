import type { RepairPartID } from "@repo/validators/ids.validators";
import type { ReactNode } from "react";

import { Button } from "@repo/ui/button";
import { toast } from "@repo/ui/sonner";
import { useRouter } from "next/navigation";

import { api } from "~/trpc/client";
import displayMutationErrors from "~/utils/displayMutationErrors";

interface ArchiveRepairPartButtonProps {
  repairPartId: RepairPartID;
  children: ReactNode;
}

export default function ArchiveRepairPartButton({
  repairPartId,
  children,
}: ArchiveRepairPartButtonProps) {
  const router = useRouter();
  const utils = api.useUtils();
  const archiveMutation = api.repairParts.archive.useMutation({
    async onSuccess() {
      await utils.repairParts.getAll.invalidate();
      await utils.repairParts.countAll.invalidate();
      toast.success("Repair Part has been archived.");
      router.back();
    },
    onError(errors) {
      displayMutationErrors(errors);
    },
  });
  return (
    <Button
      onClick={() => archiveMutation.mutate({ id: repairPartId })}
      variant="destructive"
    >
      {children}
    </Button>
  );
}
