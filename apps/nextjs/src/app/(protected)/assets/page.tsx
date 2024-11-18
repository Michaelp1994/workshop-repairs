import type { Metadata } from "next";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardWrapper,
} from "@repo/ui/card";
import { type InitialDataTableState } from "@repo/ui/data-table";

import { IconButton } from "~/components/IconButton";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";

import AssetsTable from "../../../components/tables/AssetsTable";

export const metadata: Metadata = {
  title: "Assets",
};

export default function AllAssetsPage() {
  const initialState: InitialDataTableState = {
    columnVisibility: {
      assetNumber: false,
      createdAt: false,
      updatedAt: false,
    },
  };
  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>Assets</PageTitle>
        </PageHeaderText>
        <PageHeaderActions>
          <IconButton href="/assets/new" variant="create">
            Create
          </IconButton>
        </PageHeaderActions>
      </PageHeader>
      <AssetsTable initialState={initialState} />
    </PageWrapper>
  );
}
