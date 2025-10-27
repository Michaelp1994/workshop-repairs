import { createFileRoute } from "@tanstack/react-router";

import { IconButton } from "~/components/IconButton";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";
import UsersTable from "~/components/UsersTable";

export const Route = createFileRoute("/(protected)/_layout/users/")({
  component: UsersPage,
});

function UsersPage() {
  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>Users</PageTitle>
        </PageHeaderText>
        <PageHeaderActions>
          <IconButton href="/users/new" variant="create">
            Create
          </IconButton>
        </PageHeaderActions>
      </PageHeader>
      <UsersTable />
    </PageWrapper>
  );
}
