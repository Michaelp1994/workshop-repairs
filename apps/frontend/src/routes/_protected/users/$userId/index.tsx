import { createFileRoute } from "@tanstack/react-router";

import { IconButton } from "~/components/IconButton";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";
import UserDetails from "~/components/UserDetails";
import { api } from "~/trpc/client";

export const Route = createFileRoute("/_protected/users/$userId/")({
  component: ViewUserPage,
});

function ViewUserPage() {
  const params = Route.useParams();
  const userId = Number(params.userId);
  const [user] = api.users.getById.useSuspenseQuery({
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
