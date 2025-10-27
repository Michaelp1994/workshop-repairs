import { Button } from "@repo/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import ClientDetails from "~/components/ClientDetails";
import { IconButton } from "~/components/IconButton";
import ArchiveClientModal from "~/components/modals/ArchiveClientModal";
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

export const Route = createFileRoute("/_protected/clients/$clientId/")({
  component: ViewClientPage,
});

function ViewClientPage() {
  const params = Route.useParams();
  const clientId = Number(params.clientId);
  const [client] = api.clients.getById.useSuspenseQuery({ id: clientId });
  const [isOpen, setIsOpen] = useState(false);
  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>{client.name}</PageTitle>
        </PageHeaderText>
        <PageHeaderActions>
          <IconButton to={`/clients/${clientId}/edit`} variant="update">
            Edit
          </IconButton>
          <Button onClick={() => setIsOpen(true)}>Archive</Button>
          <ArchiveClientModal
            clientId={clientId}
            isOpen={isOpen}
            onOpenChange={() => setIsOpen(false)}
          />
        </PageHeaderActions>
      </PageHeader>
      <ClientDetails clientId={clientId} />
      <ClientAssetsTable clientId={clientId} />
      <ClientRepairsTable clientId={clientId} />
    </PageWrapper>
  );
}
