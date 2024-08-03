import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { type ModelID } from "@repo/validators/ids.validators";

import { api } from "~/trpc/server";

import UpdateModelForm from "./UpdateModelForm";

interface ModelDetailsSectionProps {
  modelId: ModelID;
}
export default async function ModelDetailsSection({
  modelId,
}: ModelDetailsSectionProps) {
  const model = await api.models.getById({ id: modelId });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Model Details</CardTitle>
      </CardHeader>
      <CardContent>
        <UpdateModelForm model={model} modelId={modelId} />
      </CardContent>
    </Card>
  );
}
