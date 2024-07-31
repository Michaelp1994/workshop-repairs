import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardWrapper,
  CardToolbar,
} from "@repo/ui/card";

import ManufacturersTable from "./components/ManufacturersTable";
import { CreateLink } from "~/app/_components/ButtonLink";

export default function AllManufacturersPage() {
  return (
    <CardWrapper>
      <CardToolbar>
        <CreateLink href="/manufacturers/new">Create Manufacturer</CreateLink>
      </CardToolbar>
      <Card>
        <CardHeader>
          <CardTitle>Manufacturers</CardTitle>
        </CardHeader>
        <CardContent>
          <ManufacturersTable />
        </CardContent>
      </Card>
    </CardWrapper>
  );
}
