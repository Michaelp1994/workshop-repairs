import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { type ModelID } from "@repo/validators/ids.validators";

import UpdateModelForm from "./UpdateModelForm";

interface ModelDetailsSectionProps {
  modelId: ModelID;
}
export default async function ModelDetailsSection({
  modelId,
}: ModelDetailsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Model Details</CardTitle>
      </CardHeader>
      <CardContent>
        <UpdateModelForm modelId={modelId} />
      </CardContent>
    </Card>
  );
}
