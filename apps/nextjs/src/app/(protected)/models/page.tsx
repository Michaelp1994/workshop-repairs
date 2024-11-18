import type { InitialDataTableState } from "@repo/ui/data-table";
import type { Metadata } from "next";

import { IconButton } from "~/components/IconButton";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";

import ModelsTable from "../../../components/tables/ModelsTable";

export const metadata: Metadata = {
  title: "Models",
};

export default function AllModelsPage() {
  const initialState: InitialDataTableState = {
    columnVisibility: {
      createdAt: false,
      updatedAt: false,
    },
  };

  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>Models</PageTitle>
        </PageHeaderText>
        <PageHeaderActions>
          <IconButton href="/models/new" variant="create">
            Create
          </IconButton>
        </PageHeaderActions>
      </PageHeader>
      <ModelsTable initialState={initialState} />
    </PageWrapper>
  );
}
