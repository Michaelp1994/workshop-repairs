import { IconButton } from "~/app/(protected)/_components/IconButton";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/app/(protected)/_components/Page";
import UsersTable from "~/app/(protected)/users/_components/UsersTable";

export default function UsersPage() {
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
