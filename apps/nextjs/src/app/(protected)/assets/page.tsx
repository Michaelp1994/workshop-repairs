import type { Metadata } from "next";

import { IconButton } from "~/components/IconButton";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";

import AssetsTable from "./_components/AssetsTable";

export const metadata: Metadata = {
  title: "Assets",
};

export default function AllAssetsPage() {
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
      <AssetsTable />
    </PageWrapper>
  );
}
