import { Card, CardContent } from "@repo/ui/card";
import { createFileRoute } from "@tanstack/react-router";

import UpdateModelForm from "~/components/forms/UpdateModelForm";
import {
  PageHeader,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";

export const Route = createFileRoute("/_protected/models/$modelId/edit")({
  component: EditModelPage,
});

function EditModelPage() {
  const { modelId } = Route.useParams();

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
