import NiceModal from "@ebay/nice-modal-react";
import { Button } from "@repo/ui/button";
import { createFileRoute } from "@tanstack/react-router";

import { IconButton } from "~/components/IconButton";
import LocationAssetsTable from "~/components/LocationAssetsTable";
import LocationDetails from "~/components/LocationDetails";
import ArchiveLocationModal from "~/components/modals/ArchiveLocationModal";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";
import { api } from "~/trpc/client";

export const Route = createFileRoute("/_protected/locations/$locationId/")({
  component: ViewLocationPage,
});

function ViewLocationPage() {
  const params = Route.useParams();
  const locationId = Number(params.locationId);
  const [location] = api.locations.getById.useSuspenseQuery({ id: locationId });
  async function showArchiveModal() {
    await NiceModal.show(ArchiveLocationModal, { locationId });
  }
  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>{location.name}</PageTitle>
        </PageHeaderText>
        <PageHeaderActions>
          <IconButton
            linkOptions={{
              to: "/locations/$locationId/edit",
              params: { locationId },
            }}
            variant="update"
          >
            Edit
          </IconButton>
          <Button onClick={showArchiveModal}>Archive</Button>
        </PageHeaderActions>
      </PageHeader>
      <LocationDetails locationId={locationId} />
      <LocationAssetsTable locationId={locationId} />
    </PageWrapper>
  );
}
