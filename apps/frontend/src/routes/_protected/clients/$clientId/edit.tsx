import { Card, CardContent } from "@repo/ui/card";
import { createFileRoute } from "@tanstack/react-router";

import UpdateClientForm from "~/components/forms/UpdateClientForm";
import {
  PageHeader,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";

export const Route = createFileRoute("/_protected/clients/$clientId/edit")({
  component: EditClientPage,
});

function EditClientPage() {
  const { clientId } = Route.useParams();

  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>Edit Client</PageTitle>
        </PageHeaderText>
      </PageHeader>
      <Card>
        <CardContent>
          <UpdateClientForm clientId={clientId} />
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
