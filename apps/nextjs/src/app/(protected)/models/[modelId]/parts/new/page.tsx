import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";

import CreateModelPartForm from "../../../_components/CreateModelPartForm";

interface CreateModelPartPageProps {
  params: {
    modelId: string;
  };
}

export default function CreateModelPartPage({
  params,
}: CreateModelPartPageProps) {
  const modelId = Number(params.modelId);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Part to Model</CardTitle>
      </CardHeader>
      <CardContent>
        <CreateModelPartForm modelId={modelId} />
      </CardContent>
    </Card>
  );
}
