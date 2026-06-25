import { Card, CardContent } from "@repo/ui/card";
import { createFileRoute } from "@tanstack/react-router";

import UpdatePartForm from "~/components/forms/UpdatePartForm";
import {
  PageHeader,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";

export const Route = createFileRoute("/_protected/parts/$partId/edit")({
  component: EditPartPage,
});

function EditPartPage() {
  const { partId } = Route.useParams();

  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>Edit Part</PageTitle>
        </PageHeaderText>
      </PageHeader>
      <Card>
        <CardContent>
          <UpdatePartForm partId={partId} />
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
