"use client";
import type { ModelID } from "@repo/validators/ids.validators";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";
import { useSearchParams } from "next/navigation";

import { api } from "~/trpc/client";

import ModelImageCarousel from "../../_components/ModelImageCarousel";

interface ModelImageGalleryModalProps {
  params: {
    modelId: ModelID;
  };
}

export default function ModelImageGalleryModal({
  params,
}: ModelImageGalleryModalProps) {
  const searchParams = useSearchParams();
  const modelId = Number(params.modelId);
  const id = searchParams.get("id");
  const modelImageId = id ? Number(id) : undefined;

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

  const startIndex = modelImageId
    ? data.findIndex((image) => image.id === modelImageId)
    : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gallery</CardTitle>
        <CardDescription>
          Photos associated with model {modelId}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ModelImageCarousel images={data} opts={{ startIndex }} />
      </CardContent>
    </Card>
  );
}
