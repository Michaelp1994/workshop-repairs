import { IconButton } from "~/components/IconButton";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";
import { api } from "~/trpc/server";

import ClientAssetsTable from "../_components/ClientAssetsTable";
import ClientDetails from "../_components/ClientDetails";
import ClientRepairsTable from "../_components/ClientRepairsTable";

interface ViewClientPageProps {
  params: {
    clientId: string;
  };
}

export default async function ViewClientPage({ params }: ViewClientPageProps) {
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
        </PageHeaderActions>
      </PageHeader>
      <ClientDetails clientId={clientId} />
      <ClientAssetsTable clientId={clientId} />
      <ClientRepairsTable clientId={clientId} />
    </PageWrapper>
  );
}
