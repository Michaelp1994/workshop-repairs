import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardHeaderText,
  CardTitle,
} from "@repo/ui/card";

import ModelImageCarousel from "../../_components/ModelImages/ModelImageCarousel";

interface ModelImageGalleryModalProps {
  params: Promise<{
    modelId: string;
  }>;
}

export default async function ModelImageGalleryModal(
  props: ModelImageGalleryModalProps,
) {
  const params = await props.params;
  const modelId = Number(params.modelId);

  return (
    <Card>
      <CardHeader>
        <CardHeaderText>
          <CardTitle>Gallery</CardTitle>
          <CardDescription>
            Photos associated with model {modelId}
          </CardDescription>
        </CardHeaderText>
      </CardHeader>
      <CardContent>
        <ModelImageCarousel modelId={modelId} />
      </CardContent>
    </Card>
  );
}
