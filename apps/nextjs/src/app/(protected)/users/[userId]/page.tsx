import { type UserID } from "@repo/validators/ids.validators";

import { IconButton } from "~/components/IconButton";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";
import { api } from "~/trpc/server";

import UserDetailsSection from "../_components/UserDetailsSection";

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
      <UserDetailsSection userId={userId} />
    </PageWrapper>
  );
}
