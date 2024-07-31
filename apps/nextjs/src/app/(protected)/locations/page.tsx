import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardWrapper,
  CardToolbar,
} from "@repo/ui/card";

import LocationsTable from "./components/LocationsTable";
import { CreateLink } from "~/app/_components/ButtonLink";

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
