"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { Upload } from "@repo/ui/icons";
import { type ModelID } from "@repo/validators/ids.validators";
import Image from "next/image";
import Link from "next/link";

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
        <div className="grid grid-cols-3 gap-2">
          {data.map((modelImage) => {
            return (
              <Link
                href={`./${modelId}/images?id=${modelImage.id}`}
                key={modelImage.id}
              >
                <img
                  alt={modelImage.caption}
                  className="aspect-square w-full rounded-md object-cover"
                  height="84"
                  key={modelImage.id}
                  src={modelImage.url}
                  width="84"
                />
              </Link>
            );
          })}
          <Link href={`./${modelId}/images/new`}>
            <div className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
              <Upload className="text-muted-foreground h-1/5 w-1/5" />
              <span className="sr-only">Upload</span>
            </div>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
