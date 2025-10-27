import { Card, CardContent } from "@repo/ui/card";
import { createFileRoute } from "@tanstack/react-router";

import {
  PageHeader,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";

import UpdateUserForm from "../../../../../components/forms/UpdateUserForm";

export const Route = createFileRoute("/(protected)/_layout/users/$userId/edit")(
  {
    component: EditUserPage,
  },
);

function EditUserPage() {
  const params = Route.useParams();
  const userId = Number(params.userId);

  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>Edit User</PageTitle>
        </PageHeaderText>
      </PageHeader>
      <Card>
        <CardContent>
          <UpdateUserForm userId={userId} />
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
