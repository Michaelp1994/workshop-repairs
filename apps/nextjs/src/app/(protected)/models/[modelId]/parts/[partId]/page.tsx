import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";

import UpdateModelPartForm from "../../../_components/UpdateModelPartForm";

interface UpdateModelPartPageProps {
  params: {
    modelId: string;
    partId: string;
  };
}

export default function UpdateModelPartPage({
  params,
}: UpdateModelPartPageProps) {
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
