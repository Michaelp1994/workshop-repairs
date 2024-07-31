"use client";
import type { RepairID } from "@repo/validators/ids.validators";

import { Button } from "@repo/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { ArrowUpRight } from "@repo/ui/icons";
import { Input } from "@repo/ui/input";
import { Label } from "@repo/ui/label";
import Link from "next/link";

import { api } from "~/trpc/react";

interface AssetDetailsProps {
  repairId: RepairID;
}

export default function AssetDetailsSection({ repairId }: AssetDetailsProps) {
  const {
    data: repair,
    isLoading,
    isError,
  } = api.repairs.getById.useQuery({
    id: repairId,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError || !repair) {
    return <div>Error loading asset</div>;
  }

  const { asset, model, manufacturer, location } = repair;

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Asset Details</CardTitle>
        <Button asChild size="icon" variant="ghost">
          <Link href={`/assets/${asset.id}`}>
            <ArrowUpRight className="h-4 w-4" />
            <span className="sr-only">View Asset</span>
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <img alt={model.name} src={model.imageUrl} />
        <div className="grid grid-cols-2 gap-2">
          <Label>Asset Number</Label>
          <Input disabled value={asset.assetNumber} />
          <Label>Serial Number</Label>
          <Input disabled value={asset.serialNumber} />
          <Label>Model</Label>
          <Input disabled value={model.name} />
          <Label>Manufacturer</Label>
          <Input disabled value={manufacturer.name} />

          <Label>Location</Label>
          <Input disabled value={location.name} />
        </div>
      </CardContent>
    </Card>
  );
}
