import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";

import UpdateModelImageForm from "../../../_components/UpdateModelImageForm";

interface ModelImageGalleryModalProps {
  params: {
    modelImageId: string;
    modelId: string;
  };
}

export default function ModelImageGalleryModal({
  params,
}: ModelImageGalleryModalProps) {
  const modelImageId = Number(params.modelImageId);
  const modelId = Number(params.modelId);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gallery</CardTitle>
        <CardDescription>
          Photos associated with model {modelId}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UpdateModelImageForm modelImageId={modelImageId} />
      </CardContent>
    </Card>
  );
}
