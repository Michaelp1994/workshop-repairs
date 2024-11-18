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

export const metadata: Metadata = {
  title: "Repairs",
};

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
      <PageHeader>
        <PageHeaderText>
          <PageTitle>Repairs</PageTitle>
          <PageDescription>
            Manage and track all equipment repairs
          </PageDescription>
        </PageHeaderText>
        <PageHeaderActions>
          <IconButton href="/repairs/new" variant="create">
            Create
          </IconButton>
        </PageHeaderActions>
      </PageHeader>
      <RepairsTable initialState={initialState} />
    </PageWrapper>
  );
}
