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

export const Route = createFileRoute("/_protected/users/")({
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
          <IconButton linkOptions={{ to: "/users/new" }} variant="create">
            Create
          </IconButton>
        </PageHeaderActions>
      </PageHeader>
      <UsersTable />
    </PageWrapper>
  );
}
