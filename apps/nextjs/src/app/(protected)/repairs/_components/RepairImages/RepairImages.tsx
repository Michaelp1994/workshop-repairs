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
import { api } from "~/trpc/client";

interface RepairImagesProps {
  repairId: RepairID;
}

export default function RepairImages({ repairId }: RepairImagesProps) {
  const [data] = api.repairImages.getAllByRepairId.useSuspenseQuery({
    repairId,
  });

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
