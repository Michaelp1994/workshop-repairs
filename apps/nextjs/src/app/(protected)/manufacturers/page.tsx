import type { Metadata } from "next";

import { IconButton } from "~/app/(protected)/_components/IconButton";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/app/(protected)/_components/Page";

import ManufacturersTable from "./_components/ManufacturersTable";

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
