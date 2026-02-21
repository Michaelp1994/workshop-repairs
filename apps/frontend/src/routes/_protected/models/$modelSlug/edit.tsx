import { Card, CardContent } from "@repo/ui/card";
import { createFileRoute } from "@tanstack/react-router";

import UpdateModelForm from "~/components/forms/UpdateModelForm";
import {
  PageHeader,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";

export const Route = createFileRoute("/_protected/models/$modelSlug/edit")({
  component: EditModelPage,
});

function EditModelPage() {
  const { modelSlug } = Route.useParams();

  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>Edit Model</PageTitle>
        </PageHeaderText>
      </PageHeader>
      <Card>
        <CardContent>
          <UpdateModelForm slug={modelSlug} />
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
