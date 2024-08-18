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
import Link from "next/link";

import { getBaseUrl } from "~/utils/getBaseUrl";

import ArchiveModelButton from "../../_components/ArchiveModelButton/ArchiveModelButton";

interface ArchiveModelPageProps {
  params: {
    modelId: string;
  };
}

export default function ArchiveModelPage({ params }: ArchiveModelPageProps) {
  const modelId = Number(params.modelId);
  const modelUrl = `${getBaseUrl()}/models/${modelId}`;

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
          <Link href={modelUrl}>No</Link>
        </Button>
        <ArchiveModelButton modelId={modelId} />
      </CardFooter>
    </Card>
  );
}
