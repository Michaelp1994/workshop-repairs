import NiceModal from "@ebay/nice-modal-react";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { type ModelID } from "@repo/validators/ids.validators";

import {
  ImageGrid,
  ImageGridItem,
  ImageGridUploadButton,
} from "~/components/ImageGrid";
import { api } from "~/trpc/client";

import UploadModelImageModal from "../modals/UploadModelImageModal";

interface ModelImagesProps {
  modelId: ModelID;
}

export default function ModelImages({ modelId }: ModelImagesProps) {
  const [data] = api.modelImages.getAllByModelId.useSuspenseQuery({
    modelId,
  });
  async function showUploadModal() {
    await NiceModal.show(UploadModelImageModal, { modelId });
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Images</CardTitle>
      </CardHeader>
      <CardContent>
        <ImageGrid>
          {data.map((modelImage) => {
            return (
              <ImageGridItem
                alt={modelImage.caption ?? ""}
                height={84}
                key={modelImage.id}
                src={modelImage.url}
                width={84}
              />
            );
          })}
          <ImageGridUploadButton onClick={showUploadModal} />
        </ImageGrid>
      </CardContent>
    </Card>
  );
}
