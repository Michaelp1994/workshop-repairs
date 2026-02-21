import NiceModal from "@ebay/nice-modal-react";
import { Button } from "@repo/ui/button";
import { createFileRoute } from "@tanstack/react-router";

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
  async function showArchiveModal() {
    await NiceModal.show(ArchiveUserModal, { userId });
  }
  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>
            {user.firstName} {user.lastName}
          </PageTitle>
        </PageHeaderText>
        <PageHeaderActions>
          <IconButton
            linkOptions={{ to: "/users/$userId/edit", params: { userId } }}
            variant="update"
          >
            Update
          </IconButton>
          <Button onClick={showArchiveModal}>Archive</Button>
        </PageHeaderActions>
      </PageHeader>
      <UserDetails userId={userId} />
    </PageWrapper>
  );
}
