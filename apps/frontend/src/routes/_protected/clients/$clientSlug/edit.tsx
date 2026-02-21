import { Card, CardContent } from "@repo/ui/card";
import { createFileRoute } from "@tanstack/react-router";

import UpdateClientForm from "~/components/forms/UpdateClientForm";
import {
  PageHeader,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";

export const Route = createFileRoute("/_protected/clients/$clientSlug/edit")({
  component: EditClientPage,
});

function EditClientPage() {
  const { clientSlug } = Route.useParams();

  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>Edit Client</PageTitle>
        </PageHeaderText>
      </PageHeader>
      <Card>
        <CardContent>
          <UpdateClientForm clientSlug={clientSlug} />
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
