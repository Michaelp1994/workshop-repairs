import UsersTable from "~/app/(protected)/users/_components/UsersTable";
import { IconButton } from "~/components/IconButton";
import {
  PageDescription,
  PageHeader,
  PageHeaderActions,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";

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
