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

import ManufacturersTable from "../../../components/tables/ManufacturersTable";

export const metadata: Metadata = {
  title: "Locations",
};

export default function AllManufacturersPage() {
  return (
    <CardWrapper>
      <CardToolbar>
        <IconButton variant="create" href="/manufacturers/new">
          Create Manufacturer
        </IconButton>
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
