import type { Metadata } from "next";

import { IconButton } from "~/app/(protected)/_components/IconButton";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/app/(protected)/_components/Page";

import ModelsTable from "./_components/ModelsTable";

export const metadata: Metadata = {
  title: "Models",
};

export default function AllModelsPage() {
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
      <ModelsTable />
    </PageWrapper>
  );
}
