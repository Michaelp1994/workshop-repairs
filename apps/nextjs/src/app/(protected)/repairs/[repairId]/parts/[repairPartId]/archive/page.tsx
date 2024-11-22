"use client";
import { Button } from "@repo/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";
import { toast } from "@repo/ui/sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { api } from "~/trpc/client";
import { getBaseUrl } from "~/utils/getBaseUrl";

interface ArchiveRepairPageProps {
  params: {
    repairId: string;
    repairPartId: string;
  };
}

export default function ArchiveRepairPage({ params }: ArchiveRepairPageProps) {
  const router = useRouter();
  const utils = api.useUtils();
  const repairId = Number(params.repairId);
  const repairPartId = Number(params.repairPartId);
  const repairUrl = `${getBaseUrl()}/repairs/${repairId}`;

  const archiveMutation = api.repairParts.archive.useMutation({
    async onSuccess() {
      await utils.repairParts.getAllByRepairId.invalidate({
        id: repairId,
      });
      toast.success("Repair Part has been archived.");
      router.back();
    },
  });

  async function archiveRepair() {
    await archiveMutation.mutateAsync({ id: repairPartId });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Confirm Archive</CardTitle>
        <CardDescription>
          Are you sure you wish to archive this item?
        </CardDescription>
      </CardHeader>
      <CardContent>This repair will no longer be avaliable.</CardContent>
      <CardFooter className="flex justify-end gap-4">
        <Button asChild>
          <Link href={repairUrl}>No</Link>
        </Button>
        <Button onClick={() => void archiveRepair()} variant="destructive">
          Yes, I am sure
        </Button>
      </CardFooter>
    </Card>
  );
}
