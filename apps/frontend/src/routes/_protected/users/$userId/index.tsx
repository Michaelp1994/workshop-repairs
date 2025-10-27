import { Button } from "@repo/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { IconButton } from "~/components/IconButton";
import ArchiveUserModal from "~/components/modals/ArchiveUserModal";
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
  const [isOpen, setIsOpen] = useState(false);
  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>
            {user.firstName} {user.lastName}
          </PageTitle>
        </PageHeaderText>
        <PageHeaderActions>
          <IconButton to={`/users/${userId}/edit`} variant="update">
            Update
          </IconButton>
          <Button onClick={() => setIsOpen(true)}>Archive</Button>
          <ArchiveUserModal
            isOpen={isOpen}
            onOpenChange={() => setIsOpen(false)}
            userId={userId}
          />
        </PageHeaderActions>
      </PageHeader>
      <UserDetails userId={userId} />
    </PageWrapper>
  );
}
