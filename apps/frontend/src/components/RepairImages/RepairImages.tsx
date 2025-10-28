import type { RepairID } from "@repo/validators/ids.validators";

import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

import {
  ImageGrid,
  ImageGridItem,
  ImageGridUploadButton,
} from "~/components/ImageGrid";
import { api } from "~/trpc/client";

import UploadRepairImageModal from "../modals/UploadRepairImageModal";

interface RepairImagesProps {
  repairId: RepairID;
}

export default function RepairImages({ repairId }: RepairImagesProps) {
  const [data] = api.repairImages.getAllByRepairId.useSuspenseQuery({
    repairId,
  });
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Images</CardTitle>
      </CardHeader>
      <CardContent>
        <ImageGrid>
          {data.map((repairImage) => {
            return (
              <Link
                key={repairImage.id}
                to={`${repairId}/images?id=${repairImage.id}`}
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
          <ImageGridUploadButton onClick={() => setIsOpen(true)} />
          <UploadRepairImageModal
            isOpen={isOpen}
            onOpenChange={() => setIsOpen(false)}
            repairId={repairId}
          />
        </ImageGrid>
      </CardContent>
    </Card>
  );
}
