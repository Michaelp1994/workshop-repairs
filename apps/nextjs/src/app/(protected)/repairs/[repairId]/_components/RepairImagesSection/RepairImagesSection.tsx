"use client";
import type { RepairID } from "@repo/validators/ids.validators";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";
import { Upload } from "@repo/ui/icons";
import Image from "next/image";

import { api } from "~/trpc/react";

interface RepairImageSectionProps {
  repairId: RepairID;
}

export default function RepairImageSection({
  repairId,
}: RepairImageSectionProps) {
  const { data, isLoading, isError } =
    api.repairImages.getAllByRepairId.useQuery({ repairId });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError || !data) {
    return <div>Error loading repairs</div>;
  }

  const numImages = data.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Images</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          {numImages > 0 ? (
            <Image
              alt="Product image"
              className="aspect-square w-full rounded-md object-cover"
              height="300"
              src="/placeholder.svg"
              width="300"
            />
          ) : (
            <div className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
              <Upload className="text-muted-foreground h-1/5 w-1/5" />
              <span className="sr-only">Upload</span>
            </div>
          )}

          <div className="grid grid-cols-3 gap-2">
            {data.slice(1, 3).map((repairImage) => {
              return (
                <Image
                  alt={repairImage.caption}
                  className="aspect-square w-full rounded-md object-cover"
                  height="84"
                  key={repairImage.id}
                  src={repairImage.url}
                  width="84"
                />
              );
            })}
            {numImages > 1 && (
              <div className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                <Upload className="text-muted-foreground h-4 w-4" />
                <span className="sr-only">Upload</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
