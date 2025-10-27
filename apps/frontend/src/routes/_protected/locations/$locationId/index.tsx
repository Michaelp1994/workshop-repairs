import { Button } from "@repo/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

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
  const [isOpen, setIsOpen] = useState(false);
  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>{location.name}</PageTitle>
        </PageHeaderText>
        <PageHeaderActions>
          <IconButton to={`/locations/${locationId}/edit`} variant="update">
            Edit
          </IconButton>
          <Button onClick={() => setIsOpen(true)}>Archive</Button>
          <ArchiveLocationModal
            isOpen={isOpen}
            locationId={locationId}
            onOpenChange={() => setIsOpen(false)}
          />
        </PageHeaderActions>
      </PageHeader>
      <LocationDetails locationId={locationId} />
      <LocationAssetsTable locationId={locationId} />
    </PageWrapper>
  );
}
