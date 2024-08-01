"use client";
import { Badge } from "@repo/ui/badge";

import { BackButton } from "~/components/BackButton";
import {
  DetailsPage,
  DetailsPageTitle,
  DetailsPageToolbar,
} from "~/components/DetailsPage";
import { api } from "~/trpc/react";

interface RepairLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
  params: {
    repairId: string;
  };
}

export default function RepairLayout({
  children,
  modal,
  params,
}: RepairLayoutProps) {
  const repairId = Number(params.repairId);
  const { data, isLoading, isError } = api.repairs.getById.useQuery({
    id: repairId,
  });

  return (
    <DetailsPage>
      <DetailsPageToolbar>
        <BackButton />
        <DetailsPageTitle>Repair #{repairId}</DetailsPageTitle>
        <Badge className="ml-auto sm:ml-0" variant="outline">
          {data?.status.name}
        </Badge>
      </DetailsPageToolbar>
      {children}
      {modal}
    </DetailsPage>
  );
}
