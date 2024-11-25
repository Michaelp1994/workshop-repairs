import type { Metadata } from "next";

import { IconButton } from "~/app/(protected)/_components/IconButton";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/app/(protected)/_components/Page";

import LocationsTable from "./_components/LocationsTable";

export const metadata: Metadata = {
  title: "Locations",
};

export default function AllLocationsPage() {
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
