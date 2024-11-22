import { Card, CardContent } from "@repo/ui/card";

import {
  PageHeader,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/app/(protected)/_components/Page";

import UpdateUserForm from "../../_components/UpdateUserForm";

interface EditUserPageProps {
  params: {
    userId: string;
  };
}

export default function EditUserPage({ params }: EditUserPageProps) {
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
