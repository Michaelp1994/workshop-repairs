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

export const Route = createFileRoute("/_protected/locations/$locationSlug/")({
  component: ViewLocationPage,
});

function ViewLocationPage() {
  const { locationSlug } = Route.useParams();
  const [location] = api.locations.getBySlug.useSuspenseQuery({
    slug: locationSlug,
  });
  async function showArchiveModal() {
    await NiceModal.show(ArchiveLocationModal, { slug: locationSlug });
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
              to: "/locations/$locationSlug/edit",
              params: { locationSlug },
            }}
            variant="update"
          >
            Edit
          </IconButton>
          <Button onClick={showArchiveModal}>Archive</Button>
        </PageHeaderActions>
      </PageHeader>
      <LocationDetails slug={locationSlug} />
      <LocationAssetsTable locationId={location.id} />
    </PageWrapper>
  );
}
