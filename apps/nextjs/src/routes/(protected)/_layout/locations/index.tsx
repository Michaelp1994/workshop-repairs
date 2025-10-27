import { createFileRoute } from "@tanstack/react-router";

import { IconButton } from "~/components/IconButton";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";
import LocationsTable from "~/components/tables/LocationsTable";

export const Route = createFileRoute("/(protected)/_layout/locations/")({
  component: AllLocationsPage,
});

function AllLocationsPage() {
  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>Locations</PageTitle>
        </PageHeaderText>
        <PageHeaderActions>
          <IconButton href="/locations/new" variant="create">
            Create
          </IconButton>
        </PageHeaderActions>
      </PageHeader>
      <LocationsTable />
    </PageWrapper>
  );
}
