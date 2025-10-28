import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { type ModelID } from "@repo/validators/ids.validators";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

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
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Images</CardTitle>
      </CardHeader>
      <CardContent>
        <ImageGrid>
          {data.map((modelImage) => {
            return (
              <Link
                key={modelImage.id}
                to={`${modelId}/images?id=${modelImage.id}`}
              >
                <ImageGridItem
                  alt={modelImage.caption || ""}
                  height={84}
                  src={modelImage.url}
                  width={84}
                />
              </Link>
            );
          })}
          <ImageGridUploadButton onClick={() => setIsOpen(true)} />
          <UploadModelImageModal
            isOpen={isOpen}
            modelId={modelId}
            onOpenChange={() => setIsOpen(false)}
          />
        </ImageGrid>
      </CardContent>
    </Card>
  );
}
