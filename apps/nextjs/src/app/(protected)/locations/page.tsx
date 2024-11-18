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

import LocationsTable from "../../../components/tables/LocationsTable";

export const metadata: Metadata = {
  title: "Locations",
};

export default function AllLocationsPage() {
  return (
    <CardWrapper>
      <CardToolbar>
        <IconButton variant="create" href="/locations/new">
          Create Location
        </IconButton>
      </CardToolbar>
      <Card>
        <CardHeader>
          <CardTitle>Locations</CardTitle>
        </CardHeader>
        <CardContent>
          <LocationsTable />
        </CardContent>
      </Card>
    </CardWrapper>
  );
}
