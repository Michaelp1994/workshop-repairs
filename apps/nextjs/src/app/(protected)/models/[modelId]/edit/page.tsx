import { Card, CardContent } from "@repo/ui/card";

import {
  PageHeader,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/app/(protected)/_components/Page";

import UpdateModelForm from "../../_components/UpdateModelForm";

interface EditModelPageProps {
  params: Promise<{
    modelId: string;
  }>;
}

export default async function EditModelPage(props: EditModelPageProps) {
  const params = await props.params;
  const modelId = Number(params.modelId);

  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>Edit Model</PageTitle>
        </PageHeaderText>
      </PageHeader>
      <Card>
        <CardContent>
          <UpdateModelForm modelId={modelId} />
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
