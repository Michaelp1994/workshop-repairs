import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";

import CreatePartModelForm from "../../../_components/CreatePartModelForm";

interface CreateModelPartPageProps {
  params: Promise<{
    partId: string;
  }>;
}

export default async function CreatePartModelPage(
  props: CreateModelPartPageProps,
) {
  const params = await props.params;
  const partId = Number(params.partId);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Model to Part</CardTitle>
      </CardHeader>
      <CardContent>
        <CreatePartModelForm partId={partId} />
      </CardContent>
    </Card>
  );
}
