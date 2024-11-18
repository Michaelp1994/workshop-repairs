import type { Metadata } from "next";

import { IconButton } from "~/components/IconButton";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";

import PartsTable from "./_components/PartsTable";

export const metadata: Metadata = {
  title: "Parts",
};

export default function AllPartsPage() {
  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>Parts</PageTitle>
        </PageHeaderText>
        <PageHeaderActions>
          <IconButton href="/parts/new" variant="create">
            Create
          </IconButton>
        </PageHeaderActions>
      </PageHeader>
      <PartsTable />
    </PageWrapper>
  );
}
