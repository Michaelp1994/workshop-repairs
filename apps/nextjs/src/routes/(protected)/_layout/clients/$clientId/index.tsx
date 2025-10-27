import { createFileRoute } from "@tanstack/react-router";

import ClientDetails from "~/components/ClientDetails";
import { IconButton } from "~/components/IconButton";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";
import ClientAssetsTable from "~/components/tables/ClientAssetsTable";
import ClientRepairsTable from "~/components/tables/ClientRepairsTable";
import { api } from "~/trpc/client";

export const Route = createFileRoute("/(protected)/_layout/clients/$clientId/")(
  {
    component: ViewClientPage,
  },
);

function ViewClientPage() {
  const params = Route.useParams();
  const clientId = Number(params.clientId);
  const [client] = api.clients.getById.useSuspenseQuery({ id: clientId });

  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>{client.name}</PageTitle>
        </PageHeaderText>
        <PageHeaderActions>
          <IconButton href={`/clients/${clientId}/edit`} variant="update">
            Edit
          </IconButton>
          <IconButton href={`/clients/${clientId}/archive`} variant="delete">
            Archive
          </IconButton>
        </PageHeaderActions>
      </PageHeader>
      <ClientDetails clientId={clientId} />
      <ClientAssetsTable clientId={clientId} />
      <ClientRepairsTable clientId={clientId} />
    </PageWrapper>
  );
}
