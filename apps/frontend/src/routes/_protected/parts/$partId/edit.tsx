import { Card, CardContent } from "@repo/ui/card";
import { createFileRoute } from "@tanstack/react-router";

import {
  PageHeader,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";

import UpdatePartForm from "../../../../components/forms/UpdatePartForm";

export const Route = createFileRoute("/_protected/parts/$partId/edit")({
  component: EditPartPage,
});

function EditPartPage() {
  const params = Route.useParams();
  const partId = Number(params.partId);

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
