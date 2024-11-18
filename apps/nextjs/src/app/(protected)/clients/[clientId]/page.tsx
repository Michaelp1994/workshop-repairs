import { Button } from "@repo/ui/button";
import { Skeleton } from "@repo/ui/skeleton";
import Link from "next/link";
import { Suspense } from "react";

import {
  DetailsPageGrid,
  DetailsPageMainColumn,
  DetailsPageSecondaryColumn,
} from "~/components/DetailsPage";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";
import { api } from "~/trpc/server";

import Breadcrumbs from "../../_components/Breadcrumbs";
import ClientAssetsSection from "../_components/ClientAssetsSection";
import ClientDetailsSection from "../_components/ClientDetailsSection";
import ClientRepairsSection from "../_components/ClientRepairsSection/ClientRepairsSection";

interface ViewClientPageProps {
  params: {
    clientId: string;
  };
}

export default async function ViewClientPage({ params }: ViewClientPageProps) {
  const clientId = Number(params.clientId);
  const client = await api.clients.getById({ id: clientId });

  const breadcrumbs = [
    { label: "Clients", href: "/clients" },
    { label: "View Client", href: `/clients/${clientId}` },
  ];

  return (
    <PageWrapper>
      <Breadcrumbs routes={breadcrumbs} />
      <PageHeader>
        <PageHeaderText>
          <PageTitle>{client.name}</PageTitle>
        </PageHeaderText>
        <PageHeaderActions>
          <Button asChild>
            <Link>Edit</Link>
          </Button>
        </PageHeaderActions>
      </PageHeader>
      {/* <Suspense fallback={<Skeleton className="h-[250px] w-full" />}>
        <ClientDetailsSection clientId={clientId} />
      </Suspense> */}
      <Suspense fallback={<Skeleton className="h-[250px] w-full" />}>
        <ClientAssetsSection clientId={clientId} />
      </Suspense>
      <Suspense fallback={<Skeleton className="h-[250px] w-full" />}>
        <ClientRepairsSection clientId={clientId} />
      </Suspense>
    </PageWrapper>
  );
}
