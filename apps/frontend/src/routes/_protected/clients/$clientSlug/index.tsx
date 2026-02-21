import NiceModal from "@ebay/nice-modal-react";
import { Button } from "@repo/ui/button";
import { createFileRoute } from "@tanstack/react-router";

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

export const Route = createFileRoute("/_protected/clients/$clientSlug/")({
  component: ViewClientPage,
});

function ViewClientPage() {
  const { clientSlug } = Route.useParams();
  const [client] = api.clients.getBySlug.useSuspenseQuery({ slug: clientSlug });

  async function showArchiveModal() {
    await NiceModal.show(ArchiveClientModal, { slug: clientSlug });
  }
  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>{client.name}</PageTitle>
        </PageHeaderText>
        <PageHeaderActions>
          <IconButton
            linkOptions={{
              to: "/clients/$clientSlug/edit",
              params: { clientSlug },
            }}
            variant="update"
          >
            Edit
          </IconButton>
          <Button onClick={showArchiveModal}>Archive</Button>
        </PageHeaderActions>
      </PageHeader>
      <ClientDetails clientSlug={clientSlug} />
      <ClientAssetsTable clientSlug={clientSlug} />
      <ClientRepairsTable clientSlug={clientSlug} />
    </PageWrapper>
  );
}
