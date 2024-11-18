import { Skeleton } from "@repo/ui/skeleton";
import { Suspense } from "react";

import { IconButton } from "~/components/IconButton";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";
import { api } from "~/trpc/server";

import ClientAssetsSection from "../_components/ClientAssetsSection";
import ClientRepairsSection from "../_components/ClientRepairsSection";

interface ViewClientPageProps {
  params: {
    clientId: string;
  };
}

export default async function ViewClientPage({ params }: ViewClientPageProps) {
  const clientId = Number(params.clientId);
  const client = await api.clients.getById({ id: clientId });

  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>{client.name}</PageTitle>
        </PageHeaderText>
        <PageHeaderActions>
          <IconButton href={`${clientId}/edit`} variant="update">
            Edit
          </IconButton>
        </PageHeaderActions>
      </PageHeader>

      <Suspense fallback={<Skeleton className="h-[250px] w-full" />}>
        <ClientAssetsSection clientId={clientId} />
      </Suspense>
      <Suspense fallback={<Skeleton className="h-[250px] w-full" />}>
        <ClientRepairsSection clientId={clientId} />
      </Suspense>
    </PageWrapper>
  );
}
