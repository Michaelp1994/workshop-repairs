import { Badge } from "@repo/ui/badge";
import { BackButton } from "~/app/_components/BackButton";
import {
  DetailsPage,
  DetailsPageToolbar,
  DetailsPageTitle,
} from "~/app/_components/DetailsPage";

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
  return (
    <DetailsPage>
      <DetailsPageToolbar>
        <BackButton />
        <DetailsPageTitle>Repair #{repairId}</DetailsPageTitle>
        <Badge variant="outline" className="ml-auto sm:ml-0">
          Ongoing
        </Badge>
      </DetailsPageToolbar>
      {children}
      {modal}
    </DetailsPage>
  );
}
