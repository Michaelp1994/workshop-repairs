import { Button } from "@repo/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { IconButton } from "~/components/IconButton";
import ArchivePartModal from "~/components/modals/ArchivePartModal";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";
import PartDetails from "~/components/PartDetails";
import PartModelsTable from "~/components/PartModelsTable";
import { api } from "~/trpc/client";

export const Route = createFileRoute("/_protected/parts/$partId/")({
  component: ViewPartPage,
});

function ViewPartPage() {
  const params = Route.useParams();
  const partId = Number(params.partId);
  const [part] = api.parts.getById.useSuspenseQuery({
    id: partId,
  });
  const [isOpen, setIsOpen] = useState(false);
  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>{part.name}</PageTitle>
        </PageHeaderText>
        <PageHeaderActions>
          <IconButton
            linkOptions={{ to: "/parts/$partId/edit", params: { partId } }}
            variant="update"
          >
            Update
          </IconButton>
          <Button onClick={() => setIsOpen(true)}>Archive</Button>
          <ArchivePartModal
            isOpen={isOpen}
            onOpenChange={() => setIsOpen(false)}
            partId={partId}
          />
        </PageHeaderActions>
      </PageHeader>
      <PartDetails partId={partId} />
      <PartModelsTable partId={partId} />
    </PageWrapper>
  );
}
