import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardToolbar,
  CardWrapper,
} from "@repo/ui/card";

import { CreateLink } from "~/components/ButtonLink";
import UsersTable from "~/components/tables/UsersTable";

export default function UsersPage() {
  return (
    <CardWrapper>
      <CardToolbar>
        <CreateLink href="/users/new">Create User</CreateLink>
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
