import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardToolbar,
  CardWrapper,
} from "@repo/ui/card";

import { CreateLink } from "~/app/_components/ButtonLink";

import LocationsTable from "./components/LocationsTable";

export default function AllLocationsPage() {
  return (
    <CardWrapper>
      <CardToolbar>
        <CreateLink href="/locations/new">Create Location</CreateLink>
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
