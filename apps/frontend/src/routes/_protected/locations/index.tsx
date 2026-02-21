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

export const Route = createFileRoute("/_protected/locations/")({
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
          <IconButton linkOptions={{ to: "/locations/new" }} variant="create">
            Create
          </IconButton>
        </PageHeaderActions>
      </PageHeader>
      <LocationsTable />
    </PageWrapper>
  );
}
