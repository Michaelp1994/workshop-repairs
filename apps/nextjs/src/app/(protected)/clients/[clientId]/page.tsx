import { IconButton } from "~/components/IconButton";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";
import { api } from "~/trpc/server";

import ClientAssetsSection from "../_components/ClientAssetsTable";
import ClientDetailsSection from "../_components/ClientDetailsSection";
import ClientRepairsSection from "../_components/ClientRepairsTable";

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
      <ClientDetailsSection clientId={clientId} />
      <ClientAssetsSection clientId={clientId} />
      <ClientRepairsSection clientId={clientId} />
    </PageWrapper>
  );
}
