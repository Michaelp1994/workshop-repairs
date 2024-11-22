import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";

import UpdatePartModelForm from "../../../_components/UpdatePartModelForm";

interface UpdatePartModelPageProps {
  params: {
    modelId: string;
    partId: string;
  };
}

export default function UpdatePartModelPage({
  params,
}: UpdatePartModelPageProps) {
  const modelId = Number(params.modelId);
  const partId = Number(params.partId);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Part to Model</CardTitle>
      </CardHeader>
      <CardContent>
        <UpdatePartModelForm modelId={modelId} partId={partId} />
      </CardContent>
    </Card>
  );
}
