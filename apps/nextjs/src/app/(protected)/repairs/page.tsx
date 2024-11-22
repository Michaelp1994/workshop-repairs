import type { Metadata } from "next";

import { IconButton } from "~/components/IconButton";
import {
  PageDescription,
  PageHeader,
  PageHeaderActions,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";

import RepairsTable from "./_components/RepairsTable";

export const metadata: Metadata = {
  title: "Repairs",
};

export default function AllRepairsPage() {
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
      <RepairsTable />
    </PageWrapper>
  );
}
