import type { Metadata } from "next";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardToolbar,
  CardWrapper,
} from "@repo/ui/card";

import { IconButton } from "~/components/IconButton";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";

import LocationsTable from "../../../components/tables/LocationsTable";

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
