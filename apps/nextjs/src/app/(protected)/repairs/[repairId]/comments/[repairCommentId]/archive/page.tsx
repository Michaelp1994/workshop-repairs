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

interface ArchiveRepairCommentPageProps {
  params: {
    repairId: string;
    repairCommentId: string;
  };
}

export default function ArchiveRepairCommentPage({
  params,
}: ArchiveRepairCommentPageProps) {
  const utils = api.useUtils();
  const repairId = Number(params.repairId);
  const repairCommentId = Number(params.repairCommentId);
  const router = useRouter();
  const repairUrl = `${getBaseUrl()}/repairs/${repairId}`;

  const archiveMutation = api.repairComments.archive.useMutation({
    async onSuccess() {
      await utils.repairComments.getAllByRepairId.invalidate({
        repairId,
      });
      toast.success("Repair has been archived.");
      router.replace(repairUrl);
    },
  });

  async function archiveRepairComment() {
    await archiveMutation.mutateAsync({ id: repairCommentId });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Confirm Archive</CardTitle>
        <CardDescription>
          Are you sure you wish to archive this comment?
        </CardDescription>
      </CardHeader>
      <CardContent>This repair comment will no longer be shown.</CardContent>
      <CardFooter className="flex justify-end gap-4">
        <Button asChild>
          <Link href={repairUrl}>No</Link>
        </Button>
        <Button
          onClick={() => void archiveRepairComment()}
          variant="destructive"
        >
          Yes, I am sure
        </Button>
      </CardFooter>
    </Card>
  );
}
