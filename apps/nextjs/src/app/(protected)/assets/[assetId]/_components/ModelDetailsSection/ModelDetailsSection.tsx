"use client";
import { Button } from "@repo/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@repo/ui/card";
import { ArrowUpRight } from "@repo/ui/icons";
import { Input } from "@repo/ui/input";
import { Label } from "@repo/ui/label";

import type { AssetID } from "@repo/validators/ids.validators";
import Image from "next/image";
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
        <Button variant="ghost" asChild>
          <Link href={`/models/${model.id}`}>
            <span className="sr-only">View Model</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <img src={model.imageUrl} alt="" />
        <Label>Name</Label>
        <Input disabled value={model.name} />
        <Label>Manufacturer</Label>
        <Input disabled value={model.manufacturer?.name} />
      </CardContent>
    </Card>
  );
}
