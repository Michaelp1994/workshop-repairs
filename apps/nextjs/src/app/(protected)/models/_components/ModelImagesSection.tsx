"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { type ModelID } from "@repo/validators/ids.validators";
import Link from "next/link";

import {
  ImageGrid,
  ImageGridItem,
  ImageGridUploadButton,
} from "~/components/ImageGrid";
import { api } from "~/trpc/client";

interface ModelImagesSectionProps {
  modelId: ModelID;
}

export default function ModelImagesSection({
  modelId,
}: ModelImagesSectionProps) {
  const [data] = api.modelImages.getAllByModelId.useSuspenseQuery({
    modelId,
  });

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
                href={`./${modelId}/images?id=${modelImage.id}`}
                key={modelImage.id}
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
          <Link href={`./${modelId}/images/new`}>
            <ImageGridUploadButton />
          </Link>
        </ImageGrid>
      </CardContent>
    </Card>
  );
}
