import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardToolbar,
  CardWrapper,
} from "@repo/ui/card";

import { IconButton } from "~/components/IconButton";
import UsersTable from "~/components/tables/UsersTable";

export default function UsersPage() {
  return (
    <CardWrapper>
      <CardToolbar>
        <IconButton variant="create" href="/users/new">
          Create User
        </IconButton>
      </CardToolbar>
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent>
          <UsersTable />
        </CardContent>
      </Card>
    </CardWrapper>
  );
}
