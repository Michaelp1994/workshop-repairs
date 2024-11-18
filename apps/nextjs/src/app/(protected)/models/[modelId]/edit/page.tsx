import { Card, CardContent } from "@repo/ui/card";

import {
  PageHeader,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";

import UpdateModelForm from "../../_components/UpdateModelForm";

interface EditModelPageProps {
  params: {
    modelId: string;
  };
}

export default function EditModelPage({ params }: EditModelPageProps) {
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
