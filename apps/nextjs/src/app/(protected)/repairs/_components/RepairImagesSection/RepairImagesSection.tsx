"use client";
import type { RepairID } from "@repo/validators/ids.validators";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";
import Link from "next/link";

import {
  ImageGrid,
  ImageGridItem,
  ImageGridUploadButton,
} from "~/components/ImageGrid";
import { api } from "~/trpc/react";

interface RepairImageSectionProps {
  repairId: RepairID;
}

export default function RepairImageSection({
  repairId,
}: RepairImageSectionProps) {
  const { data, isLoading, isError } =
    api.repairImages.getAllByRepairId.useQuery({
      repairId,
    });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError || !data) {
    return <div>Error loading repair images</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Images</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <ImageGrid>
          {data.map((repairImage) => {
            return (
              <Link
                href={`./${repairId}/images?id=${repairImage.id}`}
                key={repairImage.id}
              >
                <ImageGridItem
                  alt={repairImage.caption}
                  className="aspect-square w-full rounded-md object-cover"
                  height="84"
                  src={repairImage.url}
                  width="84"
                />
              </Link>
            );
          })}
          <Link href={`./${repairId}/images/new`}>
            <ImageGridUploadButton />
          </Link>
        </ImageGrid>
      </CardContent>
    </Card>
  );
}
