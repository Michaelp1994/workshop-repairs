import { Card, CardContent } from "@repo/ui/card";
import { createFileRoute } from "@tanstack/react-router";

import UpdateLocationForm from "~/components/forms/UpdateLocationForm";
import {
  PageHeader,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";

export const Route = createFileRoute(
  "/_protected/locations/$locationId/edit",
)({
  component: EditLocationPage,
});

function EditLocationPage() {
  const { locationId } = Route.useParams();

  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>Edit Location</PageTitle>
        </PageHeaderText>
      </PageHeader>
      <Card>
        <CardContent>
          <UpdateLocationForm locationId={locationId} />
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
