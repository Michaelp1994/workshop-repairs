import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardToolbar,
  CardWrapper,
} from "@repo/ui/card";

import { CreateLink } from "~/app/_components/ButtonLink";

import ManufacturersTable from "./components/ManufacturersTable";

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
