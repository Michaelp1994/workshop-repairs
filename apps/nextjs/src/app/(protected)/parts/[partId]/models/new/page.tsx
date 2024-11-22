import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";

import CreatePartModelForm from "../../../_components/CreatePartModelForm";

interface CreateModelPartPageProps {
  params: {
    partId: string;
  };
}

export default function CreatePartModelPage({
  params,
}: CreateModelPartPageProps) {
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
