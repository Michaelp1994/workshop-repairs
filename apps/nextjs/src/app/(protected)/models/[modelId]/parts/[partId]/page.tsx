import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";

import UpdateModelPartForm from "../../../_components/UpdateModelPartForm";

interface UpdateModelPartPageProps {
  params: Promise<{
    modelId: string;
    partId: string;
  }>;
}

export default async function UpdateModelPartPage(
  props: UpdateModelPartPageProps,
) {
  const params = await props.params;
  const modelId = Number(params.modelId);
  const partId = Number(params.partId);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Part to Model</CardTitle>
      </CardHeader>
      <CardContent>
        <UpdateModelPartForm modelId={modelId} partId={partId} />
      </CardContent>
    </Card>
  );
}
