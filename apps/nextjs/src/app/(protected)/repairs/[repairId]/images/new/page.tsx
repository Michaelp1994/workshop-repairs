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

import { api } from "~/trpc/react";
import { getBaseUrl } from "~/utils/getBaseUrl";

interface ArchiveRepairPageProps {
  params: {
    repairId: string;
  };
}

export default function ArchiveRepairPage({ params }: ArchiveRepairPageProps) {
  const repairId = Number(params.repairId);
  const router = useRouter();
  const repairUrl = `${getBaseUrl()}/repairs/${repairId}`;

  const { data, isLoading, isError } =
    api.repairImages.getAllByRepairId.useQuery({ repairId });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Image</CardTitle>
        <CardDescription>
          Are you sure you wish to archive this item?
        </CardDescription>
      </CardHeader>
      <CardContent>This repair will no longer be avaliable.</CardContent>
      <CardFooter className="flex justify-end gap-4">
        <Button asChild>
          <Link href={repairUrl}>No</Link>
        </Button>
        <Button variant="destructive">Yes, I am sure</Button>
      </CardFooter>
    </Card>
  );
}
