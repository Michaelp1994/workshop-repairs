"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { type ModelID } from "@repo/validators/ids.validators";
import Link from "next/link";

import {
  ImageGrid,
  ImageGridItem,
  ImageGridUploadButton,
} from "~/components/ImageGrid";
import { api } from "~/trpc/react";

interface ModelImagesSectionProps {
  modelId: ModelID;
}

export default function ModelImagesSection({
  modelId,
}: ModelImagesSectionProps) {
  const { data, isLoading, isError } = api.modelImages.getAllByModelId.useQuery(
    {
      modelId,
    },
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError || !data) {
    return <div>Error loading model images</div>;
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
