import { createFileRoute } from "@tanstack/react-router";

import { IconButton } from "~/components/IconButton";
import LocationAssetsTable from "~/components/LocationAssetsTable";
import LocationDetails from "~/components/LocationDetails";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";
import { api } from "~/trpc/client";

export const Route = createFileRoute(
  "/(protected)/_layout/locations/$locationId/",
)({
  component: ViewLocationPage,
});

function ViewLocationPage() {
  const params = Route.useParams();
  const locationId = Number(params.locationId);
  const [location] = api.locations.getById.useSuspenseQuery({ id: locationId });
  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>{location.name}</PageTitle>
        </PageHeaderText>
        <PageHeaderActions>
          <IconButton href={`${locationId}/edit`} variant="update">
            Edit
          </IconButton>
          <IconButton href={`${locationId}/archive`} variant="delete">
            Archive
          </IconButton>
        </PageHeaderActions>
      </PageHeader>
      <LocationDetails locationId={locationId} />
      <LocationAssetsTable locationId={locationId} />
    </PageWrapper>
  );
}
