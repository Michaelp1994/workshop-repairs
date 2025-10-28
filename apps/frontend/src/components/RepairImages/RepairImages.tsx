import type { RepairID, RepairImageID } from "@repo/validators/ids.validators";

import NiceModal from "@ebay/nice-modal-react";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";

import {
  ImageGrid,
  ImageGridItem,
  ImageGridUploadButton,
} from "~/components/ImageGrid";
import { api } from "~/trpc/client";

import RepairImagesModal from "../modals/RepairImagesModal";
import UploadRepairImageModal from "../modals/UploadRepairImageModal";

interface RepairImagesProps {
  repairId: RepairID;
}

export default function RepairImages({ repairId }: RepairImagesProps) {
  const [data] = api.repairImages.getAllByRepairId.useSuspenseQuery({
    repairId,
  });
  async function showUploadModal() {
    await NiceModal.show(UploadRepairImageModal, { repairId });
  }
  async function showGalleryModal(repairImageId: RepairImageID) {
    await NiceModal.show(RepairImagesModal, { repairId, repairImageId });
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
              <ImageGridItem
                alt={repairImage.caption}
                className="aspect-square w-full rounded-md object-cover"
                height="84"
                key={repairImage.id}
                onClick={() => showGalleryModal(repairImage.id)}
                src={repairImage.url}
                width="84"
              />
            );
          })}
          <ImageGridUploadButton onClick={showUploadModal} />
        </ImageGrid>
      </CardContent>
    </Card>
  );
}
