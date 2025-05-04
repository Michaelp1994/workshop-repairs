import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";

import UpdatePartModelForm from "../../../_components/UpdatePartModelForm";

interface UpdatePartModelPageProps {
  params: Promise<{
    modelId: string;
    partId: string;
  }>;
}

export default async function UpdatePartModelPage(
  props: UpdatePartModelPageProps,
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
        <UpdatePartModelForm modelId={modelId} partId={partId} />
      </CardContent>
    </Card>
  );
}
