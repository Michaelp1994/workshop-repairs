"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";
import type { RepairID } from "@repo/validators/ids.validators";
import { api } from "~/trpc/react";
import Image from "next/image";
import { Upload } from "@repo/ui/icons";

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
              className="aspect-square w-full rounded-md object-cover"
              height="300"
              alt="Product image"
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
                  key={repairImage.id}
                  alt={repairImage.caption}
                  className="aspect-square w-full rounded-md object-cover"
                  height="84"
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
