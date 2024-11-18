import type { Metadata } from "next";

import { type InitialDataTableState } from "@repo/ui/data-table";

import { IconButton } from "~/components/IconButton";
import {
  PageDescription,
  PageHeader,
  PageHeaderActions,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";

import RepairsTable from "../../../components/tables/RepairsTable";
import Breadcrumbs from "../_components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Repairs",
};

const breadcrumbs = [{ label: "Repairs", href: "/repairs" }];

export default function AllRepairsPage() {
  const initialState: InitialDataTableState = {
    columnFilters: [{ id: "status", value: [1, 2, 3, 4, 5, 6] }],
    columnVisibility: {
      asset_assetNumber: false,
      createdAt: false,
      updatedAt: false,
    },
  };
  return (
    <PageWrapper>
      <Breadcrumbs routes={breadcrumbs} />
      <PageHeader>
        <PageHeaderText>
          <PageTitle>Repairs</PageTitle>
          <PageDescription>
            Manage and track all equipment repairs
          </PageDescription>
        </PageHeaderText>
        <PageHeaderActions>
          <IconButton variant="create" href="/repairs/new">
            Create
          </IconButton>
        </PageHeaderActions>
      </PageHeader>
      <RepairsTable initialState={initialState} />
    </PageWrapper>
  );
}
