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

import ManufacturersTable from "../../../components/tables/ManufacturersTable";

export const metadata: Metadata = {
  title: "Locations",
};

export default function AllManufacturersPage() {
  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>Manufacturers</PageTitle>
        </PageHeaderText>
        <PageHeaderActions>
          <IconButton href="/manufacturers/new" variant="create">
            Create
          </IconButton>
        </PageHeaderActions>
      </PageHeader>
      <ManufacturersTable />
    </PageWrapper>
  );
}
