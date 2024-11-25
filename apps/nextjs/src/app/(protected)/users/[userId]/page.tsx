import { type UserID } from "@repo/validators/ids.validators";

import { IconButton } from "~/app/(protected)/_components/IconButton";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/app/(protected)/_components/Page";
import { api } from "~/trpc/server";

import UserDetails from "../_components/UserDetails";

interface ViewUserPageProps {
  params: {
    userId: UserID;
  };
}

export default async function ViewUserPage({ params }: ViewUserPageProps) {
  const userId = Number(params.userId);
  const user = await api.users.getById({
    id: userId,
  });
  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>
            {user.firstName} {user.lastName}
          </PageTitle>
        </PageHeaderText>
        <PageHeaderActions>
          <IconButton href={`/users/${userId}/edit`} variant="update">
            Update
          </IconButton>
        </PageHeaderActions>
      </PageHeader>
      <UserDetails userId={userId} />
    </PageWrapper>
  );
}
