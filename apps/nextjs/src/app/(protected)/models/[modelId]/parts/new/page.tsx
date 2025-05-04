import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";

import CreateModelPartForm from "../../../_components/CreateModelPartForm";

interface CreateModelPartPageProps {
  params: Promise<{
    modelId: string;
  }>;
}

export default async function CreateModelPartPage(
  props: CreateModelPartPageProps,
) {
  const params = await props.params;
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
