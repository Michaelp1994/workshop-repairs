import type { RepairID } from "@repo/validators/ids.validators";

import NiceModal from "@ebay/nice-modal-react";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { Link } from "@tanstack/react-router";

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
  function showUploadModal() {
    NiceModal.show(UploadRepairImageModal, { repairId });
  }
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
          <ImageGridUploadButton onClick={showUploadModal} />
        </ImageGrid>
      </CardContent>
    </Card>
  );
}
