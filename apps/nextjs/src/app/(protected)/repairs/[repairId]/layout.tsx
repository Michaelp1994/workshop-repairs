import { Badge } from "@repo/ui/badge";

import { BackButton } from "~/app/_components/BackButton";
import {
  DetailsPage,
  DetailsPageTitle,
  DetailsPageToolbar,
} from "~/app/_components/DetailsPage";
import { api } from "~/trpc/server";

interface RepairLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
  params: {
    repairId: string;
  };
}

export default async function RepairLayout({
  children,
  modal,
  params,
}: RepairLayoutProps) {
  const repairId = Number(params.repairId);
  const repair = await api.repairs.getById({ id: repairId });
  return (
    <DetailsPage>
      <DetailsPageToolbar>
        <BackButton />
        <DetailsPageTitle>Repair #{repairId}</DetailsPageTitle>
        <Badge className="ml-auto sm:ml-0" variant="outline">
          {repair.status.name}
        </Badge>
      </DetailsPageToolbar>
      {children}
      {modal}
    </DetailsPage>
  );
}
