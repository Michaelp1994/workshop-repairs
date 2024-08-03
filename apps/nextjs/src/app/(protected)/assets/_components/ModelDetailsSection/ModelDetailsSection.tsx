"use client";
import type { AssetID } from "@repo/validators/ids.validators";

import { Button } from "@repo/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { ArrowUpRight } from "@repo/ui/icons";
import { Input } from "@repo/ui/input";
import { Label } from "@repo/ui/label";
import Link from "next/link";

import { api } from "~/trpc/react";

interface ModelDetailsProps {
  assetId: AssetID;
}

export default function ModelDetailsSection({ assetId }: ModelDetailsProps) {
  const {
    data: model,
    isLoading,
    isError,
  } = api.models.getByAssetId.useQuery({
    assetId,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !model) {
    return <div>Error</div>;
  }

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Model Details</CardTitle>
        <Button asChild variant="ghost">
          <Link href={`/models/${model.id}`}>
            <span className="sr-only">View Model</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <img alt="" src={model.imageUrl} />
        <dl className="grid grid-cols-[auto_1fr] items-start gap-4">
          <dt className="font-bold">Name:</dt>
          <dd>{model.name}</dd>
          <dt className="font-bold">Manufacturer:</dt>
          <dd>{model.manufacturer?.name}</dd>
        </dl>
      </CardContent>
    </Card>
  );
}
