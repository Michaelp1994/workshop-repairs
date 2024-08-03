import { BackButton } from "~/components/BackButton";
import {
  DetailsPage,
  DetailsPageTitle,
  DetailsPageToolbar,
} from "~/components/DetailsPage";

import RepairStatusBadge from "../_components/RepairStatusBadge";

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
  return (
    <DetailsPage>
      <DetailsPageToolbar>
        <BackButton />
        <DetailsPageTitle>Repair #{repairId}</DetailsPageTitle>
        <RepairStatusBadge repairId={repairId} />
      </DetailsPageToolbar>
      {children}
      {modal}
    </DetailsPage>
  );
}
