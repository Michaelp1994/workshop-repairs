import { IconButton } from "~/app/(protected)/_components/IconButton";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/app/(protected)/_components/Page";
import { api } from "~/trpc/server";

import ClientAssetsTable from "../_components/ClientAssetsTable";
import ClientDetails from "../_components/ClientDetails";
import ClientRepairsTable from "../_components/ClientRepairsTable";

interface ViewClientPageProps {
  params: Promise<{
    clientId: string;
  }>;
}

export default async function ViewClientPage(props: ViewClientPageProps) {
  const params = await props.params;
  const clientId = Number(params.clientId);
  const client = await api.clients.getById({ id: clientId });

  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>{client.name}</PageTitle>
        </PageHeaderText>
        <PageHeaderActions>
          <IconButton href={`${clientId}/edit`} variant="update">
            Edit
          </IconButton>
          <IconButton href={`${clientId}/archive`} variant="delete">
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
