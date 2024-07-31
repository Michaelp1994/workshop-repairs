import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import UpdateModelForm from "./UpdateModelForm";
import { type ModelID } from "@repo/validators/ids.validators";
import { api } from "~/trpc/server";

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
